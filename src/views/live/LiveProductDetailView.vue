<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Play, Timer } from 'lucide-vue-next'
import PageHeader from '@/components/layout/PageHeader.vue'
import { formatPrice, formatDuration } from '@/utils/format'
import { getLiveProductDetail } from '@/mock'

const route = useRoute()
const router = useRouter()
const liveId = route.params.liveId as string
const itemCode = route.params.itemCode as string

// Determine where to go back based on referrer
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

// 从 mock 获取直播商品详情
const detail = getLiveProductDetail(liveId, itemCode)

const goBack = () => {
  if (fromLive) {
    router.push(`/lives/${liveId}`)
  } else {
    router.push(`/products/${itemCode}`)
  }
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

    <div class="p-6">
      <!-- Live Info Bar -->
      <div class="bg-gray-50 rounded-sm border border-gray-200 px-6 py-4 mb-6 flex items-center gap-8 text-[13px]">
        <div class="flex items-center gap-2">
          <span class="text-gray-500">直播ID:</span>
          <span class="font-mono font-medium text-gray-900">{{ detail.liveId }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">主播:</span>
          <span class="font-medium text-gray-900">{{ detail.anchor }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">开播时间:</span>
          <span class="font-medium text-gray-900">{{ detail.liveStartTime }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-500">总时长:</span>
          <span class="font-medium text-gray-900">{{ formatDuration(detail.totalDuration) }}</span>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <div class="flex gap-8">
          <!-- Product Image -->
          <div class="w-48 h-48 bg-gray-100 rounded-sm flex-shrink-0 flex items-center justify-center text-gray-400">
            <span class="text-sm">商品图片</span>
          </div>

          <!-- Product Details -->
          <div class="flex-1">
            <div class="flex items-start gap-3 mb-4">
              <h2 class="text-4xl font-bold text-gray-900">{{ detail.productName }}</h2>
              <span
                class="px-3 py-0.5 text-xs font-medium rounded-full flex-shrink-0"
                :class="detail.status === 'on_sale' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
              >
                {{ detail.status === 'on_sale' ? '在售' : '下架' }}
              </span>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-4 text-[13px]">
              <div>
                <span class="text-gray-500">品牌</span>
                <p class="font-medium text-gray-900 mt-1">{{ detail.brand }}</p>
              </div>
              <div>
                <span class="text-gray-500">类目</span>
                <p class="font-medium text-gray-900 mt-1">{{ detail.category }}</p>
              </div>
              <div>
                <span class="text-gray-500">编码</span>
                <p class="font-mono font-medium text-gray-900 mt-1">{{ detail.itemCode }}</p>
              </div>
            </div>

            <!-- Price -->
            <div class="bg-red-50 rounded-sm px-5 py-3 flex items-center gap-6">
              <div>
                <p class="text-xs text-gray-500 mb-1">原价</p>
                <p class="text-gray-400 line-through">{{ formatPrice(detail.originalPrice) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">到手价</p>
                <p class="text-xl font-bold text-[#FF3B30]">{{ formatPrice(detail.couponPrice) }}</p>
              </div>
              <div v-if="detail.discountInfo">
                <p class="text-xs text-gray-500 mb-1">优惠</p>
                <p class="text-sm font-medium text-green-600">{{ detail.discountInfo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appearance Metrics -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">出现时间</h3>
        <div class="grid grid-cols-5 gap-4">
          <div class="bg-white rounded-sm border border-gray-200 p-5">
            <p class="text-xs text-gray-500 mb-2">开始时间</p>
            <p class="text-2xl font-semibold text-gray-900">{{ detail.startTime }}</p>
          </div>
          <div class="bg-white rounded-sm border border-gray-200 p-5">
            <p class="text-xs text-gray-500 mb-2">结束时间</p>
            <p class="text-2xl font-semibold text-gray-900">{{ detail.endTime }}</p>
          </div>
          <div class="bg-white rounded-sm border border-gray-200 p-5">
            <p class="text-xs text-gray-500 mb-2">出现时长</p>
            <p class="text-2xl font-semibold text-gray-900">{{ detail.duration }}秒</p>
          </div>
          <div class="bg-white rounded-sm border border-gray-200 p-5">
            <p class="text-xs text-gray-500 mb-2">提及次数</p>
            <p class="text-2xl font-semibold text-gray-900">{{ detail.mentions }}次</p>
          </div>
          <div class="bg-green-50 rounded-sm border border-green-200 p-5">
            <p class="text-xs text-gray-500 mb-2">置信度</p>
            <p class="text-2xl font-semibold text-green-600">{{ detail.confidence }}%</p>
          </div>
        </div>
      </div>

      <!-- Video Segments -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">视频切片</h3>
        <div class="grid grid-cols-2 gap-5">
          <div
            v-for="(segment, index) in detail.videoSegments"
            :key="index"
            class="bg-white rounded-sm border border-gray-200 overflow-hidden"
          >
            <!-- Video placeholder -->
            <div class="bg-gray-900 h-48 flex items-center justify-center cursor-pointer group">
              <div class="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play class="w-6 h-6 text-white ml-0.5" />
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-gray-900">片段{{ index + 1 }}: {{ segment.name }}</span>
                <span class="text-sm text-gray-500">{{ segment.startTime }} - {{ segment.endTime }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-sm text-gray-500">
                <Timer class="w-3.5 h-3.5" />
                <span>{{ segment.duration }}秒</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transcript -->
      <div class="bg-white rounded-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">直播介绍</h3>
          <div class="flex items-center gap-4">
            <div
              v-for="speaker in detail.speakers"
              :key="speaker.name"
              class="flex items-center gap-1.5"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="speaker.name === detail.speakers[0]?.name ? 'bg-[#FF3B30]' : 'bg-gray-400'"
              ></span>
              <span class="text-xs font-medium text-gray-700">{{ speaker.name }} {{ speaker.ratio }}%</span>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <div
            v-for="(transcript, index) in detail.transcripts"
            :key="index"
          >
            <div v-if="index > 0" class="border-t border-gray-100 mb-5"></div>
            <div class="flex items-center gap-2 mb-3">
              <span
                class="px-2 py-0.5 text-xs font-medium text-white rounded"
                :class="transcript.speaker === detail.speakers[0]?.name ? 'bg-[#FF3B30]' : 'bg-gray-500'"
              >
                {{ transcript.speaker }}
              </span>
              <span class="text-xs text-gray-500">{{ transcript.startTime }} - {{ transcript.endTime }}</span>
            </div>
            <p class="text-sm text-gray-700 leading-7">{{ transcript.text }}</p>
          </div>
        </div>
      </div>

      <!-- Keywords -->
      <div class="bg-white rounded-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">关键词</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="keyword in detail.keywords"
            :key="keyword"
            class="px-3 py-1.5 text-sm font-medium text-[#FF3B30] bg-red-50 border border-[#FF3B30]/20 rounded-sm"
          >
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
