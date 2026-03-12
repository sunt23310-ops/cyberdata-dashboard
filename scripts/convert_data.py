#!/usr/bin/env python3
"""
Parse knowledge base markdown files and generate TypeScript mock data for cyberdata-dashboard.
"""

import re
import json
import random
import hashlib
from pathlib import Path

random.seed(42)  # Reproducible

# === Configuration ===
KB_BASE = Path("/Users/sunzhuoqi/Desktop/商品知识库")
OUTPUT_DIR = Path("/Users/sunzhuoqi/Desktop/cyberdata-dashboard/src/mock")

# Live session mapping
LIVE_SESSIONS = [
    {
        "liveId": "LIVE001", "theme": "精华小课堂", "date": "2025-10-07T20:00:00Z",
        "displayDate": "2025-10-07 20:00:00", "category": "护肤品/精华液",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.7精华小课堂_商品明细.md",
        "duration": 14520, "viewCount": 12300000, "sales": 85600, "saleAmount": 45600000
    },
    {
        "liveId": "LIVE002", "theme": "次抛+面膜小课堂", "date": "2025-10-08T20:00:00Z",
        "displayDate": "2025-10-08 20:00:00", "category": "护肤品/次抛精华",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.8-次抛面膜小课堂_商品明细.md",
        "duration": 13200, "viewCount": 11500000, "sales": 79200, "saleAmount": 42100000
    },
    {
        "liveId": "LIVE003", "theme": "面霜+眼霜小课堂", "date": "2025-10-09T20:00:00Z",
        "displayDate": "2025-10-09 20:00:00", "category": "护肤品/面霜",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.9面霜+眼霜小课堂_商品明细.md",
        "duration": 12600, "viewCount": 9800000, "sales": 55400, "saleAmount": 28700000
    },
    {
        "liveId": "LIVE004", "theme": "水乳套组小课堂", "date": "2025-10-10T20:00:00Z",
        "displayDate": "2025-10-10 20:00:00", "category": "护肤品/水乳套组",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.10水乳套组小课堂_商品明细.md",
        "duration": 11400, "viewCount": 8900000, "sales": 62300, "saleAmount": 32100000
    },
    {
        "liveId": "LIVE005", "theme": "彩妆小课堂", "date": "2025-10-11T20:00:00Z",
        "displayDate": "2025-10-11 20:00:00", "category": "彩妆",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.11-彩妆小课堂_商品明细.md",
        "duration": 10800, "viewCount": 7200000, "sales": 48900, "saleAmount": 21500000
    },
    {
        "liveId": "LIVE006", "theme": "仪器防晒卸妆洁面小课堂", "date": "2025-10-12T20:00:00Z",
        "displayDate": "2025-10-12 20:00:00", "category": "护肤品/防晒",
        "file": KB_BASE / "【2025双十一小课堂】知识结构+产品明细/【2025双十一】10.12小课堂仪器防晒卸妆洁面_商品明细.md",
        "duration": 9000, "viewCount": 5600000, "sales": 41200, "saleAmount": 18900000
    },
    {
        "liveId": "LIVE007", "theme": "38爆品攻略小课堂", "date": "2026-02-21T20:00:00Z",
        "displayDate": "2026-02-21 20:00:00", "category": "护肤品/精华液",
        "file": KB_BASE / "【2026-38】小课堂 /38小课堂完整版.md",
        "duration": 15600, "viewCount": 13100000, "sales": 91200, "saleAmount": 48900000
    },
]


def parse_price_range(price_str: str):
    """Parse a price range string and return (price, couponPrice)."""
    price_str = price_str.strip()
    # Patterns: "100元-300元", "300元～600元", "100元以内", "2000元以上", "200元-400元"
    nums = re.findall(r'(\d+)', price_str)
    if not nums:
        return 299, 199
    nums = [int(n) for n in nums]
    if '以内' in price_str:
        return nums[0], int(nums[0] * 0.7)
    elif '以上' in price_str:
        return int(nums[0] * 1.3), nums[0]
    elif len(nums) >= 2:
        return nums[1], nums[0]  # price=upper, couponPrice=lower
    else:
        return nums[0], int(nums[0] * 0.8)


def extract_brand(product_name: str) -> str:
    """Extract brand name from product name."""
    known_brands = [
        'HR赫莲娜', '海蓝之谜', 'SK-II', 'CPB肌肤之钥', '莱珀妮', 'The Ginza御银座',
        '修丽可', '兰蔻', '雅诗兰黛', '资生堂', '娇韵诗', '法国娇兰', '娇兰',
        'YSL', 'DARPHIN朵梵', '科颜氏', '倩碧', '理肤泉',
        '欧莱雅', 'OLAY', '珀莱雅', '薇诺娜', '自然堂', '韩束', '百雀羚', '相宜本草',
        'PMPM', '瑷尔博士', '敷尔佳', '润百颜', '可复美', '可丽金', '夸迪', '听研',
        '同频', '绽媄娅', '欧诗漫', '科兰黎', '双妹', '羽西', '兰时光',
        'Murad慕拉得', 'TAKAMI', '妮维雅', 'DR.CI:LABO', '达尔肤', '欧玛橄榄',
        '伊丽莎白雅顿', 'cellcosmet瑞妍', '馥蕾诗', '希思黎',
        'evereden安唯伊', 'Curél珂润', 'onTop', 'my CLARINS小娇韵诗',
        '完美日记', '欧珀莱', '丝塔芙', '优色林', '凡士林', '适乐肤',
        '瑷科缦', '优时颜', 'FAN BEAUTY DIARY', '蒂佳婷', '达肤妍', '珀芙研',
        'codemint纨素之肤', 'MAOGEPING毛戈平', 'CNP希恩派', '芙芙',
        '美研因式', 'DAISY SKY雏菊的天空', 'AromeManpo馥郁满铺',
        '颐莲', '伊菲丹', '赫莲娜',
    ]
    for brand in known_brands:
        if brand in product_name:
            return brand
    # Try first word
    parts = re.split(r'[「」\s]', product_name)
    return parts[0] if parts else product_name[:4]


