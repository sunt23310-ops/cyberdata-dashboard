import type { LiveListItem, LiveDetail, LiveProductItem } from '@/types/live'
import type { ProductLiveItem } from '@/types/product'

// 主播列表
const anchors = ['李佳琦', '薇娅', '罗永浩', '董宇辉', '小杨哥', '辛巴', '雪梨', '烈儿宝贝', '陈洁kiki', '刘媛媛', '贾乃亮', '朱梓骁', '张庭', '大狼狗郑建鹏', '林珊珊']

// 生成直播列表数据（对齐 live_overview 表）
export const mockLives: LiveListItem[] = [
  { liveId: 'LIVE001', influencerId: 'INF001', anchor: '李佳琦', totalDuration: 14520, viewCount: 12300000, viewCountChange: 8.5, sales: 85600, salesChange: 12.3, saleAmount: 45600000, saleAmountChange: 15.7, createdAt: '2024-01-15T20:00:00Z' },
  { liveId: 'LIVE002', influencerId: 'INF002', anchor: '薇娅', totalDuration: 10800, viewCount: 8900000, viewCountChange: 5.2, sales: 62300, salesChange: 8.1, saleAmount: 32100000, saleAmountChange: 10.3, createdAt: '2024-01-14T19:30:00Z' },
  { liveId: 'LIVE003', influencerId: 'INF003', anchor: '罗永浩', totalDuration: 7200, viewCount: 5600000, viewCountChange: -2.1, sales: 41200, salesChange: 3.5, saleAmount: 18900000, saleAmountChange: 5.8, createdAt: '2024-01-13T20:00:00Z' },
  { liveId: 'LIVE004', influencerId: 'INF004', anchor: '董宇辉', totalDuration: 12600, viewCount: 9800000, viewCountChange: 12.6, sales: 55400, salesChange: 14.2, saleAmount: 28700000, saleAmountChange: 18.9, createdAt: '2024-01-12T18:00:00Z' },
  { liveId: 'LIVE005', influencerId: 'INF005', anchor: '小杨哥', totalDuration: 9000, viewCount: 7200000, viewCountChange: 3.8, sales: 48900, salesChange: 6.7, saleAmount: 21500000, saleAmountChange: 9.2, createdAt: '2024-01-11T19:00:00Z' },
  { liveId: 'LIVE006', influencerId: 'INF006', anchor: '辛巴', totalDuration: 11400, viewCount: 6800000, viewCountChange: 4.1, sales: 52100, salesChange: 7.8, saleAmount: 24300000, saleAmountChange: 11.5, createdAt: '2024-01-10T20:30:00Z' },
  { liveId: 'LIVE007', influencerId: 'INF007', anchor: '雪梨', totalDuration: 8100, viewCount: 4500000, viewCountChange: 2.3, sales: 38700, salesChange: 5.2, saleAmount: 15800000, saleAmountChange: 6.8, createdAt: '2024-01-09T19:00:00Z' },
  { liveId: 'LIVE008', influencerId: 'INF008', anchor: '烈儿宝贝', totalDuration: 7800, viewCount: 3900000, viewCountChange: 1.5, sales: 31200, salesChange: 4.1, saleAmount: 12600000, saleAmountChange: 5.3, createdAt: '2024-01-08T20:00:00Z' },
  { liveId: 'LIVE009', influencerId: 'INF009', anchor: '陈洁kiki', totalDuration: 6300, viewCount: 2800000, viewCountChange: -0.8, sales: 24500, salesChange: 2.9, saleAmount: 9800000, saleAmountChange: 3.6, createdAt: '2024-01-07T19:30:00Z' },
  { liveId: 'LIVE010', influencerId: 'INF010', anchor: '刘媛媛', totalDuration: 7200, viewCount: 3200000, viewCountChange: 1.2, sales: 27800, salesChange: 3.4, saleAmount: 11200000, saleAmountChange: 4.7, createdAt: '2024-01-06T18:00:00Z' },
  { liveId: 'LIVE011', influencerId: 'INF001', anchor: '李佳琦', totalDuration: 13800, viewCount: 11500000, viewCountChange: 7.2, sales: 79200, salesChange: 10.5, saleAmount: 42100000, saleAmountChange: 13.8, createdAt: '2024-01-05T20:00:00Z' },
  { liveId: 'LIVE012', influencerId: 'INF004', anchor: '董宇辉', totalDuration: 11100, viewCount: 8700000, viewCountChange: 9.8, sales: 48600, salesChange: 11.2, saleAmount: 25400000, saleAmountChange: 14.6, createdAt: '2024-01-04T19:00:00Z' },
  { liveId: 'LIVE013', influencerId: 'INF011', anchor: '贾乃亮', totalDuration: 6600, viewCount: 4100000, viewCountChange: 3.5, sales: 33500, salesChange: 5.8, saleAmount: 14200000, saleAmountChange: 7.2, createdAt: '2024-01-03T20:30:00Z' },
  { liveId: 'LIVE014', influencerId: 'INF012', anchor: '朱梓骁', totalDuration: 5400, viewCount: 3600000, viewCountChange: 2.1, sales: 29100, salesChange: 4.3, saleAmount: 11800000, saleAmountChange: 5.6, createdAt: '2024-01-02T19:00:00Z' },
  { liveId: 'LIVE015', influencerId: 'INF013', anchor: '张庭', totalDuration: 5100, viewCount: 2500000, viewCountChange: -1.2, sales: 21300, salesChange: 1.8, saleAmount: 8700000, saleAmountChange: 2.4, createdAt: '2024-01-01T18:00:00Z' },
  { liveId: 'LIVE016', influencerId: 'INF014', anchor: '大狼狗郑建鹏', totalDuration: 8400, viewCount: 5800000, viewCountChange: 4.6, sales: 42300, salesChange: 6.9, saleAmount: 19800000, saleAmountChange: 9.5, createdAt: '2023-12-31T20:00:00Z' },
  { liveId: 'LIVE017', influencerId: 'INF015', anchor: '林珊珊', totalDuration: 6900, viewCount: 3400000, viewCountChange: 1.8, sales: 26700, salesChange: 3.6, saleAmount: 10500000, saleAmountChange: 4.9, createdAt: '2023-12-30T19:00:00Z' },
  { liveId: 'LIVE018', influencerId: 'INF001', anchor: '李佳琦', totalDuration: 15600, viewCount: 13100000, viewCountChange: 9.2, sales: 91200, salesChange: 13.8, saleAmount: 48900000, saleAmountChange: 17.2, createdAt: '2023-12-29T20:00:00Z' },
  { liveId: 'LIVE019', influencerId: 'INF002', anchor: '薇娅', totalDuration: 11400, viewCount: 9200000, viewCountChange: 6.1, sales: 65800, salesChange: 9.3, saleAmount: 34500000, saleAmountChange: 12.1, createdAt: '2023-12-28T19:30:00Z' },
  { liveId: 'LIVE020', influencerId: 'INF005', anchor: '小杨哥', totalDuration: 9600, viewCount: 7800000, viewCountChange: 5.3, sales: 52100, salesChange: 7.6, saleAmount: 23400000, saleAmountChange: 10.8, createdAt: '2023-12-27T19:00:00Z' },
  { liveId: 'LIVE021', influencerId: 'INF006', anchor: '辛巴', totalDuration: 12000, viewCount: 7100000, viewCountChange: 4.8, sales: 54600, salesChange: 8.2, saleAmount: 25800000, saleAmountChange: 11.9, createdAt: '2023-12-26T20:30:00Z' },
  { liveId: 'LIVE022', influencerId: 'INF004', anchor: '董宇辉', totalDuration: 13200, viewCount: 10200000, viewCountChange: 11.5, sales: 58900, salesChange: 13.6, saleAmount: 30200000, saleAmountChange: 16.8, createdAt: '2023-12-25T18:00:00Z' },
  { liveId: 'LIVE023', influencerId: 'INF003', anchor: '罗永浩', totalDuration: 7800, viewCount: 6100000, viewCountChange: 2.6, sales: 43800, salesChange: 5.1, saleAmount: 20100000, saleAmountChange: 7.4, createdAt: '2023-12-24T20:00:00Z' },
  { liveId: 'LIVE024', influencerId: 'INF007', anchor: '雪梨', totalDuration: 8700, viewCount: 4800000, viewCountChange: 3.2, sales: 40100, salesChange: 5.9, saleAmount: 16900000, saleAmountChange: 7.8, createdAt: '2023-12-23T19:00:00Z' },
  { liveId: 'LIVE025', influencerId: 'INF008', anchor: '烈儿宝贝', totalDuration: 8100, viewCount: 4200000, viewCountChange: 2.5, sales: 33800, salesChange: 4.7, saleAmount: 13800000, saleAmountChange: 6.2, createdAt: '2023-12-22T20:00:00Z' },
  { liveId: 'LIVE026', influencerId: 'INF001', anchor: '李佳琦', totalDuration: 14400, viewCount: 12800000, viewCountChange: 8.9, sales: 88500, salesChange: 12.8, saleAmount: 47200000, saleAmountChange: 16.3, createdAt: '2023-12-21T20:00:00Z' },
  { liveId: 'LIVE027', influencerId: 'INF009', anchor: '陈洁kiki', totalDuration: 6600, viewCount: 3100000, viewCountChange: 0.9, sales: 26200, salesChange: 3.2, saleAmount: 10600000, saleAmountChange: 4.5, createdAt: '2023-12-20T19:30:00Z' },
  { liveId: 'LIVE028', influencerId: 'INF011', anchor: '贾乃亮', totalDuration: 7200, viewCount: 4500000, viewCountChange: 4.1, sales: 36200, salesChange: 6.3, saleAmount: 15600000, saleAmountChange: 8.1, createdAt: '2023-12-19T20:30:00Z' },
  { liveId: 'LIVE029', influencerId: 'INF010', anchor: '刘媛媛', totalDuration: 7500, viewCount: 3500000, viewCountChange: 1.6, sales: 29800, salesChange: 3.9, saleAmount: 12100000, saleAmountChange: 5.4, createdAt: '2023-12-18T18:00:00Z' },
  { liveId: 'LIVE030', influencerId: 'INF012', anchor: '朱梓骁', totalDuration: 5700, viewCount: 3800000, viewCountChange: 2.8, sales: 30600, salesChange: 4.6, saleAmount: 12800000, saleAmountChange: 6.1, createdAt: '2023-12-17T19:00:00Z' }
]

