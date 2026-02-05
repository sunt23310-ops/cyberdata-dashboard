import type { LiveListItem, LiveProductItem } from '@/types/live'
import type { ProductLiveItem } from '@/types/product'

// 主播列表
const anchors = ['李佳琦', '薇娅', '罗永浩', '董宇辉', '小杨哥', '辛巴', '雪梨', '烈儿宝贝', '陈洁kiki', '刘媛媛', '贾乃亮', '朱梓骁', '张庭', '大狼狗郑建鹏', '林珊珊']

// 生成直播列表数据
export const mockLives: LiveListItem[] = [
  { liveId: 'LIVE001', anchor: '李佳琦', viewCount: 12300000, salesCount: 85600, gmv: 45600000, duration: 14520, date: '2024-01-15T20:00:00Z' },
  { liveId: 'LIVE002', anchor: '薇娅', viewCount: 8900000, salesCount: 62300, gmv: 32100000, duration: 10800, date: '2024-01-14T19:30:00Z' },
  { liveId: 'LIVE003', anchor: '罗永浩', viewCount: 5600000, salesCount: 41200, gmv: 18900000, duration: 7200, date: '2024-01-13T20:00:00Z' },
  { liveId: 'LIVE004', anchor: '董宇辉', viewCount: 9800000, salesCount: 55400, gmv: 28700000, duration: 12600, date: '2024-01-12T18:00:00Z' },
  { liveId: 'LIVE005', anchor: '小杨哥', viewCount: 7200000, salesCount: 48900, gmv: 21500000, duration: 9000, date: '2024-01-11T19:00:00Z' },
  { liveId: 'LIVE006', anchor: '辛巴', viewCount: 6800000, salesCount: 52100, gmv: 24300000, duration: 11400, date: '2024-01-10T20:30:00Z' },
  { liveId: 'LIVE007', anchor: '雪梨', viewCount: 4500000, salesCount: 38700, gmv: 15800000, duration: 8100, date: '2024-01-09T19:00:00Z' },
  { liveId: 'LIVE008', anchor: '烈儿宝贝', viewCount: 3900000, salesCount: 31200, gmv: 12600000, duration: 7800, date: '2024-01-08T20:00:00Z' },
  { liveId: 'LIVE009', anchor: '陈洁kiki', viewCount: 2800000, salesCount: 24500, gmv: 9800000, duration: 6300, date: '2024-01-07T19:30:00Z' },
  { liveId: 'LIVE010', anchor: '刘媛媛', viewCount: 3200000, salesCount: 27800, gmv: 11200000, duration: 7200, date: '2024-01-06T18:00:00Z' },
  { liveId: 'LIVE011', anchor: '李佳琦', viewCount: 11500000, salesCount: 79200, gmv: 42100000, duration: 13800, date: '2024-01-05T20:00:00Z' },
  { liveId: 'LIVE012', anchor: '董宇辉', viewCount: 8700000, salesCount: 48600, gmv: 25400000, duration: 11100, date: '2024-01-04T19:00:00Z' },
  { liveId: 'LIVE013', anchor: '贾乃亮', viewCount: 4100000, salesCount: 33500, gmv: 14200000, duration: 6600, date: '2024-01-03T20:30:00Z' },
  { liveId: 'LIVE014', anchor: '朱梓骁', viewCount: 3600000, salesCount: 29100, gmv: 11800000, duration: 5400, date: '2024-01-02T19:00:00Z' },
  { liveId: 'LIVE015', anchor: '张庭', viewCount: 2500000, salesCount: 21300, gmv: 8700000, duration: 5100, date: '2024-01-01T18:00:00Z' },
  // 新增15条直播
  { liveId: 'LIVE016', anchor: '大狼狗郑建鹏', viewCount: 5800000, salesCount: 42300, gmv: 19800000, duration: 8400, date: '2023-12-31T20:00:00Z' },
  { liveId: 'LIVE017', anchor: '林珊珊', viewCount: 3400000, salesCount: 26700, gmv: 10500000, duration: 6900, date: '2023-12-30T19:00:00Z' },
  { liveId: 'LIVE018', anchor: '李佳琦', viewCount: 13100000, salesCount: 91200, gmv: 48900000, duration: 15600, date: '2023-12-29T20:00:00Z' },
  { liveId: 'LIVE019', anchor: '薇娅', viewCount: 9200000, salesCount: 65800, gmv: 34500000, duration: 11400, date: '2023-12-28T19:30:00Z' },
  { liveId: 'LIVE020', anchor: '小杨哥', viewCount: 7800000, salesCount: 52100, gmv: 23400000, duration: 9600, date: '2023-12-27T19:00:00Z' },
  { liveId: 'LIVE021', anchor: '辛巴', viewCount: 7100000, salesCount: 54600, gmv: 25800000, duration: 12000, date: '2023-12-26T20:30:00Z' },
  { liveId: 'LIVE022', anchor: '董宇辉', viewCount: 10200000, salesCount: 58900, gmv: 30200000, duration: 13200, date: '2023-12-25T18:00:00Z' },
  { liveId: 'LIVE023', anchor: '罗永浩', viewCount: 6100000, salesCount: 43800, gmv: 20100000, duration: 7800, date: '2023-12-24T20:00:00Z' },
  { liveId: 'LIVE024', anchor: '雪梨', viewCount: 4800000, salesCount: 40100, gmv: 16900000, duration: 8700, date: '2023-12-23T19:00:00Z' },
  { liveId: 'LIVE025', anchor: '烈儿宝贝', viewCount: 4200000, salesCount: 33800, gmv: 13800000, duration: 8100, date: '2023-12-22T20:00:00Z' },
  { liveId: 'LIVE026', anchor: '李佳琦', viewCount: 12800000, salesCount: 88500, gmv: 47200000, duration: 14400, date: '2023-12-21T20:00:00Z' },
  { liveId: 'LIVE027', anchor: '陈洁kiki', viewCount: 3100000, salesCount: 26200, gmv: 10600000, duration: 6600, date: '2023-12-20T19:30:00Z' },
  { liveId: 'LIVE028', anchor: '贾乃亮', viewCount: 4500000, salesCount: 36200, gmv: 15600000, duration: 7200, date: '2023-12-19T20:30:00Z' },
  { liveId: 'LIVE029', anchor: '刘媛媛', viewCount: 3500000, salesCount: 29800, gmv: 12100000, duration: 7500, date: '2023-12-18T18:00:00Z' },
  { liveId: 'LIVE030', anchor: '朱梓骁', viewCount: 3800000, salesCount: 30600, gmv: 12800000, duration: 5700, date: '2023-12-17T19:00:00Z' }
]

