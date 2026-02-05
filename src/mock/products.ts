import type { ProductListItem } from '@/types/product'

// 生成商品列表数据
export const mockProducts: ProductListItem[] = [
  // 原有20个商品
  { itemCode: 'SKU001', productName: '兰蔻小黑瓶精华肌底液 100ml', brand: '兰蔻', category: '护肤品', originalPrice: 1080, couponPrice: 899, sales: 156780, gmv: 140944220 },
  { itemCode: 'SKU002', productName: '欧莱雅复颜玻尿酸水光充盈导入精华液', brand: '欧莱雅', category: '护肤品', originalPrice: 339, couponPrice: 259, sales: 89234, gmv: 23111606 },
  { itemCode: 'SKU003', productName: '雅诗兰黛特润修护肌透精华露 50ml', brand: '雅诗兰黛', category: '护肤品', originalPrice: 1150, couponPrice: 980, sales: 67890, gmv: 66532200 },
  { itemCode: 'SKU004', productName: '潘婷3分钟奇迹护发素 深层滋养型', brand: '潘婷', category: '洗护', originalPrice: 69, couponPrice: 49, sales: 234567, gmv: 11493783 },
  { itemCode: 'SKU005', productName: '安耐晒金瓶防晒霜 SPF50+ PA++++', brand: '安耐晒', category: '防晒', originalPrice: 298, couponPrice: 248, sales: 178900, gmv: 44367200 },
  { itemCode: 'SKU006', productName: '欧莱雅清润葡萄籽膜力水 补水保湿', brand: '欧莱雅', category: '护肤品', originalPrice: 189, couponPrice: 139, sales: 123456, gmv: 17160384 },
  { itemCode: 'SKU007', productName: '兰蔻清滢柔肤水 粉水 400ml', brand: '兰蔻', category: '护肤品', originalPrice: 420, couponPrice: 360, sales: 98765, gmv: 35555400 },
  { itemCode: 'SKU008', productName: '雅诗兰黛红石榴鲜活亮采洁面乳', brand: '雅诗兰黛', category: '洁面', originalPrice: 320, couponPrice: 268, sales: 56789, gmv: 15219452 },
  { itemCode: 'SKU009', productName: '潘婷乳液修护洗发露 丝质顺滑型', brand: '潘婷', category: '洗护', originalPrice: 59, couponPrice: 39, sales: 345678, gmv: 13481442 },
  { itemCode: 'SKU010', productName: '安耐晒小金瓶防晒喷雾 SPF50+', brand: '安耐晒', category: '防晒', originalPrice: 198, couponPrice: 168, sales: 145678, gmv: 24473904 },
  { itemCode: 'SKU011', productName: '欧莱雅玻尿酸安瓶精华面膜 5片装', brand: '欧莱雅', category: '面膜', originalPrice: 119, couponPrice: 89, sales: 267890, gmv: 23842210 },
  { itemCode: 'SKU012', productName: '兰蔻极光水精华 30ml', brand: '兰蔻', category: '精华', originalPrice: 860, couponPrice: 720, sales: 45678, gmv: 32888160 },
  { itemCode: 'SKU013', productName: '雅诗兰黛DW持妆粉底液 30ml', brand: '雅诗兰黛', category: '彩妆', originalPrice: 480, couponPrice: 420, sales: 78901, gmv: 33138420 },
  { itemCode: 'SKU014', productName: '潘婷氨基酸洗发水 无硅油配方', brand: '潘婷', category: '洗护', originalPrice: 89, couponPrice: 69, sales: 198765, gmv: 13714785 },
  { itemCode: 'SKU015', productName: '欧莱雅男士劲能醒肤露', brand: '欧莱雅', category: '护肤品', originalPrice: 149, couponPrice: 109, sales: 87654, gmv: 9554286 },
  { itemCode: 'SKU016', productName: '兰蔻菁纯臻颜精华眼霜 15ml', brand: '兰蔻', category: '护肤品', originalPrice: 680, couponPrice: 580, sales: 34567, gmv: 20048860 },
  { itemCode: 'SKU017', productName: '安耐晒儿童防晒乳 SPF34', brand: '安耐晒', category: '防晒', originalPrice: 178, couponPrice: 148, sales: 56234, gmv: 8322632 },
  { itemCode: 'SKU018', productName: '雅诗兰黛沁水粉底液 SPF20', brand: '雅诗兰黛', category: '彩妆', originalPrice: 520, couponPrice: 460, sales: 43210, gmv: 19876600 },
  { itemCode: 'SKU019', productName: '欧莱雅紫熨斗眼霜 玻尿酸抗皱', brand: '欧莱雅', category: '护肤品', originalPrice: 239, couponPrice: 189, sales: 112345, gmv: 21233205 },
  { itemCode: 'SKU020', productName: '潘婷丝质顺滑润发精华素', brand: '潘婷', category: '洗护', originalPrice: 45, couponPrice: 35, sales: 456789, gmv: 15987615 },
  // 新增30个商品
  { itemCode: 'SKU021', productName: 'SK-II神仙水护肤精华露 230ml', brand: 'SK-II', category: '精华', originalPrice: 1590, couponPrice: 1290, sales: 89012, gmv: 114845480 },
  { itemCode: 'SKU022', productName: '资生堂红腰子精华 75ml', brand: '资生堂', category: '精华', originalPrice: 890, couponPrice: 760, sales: 67890, gmv: 51596400 },
  { itemCode: 'SKU023', productName: '娇韵诗双萃精华 30ml', brand: '娇韵诗', category: '精华', originalPrice: 780, couponPrice: 650, sales: 45678, gmv: 29690700 },
  { itemCode: 'SKU024', productName: '倩碧黄油特效润肤露 125ml', brand: '倩碧', category: '护肤品', originalPrice: 320, couponPrice: 268, sales: 123456, gmv: 33086208 },
  { itemCode: 'SKU025', productName: '海蓝之谜精粹水 150ml', brand: '海蓝之谜', category: '护肤品', originalPrice: 1450, couponPrice: 1280, sales: 23456, gmv: 30023680 },
  { itemCode: 'SKU026', productName: 'SK-II大红瓶面霜 80g', brand: 'SK-II', category: '护肤品', originalPrice: 1380, couponPrice: 1180, sales: 34567, gmv: 40789060 },
  { itemCode: 'SKU027', productName: '资生堂悦薇珀翡紧颜精华液', brand: '资生堂', category: '精华', originalPrice: 980, couponPrice: 850, sales: 28901, gmv: 24565850 },
  { itemCode: 'SKU028', productName: '娇韵诗纤体精华露 200ml', brand: '娇韵诗', category: '护肤品', originalPrice: 580, couponPrice: 480, sales: 56789, gmv: 27258720 },
  { itemCode: 'SKU029', productName: '倩碧三步曲洁面皂 150g', brand: '倩碧', category: '洁面', originalPrice: 180, couponPrice: 150, sales: 189012, gmv: 28351800 },
  { itemCode: 'SKU030', productName: '海蓝之谜修护精萃液 150ml', brand: '海蓝之谜', category: '精华', originalPrice: 2100, couponPrice: 1850, sales: 12345, gmv: 22838250 },
  { itemCode: 'SKU031', productName: '兰蔻新立体塑颜眼霜 15ml', brand: '兰蔻', category: '护肤品', originalPrice: 720, couponPrice: 620, sales: 45678, gmv: 28320360 },
  { itemCode: 'SKU032', productName: '欧莱雅金致臻颜花蜜精华油', brand: '欧莱雅', category: '精华', originalPrice: 299, couponPrice: 249, sales: 78901, gmv: 19646349 },
  { itemCode: 'SKU033', productName: '雅诗兰黛多效智研眼部精华霜', brand: '雅诗兰黛', category: '护肤品', originalPrice: 680, couponPrice: 580, sales: 34567, gmv: 20048860 },
  { itemCode: 'SKU034', productName: 'SK-II环采钻白精华露 50ml', brand: 'SK-II', category: '精华', originalPrice: 1250, couponPrice: 1080, sales: 23456, gmv: 25332480 },
  { itemCode: 'SKU035', productName: '资生堂时光琉璃御藏精华', brand: '资生堂', category: '精华', originalPrice: 1680, couponPrice: 1450, sales: 12345, gmv: 17900250 },
  { itemCode: 'SKU036', productName: '娇韵诗莲花面部护理油 30ml', brand: '娇韵诗', category: '护肤品', originalPrice: 420, couponPrice: 360, sales: 56789, gmv: 20444040 },
  { itemCode: 'SKU037', productName: '倩碧水磁场保湿霜 72H', brand: '倩碧', category: '护肤品', originalPrice: 380, couponPrice: 320, sales: 67890, gmv: 21724800 },
  { itemCode: 'SKU038', productName: '海蓝之谜浓缩修护眼霜 15ml', brand: '海蓝之谜', category: '护肤品', originalPrice: 2350, couponPrice: 2100, sales: 8901, gmv: 18692100 },
  { itemCode: 'SKU039', productName: '兰蔻持妆粉底棒 SPF25', brand: '兰蔻', category: '彩妆', originalPrice: 420, couponPrice: 360, sales: 45678, gmv: 16444080 },
  { itemCode: 'SKU040', productName: '欧莱雅奇焕光彩气垫霜', brand: '欧莱雅', category: '彩妆', originalPrice: 229, couponPrice: 189, sales: 98765, gmv: 18666585 },
  { itemCode: 'SKU041', productName: '雅诗兰黛绝美唇膏 倾慕系列', brand: '雅诗兰黛', category: '彩妆', originalPrice: 320, couponPrice: 280, sales: 123456, gmv: 34567680 },
  { itemCode: 'SKU042', productName: '潘婷强韧养根润发精华素', brand: '潘婷', category: '洗护', originalPrice: 55, couponPrice: 42, sales: 234567, gmv: 9851814 },
  { itemCode: 'SKU043', productName: '安耐晒敏感肌防晒乳 SPF46', brand: '安耐晒', category: '防晒', originalPrice: 228, couponPrice: 198, sales: 89012, gmv: 17624376 },
  { itemCode: 'SKU044', productName: 'SK-II前男友面膜 10片装', brand: 'SK-II', category: '面膜', originalPrice: 980, couponPrice: 850, sales: 56789, gmv: 48270650 },
  { itemCode: 'SKU045', productName: '资生堂红妍肌活精华露 50ml', brand: '资生堂', category: '精华', originalPrice: 760, couponPrice: 650, sales: 34567, gmv: 22468550 },
  { itemCode: 'SKU046', productName: '娇韵诗清透美白淡斑精华', brand: '娇韵诗', category: '精华', originalPrice: 680, couponPrice: 580, sales: 23456, gmv: 13604480 },
  { itemCode: 'SKU047', productName: '倩碧维C淡斑精华液 10ml', brand: '倩碧', category: '精华', originalPrice: 450, couponPrice: 390, sales: 45678, gmv: 17814420 },
  { itemCode: 'SKU048', productName: '海蓝之谜晶钻紧致面膜', brand: '海蓝之谜', category: '面膜', originalPrice: 3200, couponPrice: 2850, sales: 5678, gmv: 16182300 },
  { itemCode: 'SKU049', productName: '兰蔻纯净玫瑰卸妆水 400ml', brand: '兰蔻', category: '洁面', originalPrice: 380, couponPrice: 320, sales: 89012, gmv: 28483840 },
  { itemCode: 'SKU050', productName: '欧莱雅积雪草微精华面膜', brand: '欧莱雅', category: '面膜', originalPrice: 139, couponPrice: 109, sales: 156789, gmv: 17090001 }
]

