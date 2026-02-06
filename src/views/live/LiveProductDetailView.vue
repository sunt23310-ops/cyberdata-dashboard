<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Play, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import { formatDuration, formatSeconds } from '@/utils/format'
import { getLiveProductDetail } from '@/mock'

const route = useRoute()
const router = useRouter()
const liveId = route.params.liveId as string
const itemCode = route.params.itemCode as string

const fromLive = route.query.from === 'live'

const breadcrumbs = fromLive
  ? [
      { label: 'Home', path: '/' },
      { label: '直播库', path: '/lives' },
      { label: '直播详情', path: `/lives/${liveId}` },
      { label: '商品直播表现' }
    ]
  : [
      { label: 'Home', path: '/' },
      { label: '商品库', path: '/products' },
      { label: '商品详情', path: `/products/${itemCode}` },
      { label: '直播表现' }
    ]

const detail = getLiveProductDetail(liveId, itemCode)

const goBack = () => {
  if (fromLive) {
    router.push(`/lives/${liveId}`)
  } else {
    router.push(`/products/${itemCode}`)
  }
}

// 截图轮播索引（独立媒体区）
const currentScreenshotIndex = ref(0)

// 视频切换索引
const currentVideoIndex = ref(0)

// 每个切片的转录展开状态
const expandedTranscripts = ref<Record<string, boolean>>({})

// 产品信息 Tab 状态
const activeProductTab = ref<'highlights' | 'ingredients'>('highlights')

function prevScreenshot() {
  const total = detail.screenshots.length
  currentScreenshotIndex.value = currentScreenshotIndex.value > 0 ? currentScreenshotIndex.value - 1 : total - 1
}

function nextScreenshot() {
  const total = detail.screenshots.length
  currentScreenshotIndex.value = currentScreenshotIndex.value < total - 1 ? currentScreenshotIndex.value + 1 : 0
}