// 直播详情数据
export interface LiveDetail {
  liveId: string
  anchor: string
  startTime: string
  totalDuration: number
  viewCount: { value: number; change: number }
  salesCount: { value: number; change: number }
  gmv: { value: number; change: number }
  interaction: { value: number; change: number }
}

// 直播详情映射表
export const liveDetailsMap: Record<string, LiveDetail> = {
  'LIVE001': {
    liveId: 'LIVE001',
    anchor: '李佳琦',
    startTime: '2024-01-15 20:00:00',
    totalDuration: 14520,
    viewCount: { value: 12300000, change: 8.5 },
    salesCount: { value: 85600, change: 12.3 },
    gmv: { value: 45600000, change: 15.7 },
    interaction: { value: 2580000, change: 6.2 }
  },
  'LIVE002': {
    liveId: 'LIVE002',
    anchor: '薇娅',
    startTime: '2024-01-14 19:30:00',
    totalDuration: 10800,
    viewCount: { value: 8900000, change: 5.2 },
    salesCount: { value: 62300, change: 8.1 },
    gmv: { value: 32100000, change: 10.3 },
    interaction: { value: 1890000, change: 4.5 }
  },
  'LIVE003': {
    liveId: 'LIVE003',
    anchor: '罗永浩',
    startTime: '2024-01-13 20:00:00',
    totalDuration: 7200,
    viewCount: { value: 5600000, change: -2.1 },
    salesCount: { value: 41200, change: 3.5 },
    gmv: { value: 18900000, change: 5.8 },
    interaction: { value: 1120000, change: -1.3 }
  },
  'LIVE004': {
    liveId: 'LIVE004',
    anchor: '董宇辉',
    startTime: '2024-01-12 18:00:00',
    totalDuration: 12600,
    viewCount: { value: 9800000, change: 12.6 },
    salesCount: { value: 55400, change: 14.2 },
    gmv: { value: 28700000, change: 18.9 },
    interaction: { value: 2340000, change: 15.1 }
  },
  'LIVE005': {
    liveId: 'LIVE005',
    anchor: '小杨哥',
    startTime: '2024-01-11 19:00:00',
    totalDuration: 9000,
    viewCount: { value: 7200000, change: 3.8 },
    salesCount: { value: 48900, change: 6.7 },
    gmv: { value: 21500000, change: 9.2 },
    interaction: { value: 1560000, change: 2.4 }
  }
}