// 商品详情数据
export interface ProductDetail {
  itemCode: string
  productName: string
  brand: string
  category: string
  shopName: string
  originalPrice: number
  couponPrice: number
  sales: number
  gmv: number
  images: { id: number; url: string; alt: string }[]
  keywords: string[]
  highlights: string[]
  specs: { label: string; value: string }[]
}

// 商品详情映射表
export const productDetailsMap: Record<string, ProductDetail> = {
  'SKU001': {
    itemCode: 'SKU001',
    productName: '兰蔻小黑瓶精华肌底液 100ml',
    brand: '兰蔻',
    category: '护肤品 > 精华',
    shopName: '兰蔻官方旗舰店',
    originalPrice: 1080,
    couponPrice: 899,
    sales: 156780,
    gmv: 140944220,
    images: [
      { id: 1, url: '', alt: '商品主图' },
      { id: 2, url: '', alt: '商品细节图1' },
      { id: 3, url: '', alt: '商品细节图2' },
      { id: 4, url: '', alt: '使用效果图' },
      { id: 5, url: '', alt: '成分说明图' }
    ],
    keywords: ['小黑瓶', '精华', '修护', '抗老', '肌底液', '二裂酵母'],
    highlights: [
      '小黑瓶精华，全球畅销明星产品，年销量超千万瓶',
      '二裂酵母精粹，强韧肌肤屏障，改善肤质细腻毛孔',
      '适合各种肤质，温和不刺激，敏感肌也可使用',
      '独特肌底修护科技，层层渗透直达肌底'
    ],
    specs: [
      { label: '规格', value: '100ml/瓶' },
      { label: '产地', value: '法国' },
      { label: '保质期', value: '36个月' },
      { label: '适用肤质', value: '所有肤质' },
      { label: '功效', value: '修护、保湿、抗老' },
      { label: '主要成分', value: '二裂酵母发酵产物溶胞物' }
    ]
  },
  'SKU003': {
    itemCode: 'SKU003',
    productName: '雅诗兰黛特润修护肌透精华露 50ml',
    brand: '雅诗兰黛',
    category: '护肤品 > 精华',
    shopName: '雅诗兰黛官方旗舰店',
    originalPrice: 1150,
    couponPrice: 980,
    sales: 67890,
    gmv: 66532200,
    images: [
      { id: 1, url: '', alt: '商品主图' },
      { id: 2, url: '', alt: '质地展示' },
      { id: 3, url: '', alt: '使用方法' },
      { id: 4, url: '', alt: '成分表' }
    ],
    keywords: ['小棕瓶', '修护', '抗皱', '精华', '夜间修护'],
    highlights: [
      '畅销全球的小棕瓶精华，专利修护科技',
      '深层修护肌肤，改善细纹、暗沉',
      '夜间修护黄金时段，焕醒年轻肌肤',
      '多重抗氧化成分，抵御外界侵害'
    ],
    specs: [
      { label: '规格', value: '50ml/瓶' },
      { label: '产地', value: '美国' },
      { label: '保质期', value: '36个月' },
      { label: '适用肤质', value: '所有肤质' },
      { label: '功效', value: '修护、抗皱、提亮' },
      { label: '主要成分', value: '专利修护配方' }
    ]
  },
  'SKU021': {
    itemCode: 'SKU021',
    productName: 'SK-II神仙水护肤精华露 230ml',
    brand: 'SK-II',
    category: '护肤品 > 精华',
    shopName: 'SK-II官方旗舰店',
    originalPrice: 1590,
    couponPrice: 1290,
    sales: 89012,
    gmv: 114845480,
    images: [
      { id: 1, url: '', alt: '商品主图' },
      { id: 2, url: '', alt: '经典瓶身' },
      { id: 3, url: '', alt: '使用场景' },
      { id: 4, url: '', alt: '对比效果' },
      { id: 5, url: '', alt: '成分解析' }
    ],
    keywords: ['神仙水', 'Pitera', '精华', '改善肤质', '提亮'],
    highlights: [
      '含有超过90%天然Pitera™精华',
      '改善肌肤五大维度：细纹、紧致、光泽、细腻、白皙',
      '全球销量No.1护肤精华',
      '日本原装进口，品质保证'
    ],
    specs: [
      { label: '规格', value: '230ml/瓶' },
      { label: '产地', value: '日本' },
      { label: '保质期', value: '36个月' },
      { label: '适用肤质', value: '所有肤质' },
      { label: '功效', value: '改善肤质、提亮、紧致' },
      { label: '主要成分', value: 'Pitera™' }
    ]
  }
}

