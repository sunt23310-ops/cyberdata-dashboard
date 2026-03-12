#!/usr/bin/env python3
"""
为每个商品搜索真实产品图片URL，并更新 products.ts 中的 images 和 mainImages 字段。
使用 Bing Image Search 获取产品图片。
"""

import re
import json
import sys
import time
import random
import requests
from pathlib import Path
from urllib.parse import quote

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


def search_product_image(product_name: str, brand: str) -> str:
    """搜索产品图片，返回图片URL"""
    query = f'{product_name} 产品图'
    url = f'https://www.bing.com/images/search?q={quote(query)}&first=1&count=10'

    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            matches = re.findall(r'murl&quot;:&quot;(https?://[^&]+?)&quot;', resp.text)
            if not matches:
                return ''
            # 优先选择稳定的图片CDN
            for m in matches:
                if len(m) > 500:
                    continue
                for domain in PREFERRED_DOMAINS:
                    if domain in m:
                        return m
            # 没有优先域名就返回第一个合理长度的URL
            for m in matches:
                if len(m) <= 500:
                    return m
    except Exception as e:
        print(f'  Error: {e}', file=sys.stderr)

    return ''


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


def update_products_ts(image_map: dict):
    content = PRODUCTS_FILE.read_text(encoding='utf-8')
    updated = 0
    for item_code, image_url in image_map.items():
        if not image_url:
            continue
        safe_url = image_url.replace("'", "\\'")

        # 替换 mockProducts 中的 images
        pattern = re.compile(
            rf"(itemCode:\s*'{re.escape(item_code)}'.*?images:\s*)'[^']*'",
            re.DOTALL
        )
        new_content = pattern.sub(rf"\g<1>'{safe_url}'", content)
        if new_content != content:
            content = new_content
            updated += 1

        # 替换 productDetailsMap 中的 mainImages
        pattern2 = re.compile(
            rf"('{re.escape(item_code)}':\s*\{{.*?mainImages:\s*)'[^']*'",
            re.DOTALL
        )
        content = pattern2.sub(rf"\g<1>'{safe_url}'", content)

    PRODUCTS_FILE.write_text(content, encoding='utf-8')
    print(f'\nUpdated {updated} products in products.ts')


def main():
    print('Loading product data...', flush=True)
    products = extract_products_from_ts()
    print(f'Found {len(products)} products', flush=True)

    cache = load_cache()
    print(f'Loaded {len(cache)} cached image URLs', flush=True)

    new_searches = 0
    failed = 0

    for i, product in enumerate(products):
        item_code = product['itemCode']
        title = product['title']
        brand = product['brand']

        if item_code in cache and cache[item_code]:
            continue

        print(f'[{i+1}/{len(products)}] {brand} {title}...', end='', flush=True)
        image_url = search_product_image(title, brand)

        if image_url:
            cache[item_code] = image_url
            print(f' OK', flush=True)
        else:
            cache[item_code] = ''
            failed += 1
            print(f' MISS', flush=True)

        new_searches += 1

        if new_searches % 20 == 0:
            save_cache(cache)
            found_so_far = sum(1 for v in cache.values() if v)
            print(f'  --- Progress: {found_so_far} found, {failed} missed ---', flush=True)

        # 短延迟
        time.sleep(random.uniform(0.3, 0.8))

    save_cache(cache)

    found = sum(1 for v in cache.values() if v)
    print(f'\nSearch complete: {found}/{len(products)} images found, {failed} failed', flush=True)

    print('\nUpdating products.ts...', flush=True)
    update_products_ts(cache)
    print('Done!', flush=True)


if __name__ == '__main__':
    main()