def generate_sales(price, brand):
    """Generate realistic sales numbers based on price tier and brand."""
    # Higher price = lower volume, well-known brands = higher volume
    big_brands = ['兰蔻', '雅诗兰黛', 'SK-II', '欧莱雅', '资生堂', '珀莱雅', '薇诺娜', 'OLAY']
    brand_mult = 1.5 if any(b in brand for b in big_brands) else 1.0

    if price < 200:
        base_sale = random.randint(80000, 250000)
    elif price < 500:
        base_sale = random.randint(40000, 120000)
    elif price < 1000:
        base_sale = random.randint(15000, 60000)
    elif price < 2000:
        base_sale = random.randint(5000, 25000)
    else:
        base_sale = random.randint(2000, 12000)

    sale = int(base_sale * brand_mult)
    return sale


def parse_jinghua_products(filepath):
    """Parse the 精华小课堂 format (## product headings with details below)."""
    content = filepath.read_text(encoding='utf-8')
    products = []

    # Split by ## headings (product names)
    sections = re.split(r'^## (.+)$', content, flags=re.MULTILINE)
    # sections[0] is before first ##, then alternating: name, content, name, content...

    i = 1
    while i < len(sections) - 1:
        name = sections[i].strip()
        body = sections[i + 1]
        i += 2

        # Skip non-product headings
        if any(kw in name for kw in ['产品列表', '商品详细', '精华商品', '总览']):
            continue

        product = {"name": name}

        # Extract fields
        cat_match = re.search(r'\*\*产品类目[：:]\*\*\s*(.+)', body)
        if cat_match:
            product["category_raw"] = cat_match.group(1).strip()

        effect_match = re.search(r'\*\*功效分类[：:]\*\*\s*(.+)', body)
        if effect_match:
            product["effect"] = effect_match.group(1).strip()

        price_match = re.search(r'\*\*价位[：:]\*\*\s*(.+)', body)
        if not price_match:
            price_match = re.search(r'价位[：:]\s*(.+)', body)
        if price_match:
            product["price_range"] = price_match.group(1).strip()

        comp_match = re.search(r'\*\*核心成分[：:]\*\*\s*(.+)', body)
        if comp_match:
            product["ingredients_raw"] = comp_match.group(1).strip()

        highlight_match = re.search(r'\*\*亮点[：:]\*\*\s*(.+)', body)
        if highlight_match:
            product["highlight"] = highlight_match.group(1).strip()

        tags_match = re.search(r'\*\*适用标签[：:]\*\*\s*(.+)', body)
        if tags_match:
            product["tags"] = tags_match.group(1).strip()

        promo_match = re.search(r'\*\*促销机制[：:]\*\*\s*(.+)', body)
        if promo_match:
            product["promotion"] = promo_match.group(1).strip()

        script_match = re.search(r'\*\*李佳琦直播话术[：:]\*\*\s*\n+([\s\S]*?)(?=\n---|\n## |\Z)', body)
        if script_match:
            product["script"] = script_match.group(1).strip()[:200]

        products.append(product)

    return products


def parse_table_products(filepath):
    """Parse products from table format (次抛/面膜/面霜/眼霜/水乳/彩妆/仪器)."""
    content = filepath.read_text(encoding='utf-8')
    products = []

    # Find ### product headings with details
    sections = re.split(r'^### (.+)$', content, flags=re.MULTILINE)
    i = 1
    while i < len(sections) - 1:
        name = sections[i].strip()
        body = sections[i + 1]
        i += 2

        # Skip category headings like "补水/修护类", "1. 口腔护理"
        if re.match(r'^\d+\.', name) or '类' in name[-1:]:
            continue

        product = {"name": name}

        cat_match = re.search(r'产品类目[：:]\s*(.+)', body)
        if cat_match:
            product["category_raw"] = cat_match.group(1).strip()

        price_match = re.search(r'\*\*价位[：:]\*\*\s*(.+)', body)
        if not price_match:
            price_match = re.search(r'价位[：:]\s*(.+)', body)
        if price_match:
            product["price_range"] = price_match.group(1).strip()

        comp_match = re.search(r'\*\*核心成分[：:]\*\*\s*(.+)', body)
        if comp_match:
            product["ingredients_raw"] = comp_match.group(1).strip()

        highlight_match = re.search(r'\*\*亮点[：:]\*\*\s*(.+)', body)
        if highlight_match:
            product["highlight"] = highlight_match.group(1).strip()

        script_match = re.search(r'\*\*李佳琦直播话术[：:]\*\*\s*\n+([\s\S]*?)(?=\n---|\n### |\Z)', body)
        if script_match:
            product["script"] = script_match.group(1).strip()[:200]

        products.append(product)

    # Also try to get products from summary tables if ### sections are few
    if len(products) < 5:
        table_products = []
        for line in content.split('\n'):
            m = re.match(r'^\|\s*(.+?)\s*\|\s*(.+?)\s*\|', line)
            if m and '产品' not in m.group(1) and '---' not in m.group(1) and '列表' not in m.group(1):
                name = m.group(1).strip()
                price = m.group(2).strip()
                if name and not name.startswith('|'):
                    table_products.append({"name": name, "price_range": price})
        if len(table_products) > len(products):
            products = table_products

    return products


