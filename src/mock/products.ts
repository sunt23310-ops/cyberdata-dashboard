import type { ProductListItem, ProductDetail, ProductLiveItem } from '@/types/product'

// 生成商品列表数据 - 对齐 live_product_src 表
export const mockProducts: ProductListItem[] = [
  { itemId: 1001, liveId: 'LIVE001', itemCode: 'LIVE001_0', title: '兰蔻小黑瓶精华肌底液 100ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '护肤品/精华液/肌底液', price: 1080, couponPrice: 899, sale: 156780, gmv: 140944220, images: '//img.alicdn.com/bao/uploaded/i1/lancome_001.jpg' },
  { itemId: 1002, liveId: 'LIVE001', itemCode: 'LIVE001_1', title: '欧莱雅复颜玻尿酸水光充盈导入精华液', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '护肤品/精华液/玻尿酸', price: 339, couponPrice: 259, sale: 89234, gmv: 23111606, images: '//img.alicdn.com/bao/uploaded/i1/loreal_001.jpg' },
  { itemId: 1003, liveId: 'LIVE002', itemCode: 'LIVE002_0', title: '雅诗兰黛特润修护肌透精华露 50ml', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '护肤品/精华液/修护精华', price: 1150, couponPrice: 980, sale: 67890, gmv: 66532200, images: '//img.alicdn.com/bao/uploaded/i1/estee_001.jpg' },
  { itemId: 1004, liveId: 'LIVE002', itemCode: 'LIVE002_1', title: '潘婷3分钟奇迹护发素 深层滋养型', brandName: '潘婷', shopName: '潘婷官方旗舰店', categoryName: '洗护/护发素/滋养型', price: 69, couponPrice: 49, sale: 234567, gmv: 11493783, images: '//img.alicdn.com/bao/uploaded/i1/pantene_001.jpg' },
  { itemId: 1005, liveId: 'LIVE003', itemCode: 'LIVE003_0', title: '安耐晒金瓶防晒霜 SPF50+ PA++++', brandName: '安耐晒', shopName: '安耐晒海外旗舰店', categoryName: '防晒/防晒霜/物理防晒', price: 298, couponPrice: 248, sale: 178900, gmv: 44367200, images: '//img.alicdn.com/bao/uploaded/i1/anessa_001.jpg' },
  { itemId: 1006, liveId: 'LIVE003', itemCode: 'LIVE003_1', title: '欧莱雅清润葡萄籽膜力水 补水保湿', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '护肤品/化妆水/保湿水', price: 189, couponPrice: 139, sale: 123456, gmv: 17160384, images: '//img.alicdn.com/bao/uploaded/i1/loreal_002.jpg' },
  { itemId: 1007, liveId: 'LIVE004', itemCode: 'LIVE004_0', title: '兰蔻清滢柔肤水 粉水 400ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '护肤品/化妆水/柔肤水', price: 420, couponPrice: 360, sale: 98765, gmv: 35555400, images: '//img.alicdn.com/bao/uploaded/i1/lancome_002.jpg' },
  { itemId: 1008, liveId: 'LIVE004', itemCode: 'LIVE004_1', title: '雅诗兰黛红石榴鲜活亮采洁面乳', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '洁面/洁面乳/深层清洁', price: 320, couponPrice: 268, sale: 56789, gmv: 15219452, images: '//img.alicdn.com/bao/uploaded/i1/estee_002.jpg' },
  { itemId: 1009, liveId: 'LIVE005', itemCode: 'LIVE005_0', title: '潘婷乳液修护洗发露 丝质顺滑型', brandName: '潘婷', shopName: '潘婷官方旗舰店', categoryName: '洗护/洗发水/修护型', price: 59, couponPrice: 39, sale: 345678, gmv: 13481442, images: '//img.alicdn.com/bao/uploaded/i1/pantene_002.jpg' },
  { itemId: 1010, liveId: 'LIVE005', itemCode: 'LIVE005_1', title: '安耐晒小金瓶防晒喷雾 SPF50+', brandName: '安耐晒', shopName: '安耐晒海外旗舰店', categoryName: '防晒/防晒喷雾/高倍防晒', price: 198, couponPrice: 168, sale: 145678, gmv: 24473904, images: '//img.alicdn.com/bao/uploaded/i1/anessa_002.jpg' },
  { itemId: 1011, liveId: 'LIVE006', itemCode: 'LIVE006_0', title: '欧莱雅玻尿酸安瓶精华面膜 5片装', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '面膜/贴片面膜/玻尿酸', price: 119, couponPrice: 89, sale: 267890, gmv: 23842210, images: '//img.alicdn.com/bao/uploaded/i1/loreal_003.jpg' },
  { itemId: 1012, liveId: 'LIVE006', itemCode: 'LIVE006_1', title: '兰蔻极光水精华 30ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '护肤品/精华液/提亮精华', price: 860, couponPrice: 720, sale: 45678, gmv: 32888160, images: '//img.alicdn.com/bao/uploaded/i1/lancome_003.jpg' },
  { itemId: 1013, liveId: 'LIVE007', itemCode: 'LIVE007_0', title: '雅诗兰黛DW持妆粉底液 30ml', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '彩妆/粉底液/持妆型', price: 480, couponPrice: 420, sale: 78901, gmv: 33138420, images: '//img.alicdn.com/bao/uploaded/i1/estee_003.jpg' },
  { itemId: 1014, liveId: 'LIVE007', itemCode: 'LIVE007_1', title: '潘婷氨基酸洗发水 无硅油配方', brandName: '潘婷', shopName: '潘婷官方旗舰店', categoryName: '洗护/洗发水/无硅油', price: 89, couponPrice: 69, sale: 198765, gmv: 13714785, images: '//img.alicdn.com/bao/uploaded/i1/pantene_003.jpg' },
  { itemId: 1015, liveId: 'LIVE008', itemCode: 'LIVE008_0', title: '欧莱雅男士劲能醒肤露', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '护肤品/男士护肤/醒肤露', price: 149, couponPrice: 109, sale: 87654, gmv: 9554286, images: '//img.alicdn.com/bao/uploaded/i1/loreal_004.jpg' },
  { itemId: 1016, liveId: 'LIVE008', itemCode: 'LIVE008_1', title: '兰蔻菁纯臻颜精华眼霜 15ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '护肤品/眼霜/抗皱眼霜', price: 680, couponPrice: 580, sale: 34567, gmv: 20048860, images: '//img.alicdn.com/bao/uploaded/i1/lancome_004.jpg' },
  { itemId: 1017, liveId: 'LIVE009', itemCode: 'LIVE009_0', title: '安耐晒儿童防晒乳 SPF34', brandName: '安耐晒', shopName: '安耐晒海外旗舰店', categoryName: '防晒/儿童防晒/温和防晒', price: 178, couponPrice: 148, sale: 56234, gmv: 8322632, images: '//img.alicdn.com/bao/uploaded/i1/anessa_003.jpg' },
  { itemId: 1018, liveId: 'LIVE009', itemCode: 'LIVE009_1', title: '雅诗兰黛沁水粉底液 SPF20', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '彩妆/粉底液/水润型', price: 520, couponPrice: 460, sale: 43210, gmv: 19876600, images: '//img.alicdn.com/bao/uploaded/i1/estee_004.jpg' },
  { itemId: 1019, liveId: 'LIVE010', itemCode: 'LIVE010_0', title: '欧莱雅紫熨斗眼霜 玻尿酸抗皱', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '护肤品/眼霜/抗皱眼霜', price: 239, couponPrice: 189, sale: 112345, gmv: 21233205, images: '//img.alicdn.com/bao/uploaded/i1/loreal_005.jpg' },
  { itemId: 1020, liveId: 'LIVE010', itemCode: 'LIVE010_1', title: '潘婷丝质顺滑润发精华素', brandName: '潘婷', shopName: '潘婷官方旗舰店', categoryName: '洗护/护发素/顺滑型', price: 45, couponPrice: 35, sale: 456789, gmv: 15987615, images: '//img.alicdn.com/bao/uploaded/i1/pantene_004.jpg' },
  { itemId: 1021, liveId: 'LIVE011', itemCode: 'LIVE011_0', title: 'SK-II神仙水护肤精华露 230ml', brandName: 'SK-II', shopName: 'SK-II官方旗舰店', categoryName: '护肤品/精华液/神仙水', price: 1590, couponPrice: 1290, sale: 89012, gmv: 114845480, images: '//img.alicdn.com/bao/uploaded/i1/skii_001.jpg' },
  { itemId: 1022, liveId: 'LIVE011', itemCode: 'LIVE011_1', title: '资生堂红腰子精华 75ml', brandName: '资生堂', shopName: '资生堂官方旗舰店', categoryName: '护肤品/精华液/修护精华', price: 890, couponPrice: 760, sale: 67890, gmv: 51596400, images: '//img.alicdn.com/bao/uploaded/i1/shiseido_001.jpg' },
  { itemId: 1023, liveId: 'LIVE012', itemCode: 'LIVE012_0', title: '娇韵诗双萃精华 30ml', brandName: '娇韵诗', shopName: '娇韵诗官方旗舰店', categoryName: '护肤品/精华液/抗老精华', price: 780, couponPrice: 650, sale: 45678, gmv: 29690700, images: '//img.alicdn.com/bao/uploaded/i1/clarins_001.jpg' },
  { itemId: 1024, liveId: 'LIVE012', itemCode: 'LIVE012_1', title: '倩碧黄油特效润肤露 125ml', brandName: '倩碧', shopName: '倩碧官方旗舰店', categoryName: '护肤品/乳液/保湿乳', price: 320, couponPrice: 268, sale: 123456, gmv: 33086208, images: '//img.alicdn.com/bao/uploaded/i1/clinique_001.jpg' },
  { itemId: 1025, liveId: 'LIVE013', itemCode: 'LIVE013_0', title: '海蓝之谜精粹水 150ml', brandName: '海蓝之谜', shopName: '海蓝之谜官方旗舰店', categoryName: '护肤品/化妆水/精粹水', price: 1450, couponPrice: 1280, sale: 23456, gmv: 30023680, images: '//img.alicdn.com/bao/uploaded/i1/lamer_001.jpg' },
  { itemId: 1026, liveId: 'LIVE013', itemCode: 'LIVE013_1', title: 'SK-II大红瓶面霜 80g', brandName: 'SK-II', shopName: 'SK-II官方旗舰店', categoryName: '护肤品/面霜/抗老面霜', price: 1380, couponPrice: 1180, sale: 34567, gmv: 40789060, images: '//img.alicdn.com/bao/uploaded/i1/skii_002.jpg' },
  { itemId: 1027, liveId: 'LIVE014', itemCode: 'LIVE014_0', title: '资生堂悦薇珀翡紧颜精华液', brandName: '资生堂', shopName: '资生堂官方旗舰店', categoryName: '护肤品/精华液/紧致精华', price: 980, couponPrice: 850, sale: 28901, gmv: 24565850, images: '//img.alicdn.com/bao/uploaded/i1/shiseido_002.jpg' },
  { itemId: 1028, liveId: 'LIVE014', itemCode: 'LIVE014_1', title: '娇韵诗纤体精华露 200ml', brandName: '娇韵诗', shopName: '娇韵诗官方旗舰店', categoryName: '护肤品/身体护理/纤体精华', price: 580, couponPrice: 480, sale: 56789, gmv: 27258720, images: '//img.alicdn.com/bao/uploaded/i1/clarins_002.jpg' },
  { itemId: 1029, liveId: 'LIVE015', itemCode: 'LIVE015_0', title: '倩碧三步曲洁面皂 150g', brandName: '倩碧', shopName: '倩碧官方旗舰店', categoryName: '洁面/洁面皂/温和洁面', price: 180, couponPrice: 150, sale: 189012, gmv: 28351800, images: '//img.alicdn.com/bao/uploaded/i1/clinique_002.jpg' },
  { itemId: 1030, liveId: 'LIVE015', itemCode: 'LIVE015_1', title: '海蓝之谜修护精萃液 150ml', brandName: '海蓝之谜', shopName: '海蓝之谜官方旗舰店', categoryName: '护肤品/精华液/修护精华', price: 2100, couponPrice: 1850, sale: 12345, gmv: 22838250, images: '//img.alicdn.com/bao/uploaded/i1/lamer_002.jpg' },
  { itemId: 1031, liveId: 'LIVE016', itemCode: 'LIVE016_0', title: '兰蔻新立体塑颜眼霜 15ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '护肤品/眼霜/紧致眼霜', price: 720, couponPrice: 620, sale: 45678, gmv: 28320360, images: '//img.alicdn.com/bao/uploaded/i1/lancome_005.jpg' },
  { itemId: 1032, liveId: 'LIVE016', itemCode: 'LIVE016_1', title: '欧莱雅金致臻颜花蜜精华油', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '护肤品/精华油/滋养精华', price: 299, couponPrice: 249, sale: 78901, gmv: 19646349, images: '//img.alicdn.com/bao/uploaded/i1/loreal_006.jpg' },
  { itemId: 1033, liveId: 'LIVE017', itemCode: 'LIVE017_0', title: '雅诗兰黛多效智研眼部精华霜', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '护肤品/眼霜/多效眼霜', price: 680, couponPrice: 580, sale: 34567, gmv: 20048860, images: '//img.alicdn.com/bao/uploaded/i1/estee_005.jpg' },
  { itemId: 1034, liveId: 'LIVE017', itemCode: 'LIVE017_1', title: 'SK-II环采钻白精华露 50ml', brandName: 'SK-II', shopName: 'SK-II官方旗舰店', categoryName: '护肤品/精华液/美白精华', price: 1250, couponPrice: 1080, sale: 23456, gmv: 25332480, images: '//img.alicdn.com/bao/uploaded/i1/skii_003.jpg' },
  { itemId: 1035, liveId: 'LIVE018', itemCode: 'LIVE018_0', title: '资生堂时光琉璃御藏精华', brandName: '资生堂', shopName: '资生堂官方旗舰店', categoryName: '护肤品/精华液/抗老精华', price: 1680, couponPrice: 1450, sale: 12345, gmv: 17900250, images: '//img.alicdn.com/bao/uploaded/i1/shiseido_003.jpg' },
  { itemId: 1036, liveId: 'LIVE018', itemCode: 'LIVE018_1', title: '娇韵诗莲花面部护理油 30ml', brandName: '娇韵诗', shopName: '娇韵诗官方旗舰店', categoryName: '护肤品/面部精华油/调理油', price: 420, couponPrice: 360, sale: 56789, gmv: 20444040, images: '//img.alicdn.com/bao/uploaded/i1/clarins_003.jpg' },
  { itemId: 1037, liveId: 'LIVE019', itemCode: 'LIVE019_0', title: '倩碧水磁场保湿霜 72H', brandName: '倩碧', shopName: '倩碧官方旗舰店', categoryName: '护肤品/面霜/保湿面霜', price: 380, couponPrice: 320, sale: 67890, gmv: 21724800, images: '//img.alicdn.com/bao/uploaded/i1/clinique_003.jpg' },
  { itemId: 1038, liveId: 'LIVE019', itemCode: 'LIVE019_1', title: '海蓝之谜浓缩修护眼霜 15ml', brandName: '海蓝之谜', shopName: '海蓝之谜官方旗舰店', categoryName: '护肤品/眼霜/奢华眼霜', price: 2350, couponPrice: 2100, sale: 8901, gmv: 18692100, images: '//img.alicdn.com/bao/uploaded/i1/lamer_003.jpg' },
  { itemId: 1039, liveId: 'LIVE020', itemCode: 'LIVE020_0', title: '兰蔻持妆粉底棒 SPF25', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '彩妆/粉底/粉底棒', price: 420, couponPrice: 360, sale: 45678, gmv: 16444080, images: '//img.alicdn.com/bao/uploaded/i1/lancome_006.jpg' },
  { itemId: 1040, liveId: 'LIVE020', itemCode: 'LIVE020_1', title: '欧莱雅奇焕光彩气垫霜', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '彩妆/气垫/气垫霜', price: 229, couponPrice: 189, sale: 98765, gmv: 18666585, images: '//img.alicdn.com/bao/uploaded/i1/loreal_007.jpg' },
  { itemId: 1041, liveId: 'LIVE021', itemCode: 'LIVE021_0', title: '雅诗兰黛绝美唇膏 倾慕系列', brandName: '雅诗兰黛', shopName: '雅诗兰黛官方旗舰店', categoryName: '彩妆/唇膏/滋润唇膏', price: 320, couponPrice: 280, sale: 123456, gmv: 34567680, images: '//img.alicdn.com/bao/uploaded/i1/estee_006.jpg' },
  { itemId: 1042, liveId: 'LIVE021', itemCode: 'LIVE021_1', title: '潘婷强韧养根润发精华素', brandName: '潘婷', shopName: '潘婷官方旗舰店', categoryName: '洗护/护发素/强韧型', price: 55, couponPrice: 42, sale: 234567, gmv: 9851814, images: '//img.alicdn.com/bao/uploaded/i1/pantene_005.jpg' },
  { itemId: 1043, liveId: 'LIVE022', itemCode: 'LIVE022_0', title: '安耐晒敏感肌防晒乳 SPF46', brandName: '安耐晒', shopName: '安耐晒海外旗舰店', categoryName: '防晒/敏感肌防晒/温和防晒', price: 228, couponPrice: 198, sale: 89012, gmv: 17624376, images: '//img.alicdn.com/bao/uploaded/i1/anessa_004.jpg' },
  { itemId: 1044, liveId: 'LIVE022', itemCode: 'LIVE022_1', title: 'SK-II前男友面膜 10片装', brandName: 'SK-II', shopName: 'SK-II官方旗舰店', categoryName: '面膜/贴片面膜/精华面膜', price: 980, couponPrice: 850, sale: 56789, gmv: 48270650, images: '//img.alicdn.com/bao/uploaded/i1/skii_004.jpg' },
  { itemId: 1045, liveId: 'LIVE023', itemCode: 'LIVE023_0', title: '资生堂红妍肌活精华露 50ml', brandName: '资生堂', shopName: '资生堂官方旗舰店', categoryName: '护肤品/精华液/活肤精华', price: 760, couponPrice: 650, sale: 34567, gmv: 22468550, images: '//img.alicdn.com/bao/uploaded/i1/shiseido_004.jpg' },
  { itemId: 1046, liveId: 'LIVE023', itemCode: 'LIVE023_1', title: '娇韵诗清透美白淡斑精华', brandName: '娇韵诗', shopName: '娇韵诗官方旗舰店', categoryName: '护肤品/精华液/美白精华', price: 680, couponPrice: 580, sale: 23456, gmv: 13604480, images: '//img.alicdn.com/bao/uploaded/i1/clarins_004.jpg' },
  { itemId: 1047, liveId: 'LIVE024', itemCode: 'LIVE024_0', title: '倩碧维C淡斑精华液 10ml', brandName: '倩碧', shopName: '倩碧官方旗舰店', categoryName: '护肤品/精华液/淡斑精华', price: 450, couponPrice: 390, sale: 45678, gmv: 17814420, images: '//img.alicdn.com/bao/uploaded/i1/clinique_004.jpg' },
  { itemId: 1048, liveId: 'LIVE024', itemCode: 'LIVE024_1', title: '海蓝之谜晶钻紧致面膜', brandName: '海蓝之谜', shopName: '海蓝之谜官方旗舰店', categoryName: '面膜/贴片面膜/奢华面膜', price: 3200, couponPrice: 2850, sale: 5678, gmv: 16182300, images: '//img.alicdn.com/bao/uploaded/i1/lamer_004.jpg' },
  { itemId: 1049, liveId: 'LIVE025', itemCode: 'LIVE025_0', title: '兰蔻纯净玫瑰卸妆水 400ml', brandName: '兰蔻', shopName: '兰蔻官方旗舰店', categoryName: '洁面/卸妆水/温和卸妆', price: 380, couponPrice: 320, sale: 89012, gmv: 28483840, images: '//img.alicdn.com/bao/uploaded/i1/lancome_007.jpg' },
  { itemId: 1050, liveId: 'LIVE025', itemCode: 'LIVE025_1', title: '欧莱雅积雪草微精华面膜', brandName: '欧莱雅', shopName: '欧莱雅官方旗舰店', categoryName: '面膜/贴片面膜/修护面膜', price: 139, couponPrice: 109, sale: 156789, gmv: 17090001, images: '//img.alicdn.com/bao/uploaded/i1/loreal_008.jpg' }
]

// 商品详情映射表 - 对齐 ProductDetail 类型
export const productDetailsMap: Record<string, ProductDetail> = {
  'LIVE001_0': {
    itemCode: 'LIVE001_0',
    itemId: 1001,
    productName: '兰蔻小黑瓶精华肌底液 100ml',
    productBasicName: '小黑瓶精华',
    brand: '兰蔻',
    categoryName: '护肤品/精华液/肌底液',
    shopName: '兰蔻官方旗舰店',
    mainImages: '//img.alicdn.com/bao/uploaded/i1/lancome_001.jpg',
    pricing: {
      originalPrice: '¥1080',
      currentPrice: '¥899',
      discountInfo: '限时直降181元',
      promotionStrategy: '买2件享9折',
      priceText: '全网最低价'
    },
    sale: 156780,
    gmv: 140944220,
    highlights: [
      { category: '产品相关', description: '小黑瓶精华，全球畅销明星产品，年销量超千万瓶' },
      { category: '产品相关', description: '二裂酵母精粹，强韧肌肤屏障，改善肤质细腻毛孔' },
      { category: '产品相关', description: '适合各种肤质，温和不刺激，敏感肌也可使用' },
      { category: '服务相关', description: '正品保障，假一赔十' },
      { category: '服务相关', description: '7天无理由退换货' }
    ],
    ingredients: [
      { name: '规格', benefit: '产品容量', concentration: '100ml/瓶', source: '法国' },
      { name: '主要成分', benefit: '修护肌底', concentration: '二裂酵母发酵产物溶胞物', source: '专利技术' },
      { name: '适用肤质', benefit: '全肤质适用', concentration: '所有肤质', source: '皮肤科测试' },
      { name: '保质期', benefit: '未开封保质期', concentration: '36个月', source: '生产日期见瓶身' },
      { name: '功效', benefit: '核心功效', concentration: '修护、保湿、抗老', source: '临床验证' }
    ],
    confidenceScore: 0.95,
    status: 'on_sale'
  },
  'LIVE002_0': {
    itemCode: 'LIVE002_0',
    itemId: 1003,
    productName: '雅诗兰黛特润修护肌透精华露 50ml',
    productBasicName: '小棕瓶精华',
    brand: '雅诗兰黛',
    categoryName: '护肤品/精华液/修护精华',
    shopName: '雅诗兰黛官方旗舰店',
    mainImages: '//img.alicdn.com/bao/uploaded/i1/estee_001.jpg',
    pricing: {
      originalPrice: '¥1150',
      currentPrice: '¥980',
      discountInfo: '享受会员专属折扣',
      promotionStrategy: '满1000减100',
      priceText: '年度大促价'
    },
    sale: 67890,
    gmv: 66532200,
    highlights: [
      { category: '产品相关', description: '畅销全球的小棕瓶精华，专利修护科技' },
      { category: '产品相关', description: '深层修护肌肤，改善细纹、暗沉' },
      { category: '产品相关', description: '夜间修护黄金时段，焕醒年轻肌肤' },
      { category: '产品相关', description: '多重抗氧化成分，抵御外界侵害' },
      { category: '服务相关', description: '官方直营，正品保证' }
    ],
    ingredients: [
      { name: '规格', benefit: '产品容量', concentration: '50ml/瓶', source: '美国' },
      { name: '主要成分', benefit: '夜间修护', concentration: '专利修护配方', source: '雅诗兰黛实验室' },
      { name: '适用肤质', benefit: '全肤质适用', concentration: '所有肤质', source: '皮肤科测试' },
      { name: '保质期', benefit: '未开封保质期', concentration: '36个月', source: '生产日期见瓶身' },
      { name: '功效', benefit: '核心功效', concentration: '修护、抗皱、提亮', source: '临床验证' }
    ],
    confidenceScore: 0.92,
    status: 'on_sale'
  },
  'LIVE011_0': {
    itemCode: 'LIVE011_0',
    itemId: 1021,
    productName: 'SK-II神仙水护肤精华露 230ml',
    productBasicName: '神仙水',
    brand: 'SK-II',
    categoryName: '护肤品/精华液/神仙水',
    shopName: 'SK-II官方旗舰店',
    mainImages: '//img.alicdn.com/bao/uploaded/i1/skii_001.jpg',
    pricing: {
      originalPrice: '¥1590',
      currentPrice: '¥1290',
      discountInfo: '限时特惠300元',
      promotionStrategy: '赠送小样套装',
      priceText: '直播间专属价'
    },
    sale: 89012,
    gmv: 114845480,
    highlights: [
      { category: '产品相关', description: '含有超过90%天然Pitera™精华' },
      { category: '产品相关', description: '改善肌肤五大维度：细纹、紧致、光泽、细腻、白皙' },
      { category: '产品相关', description: '全球销量No.1护肤精华' },
      { category: '产品相关', description: '日本原装进口，品质保证' },
      { category: '服务相关', description: '专柜验货，假一赔十' }
    ],
    ingredients: [
      { name: '规格', benefit: '产品容量', concentration: '230ml/瓶', source: '日本' },
      { name: '主要成分', benefit: '改善肤质', concentration: 'Pitera™', source: 'SK-II独家' },
      { name: '适用肤质', benefit: '全肤质适用', concentration: '所有肤质', source: '皮肤科测试' },
      { name: '保质期', benefit: '未开封保质期', concentration: '36个月', source: '生产日期见瓶身' },
      { name: '功效', benefit: '核心功效', concentration: '改善肤质、提亮、紧致', source: '临床验证' }
    ],
    confidenceScore: 0.98,
    status: 'on_sale'
  }
}

// 获取商品详情
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

  // 模拟关联直播数据
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
    },
    {
      liveId: 'LIVE002',
      influencerId: 'INF002',
      anchor: '薇娅',
      startTime: 1200,
      endTime: 1500,
      duration: 300,
      mentions: 8,
      keywords: ['热卖', '限时', '抢购']
    },
    {
      liveId: 'LIVE005',
      influencerId: 'INF003',
      anchor: '罗永浩',
      startTime: 600,
      endTime: 850,
      duration: 250,
      mentions: 5,
      keywords: ['品质', '正品', '值得买']
    }
  ]
}
