#!/usr/bin/env python3
"""
自动验证并修复商品图片：
1. 检查每个图片URL是否可访问
2. 检查图片内容大小是否合理（过小可能是错误图）
3. 对有问题的图片自动用改进的搜索词重新搜索
4. 更新 image_cache.json 和 products.ts

用法：
  python3 scripts/fix_images.py              # 验证全部图片并修复
  python3 scripts/fix_images.py --check-only # 仅检查，不修复
"""

import re
import json
import sys
import time
import random
import requests
from pathlib import Path
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed

PRODUCTS_FILE = Path(__file__).parent.parent / 'src' / 'mock' / 'products.ts'
CACHE_FILE = Path(__file__).parent / 'image_cache.json'

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}

PREFERRED_DOMAINS = ['img.alicdn.com', 'gw.alicdn.com', 'img.yzcdn.cn',
                     'cdn.', 'static.', '.jd.com', 'beauty.', 'cos.', '.suning.',
                     'img.pconline.', 'hbimg.huaban.com']

# 图片内容小于此字节数视为无效（可能是占位图/错误图）
MIN_IMAGE_SIZE = 2000


def load_cache() -> dict:
    if CACHE_FILE.exists():
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}


def save_cache(cache: dict):
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def extract_products_from_ts() -> list[dict]:
    content = PRODUCTS_FILE.read_text(encoding='utf-8')
    products = []
    list_start = content.find('export const mockProducts')
    list_end = content.find('export const productDetailsMap')
    if list_start >= 0 and list_end >= 0:
        list_section = content[list_start:list_end]
        for match in re.finditer(
            r"\{\s*itemId:\s*\d+.*?itemCode:\s*'([^']+)'.*?title:\s*'([^']+)'.*?brandName:\s*'([^']+)'",
            list_section, re.DOTALL
        ):
            products.append({
                'itemCode': match.group(1),
                'title': match.group(2),
                'brand': match.group(3),
            })
    return products


def check_image_url(item_code: str, url: str) -> dict:
    """检查图片URL是否有效，返回检查结果"""
    if not url:
        return {'code': item_code, 'url': url, 'status': 'missing', 'reason': '无图片URL'}

    try:
        resp = requests.head(url, headers=HEADERS, timeout=8, allow_redirects=True)
        if resp.status_code >= 400:
            return {'code': item_code, 'url': url, 'status': 'broken', 'reason': f'HTTP {resp.status_code}'}

        content_length = resp.headers.get('Content-Length')
        if content_length and int(content_length) < MIN_IMAGE_SIZE:
            return {'code': item_code, 'url': url, 'status': 'too_small', 'reason': f'仅 {content_length} bytes'}

        content_type = resp.headers.get('Content-Type', '')
        if content_type and 'image' not in content_type and 'octet-stream' not in content_type:
            return {'code': item_code, 'url': url, 'status': 'not_image', 'reason': f'类型: {content_type}'}

        return {'code': item_code, 'url': url, 'status': 'ok', 'reason': ''}

    except requests.exceptions.Timeout:
        return {'code': item_code, 'url': url, 'status': 'timeout', 'reason': '请求超时'}
    except Exception as e:
        return {'code': item_code, 'url': url, 'status': 'error', 'reason': str(e)[:80]}


def search_product_image(product_name: str, brand: str, attempt: int = 0) -> str:
    """搜索产品图片，attempt>0时用不同搜索词"""
    queries = [
        f'{brand} {product_name} 产品图',
        f'{product_name} 官方图',
        f'{brand} {product_name} 护肤品',
    ]
    query = queries[min(attempt, len(queries) - 1)]
    url = f'https://www.bing.com/images/search?q={quote(query)}&first=1&count=15'

    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            matches = re.findall(r'murl&quot;:&quot;(https?://[^&]+?)&quot;', resp.text)
            if not matches:
                return ''
            for m in matches:
                if len(m) > 500:
                    continue
                for domain in PREFERRED_DOMAINS:
                    if domain in m:
                        return m
            for m in matches:
                if len(m) <= 500:
                    return m
    except Exception as e:
        print(f'  搜索出错: {e}', file=sys.stderr)

    return ''