// 获取直播详情
export function getLiveDetail(liveId: string): LiveDetail {
  if (liveDetailsMap[liveId]) {
    return liveDetailsMap[liveId]
  }

  const live = mockLives.find(l => l.liveId === liveId)
  if (!live) {
    return liveDetailsMap['LIVE001']!
  }

  return {
    liveId: live.liveId,
    anchor: live.anchor,
    startTime: new Date(live.date).toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    totalDuration: live.duration,
    viewCount: { value: live.viewCount, change: Math.round((Math.random() * 20 - 5) * 10) / 10 },
    salesCount: { value: live.salesCount, change: Math.round((Math.random() * 20 - 3) * 10) / 10 },
    gmv: { value: live.gmv, change: Math.round((Math.random() * 25 - 5) * 10) / 10 },
    interaction: { value: Math.round(live.viewCount * 0.2), change: Math.round((Math.random() * 15 - 3) * 10) / 10 }
  }
}

// 直播商品列表
const allLiveProducts: LiveProductItem[] = [
  { itemCode: 'SKU001', productName: '兰蔻小黑瓶精华肌底液 100ml', brand: '兰蔻', startTime: '04:44', endTime: '09:59', duration: 315, mentions: 12, keywords: ['小黑瓶', '精华', '修护', '抗老'] },
  { itemCode: 'SKU002', productName: '欧莱雅复颜玻尿酸水光充盈导入精华液', brand: '欧莱雅', startTime: '12:30', endTime: '18:45', duration: 375, mentions: 8, keywords: ['玻尿酸', '补水', '精华'] },
  { itemCode: 'SKU003', productName: '雅诗兰黛特润修护肌透精华露 50ml', brand: '雅诗兰黛', startTime: '22:00', endTime: '28:30', duration: 390, mentions: 15, keywords: ['小棕瓶', '修护', '抗皱'] },
  { itemCode: 'SKU004', productName: '安耐晒金瓶防晒霜 SPF50+ PA++++', brand: '安耐晒', startTime: '35:00', endTime: '42:15', duration: 435, mentions: 10, keywords: ['防晒', 'SPF50', '金瓶'] },
  { itemCode: 'SKU005', productName: '潘婷3分钟奇迹护发素 深层滋养型', brand: '潘婷', startTime: '48:20', endTime: '54:10', duration: 350, mentions: 7, keywords: ['护发素', '深层滋养', '修护'] },
  { itemCode: 'SKU006', productName: '欧莱雅清润葡萄籽膜力水', brand: '欧莱雅', startTime: '58:00', endTime: '65:30', duration: 450, mentions: 11, keywords: ['葡萄籽', '膜力水', '保湿'] },
  { itemCode: 'SKU007', productName: '兰蔻清滢柔肤水 粉水 400ml', brand: '兰蔻', startTime: '70:15', endTime: '78:40', duration: 505, mentions: 14, keywords: ['粉水', '柔肤', '清爽'] },
  { itemCode: 'SKU008', productName: '雅诗兰黛红石榴鲜活亮采洁面乳', brand: '雅诗兰黛', startTime: '82:00', endTime: '88:20', duration: 380, mentions: 9, keywords: ['红石榴', '洁面', '提亮'] },
  { itemCode: 'SKU009', productName: '欧莱雅玻尿酸安瓶精华面膜 5片装', brand: '欧莱雅', startTime: '92:30', endTime: '98:50', duration: 380, mentions: 13, keywords: ['面膜', '安瓶', '补水'] },
  { itemCode: 'SKU010', productName: '兰蔻极光水精华 30ml', brand: '兰蔻', startTime: '102:00', endTime: '110:15', duration: 495, mentions: 16, keywords: ['极光水', '美白', '精华'] },
  { itemCode: 'SKU021', productName: 'SK-II神仙水护肤精华露 230ml', brand: 'SK-II', startTime: '115:00', endTime: '124:30', duration: 570, mentions: 18, keywords: ['神仙水', 'Pitera', '精华'] },
  { itemCode: 'SKU022', productName: '资生堂红腰子精华 75ml', brand: '资生堂', startTime: '128:00', endTime: '136:45', duration: 525, mentions: 14, keywords: ['红腰子', '精华', '修护'] },
  { itemCode: 'SKU024', productName: '倩碧黄油特效润肤露 125ml', brand: '倩碧', startTime: '140:30', endTime: '148:10', duration: 460, mentions: 11, keywords: ['黄油', '保湿', '润肤'] },
  { itemCode: 'SKU044', productName: 'SK-II前男友面膜 10片装', brand: 'SK-II', startTime: '152:00', endTime: '160:20', duration: 500, mentions: 15, keywords: ['面膜', '前男友', 'SK-II'] },
  { itemCode: 'SKU049', productName: '兰蔻纯净玫瑰卸妆水 400ml', brand: '兰蔻', startTime: '164:00', endTime: '172:30', duration: 510, mentions: 12, keywords: ['卸妆水', '玫瑰', '温和'] }
]