function getTranscriptPreview(text: string) {
  const lines = text.split('\n')
  return lines.slice(0, 4).join('\n')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader :breadcrumbs="breadcrumbs" :title="fromLive ? '商品直播表现' : '直播表现'">
      <template #actions>
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" />
          {{ fromLive ? '返回直播详情' : '返回商品详情' }}
        </button>
      </template>
    </PageHeader>

    <div class="p-6 space-y-6">
      <!-- Live Info Bar -->
      <div class="bg-gray-50 rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-8 text-[13px]">
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">直播ID:</span>
          <span class="font-mono font-medium text-foreground">{{ detail.liveId }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">主播:</span>
          <span class="font-medium text-foreground">{{ detail.anchor }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">开播时间:</span>
          <span class="font-medium text-foreground">{{ detail.liveStartTime }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">总时长:</span>
          <span class="font-medium text-foreground">{{ formatDuration(detail.totalDuration) }}</span>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="bg-white rounded-sm border border-gray-200 p-6">
        <div class="flex gap-8">
          <div class="w-[200px] h-[200px] bg-gray-100 rounded-sm flex-shrink-0 flex items-center justify-center border border-gray-200">
            <span class="text-gray-400 text-sm">商品图片</span>
          </div>
          <div class="flex-1 space-y-5">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-semibold text-foreground font-[Noto_Sans_SC]">{{ detail.productName }}</h2>
              <span
                class="px-3 py-0.5 text-xs font-medium rounded-full flex-shrink-0"
                :class="detail.status === 'on_sale' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ detail.status === 'on_sale' ? '在售' : '下架' }}
              </span>
            </div>
            <div class="space-y-3 text-[13px]">
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">品牌</span>
                <span class="font-medium text-foreground">{{ detail.brand }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">类目</span>
                <span class="font-medium text-foreground">{{ detail.category }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">编码</span>
                <span class="font-mono font-medium text-foreground">{{ detail.itemCode }}</span>
              </div>
            </div>
            <div class="bg-red-50 rounded-lg px-5 py-3 flex items-center gap-6">
              <div>
                <p class="text-xs text-muted-foreground mb-1">原价</p>
                <p class="text-gray-400 line-through">{{ detail.pricing.originalPrice }}</p>
              </div>
              <div>
                <p class="text-xs text-muted-foreground mb-1">到手价</p>
                <p class="text-xl font-bold text-primary">{{ detail.pricing.currentPrice }}</p>
              </div>
              <div v-if="detail.pricing.discountInfo">
                <p class="text-xs text-muted-foreground mb-1">优惠</p>
                <p class="text-sm font-medium text-green-600">{{ detail.pricing.discountInfo }}</p>
              </div>
              <div v-if="detail.pricing.promotionStrategy">
                <p class="text-xs text-muted-foreground mb-1">促销</p>
                <p class="text-sm font-medium text-orange-600">{{ detail.pricing.promotionStrategy }}</p>
              </div>
            </div>

            <!-- Product Tabs: Highlights & Ingredients -->
            <div>
              <div class="flex items-end">
                <button
                  @click="activeProductTab = 'highlights'"
                  class="px-5 py-2.5 text-[13px] font-semibold rounded-t-lg transition-colors"
                  :class="activeProductTab === 'highlights'
                    ? 'bg-white text-primary border border-gray-200 border-b-white -mb-px z-10'
                    : 'bg-gray-50 text-muted-foreground'"
                >
                  产品亮点
                </button>
                <button
                  @click="activeProductTab = 'ingredients'"
                  class="px-5 py-2.5 text-[13px] rounded-t-lg transition-colors"
                  :class="activeProductTab === 'ingredients'
                    ? 'bg-white text-primary font-semibold border border-gray-200 border-b-white -mb-px z-10'
                    : 'bg-gray-50 text-muted-foreground'"
                >
                  产品参数
                </button>
                <div class="flex-1 border-b border-gray-200"></div>
              </div>
              <div class="border border-t-0 border-gray-200 rounded-b-lg px-5 py-4">
                <!-- Highlights Tab -->
                <div v-if="activeProductTab === 'highlights'" class="space-y-2">
                  <div
                    v-for="(hl, idx) in detail.highlights"
                    :key="idx"
                    class="flex items-center gap-2.5"
                  >
                    <span
                      class="px-2.5 py-0.5 text-[11px] font-medium rounded flex-shrink-0"
                      :class="{
                        'bg-blue-50 text-blue-500': hl.category === '产品相关',
                        'bg-green-50 text-green-500': hl.category === '使用相关',
                        'bg-orange-50 text-orange-500': hl.category === '服务相关'
                      }"
                    >
                      {{ hl.category }}
                    </span>
                    <span class="text-[13px] text-foreground">{{ hl.description }}</span>
                  </div>
                </div>
                <!-- Ingredients Tab -->
                <div v-else class="divide-y divide-gray-100">
                  <div
                    v-for="(ig, idx) in detail.ingredients"
                    :key="idx"
                    class="flex items-center gap-3 py-2.5 px-4 text-xs"
                    :class="idx % 2 === 0 ? 'bg-gray-50 rounded' : ''"
                  >
                    <span class="text-muted-foreground w-24 flex-shrink-0">{{ ig.name }}</span>
                    <span class="font-medium text-foreground">{{ ig.value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Metrics -->
      <div>
        <h3 class="text-lg font-semibold text-foreground mb-4">汇总数据</h3>
        <div class="flex gap-4">
          <div class="flex-1 border border-gray-200 rounded-lg py-5 px-6">
            <p class="text-xs text-muted-foreground mb-2">总出现次数</p>
            <p class="text-2xl font-semibold text-foreground">{{ detail.totalMentions }}次</p>
          </div>
          <div class="flex-1 border border-gray-200 rounded-lg py-5 px-6">
            <p class="text-xs text-muted-foreground mb-2">累计讲解时长</p>
            <p class="text-2xl font-semibold text-foreground">{{ detail.totalSegmentDuration }}秒</p>
          </div>
        </div>
      </div>

      <!-- Screenshots & Video Section -->
      <div>
        <h3 class="text-lg font-semibold text-foreground mb-4">直播截图与视频</h3>
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-semibold text-foreground font-[Noto_Sans_SC]">直播截图</span>
          </div>
          <div class="flex gap-4">
            <!-- Left: Image Carousel -->
            <div class="w-[520px] flex-shrink-0 space-y-2">
              <div class="flex items-center">
                <button
                  @click="prevScreenshot()"
                  class="w-9 h-[390px] flex items-center justify-center bg-gray-100 rounded-l-lg text-gray-500 hover:bg-gray-200 transition-colors text-xl font-semibold flex-shrink-0"
                >
                  <ChevronLeft class="w-5 h-5" />
                </button>
                <div class="flex-1 h-[390px] bg-gray-100 flex items-center justify-center">
                  <span class="text-xs text-gray-400">{{ detail.screenshots[currentScreenshotIndex]?.path }}</span>
                </div>
                <button
                  @click="nextScreenshot()"
                  class="w-9 h-[390px] flex items-center justify-center bg-gray-100 rounded-r-lg text-gray-500 hover:bg-gray-200 transition-colors text-xl font-semibold flex-shrink-0"
                >
                  <ChevronRight class="w-5 h-5" />
                </button>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-muted-foreground">{{ detail.screenshots[currentScreenshotIndex]?.description }}</span>
                <span class="text-xs text-muted-foreground">{{ currentScreenshotIndex + 1 }} / {{ detail.screenshots.length }}</span>
              </div>
            </div>

            <!-- Right: Videos -->
            <div class="flex-1 space-y-2" v-if="detail.videos.length > 0">
              <div class="w-full h-[280px] bg-gray-900 rounded-lg flex items-center justify-center cursor-pointer group">
                <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play class="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
              <div>
                <p class="text-[13px] font-medium text-foreground">{{ detail.videos[currentVideoIndex]?.path }}</p>
                <p class="text-xs text-muted-foreground">时长 {{ detail.videos[currentVideoIndex]?.duration }}秒</p>
              </div>
              <div class="h-px bg-gray-200"></div>
              <div class="flex gap-2">
                <div
                  v-for="(vid, idx) in detail.videos"
                  :key="idx"
                  class="flex-1 cursor-pointer"
                  @click="currentVideoIndex = idx"
                >
                  <div
                    class="w-full h-[72px] bg-gray-800 rounded-md flex items-center justify-center"
                    :class="idx === currentVideoIndex ? 'ring-2 ring-primary' : ''"
                  >
                    <div class="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                      <Play class="w-3 h-3 text-white ml-px" />
                    </div>
                  </div>
                  <p class="text-[11px] font-medium text-foreground mt-1 truncate">{{ vid.path }}</p>
                  <p class="text-[11px] text-muted-foreground">{{ vid.duration }}秒</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Segments Section -->
      <div>
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-lg font-semibold text-foreground">直播切片</h3>
          <span class="text-xs font-medium text-muted-foreground bg-gray-100 rounded-full px-3 py-1">
            共 {{ detail.segments.length }} 次出现
          </span>
        </div>

        <div class="space-y-5">
          <div
            v-for="seg in detail.segments"
            :key="seg.segmentId"
            class="bg-white border border-gray-200 rounded-lg p-6 space-y-5"
          >
            <!-- Segment Header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <h4 class="text-base font-semibold text-foreground font-[Noto_Sans_SC]">{{ seg.title }}</h4>
                <span class="text-xs font-medium text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">
                  置信度 {{ (seg.confidence * 100).toFixed(0) }}%
                </span>
              </div>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <div
                  v-for="speaker in seg.speakers"
                  :key="speaker.name"
                  class="flex items-center gap-1"
                >
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="speaker === seg.speakers[0] ? 'bg-primary' : 'bg-gray-400'"
                  ></span>
                  <span class="font-medium">{{ speaker.name }}</span>
                </div>
                <span class="ml-2 text-muted-foreground">
                  {{ formatSeconds(seg.startTime) }} → {{ formatSeconds(seg.endTime) }}
                </span>
                <span class="ml-1">⏱ {{ seg.duration }}秒</span>
              </div>
            </div>

            <div class="h-px bg-gray-200"></div>

            <!-- Transcript Section -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-foreground font-[Noto_Sans_SC]">直播讲解</span>
                <div class="flex items-center gap-3">
                  <div
                    v-for="speaker in seg.speakers"
                    :key="speaker.name"
                    class="flex items-center gap-1"
                  >
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="speaker === seg.speakers[0] ? 'bg-primary' : 'bg-muted-foreground'"
                    ></span>
                    <span class="text-xs text-foreground font-medium">{{ speaker.name }} {{ speaker.ratio }}%</span>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-700 leading-7 whitespace-pre-line">{{
                  expandedTranscripts[seg.segmentId]
                    ? seg.transcriptText
                    : getTranscriptPreview(seg.transcriptText)
                }}</p>
                <button
                  v-if="seg.transcriptLines > 4"
                  @click="expandedTranscripts[seg.segmentId] = !expandedTranscripts[seg.segmentId]"
                  class="mt-2 text-xs text-primary font-medium hover:underline"
                >
                  {{ expandedTranscripts[seg.segmentId] ? '收起' : `展开全文（共${seg.transcriptLines}行）` }}
                </button>
              </div>
            </div>

            <div class="h-px bg-gray-200"></div>

            <!-- Keywords -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[13px] font-medium text-foreground">关键词</span>
              <span
                v-for="kw in seg.keyPhrases"
                :key="kw"
                class="px-3 py-1.5 text-xs font-medium text-primary bg-red-50 border border-primary/20 rounded"
              >
                {{ kw }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