def parse_38_products(filepath):
    """Parse the 38小课堂完整版 format.

    Products appear as "- ProductName" lines, preceded by "**价格范围**" lines.
    Non-product lines (explanatory text) are filtered out.
    """
    content = filepath.read_text(encoding='utf-8')
    products = []

    lines = content.split('\n')
    current_price = None

    # Keywords that indicate a line is NOT a product
    skip_keywords = [
        '换季', '肌肤', '目的', '定位', '护肤逻辑', '主播推荐', '象限',
        '解决方案', '建议', '注意', '步骤', 'STEP', '可见', '以下',
        '怎么选', '怎么涂', '攻略', '推荐', '详见', '选择', '问题',
        '适合', '不适合', '搭配', '区别', '总结', '价位', '预算',
        '如果', '因为', '所以', '但是', '可以', '需要', '想要',
        '第一', '第二', '第三', '不要', '千万', '长期', '短期',
        '早上', '晚上', '白天', '夜间', '日常', '特殊', '定期',
        '重点', '关键', '核心', '基础', '进阶', '高阶',
    ]

    # Brand keywords that indicate a product line
    brand_indicators = [
        '薇诺娜', '修丽可', '海蓝之谜', '理肤泉', '珀莱雅', '兰蔻', '雅诗兰黛',
        'SK-II', 'OLAY', '欧莱雅', '资生堂', '娇韵诗', '科颜氏', '倩碧',
        'HR赫莲娜', '赫莲娜', '达尔肤', '欧玛', 'TAKAMI', 'YSL', '科兰黎',
        '双妹', '羽西', '韩束', '自然堂', '百雀羚', '相宜本草', '瑷尔博士',
        '敷尔佳', '润百颜', '可复美', '可丽金', '夸迪', '听研', '同频',
        '绽媄娅', '欧诗漫', '妮维雅', '伊丽莎白雅顿', '娇兰', '法国娇兰',
        'PMPM', '完美日记', 'Murad', '馥蕾诗', 'CPB', '莱珀妮',
        'FAN BEAUTY', '蒂佳婷', '希思黎', '优时颜', '瑷科缦',
        'The Ginza', 'cellcosmet', 'MAOGEPING', '毛戈平',
    ]

    for line in lines:
        # Detect price range headers
        price_m = re.match(r'^\*\*(\d+.*?元.*?)\*\*', line)
        if price_m:
            current_price = price_m.group(1)
            continue

        # Product lines start with "- "
        m = re.match(r'^-\s+(.+)', line)
        if m:
            text = m.group(1).strip()
            # Remove markdown formatting
            text = re.sub(r'>\s*🎙️.*', '', text).strip()
            if not text or len(text) < 3:
                continue

            # Skip non-product lines
            if any(kw in text for kw in skip_keywords):
                continue

            # Must contain a brand name or product-type keyword to be a product
            is_product = any(brand in text for brand in brand_indicators)
            if not is_product:
                # Also accept if it contains typical product keywords
                product_keywords = ['精华', '面膜', '面霜', '眼霜', '乳液', '化妆水',
                                   '防晒', '卸妆', '洁面', '粉底', '口红', '唇膏',
                                   '次抛', '安瓶', '套组', '喷雾', '洗面奶']
                is_product = any(kw in text for kw in product_keywords)

            if is_product and not text.startswith('>'):
                product = {"name": text}
                if current_price:
                    product["price_range"] = current_price
                products.append(product)

    # Deduplicate by name
    seen = set()
    unique = []
    for p in products:
        name = p["name"]
        # Clean up name: remove trailing punctuation, parenthetical notes
        name = re.sub(r'\s*[/／]\s*$', '', name)
        p["name"] = name
        if name not in seen and len(name) > 3:
            seen.add(name)
            unique.append(p)

    return unique