// 根据 liveId 获取直播商品（不同直播显示不同子集）
export function getLiveProducts(liveId: string): LiveProductItem[] {
  // 根据 liveId 哈希选择商品子集
  const hash = liveId.replace('LIVE', '')
  const num = parseInt(hash, 10) || 1

  // 根据直播编号选取不同数量和偏移的商品
  const count = 6 + (num % 5) * 2 // 6-14个商品
  const offset = (num * 3) % allLiveProducts.length

  const products: LiveProductItem[] = []
  for (let i = 0; i < count && i < allLiveProducts.length; i++) {
    const idx = (offset + i) % allLiveProducts.length
    const base = allLiveProducts[idx]
    if (!base) continue
    // 为每个直播生成不同的时间
    const startMinute = 4 + i * 12
    const durationSec = 280 + (num + i) * 15
    const endMinute = startMinute + Math.ceil(durationSec / 60)
    products.push({
      itemCode: base.itemCode,
      productName: base.productName,
      brand: base.brand,
      keywords: base.keywords,
      startTime: `${String(Math.floor(startMinute)).padStart(2, '0')}:${String((startMinute % 1) * 60).padStart(2, '0').slice(0, 2)}`,
      endTime: `${String(Math.floor(endMinute)).padStart(2, '0')}:${String((endMinute % 1) * 60).padStart(2, '0').slice(0, 2)}`,
      duration: durationSec,
      mentions: 5 + ((num + i) % 15)
    })
  }

  return products
}

// 直播商品详情（直播中某商品的完整表现）
export interface LiveProductDetailData {
  liveId: string
  anchor: string
  liveStartTime: string
  totalDuration: number
  itemCode: string
  productName: string
  brand: string
  category: string
  originalPrice: number
  couponPrice: number
  discountInfo?: string
  status: 'on_sale' | 'off_sale'
  startTime: string
  endTime: string
  duration: number
  mentions: number
  confidence: number
  keywords: string[]
  videoSegments: { name: string; startTime: string; endTime: string; duration: number }[]
  transcripts: { speaker: string; startTime: string; endTime: string; text: string }[]
  speakers: { name: string; ratio: number }[]
}