def update_products_ts(image_map: dict):
    """更新 products.ts 中的图片URL"""
    content = PRODUCTS_FILE.read_text(encoding='utf-8')
    updated = 0
    for item_code, image_url in image_map.items():
        if not image_url:
            continue
        safe_url = image_url.replace("'", "\\'")

        pattern = re.compile(
            rf"(itemCode:\s*'{re.escape(item_code)}'.*?images:\s*)'[^']*'",
            re.DOTALL
        )
        new_content = pattern.sub(rf"\g<1>'{safe_url}'", content)
        if new_content != content:
            content = new_content
            updated += 1

        pattern2 = re.compile(
            rf"('{re.escape(item_code)}':\s*\{{.*?mainImages:\s*)'[^']*'",
            re.DOTALL
        )
        content = pattern2.sub(rf"\g<1>'{safe_url}'", content)

    PRODUCTS_FILE.write_text(content, encoding='utf-8')
    return updated


def main():
    check_only = '--check-only' in sys.argv

    print('=== 商品图片自动验证与修复 ===\n', flush=True)

    # 1. 加载数据
    products = extract_products_from_ts()
    cache = load_cache()
    product_map = {p['itemCode']: p for p in products}

    print(f'商品数: {len(products)}，缓存图片数: {len(cache)}\n', flush=True)

    # 2. 并发检查所有图片URL
    print('正在检查图片URL有效性...', flush=True)
    problems = []
    ok_count = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {}
        for p in products:
            code = p['itemCode']
            url = cache.get(code, '')
            future = executor.submit(check_image_url, code, url)
            futures[future] = code

        for i, future in enumerate(as_completed(futures)):
            result = future.result()
            if result['status'] != 'ok':
                problems.append(result)
            else:
                ok_count += 1
            if (i + 1) % 50 == 0:
                print(f'  已检查 {i+1}/{len(products)}...', flush=True)

    print(f'\n检查完成: {ok_count} 个正常, {len(problems)} 个有问题\n', flush=True)

    if problems:
        # 按状态分组显示
        by_status = {}
        for p in problems:
            by_status.setdefault(p['status'], []).append(p)

        for status, items in by_status.items():
            status_label = {
                'missing': '缺少图片',
                'broken': '链接失效',
                'too_small': '图片太小',
                'not_image': '非图片类型',
                'timeout': '超时',
                'error': '请求出错',
            }.get(status, status)
            print(f'  [{status_label}] {len(items)} 个', flush=True)

    if check_only:
        if problems:
            print('\n有问题的商品:', flush=True)
            for p in problems:
                title = product_map.get(p['code'], {}).get('title', '?')
                print(f"  {p['code']}: {title} — {p['reason']}", flush=True)
        return

    if not problems:
        print('所有图片均正常！', flush=True)
        return

    # 3. 自动修复：重新搜索有问题的图片
    print(f'\n正在重新搜索 {len(problems)} 个有问题的图片...\n', flush=True)
    fixed = 0
    still_broken = 0

    for i, problem in enumerate(problems):
        code = problem['code']
        product = product_map.get(code)
        if not product:
            continue

        title = product['title']
        brand = product['brand']
        print(f'[{i+1}/{len(problems)}] {brand} {title}...', end='', flush=True)

        # 尝试多次搜索
        new_url = ''
        for attempt in range(2):
            new_url = search_product_image(title, brand, attempt)
            if new_url:
                # 快速验证新URL
                check = check_image_url(code, new_url)
                if check['status'] == 'ok':
                    break
                else:
                    new_url = ''
            time.sleep(random.uniform(0.3, 0.6))

        if new_url:
            cache[code] = new_url
            fixed += 1
            print(' 已修复', flush=True)
        else:
            still_broken += 1
            print(' 仍然失败', flush=True)

        time.sleep(random.uniform(0.3, 0.8))

        if (i + 1) % 10 == 0:
            save_cache(cache)

    save_cache(cache)

    print(f'\n修复结果: {fixed} 个已修复, {still_broken} 个仍有问题', flush=True)

    # 4. 更新 products.ts
    if fixed > 0:
        print('\n正在更新 products.ts...', flush=True)
        updated = update_products_ts(cache)
        print(f'已更新 {updated} 个商品的图片URL', flush=True)

    print('\n完成！', flush=True)


if __name__ == '__main__':
    main()