// 直播详情映射表（对齐 live_overview 完整字段）
export const liveDetailsMap: Record<string, LiveDetail> = {
  'LIVE001': {
    liveId: 'LIVE001',
    influencerId: 'INF001',
    anchor: '李佳琦',
    createdAt: '2024-01-15 20:00:00',
    totalProducts: 84,
    totalDuration: 14520,
    totalJoinCount: { value: 2580000, change: 6.2 },
    viewCount: { value: 12300000, change: 8.5 },
    avgPrice: { value: 246.59, change: 0.31 },
    sales: { value: 85600, change: 12.3 },
    saleAmount: { value: 45600000, change: 15.7 },
    goBuyUv: { value: 6230, change: 9.4 },
    goBuyCount: { value: 8520, change: 11.2 },
    likeCount: { value: 15238699, change: 38.9 },
    commentCount: { value: 22683, change: 24.5 },
    fansGrowth: { value: 2464, change: 112.0 },
    itemCount: { value: 89, change: 5.6 },
    gmvItemCountRatio: { value: 512360, change: 8.3 },
    interaction: { value: 15261382, change: 38.7, detail: { likeCount: 15238699, commentCount: 22683 } }
  },
  'LIVE002': {
    liveId: 'LIVE002',
    influencerId: 'INF002',
    anchor: '薇娅',
    createdAt: '2024-01-14 19:30:00',
    totalProducts: 72,
    totalDuration: 10800,
    totalJoinCount: { value: 1890000, change: 4.5 },
    viewCount: { value: 8900000, change: 5.2 },
    avgPrice: { value: 218.45, change: 0.25 },
    sales: { value: 62300, change: 8.1 },
    saleAmount: { value: 32100000, change: 10.3 },
    goBuyUv: { value: 4850, change: 7.2 },
    goBuyCount: { value: 6320, change: 8.5 },
    likeCount: { value: 11200000, change: 32.5 },
    commentCount: { value: 18500, change: 21.3 },
    fansGrowth: { value: 1850, change: 85.0 },
    itemCount: { value: 72, change: 4.2 },
    gmvItemCountRatio: { value: 445833, change: 5.9 },
    interaction: { value: 11218500, change: 32.4, detail: { likeCount: 11200000, commentCount: 18500 } }
  },
  'LIVE003': {
    liveId: 'LIVE003',
    influencerId: 'INF003',
    anchor: '罗永浩',
    createdAt: '2024-01-13 20:00:00',
    totalProducts: 56,
    totalDuration: 7200,
    totalJoinCount: { value: 1120000, change: -1.3 },
    viewCount: { value: 5600000, change: -2.1 },
    avgPrice: { value: 285.60, change: 0.42 },
    sales: { value: 41200, change: 3.5 },
    saleAmount: { value: 18900000, change: 5.8 },
    goBuyUv: { value: 3200, change: 2.8 },
    goBuyCount: { value: 4100, change: 3.6 },
    likeCount: { value: 6800000, change: 18.2 },
    commentCount: { value: 12300, change: 15.6 },
    fansGrowth: { value: 980, change: 45.0 },
    itemCount: { value: 56, change: 2.1 },
    gmvItemCountRatio: { value: 337500, change: 3.6 },
    interaction: { value: 6812300, change: 18.2, detail: { likeCount: 6800000, commentCount: 12300 } }
  },
  'LIVE004': {
    liveId: 'LIVE004',
    influencerId: 'INF004',
    anchor: '董宇辉',
    createdAt: '2024-01-12 18:00:00',
    totalProducts: 68,
    totalDuration: 12600,
    totalJoinCount: { value: 2340000, change: 15.1 },
    viewCount: { value: 9800000, change: 12.6 },
    avgPrice: { value: 198.75, change: 0.18 },
    sales: { value: 55400, change: 14.2 },
    saleAmount: { value: 28700000, change: 18.9 },
    goBuyUv: { value: 5680, change: 12.5 },
    goBuyCount: { value: 7450, change: 14.8 },
    likeCount: { value: 13500000, change: 42.1 },
    commentCount: { value: 28900, change: 35.6 },
    fansGrowth: { value: 3200, change: 156.0 },
    itemCount: { value: 68, change: 6.8 },
    gmvItemCountRatio: { value: 422059, change: 11.3 },
    interaction: { value: 13528900, change: 42.0, detail: { likeCount: 13500000, commentCount: 28900 } }
  },
  'LIVE005': {
    liveId: 'LIVE005',
    influencerId: 'INF005',
    anchor: '小杨哥',
    createdAt: '2024-01-11 19:00:00',
    totalProducts: 62,
    totalDuration: 9000,
    totalJoinCount: { value: 1560000, change: 2.4 },
    viewCount: { value: 7200000, change: 3.8 },
    avgPrice: { value: 165.80, change: 0.12 },
    sales: { value: 48900, change: 6.7 },
    saleAmount: { value: 21500000, change: 9.2 },
    goBuyUv: { value: 4120, change: 5.8 },
    goBuyCount: { value: 5380, change: 7.2 },
    likeCount: { value: 9200000, change: 28.5 },
    commentCount: { value: 16800, change: 22.3 },
    fansGrowth: { value: 1650, change: 78.0 },
    itemCount: { value: 62, change: 3.5 },
    gmvItemCountRatio: { value: 346774, change: 5.5 },
    interaction: { value: 9216800, change: 28.4, detail: { likeCount: 9200000, commentCount: 16800 } }
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

  // 基于列表数据生成完整详情
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

// 直播商品列表（内部数据源）
const allLiveProducts = [
  { itemCode: 'SKU001', itemIndex: 0, productName: '兰蔻小黑瓶精华肌底液 100ml', brand: '兰蔻', startTime: 284, endTime: 599, keywords: ['小黑瓶', '精华', '修护', '抗老'] },
  { itemCode: 'SKU002', itemIndex: 1, productName: '欧莱雅复颜玻尿酸水光充盈导入精华液', brand: '欧莱雅', startTime: 750, endTime: 1125, keywords: ['玻尿酸', '补水', '精华'] },
  { itemCode: 'SKU003', itemIndex: 2, productName: '雅诗兰黛特润修护肌透精华露 50ml', brand: '雅诗兰黛', startTime: 1320, endTime: 1710, keywords: ['小棕瓶', '修护', '抗皱'] },
  { itemCode: 'SKU004', itemIndex: 3, productName: '安耐晒金瓶防晒霜 SPF50+ PA++++', brand: '安耐晒', startTime: 2100, endTime: 2535, keywords: ['防晒', 'SPF50', '金瓶'] },
  { itemCode: 'SKU005', itemIndex: 4, productName: '潘婷3分钟奇迹护发素 深层滋养型', brand: '潘婷', startTime: 2900, endTime: 3250, keywords: ['护发素', '深层滋养', '修护'] },
  { itemCode: 'SKU006', itemIndex: 5, productName: '欧莱雅清润葡萄籽膜力水', brand: '欧莱雅', startTime: 3480, endTime: 3930, keywords: ['葡萄籽', '膜力水', '保湿'] },
  { itemCode: 'SKU007', itemIndex: 6, productName: '兰蔻清滢柔肤水 粉水 400ml', brand: '兰蔻', startTime: 4215, endTime: 4720, keywords: ['粉水', '柔肤', '清爽'] },
  { itemCode: 'SKU008', itemIndex: 7, productName: '雅诗兰黛红石榴鲜活亮采洁面乳', brand: '雅诗兰黛', startTime: 4920, endTime: 5300, keywords: ['红石榴', '洁面', '提亮'] },
  { itemCode: 'SKU009', itemIndex: 8, productName: '欧莱雅玻尿酸安瓶精华面膜 5片装', brand: '欧莱雅', startTime: 5550, endTime: 5930, keywords: ['面膜', '安瓶', '补水'] },
  { itemCode: 'SKU010', itemIndex: 9, productName: '兰蔻极光水精华 30ml', brand: '兰蔻', startTime: 6120, endTime: 6615, keywords: ['极光水', '美白', '精华'] },
  { itemCode: 'SKU021', itemIndex: 10, productName: 'SK-II神仙水护肤精华露 230ml', brand: 'SK-II', startTime: 6900, endTime: 7470, keywords: ['神仙水', 'Pitera', '精华'] },
  { itemCode: 'SKU022', itemIndex: 11, productName: '资生堂红腰子精华 75ml', brand: '资生堂', startTime: 7680, endTime: 8205, keywords: ['红腰子', '精华', '修护'] },
  { itemCode: 'SKU024', itemIndex: 12, productName: '倩碧黄油特效润肤露 125ml', brand: '倩碧', startTime: 8430, endTime: 8890, keywords: ['黄油', '保湿', '润肤'] },
  { itemCode: 'SKU044', itemIndex: 13, productName: 'SK-II前男友面膜 10片装', brand: 'SK-II', startTime: 9120, endTime: 9620, keywords: ['面膜', '前男友', 'SK-II'] },
  { itemCode: 'SKU049', itemIndex: 14, productName: '兰蔻纯净玫瑰卸妆水 400ml', brand: '兰蔻', startTime: 9840, endTime: 10350, keywords: ['卸妆水', '玫瑰', '温和'] }
]

// 根据 liveId 获取直播商品（对齐新结构）
export function getLiveProducts(liveId: string): LiveProductItem[] {
  const hash = liveId.replace('LIVE', '')
  const num = parseInt(hash, 10) || 1

  const count = 6 + (num % 5) * 2
  const offset = (num * 3) % allLiveProducts.length

  const products: LiveProductItem[] = []
  for (let i = 0; i < count && i < allLiveProducts.length; i++) {
    const idx = (offset + i) % allLiveProducts.length
    const base = allLiveProducts[idx]
    if (!base) continue

    // 时间用秒数
    const startTimeSec = 240 + i * 720 + (num * 30) % 180
    const durationSec = 280 + (num + i) * 15
    const endTimeSec = startTimeSec + durationSec

    products.push({
      itemCode: base.itemCode,
      itemIndex: i,
      productName: base.productName,
      productBasicName: base.productName.split(' ')[0],
      brand: base.brand,
      startTime: startTimeSec,
      endTime: endTimeSec,
      duration: durationSec,
      mentions: 2 + ((num + i) % 5),
      keywords: base.keywords
    })
  }

  return products
}

// 获取直播商品详情（对齐 segment_json 结构）
export function getLiveProductDetail(liveId: string, itemCode: string) {
  const live = mockLives.find(l => l.liveId === liveId)
  const product = allLiveProducts.find(p => p.itemCode === itemCode)

  const anchor = live?.anchor || '李佳琦'
  const influencerId = live?.influencerId || 'INF001'
  const liveDate = live ? new Date(live.createdAt) : new Date('2024-01-15')
  const totalDuration = live?.totalDuration || 14520

  const liveNum = parseInt(liveId.replace('LIVE', ''), 10) || 1
  const skuNum = parseInt(itemCode.replace('SKU', ''), 10) || 1
  const seed = liveNum * 100 + skuNum

  // 时间用秒数
  const startTimeSec = 240 + (seed % 20) * 180
  const durationSec = 280 + (seed % 8) * 35
  const endTimeSec = startTimeSec + durationSec

  const productName = product?.productName || '兰蔻小黑瓶精华肌底液 100ml'
  const productBasicName = productName.split(' ')[0]
  const brand = product?.brand || '兰蔻'
  const keywords = product?.keywords || ['精华', '护肤', '修护']

  // 主讲人比例
  const ratio1 = 45 + (seed % 20)
  const ratio2 = 100 - ratio1
  const speakers = [
    { name: '高声', ratio: ratio1 },
    { name: '明谦', ratio: ratio2 }
  ]

  // 视频切片（秒数）
  const seg1Duration = Math.floor(durationSec * 0.52)
  const seg2Duration = durationSec - seg1Duration
  const seg1EndSec = startTimeSec + seg1Duration

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
    category: `护肤品 > ${brand === '潘婷' ? '洗护' : '精华'}`,
    pricing: {
      originalPrice: `¥${500 + (skuNum % 10) * 100}`,
      currentPrice: `¥${400 + (skuNum % 10) * 80}`,
      discountInfo: seed % 3 === 0 ? '直播间专享优惠' : undefined,
      promotionStrategy: '限时特惠，库存有限'
    },
    status: 'on_sale' as const,
    startTime: startTimeSec,
    endTime: endTimeSec,
    duration: durationSec,
    confidence: (85 + (seed % 16)) / 100,
    keywords,
    mainSpeakerRatio: ratio1 / 100,
    speakers,
    totalMentions: 2 + (seed % 5),
    segmentTotalDuration: durationSec + (seed % 3 === 0 ? 131 : 0),
    returnMentions: seed % 3 === 0 ? [{
      mentionId: `mention_${seed}`,
      productName,
      productBasicName,
      startTime: endTimeSec + 3600,
      endTime: endTimeSec + 3731,
      transcriptText: `再次推荐${productName}，品质保证。`,
      keyPhrases: keywords.slice(0, 2),
      confidence: 0.99,
      mainSpeakerRatio: 0.5,
      speakers: ['高声', '明谦'],
      duration: 131
    }] : [],
    videoSegments: [
      { name: '首次介绍', startTime: startTimeSec, endTime: seg1EndSec, duration: seg1Duration },
      { name: '再次推荐', startTime: seg1EndSec + 1, endTime: endTimeSec, duration: seg2Duration }
    ],
    transcripts: [
      {
        speaker: '高声',
        startTime: startTimeSec,
        endTime: seg1EndSec,
        text: `接下来给大家介绍的这款${productName}，是我们今天力推的一款产品。${brand}品牌明星产品，专业配方，温和有效。适合各种肤质，敏感肌也可以放心使用。`
      },
      {
        speaker: '明谦',
        startTime: seg1EndSec + 1,
        endTime: endTimeSec,
        text: `刚才高声给大家详细介绍了这款产品，我再补充一下价格方面的信息。今天直播间专享价，错过今天就没有了。${brand}官方正品，品质保证。`
      }
    ]
  }
}

// 商品关联直播（从商品详情页访问）
export function getProductRelatedLives(itemCode: string): ProductLiveItem[] {
  const codeNum = parseInt(itemCode.replace('SKU', ''), 10) || 1
  const liveCount = 3 + (codeNum % 5)

  const lives: ProductLiveItem[] = []
  for (let i = 0; i < liveCount; i++) {
    const liveNum = ((codeNum * 3 + i * 7) % 30) + 1
    const liveId = `LIVE${String(liveNum).padStart(3, '0')}`
    const live = mockLives.find(l => l.liveId === liveId)
    const anchor: string = live?.anchor ?? anchors[liveNum % anchors.length] ?? '李佳琦'
    const influencerId = live?.influencerId ?? `INF${String(liveNum).padStart(3, '0')}`

    // 时间用秒数
    const startTimeSec = 240 + i * 900
    const durationSec = 280 + (codeNum + i) * 20
    const endTimeSec = startTimeSec + durationSec

    lives.push({
      liveId,
      influencerId,
      anchor,
      startTime: startTimeSec,
      endTime: endTimeSec,
      duration: durationSec,
      mentions: 2 + ((codeNum + i) % 5),
      keywords: allLiveProducts.find(p => p.itemCode === itemCode)?.keywords || ['产品', '推荐', '优惠']
    })
  }

  return lives
}