// 获取直播商品详情
export function getLiveProductDetail(liveId: string, itemCode: string): LiveProductDetailData {
  const live = mockLives.find(l => l.liveId === liveId)
  const product = allLiveProducts.find(p => p.itemCode === itemCode)

  const anchor = live?.anchor || '李佳琦'
  const liveDate = live ? new Date(live.date) : new Date('2024-01-15')
  const totalDuration = live?.duration || 14520

  // 根据 liveId 和 itemCode 生成确定性数据
  const liveNum = parseInt(liveId.replace('LIVE', ''), 10) || 1
  const skuNum = parseInt(itemCode.replace('SKU', ''), 10) || 1
  const seed = liveNum * 100 + skuNum

  const startMin = 4 + (seed % 20) * 3
  const durationSec = 280 + (seed % 8) * 35
  const endMin = startMin + Math.ceil(durationSec / 60)

  const productName = product?.productName || '兰蔻小黑瓶精华肌底液 100ml'
  const brand = product?.brand || '兰蔻'
  const keywords = product?.keywords || ['精华', '护肤', '修护']

  // 生成两个视频片段
  const seg1Duration = Math.floor(durationSec * 0.52)
  const seg2Duration = durationSec - seg1Duration
  const seg1End = startMin + Math.ceil(seg1Duration / 60)

  // 生成两个主讲人
  const ratio1 = 45 + (seed % 20)
  const ratio2 = 100 - ratio1
  const speakers = [
    { name: '高声', ratio: ratio1 },
    { name: '明谦', ratio: ratio2 }
  ]

  return {
    liveId,
    anchor,
    liveStartTime: liveDate.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    totalDuration,
    itemCode,
    productName,
    brand,
    category: `护肤品 > ${brand === '潘婷' ? '洗护' : '精华'}`,
    originalPrice: 500 + (skuNum % 10) * 100,
    couponPrice: 400 + (skuNum % 10) * 80,
    discountInfo: seed % 3 === 0 ? '直播间专享优惠' : undefined,
    status: 'on_sale',
    startTime: `${String(startMin).padStart(2, '0')}:${String((seed * 7) % 60).padStart(2, '0')}`,
    endTime: `${String(endMin).padStart(2, '0')}:${String((seed * 11) % 60).padStart(2, '0')}`,
    duration: durationSec,
    mentions: 2 + (seed % 5),
    confidence: 85 + (seed % 16),
    keywords,
    videoSegments: [
      { name: '首次介绍', startTime: `${String(startMin).padStart(2, '0')}:${String((seed * 7) % 60).padStart(2, '0')}`, endTime: `${String(seg1End).padStart(2, '0')}:${String((seed * 13) % 60).padStart(2, '0')}`, duration: seg1Duration },
      { name: '再次推荐', startTime: `${String(seg1End).padStart(2, '0')}:${String((seed * 13) % 60 + 1).padStart(2, '0')}`, endTime: `${String(endMin).padStart(2, '0')}:${String((seed * 11) % 60).padStart(2, '0')}`, duration: seg2Duration }
    ],
    transcripts: [
      {
        speaker: '高声',
        startTime: `${String(startMin).padStart(2, '0')}:${String((seed * 7) % 60).padStart(2, '0')}`,
        endTime: `${String(seg1End).padStart(2, '0')}:${String((seed * 13) % 60).padStart(2, '0')}`,
        text: `接下来给大家介绍的这款${productName}，是我们今天力推的一款产品。${brand}品牌明星产品，专业配方，温和有效。适合各种肤质，敏感肌也可以放心使用。`
      },
      {
        speaker: '明谦',
        startTime: `${String(seg1End).padStart(2, '0')}:${String((seed * 13) % 60 + 1).padStart(2, '0')}`,
        endTime: `${String(endMin).padStart(2, '0')}:${String((seed * 11) % 60).padStart(2, '0')}`,
        text: `刚才高声给大家详细介绍了这款产品，我再补充一下价格方面的信息。今天直播间专享价，错过今天就没有了。${brand}官方正品，品质保证。`
      }
    ],
    speakers
  }
}

// 商品关联直播（从商品详情页访问）
export function getProductRelatedLives(itemCode: string): ProductLiveItem[] {
  // 根据商品编号生成关联直播
  const codeNum = parseInt(itemCode.replace('SKU', ''), 10) || 1
  const liveCount = 3 + (codeNum % 5) // 3-7个关联直播

  const lives: ProductLiveItem[] = []
  for (let i = 0; i < liveCount; i++) {
    const liveNum = ((codeNum * 3 + i * 7) % 30) + 1
    const liveId = `LIVE${String(liveNum).padStart(3, '0')}`
    const live = mockLives.find(l => l.liveId === liveId)
    const anchor: string = live?.anchor ?? anchors[liveNum % anchors.length] ?? '李佳琦'

    const startMinute = 4 + i * 15
    const durationSec = 280 + (codeNum + i) * 20
    const endMinute = startMinute + Math.ceil(durationSec / 60)

    lives.push({
      liveId,
      anchor,
      startTime: `${String(startMinute).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`,
      endTime: `${String(endMinute).padStart(2, '0')}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}`,
      duration: durationSec,
      mentions: 5 + ((codeNum + i) % 18),
      keywords: allLiveProducts.find(p => p.itemCode === itemCode)?.keywords || ['产品', '推荐', '优惠']
    })
  }

  return lives
}