// 获取商品详情（如果没有专门配置，则从列表生成）
export function getProductDetail(itemCode: string): ProductDetail {
  if (productDetailsMap[itemCode]) {
    return productDetailsMap[itemCode]
  }

  const product = mockProducts.find(p => p.itemCode === itemCode)
  if (!product) {
    return productDetailsMap['SKU001']! // 默认返回第一个
  }

  return {
    itemCode: product.itemCode,
    productName: product.productName,
    brand: product.brand,
    category: `${product.category} > 通用`,
    shopName: `${product.brand}官方旗舰店`,
    originalPrice: product.originalPrice,
    couponPrice: product.couponPrice,
    sales: product.sales,
    gmv: product.gmv,
    images: [
      { id: 1, url: '', alt: '商品主图' },
      { id: 2, url: '', alt: '细节图1' },
      { id: 3, url: '', alt: '细节图2' },
      { id: 4, url: '', alt: '使用效果' }
    ],
    keywords: product.productName.split(/\s+/).slice(0, 4),
    highlights: [
      `${product.brand}品牌明星产品`,
      '专业配方，温和有效',
      '官方正品，品质保证',
      '全网热销，口碑之选'
    ],
    specs: [
      { label: '品牌', value: product.brand },
      { label: '类目', value: product.category },
      { label: '产地', value: '中国' },
      { label: '保质期', value: '36个月' }
    ]
  }
}