def select_products(all_products, max_per_live=10):
    """Select representative products from parsed list."""
    if len(all_products) <= max_per_live:
        return all_products

    # Try to get a mix of price ranges
    selected = []
    random.shuffle(all_products)

    # Group by rough price tier
    low, mid, high, premium = [], [], [], []
    for p in all_products:
        pr = p.get("price_range", "300元-600元")
        nums = re.findall(r'\d+', pr)
        max_price = int(nums[-1]) if nums else 300
        if max_price <= 300:
            low.append(p)
        elif max_price <= 600:
            mid.append(p)
        elif max_price <= 1500:
            high.append(p)
        else:
            premium.append(p)

    # Pick from each tier
    for tier in [low, mid, high, premium]:
        n = min(len(tier), max(2, max_per_live // 4))
        selected.extend(tier[:n])

    # Fill up to max if needed
    remaining = [p for p in all_products if p not in selected]
    while len(selected) < max_per_live and remaining:
        selected.append(remaining.pop(0))

    return selected[:max_per_live]


def build_category_name(product, session_category):
    """Build a 3-level category name."""
    cat_raw = product.get("category_raw", "")
    effect = product.get("effect", "")

    if "精华" in cat_raw or "精华" in product["name"]:
        if "次抛" in cat_raw or "次抛" in product["name"]:
            return "护肤品/次抛精华/修护精华"
        return f"护肤品/精华液/{effect or '修护精华'}"
    elif "面膜" in cat_raw or "面膜" in product["name"]:
        return f"护肤品/面膜/{effect or '修护面膜'}"
    elif "面霜" in cat_raw or "面霜" in product["name"] or "霜" in product["name"]:
        return f"护肤品/面霜/{effect or '滋润面霜'}"
    elif "眼霜" in cat_raw or "眼霜" in product["name"]:
        return f"护肤品/眼霜/{effect or '修护眼霜'}"
    elif "水" in cat_raw or "乳" in cat_raw or "套组" in product["name"]:
        return f"护肤品/水乳/{effect or '保湿套组'}"
    elif "防晒" in product["name"]:
        return "护肤品/防晒/防晒霜"
    elif "卸妆" in product["name"]:
        return "洁面/卸妆/卸妆产品"
    elif "洁面" in product["name"] or "洗面" in product["name"]:
        return "洁面/洁面乳/温和洁面"
    elif any(kw in product["name"] for kw in ["粉底", "口红", "唇", "眉", "睫毛", "腮红", "遮瑕", "定妆", "妆前"]):
        return f"彩妆/{cat_raw or '底妆'}/{effect or '持妆'}"
    elif "仪器" in product["name"] or "美容仪" in product["name"]:
        return "美容仪器/面部美容/美容仪"

    return session_category + "/" + (effect or "综合")


def escape_ts_string(s: str) -> str:
    """Escape string for TypeScript."""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")


# === Main Logic ===
def main():
    all_mock_products = []  # ProductListItem[]
    all_product_details = {}  # Record<string, ProductDetail>
    all_live_products = {}  # Record<string, product[]>
    item_id_counter = 1001

    for session in LIVE_SESSIONS:
        filepath = session["file"]
        live_id = session["liveId"]

        print(f"Parsing {filepath.name}...")

        if "精华小课堂" in filepath.name and "10.7" in filepath.name:
            raw_products = parse_jinghua_products(filepath)
        elif "38小课堂" in filepath.name:
            raw_products = parse_38_products(filepath)
        else:
            raw_products = parse_table_products(filepath)

        print(f"  Found {len(raw_products)} products, using all...")
        selected = raw_products  # 全部挂载
        print(f"  Using all {len(selected)} products")

        live_product_list = []

        for idx, product in enumerate(selected):
            item_code = f"{live_id}_{idx}"
            brand = extract_brand(product["name"])
            price_range = product.get("price_range", "300元-600元")
            price, coupon_price = parse_price_range(price_range)
            sale = generate_sales(price, brand)
            gmv = sale * coupon_price
            category_name = build_category_name(product, session["category"])
            shop_name = f"{brand}官方旗舰店"

            # Clean up brand for shop name
            if len(brand) > 10:
                short_brand = brand.split('·')[0].split('（')[0][:6]
                shop_name = f"{short_brand}官方旗舰店"

            # ProductListItem
            mock_product = {
                "itemId": item_id_counter,
                "liveId": live_id,
                "itemCode": item_code,
                "title": product["name"],
                "brandName": brand,
                "shopName": shop_name,
                "categoryName": category_name,
                "price": price,
                "couponPrice": coupon_price,
                "sale": sale,
                "gmv": gmv,
                "images": f"//img.alicdn.com/bao/uploaded/i1/{live_id.lower()}_{idx:03d}.jpg"
            }
            all_mock_products.append(mock_product)

            # ProductDetail
            highlight_text = product.get("highlight", f"{brand}品牌明星产品")
            ingredients_raw = product.get("ingredients_raw", "")
            script = product.get("script", "")
            promotion = product.get("promotion", "限时优惠")
            tags = product.get("tags", "")

            highlights = [
                {"category": "产品相关", "description": highlight_text[:80]},
            ]
            if ingredients_raw:
                highlights.append({"category": "产品相关", "description": f"核心成分：{ingredients_raw[:60]}"})
            if tags:
                highlights.append({"category": "产品相关", "description": f"适用人群：{tags}"})
            highlights.append({"category": "服务相关", "description": "正品保障，假一赔十"})
            highlights.append({"category": "服务相关", "description": "7天无理由退换货"})

            ingredients_list = []
            if ingredients_raw:
                ingredients_list.append({"name": "核心成分", "benefit": "主要功效成分", "concentration": ingredients_raw[:40], "source": brand})
            ingredients_list.append({"name": "品牌", "benefit": "品牌信息", "concentration": brand, "source": "官方"})
            ingredients_list.append({"name": "价位段", "benefit": "价格区间", "concentration": price_range, "source": "直播间"})
            effect = product.get("effect", product.get("category_raw", ""))
            if effect:
                ingredients_list.append({"name": "功效", "benefit": "核心功效", "concentration": effect, "source": "产品说明"})
            ingredients_list.append({"name": "保质期", "benefit": "未开封保质期", "concentration": "36个月", "source": "生产日期见包装"})

            detail = {
                "itemCode": item_code,
                "itemId": item_id_counter,
                "productName": product["name"],
                "productBasicName": product["name"].split("（")[0].split("【")[0][:15],
                "brand": brand,
                "categoryName": category_name,
                "shopName": shop_name,
                "mainImages": f"//img.alicdn.com/bao/uploaded/i1/{live_id.lower()}_{idx:03d}.jpg",
                "pricing": {
                    "originalPrice": f"¥{price}",
                    "currentPrice": f"¥{coupon_price}",
                    "discountInfo": f"直降{price - coupon_price}元" if price > coupon_price else None,
                    "promotionStrategy": promotion,
                    "priceText": script[:50] if script else "直播间专属价"
                },
                "sale": sale,
                "gmv": gmv,
                "highlights": highlights,
                "ingredients": ingredients_list,
                "confidenceScore": round(0.85 + random.random() * 0.13, 2),
                "status": "on_sale"
            }
            all_product_details[item_code] = detail

            # Live product entry
            start_time = 240 + idx * 720
            duration = 280 + idx * 35
            keywords_list = []
            if ingredients_raw:
                keywords_list.extend(ingredients_raw.split("、")[:2])
            keywords_list.append(brand)
            keywords_list.append(product.get("effect", "护肤")[:4])

            live_product_list.append({
                "itemCode": item_code,
                "itemIndex": idx,
                "productName": product["name"],
                "brand": brand,
                "startTime": start_time,
                "endTime": start_time + duration,
                "keywords": keywords_list[:4]
            })

            item_id_counter += 1

        all_live_products[live_id] = live_product_list

    # === Generate TypeScript files ===
    generate_products_ts(all_mock_products, all_product_details)
    generate_lives_ts(all_live_products)
    generate_dashboard_ts(all_mock_products)

    print(f"\nDone! Generated {len(all_mock_products)} products across {len(LIVE_SESSIONS)} live sessions.")


def generate_products_ts(products, details):
    """Generate src/mock/products.ts"""
    lines = []
    lines.append("import type { ProductListItem, ProductDetail, ProductLiveItem } from '@/types/product'")
    lines.append("")
    lines.append("// 生成商品列表数据 - 对齐 live_product_src 表")
    lines.append("// 数据来源：李佳琦直播间商品知识库")
    lines.append("export const mockProducts: ProductListItem[] = [")

    for p in products:
        lines.append(f"  {{ itemId: {p['itemId']}, liveId: '{p['liveId']}', itemCode: '{p['itemCode']}', title: '{escape_ts_string(p['title'])}', brandName: '{escape_ts_string(p['brandName'])}', shopName: '{escape_ts_string(p['shopName'])}', categoryName: '{escape_ts_string(p['categoryName'])}', price: {p['price']}, couponPrice: {p['couponPrice']}, sale: {p['sale']}, gmv: {p['gmv']}, images: '{p['images']}' }},")

    lines.append("]")
    lines.append("")

    # Product details map
    lines.append("// 商品详情映射表 - 对齐 ProductDetail 类型")
    lines.append("export const productDetailsMap: Record<string, ProductDetail> = {")

    for item_code, d in details.items():
        lines.append(f"  '{item_code}': {{")
        lines.append(f"    itemCode: '{item_code}',")
        lines.append(f"    itemId: {d['itemId']},")
        lines.append(f"    productName: '{escape_ts_string(d['productName'])}',")
        lines.append(f"    productBasicName: '{escape_ts_string(d['productBasicName'])}',")
        lines.append(f"    brand: '{escape_ts_string(d['brand'])}',")
        lines.append(f"    categoryName: '{escape_ts_string(d['categoryName'])}',")
        lines.append(f"    shopName: '{escape_ts_string(d['shopName'])}',")
        lines.append(f"    mainImages: '{d['mainImages']}',")
        lines.append(f"    pricing: {{")
        lines.append(f"      originalPrice: '{d['pricing']['originalPrice']}',")
        lines.append(f"      currentPrice: '{d['pricing']['currentPrice']}',")
        if d['pricing']['discountInfo']:
            lines.append(f"      discountInfo: '{escape_ts_string(d['pricing']['discountInfo'])}',")
        lines.append(f"      promotionStrategy: '{escape_ts_string(d['pricing']['promotionStrategy'])}',")
        lines.append(f"      priceText: '{escape_ts_string(d['pricing']['priceText'])}'")
        lines.append(f"    }},")
        lines.append(f"    sale: {d['sale']},")
        lines.append(f"    gmv: {d['gmv']},")

        # highlights
        lines.append(f"    highlights: [")
        for h in d['highlights']:
            lines.append(f"      {{ category: '{h['category']}', description: '{escape_ts_string(h['description'])}' }},")
        lines.append(f"    ],")

        # ingredients
        lines.append(f"    ingredients: [")
        for ing in d['ingredients']:
            lines.append(f"      {{ name: '{escape_ts_string(ing['name'])}', benefit: '{escape_ts_string(ing['benefit'])}', concentration: '{escape_ts_string(ing['concentration'])}', source: '{escape_ts_string(ing['source'])}' }},")
        lines.append(f"    ],")

        lines.append(f"    confidenceScore: {d['confidenceScore']},")
        lines.append(f"    status: '{d['status']}'")
        lines.append(f"  }},")

    lines.append("}")
    lines.append("")

    # getProductDetail function (keep original logic)
    lines.append("""// 获取商品详情
export function getProductDetail(itemCode: string): ProductDetail {
  if (productDetailsMap[itemCode]) {
    return productDetailsMap[itemCode]
  }

  // 从列表生成默认详情
  const product = mockProducts.find(p => p.itemCode === itemCode)
  if (!product) {
    return productDetailsMap['LIVE001_0']! // 默认返回第一个
  }

  return {
    itemCode: product.itemCode,
    itemId: product.itemId,
    productName: product.title,
    productBasicName: product.title.split(' ')[0],
    brand: product.brandName,
    categoryName: product.categoryName,
    shopName: product.shopName,
    mainImages: product.images,
    pricing: {
      originalPrice: `¥${product.price}`,
      currentPrice: `¥${product.couponPrice}`,
      discountInfo: product.price > product.couponPrice ? `直降${product.price - product.couponPrice}元` : undefined,
      promotionStrategy: '限时优惠',
      priceText: '直播间价格'
    },
    sale: product.sale,
    gmv: product.gmv,
    highlights: [
      { category: '产品相关', description: `${product.brandName}品牌明星产品` },
      { category: '产品相关', description: '专业配方，温和有效' },
      { category: '服务相关', description: '官方正品，品质保证' },
      { category: '服务相关', description: '全网热销，口碑之选' }
    ],
    ingredients: [
      { name: '品牌', benefit: '品牌信息', concentration: product.brandName, source: '官方' },
      { name: '类目', benefit: '产品分类', concentration: product.categoryName, source: '平台' },
      { name: '产地', benefit: '生产地', concentration: '中国', source: '官方' },
      { name: '保质期', benefit: '未开封保质期', concentration: '36个月', source: '生产日期见包装' }
    ],
    confidenceScore: 0.85,
    status: 'on_sale'
  }
}

// 获取商品关联的直播列表
export function getProductRelatedLives(itemCode: string): ProductLiveItem[] {
  const product = mockProducts.find(p => p.itemCode === itemCode)
  if (!product) return []

  return [
    {
      liveId: product.liveId,
      influencerId: 'INF001',
      anchor: '李佳琦',
      startTime: 284,
      endTime: 599,
      duration: 315,
      mentions: 12,
      keywords: ['好用', '推荐', '必买', '性价比']
    }
  ]
}
""")

    output_path = OUTPUT_DIR / "products.ts"
    output_path.write_text('\n'.join(lines), encoding='utf-8')
    print(f"  Written {output_path}")


def generate_lives_ts(all_live_products):
    """Generate src/mock/lives.ts"""
    lines = []
    lines.append("import type { LiveListItem, LiveDetail, LiveProductItem, ReturnMention } from '@/types/live'")
    lines.append("import type { ProductLiveItem } from '@/types/product'")
    lines.append("")
    lines.append("// 生成直播列表数据（对齐 live_overview 表）")
    lines.append("// 数据来源：李佳琦2025双十一小课堂 + 2026年38焕新周小课堂")
    lines.append("export const mockLives: LiveListItem[] = [")

    for session in LIVE_SESSIONS:
        s = session
        lines.append(f"  {{ liveId: '{s['liveId']}', influencerId: 'INF001', anchor: '李佳琦', totalDuration: {s['duration']}, viewCount: {s['viewCount']}, viewCountChange: {round(random.uniform(3, 15), 1)}, sales: {s['sales']}, salesChange: {round(random.uniform(5, 18), 1)}, saleAmount: {s['saleAmount']}, saleAmountChange: {round(random.uniform(8, 20), 1)}, createdAt: '{s['date']}' }},")

    lines.append("]")
    lines.append("")

    # Live details map
    lines.append("// 直播详情映射表（对齐 live_overview 完整字段）")
    lines.append("export const liveDetailsMap: Record<string, LiveDetail> = {")

    for session in LIVE_SESSIONS:
        s = session
        lid = s["liveId"]
        vc = s["viewCount"]
        sales = s["sales"]
        sa = s["saleAmount"]
        total_products = len(all_live_products.get(lid, []))

        lines.append(f"  '{lid}': {{")
        lines.append(f"    liveId: '{lid}',")
        lines.append(f"    influencerId: 'INF001',")
        lines.append(f"    anchor: '李佳琦',")
        lines.append(f"    createdAt: '{s['displayDate']}',")
        lines.append(f"    totalProducts: {total_products},")
        lines.append(f"    totalDuration: {s['duration']},")
        lines.append(f"    totalJoinCount: {{ value: {int(vc * 0.21)}, change: {round(random.uniform(2, 12), 1)} }},")
        lines.append(f"    viewCount: {{ value: {vc}, change: {round(random.uniform(3, 15), 1)} }},")
        lines.append(f"    avgPrice: {{ value: {round(sa / max(sales, 1), 2)}, change: {round(random.uniform(-0.5, 0.5), 2)} }},")
        lines.append(f"    sales: {{ value: {sales}, change: {round(random.uniform(5, 18), 1)} }},")
        lines.append(f"    saleAmount: {{ value: {sa}, change: {round(random.uniform(8, 20), 1)} }},")
        lines.append(f"    goBuyUv: {{ value: {int(sales * 0.08)}, change: {round(random.uniform(5, 12), 1)} }},")
        lines.append(f"    goBuyCount: {{ value: {int(sales * 0.1)}, change: {round(random.uniform(7, 15), 1)} }},")
        like_count = int(vc * 1.2)
        comment_count = int(vc * 0.002)
        lines.append(f"    likeCount: {{ value: {like_count}, change: {round(random.uniform(20, 45), 1)} }},")
        lines.append(f"    commentCount: {{ value: {comment_count}, change: {round(random.uniform(15, 35), 1)} }},")
        lines.append(f"    fansGrowth: {{ value: {random.randint(1500, 4000)}, change: {round(random.uniform(50, 160), 1)} }},")
        lines.append(f"    itemCount: {{ value: {total_products}, change: {round(random.uniform(2, 8), 1)} }},")
        lines.append(f"    gmvItemCountRatio: {{ value: {int(sa / max(total_products, 1))}, change: {round(random.uniform(3, 12), 1)} }},")
        interaction = like_count + comment_count
        lines.append(f"    interaction: {{ value: {interaction}, change: {round(random.uniform(25, 45), 1)}, detail: {{ likeCount: {like_count}, commentCount: {comment_count} }} }}")
        lines.append(f"  }},")

    lines.append("}")
    lines.append("")

    # getLiveDetail function
    lines.append("""// 获取直播详情
export function getLiveDetail(liveId: string): LiveDetail {
  if (liveDetailsMap[liveId]) {
    return liveDetailsMap[liveId]
  }

  const live = mockLives.find(l => l.liveId === liveId)
  if (!live) {
    return liveDetailsMap['LIVE001']!
  }

  const seed = parseInt(liveId.replace('LIVE', ''), 10) || 1
  const interactionValue = Math.round(live.viewCount * 0.2)

  return {
    liveId: live.liveId,
    influencerId: live.influencerId,
    anchor: live.anchor,
    createdAt: new Date(live.createdAt).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    totalProducts: 50 + (seed % 40),
    totalDuration: live.totalDuration,
    totalJoinCount: { value: Math.round(live.viewCount * 0.21), change: Math.round((Math.random() * 15 - 3) * 10) / 10 },
    viewCount: { value: live.viewCount, change: live.viewCountChange },
    avgPrice: { value: 150 + (seed % 150), change: Math.round((Math.random() * 1) * 100) / 100 },
    sales: { value: live.sales, change: live.salesChange },
    saleAmount: { value: live.saleAmount, change: live.saleAmountChange },
    goBuyUv: { value: Math.round(live.sales * 0.08), change: Math.round((Math.random() * 12) * 10) / 10 },
    goBuyCount: { value: Math.round(live.sales * 0.1), change: Math.round((Math.random() * 15) * 10) / 10 },
    likeCount: { value: Math.round(live.viewCount * 1.2), change: Math.round((Math.random() * 50) * 10) / 10 },
    commentCount: { value: Math.round(live.viewCount * 0.002), change: Math.round((Math.random() * 30) * 10) / 10 },
    fansGrowth: { value: 500 + (seed * 123) % 3000, change: Math.round((Math.random() * 150) * 10) / 10 },
    itemCount: { value: 50 + (seed % 50), change: Math.round((Math.random() * 10) * 10) / 10 },
    gmvItemCountRatio: { value: Math.round(live.saleAmount / (50 + (seed % 40))), change: Math.round((Math.random() * 12 - 3) * 10) / 10 },
    interaction: { value: interactionValue, change: Math.round((Math.random() * 40) * 10) / 10, detail: { likeCount: Math.round(interactionValue * 0.98), commentCount: Math.round(interactionValue * 0.02) } }
  }
}
""")

    # allLiveProducts
    lines.append("// 直播商品列表（内部数据源）")
    lines.append("const allLiveProducts: Record<string, { itemCode: string; itemIndex: number; productName: string; brand: string; startTime: number; endTime: number; keywords: string[] }[]> = {")

    for live_id, products in all_live_products.items():
        lines.append(f"  '{live_id}': [")
        for p in products:
            kw_str = ", ".join([f"'{escape_ts_string(k)}'" for k in p['keywords']])
            lines.append(f"    {{ itemCode: '{p['itemCode']}', itemIndex: {p['itemIndex']}, productName: '{escape_ts_string(p['productName'])}', brand: '{escape_ts_string(p['brand'])}', startTime: {p['startTime']}, endTime: {p['endTime']}, keywords: [{kw_str}] }},")
        lines.append(f"  ],")

    lines.append("}")
    lines.append("")

    # getLiveProducts function
    lines.append("""// 根据 liveId 获取直播商品
export function getLiveProducts(liveId: string): LiveProductItem[] {
  const products = allLiveProducts[liveId]
  if (!products) return []

  return products.map(p => ({
    itemCode: p.itemCode,
    itemIndex: p.itemIndex,
    productName: p.productName,
    productBasicName: (p.productName || '').split('（')[0]!.split('【')[0]!.substring(0, 15),
    brand: p.brand,
    startTime: p.startTime,
    endTime: p.endTime,
    duration: p.endTime - p.startTime,
    mentions: 2 + (p.itemIndex % 5),
    keywords: p.keywords
  }))
}
""")

    # Transcript templates and getLiveProductDetail (keep original structure)
    lines.append("""// 截图描述模板
const screenshotDescs = [
  '主播手持产品展示正面外观',
  '近距离展示产品包装细节和成分表',
  '打开产品展示内部质地和颜色',
  '主播在手背试用产品展示效果',
  '展示价格标签和促销信息'
]

// 转录文本模板库
const transcriptTemplates = [
  (name: string, brand: string) =>
    `[李佳琦] 好，接下来给大家带来的这款${name}，是${brand}的明星产品。\\n[李佳琦] 我自己用了大概三个月，真的能感受到效果。\\n[李佳琦] 你看这个质地，非常轻薄，上脸完全不会有负担感。\\n[助播] 对，后台数据显示这款已经卖了两千多单了。\\n[李佳琦] 成分表大家可以看一下，核心成分浓度都标注得很清楚。\\n[助播] 价格链接已经挂好了，大家现在下单还有赠品。`,
  (name: string, brand: string) =>
    `[李佳琦] 来来来，这个${name}必须给大家安利一下。\\n[李佳琦] ${brand}不用我多说了吧，大牌品质，用着放心。\\n[助播] 我们直播间今天的价格是全网最低的。\\n[李佳琦] 你看我今天的状态，就是用了这款产品。\\n[李佳琦] 敏感肌的姐妹也完全可以放心使用，非常温和。\\n[助播] 库存不多了，想要的姐妹赶紧拍。`,
  (name: string, brand: string) =>
    `[李佳琦] 这款${name}我已经回购了不知道多少次了。\\n[助播] 对，我们团队的人也都在用，真的好用。\\n[李佳琦] ${brand}的研发实力大家是知道的，专利技术。\\n[李佳琦] 看一下这个对比图，使用前和使用后差别非常明显。\\n[助播] 链接上架了，今天买两件还有额外折扣。\\n[李佳琦] 性价比真的太高了，错过今天就恢复原价了。`
]

const returnTranscriptTemplates = [
  (name: string) =>
    `[李佳琦] 再次给大家推荐一下刚才的${name}。\\n[李佳琦] 看评论区好多人在问，说明真的是好东西。\\n[助播] 对，刚才有姐妹说加购了没付款，赶紧去付。\\n[李佳琦] 最后补一波库存，卖完就真的没有了。`,
  (name: string) =>
    `[助播] 佳琦，好多人让你再讲一下${name}。\\n[李佳琦] 好的好的，这款真的是今天的爆品。\\n[李佳琦] 刚才没听到的姐妹注意了，这个价格今天过后就没了。\\n[助播] 我看后台又追加了一批库存。`
]

// 产品亮点模板库
const highlightTemplates = [
  { category: '产品相关', description: '核心成分浓度高，效果显著' },
  { category: '产品相关', description: '质地轻薄易吸收，不黏腻' },
  { category: '使用相关', description: '适合多种肤质，敏感肌可用' },
  { category: '使用相关', description: '早晚均可使用，方便日常护理' },
  { category: '服务相关', description: '支持七天无理由退换货' }
]

// 产品参数模板库
const ingredientTemplates = [
  { name: '产品规格', value: '正装' },
  { name: '产品类型', value: '精华液' },
  { name: '适用肤质', value: '所有肤质' },
  { name: '保质期', value: '36个月' },
  { name: '产地', value: '中国' }
]

// 获取直播商品详情（基于切片结构）
export function getLiveProductDetail(liveId: string, itemCode: string) {
  const live = mockLives.find(l => l.liveId === liveId)
  const liveProds = allLiveProducts[liveId] || []
  const product = liveProds.find(p => p.itemCode === itemCode)

  const anchor = '李佳琦'
  const influencerId = 'INF001'
  const liveDate = live ? new Date(live.createdAt) : new Date('2025-10-07')
  const totalDuration = live?.totalDuration || 14520

  const liveNum = parseInt(liveId.replace('LIVE', ''), 10) || 1
  const skuNum = parseInt(itemCode.split('_')[1] || '0', 10)
  const seed = liveNum * 100 + skuNum

  const productName = product?.productName || '精华液'
  const productBasicName = (productName || '').split('（')[0]!.split('【')[0]!.substring(0, 15)
  const brand = product?.brand || '品牌'
  const keywords = product?.keywords || ['精华', '护肤', '修护']

  // 主讲切片
  const seg1Start = 240 + (seed % 20) * 180
  const seg1Duration = 200 + (seed % 8) * 35
  const seg1End = seg1Start + seg1Duration
  const seg1Ratio1 = 50 + (seed % 20)
  const seg1Ratio2 = 100 - seg1Ratio1
  const seg1Template = transcriptTemplates[seed % transcriptTemplates.length]!
  const seg1Text = seg1Template(productName, brand)
  const seg1Lines = seg1Text.split('\\n').length

  const screenshotCount = 3 + (seed % 4)
  const screenshots = Array.from({ length: screenshotCount }, (_, i) => ({
    path: `screenshot_${String(i + 1).padStart(3, '0')}.jpg`,
    description: screenshotDescs[i % screenshotDescs.length]!,
    timestamp: seg1Start + Math.floor((seg1Duration / screenshotCount) * i)
  }))

  const segment1 = {
    segmentId: `seg_${String(seed).padStart(3, '0')}_1`,
    title: '切片 1: 首次讲解',
    startTime: seg1Start,
    endTime: seg1End,
    duration: seg1Duration,
    confidence: (90 + (seed % 11)) / 100,
    mainSpeakerRatio: seg1Ratio1 / 100,
    speakers: [
      { name: '李佳琦', ratio: seg1Ratio1 },
      { name: '助播', ratio: seg1Ratio2 }
    ],
    transcriptText: seg1Text,
    transcriptLines: seg1Lines,
    keyPhrases: keywords,
    returnMentions: [] as ReturnMention[]
  }

  const segments = [segment1]
  let totalSegDuration = seg1Duration

  const hasReturnMention = seed % 5 !== 0
  if (hasReturnMention) {
    const seg2Start = seg1End + 1800 + (seed % 3600)
    const seg2Duration = 100 + (seed % 6) * 25
    const seg2End = seg2Start + seg2Duration
    const seg2Ratio1 = 30 + (seed % 30)
    const seg2Ratio2 = 100 - seg2Ratio1
    const rmTemplate = returnTranscriptTemplates[seed % returnTranscriptTemplates.length]!
    const rmText = rmTemplate(productName)
    const rmLines = rmText.split('\\n').length

    const returnMention: ReturnMention = {
      mentionId: `mention_${seed}`,
      productName,
      productBasicName,
      startTime: seg2Start,
      endTime: seg2End,
      transcriptText: rmText,
      keyPhrases: keywords.slice(0, 2),
      confidence: (95 + (seed % 6)) / 100,
      mainSpeakerRatio: seg2Ratio1 / 100,
      speakers: [
        { name: '李佳琦', ratio: seg2Ratio1 },
        { name: '助播', ratio: seg2Ratio2 }
      ],
      duration: seg2Duration
    }

    segments.push({
      segmentId: `seg_${String(seed).padStart(3, '0')}_2`,
      title: '切片 2: 再次提及',
      startTime: seg2Start,
      endTime: seg2End,
      duration: seg2Duration,
      confidence: returnMention.confidence,
      mainSpeakerRatio: seg2Ratio1 / 100,
      speakers: [
        { name: '李佳琦', ratio: seg2Ratio1 },
        { name: '助播', ratio: seg2Ratio2 }
      ],
      transcriptText: rmText,
      transcriptLines: rmLines,
      keyPhrases: keywords.slice(0, 2),
      returnMentions: [returnMention]
    })
    totalSegDuration += seg2Duration
  }

  return {
    liveId,
    influencerId,
    anchor,
    liveStartTime: liveDate.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    totalDuration,
    itemCode,
    itemIndex: product?.itemIndex || 0,
    productName,
    productBasicName,
    brand,
    category: `护肤品 > ${brand}`,
    pricing: {
      originalPrice: `¥${500 + (skuNum % 10) * 100}`,
      currentPrice: `¥${400 + (skuNum % 10) * 80}`,
      discountInfo: seed % 3 === 0 ? '直播间专享优惠' : undefined,
      promotionStrategy: '限时特惠，库存有限'
    },
    status: 'on_sale' as const,
    totalMentions: segments.length,
    totalSegmentDuration: totalSegDuration,
    highlights: highlightTemplates,
    ingredients: ingredientTemplates,
    screenshots,
    videos: [
      { path: '切片1_首次讲解.mp4', duration: seg1Duration },
      ...(hasReturnMention ? [{ path: '切片2_再次提及.mp4', duration: 100 + (seed % 6) * 25 }] : []),
      { path: '产品亮点集锦.mp4', duration: 60 + (seed % 60) }
    ],
    segments
  }
}

// 商品关联直播
export function getProductRelatedLives(itemCode: string): ProductLiveItem[] {
  // Find which live sessions contain this product
  const lives: ProductLiveItem[] = []
  for (const [liveId, products] of Object.entries(allLiveProducts)) {
    const product = products.find(p => p.itemCode === itemCode)
    if (product) {
      lives.push({
        liveId,
        influencerId: 'INF001',
        anchor: '李佳琦',
        startTime: product.startTime,
        endTime: product.endTime,
        duration: product.endTime - product.startTime,
        mentions: 2 + (product.itemIndex % 5),
        keywords: product.keywords
      })
    }
  }
  return lives.length > 0 ? lives : [{
    liveId: 'LIVE001',
    influencerId: 'INF001',
    anchor: '李佳琦',
    startTime: 284,
    endTime: 599,
    duration: 315,
    mentions: 3,
    keywords: ['护肤', '推荐']
  }]
}
""")

    output_path = OUTPUT_DIR / "lives.ts"
    output_path.write_text('\n'.join(lines), encoding='utf-8')
    print(f"  Written {output_path}")


def generate_dashboard_ts(products):
    """Generate src/mock/dashboard.ts"""
    # Calculate real stats from products
    total_products = len(products)
    total_sales = sum(p['sale'] for p in products)
    total_gmv = sum(p['gmv'] for p in products)

    # Category distribution
    categories = {}
    for p in products:
        cat = p['categoryName'].split('/')[1] if '/' in p['categoryName'] else p['categoryName'].split('/')[0]
        categories[cat] = categories.get(cat, 0) + 1

    sorted_cats = sorted(categories.items(), key=lambda x: -x[1])
    colors = ['#FF3B30', '#0A0A0A', '#666666', '#999999', '#CCCCCC', '#E5E5E5', '#F0F0F0']

    lines = []
    lines.append("import type { LiveSession } from '@/types/live'")
    lines.append("")
    lines.append("type MetricType = 'sales' | 'volume' | 'products' | 'lives'")
    lines.append("")

    # Chart data generation function (keep original)
    lines.append("""// 生成连续日期数据
function generateChartData(
  startDate: string,
  days: number,
  baseValue: number,
  growth: number,
  volatility: number
): { date: string; rawDate: string; value: number }[] {
  const data: { date: string; rawDate: string; value: number }[] = []
  const start = new Date(startDate)

  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const rawDate = d.toISOString().slice(0, 10)
    const dateLabel = `${month}月${day}日`

    const trend = baseValue * (1 + growth * i / days)
    const noise = trend * volatility * (Math.sin(i * 1.7) * 0.6 + Math.cos(i * 2.3) * 0.4)
    const value = Math.round(trend + noise)

    data.push({ date: dateLabel, rawDate, value })
  }

  return data
}
""")

    lines.append("// 30天图表数据（对齐2025双十一+2026-38期间）")
    lines.append("export const chartDataByMetric: Record<MetricType, { date: string; rawDate: string; value: number }[]> = {")
    lines.append(f"  sales: generateChartData('2025-09-15', 30, {int(total_gmv / 30)}, 0.6, 0.15),")
    lines.append(f"  volume: generateChartData('2025-09-15', 30, {int(total_sales / 30)}, 0.35, 0.12),")
    lines.append(f"  products: generateChartData('2025-09-15', 30, {total_products}, 0.18, 0.05),")
    lines.append(f"  lives: generateChartData('2025-09-15', 30, 7, 0.2, 0.08)")
    lines.append("}")
    lines.append("")

    lines.append("// 指标卡片数据")
    lines.append("export const metricsData = {")
    lines.append(f"  products: {{ value: {total_products}, change: 5.2, label: '覆盖商品数量' }},")
    lines.append(f"  lives: {{ value: 7, change: 12.8, label: '覆盖直播数量' }},")
    lines.append(f"  sales: {{ value: {total_gmv}, change: 8.5, label: '销售总额' }},")
    lines.append(f"  volume: {{ value: {total_sales}, change: -2.3, label: '总销量' }}")
    lines.append("}")
    lines.append("")

    # Pie chart
    lines.append("// 类目分布饼图数据")
    lines.append("export const pieChartData = [")
    for cat_name, count in sorted_cats[:5]:
        pct = round(count / total_products * 100)
        lines.append(f"  {{ category: '{cat_name}', value: {pct}, percentage: {pct} }},")
    lines.append("]")
    lines.append("")

    # Category data
    lines.append("// 商品类目数据")
    lines.append("export const categoryData = [")
    for idx, (cat_name, count) in enumerate(sorted_cats[:5]):
        pct = round(count / total_products * 100)
        color = colors[idx] if idx < len(colors) else '#CCCCCC'
        lines.append(f"  {{ name: '{cat_name}', count: {count}, percentage: {pct}, color: '{color}' }},")
    lines.append("]")
    lines.append("")

    # Recent lives
    lines.append("// 最近直播数据")
    lines.append("export const recentLives: LiveSession[] = [")
    for s in LIVE_SESSIONS:
        lines.append(f"  {{ id: '{s['liveId']}', anchor: '李佳琦', duration: {s['duration'] // 60}, gmv: {s['saleAmount']}, date: '{s['date'][:10]}' }},")
    lines.append("]")

    output_path = OUTPUT_DIR / "dashboard.ts"
    output_path.write_text('\n'.join(lines), encoding='utf-8')
    print(f"  Written {output_path}")


if __name__ == '__main__':
    main()
