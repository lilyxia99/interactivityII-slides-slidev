<template>
  <!-- 原有的布局内容 -->
  <div class="slidev-layout default">
    <!-- 内容区域 -->
    <div class="slide-content">
      <slot />
    </div>
  </div>

  <!-- 使用 Teleport 将坐标系渲染到 body 顶部，作为全局图层 -->
  <Teleport to="body">
    <div v-if="isCoordinateEnabled" class="coordinate-system-global">
      <!-- 坐标系网格 -->
      <div v-if="showGrid" class="coordinate-grid">
        <div class="grid-lines" :style="gridStyle"></div>
        <div class="axis-x">X</div>
        <div class="axis-y">Y</div>
        <!-- 坐标轴刻度 -->
        <div 
          v-for="i in xTicks" 
          :key="'x' + i.value" 
          class="tick-x" 
          :style="{ left: `${i.position}px` }"
        >
          {{ i.value }}
        </div>
        <div 
          v-for="i in yTicks" 
          :key="'y' + i.value" 
          class="tick-y" 
          :style="{ top: `${i.position}px` }"
        >
          {{ i.value }}
        </div>
      </div>

      <!-- 鼠标坐标显示 -->
      <div v-if="showCursor && slideCoords" class="cursor-coordinates" :style="cursorStyle">
        ({{ slideCoords.x }}, {{ slideCoords.y }})
        <div class="coord-percentage" v-if="percentage">
          {{ percentage.x }}%, {{ percentage.y }}%
        </div>
      </div>

      <!-- 控制面板 -->
      <div class="coordinate-controls">
        <button @click="toggleGrid" class="control-btn">
          {{ showGrid ? '隐藏网格' : '显示网格' }}
        </button>
        <button @click="toggleCursor" class="control-btn">
          {{ showCursor ? '隐藏坐标' : '显示坐标' }}
        </button>
        <button @click="toggleEnabled" class="control-btn">
          {{ isCoordinateEnabled ? '关闭系统' : '开启系统' }}
        </button>
        <input v-model.number="gridSize" type="range" min="10" max="100" step="5" class="grid-slider">
        <span>网格大小: {{ gridSize }}px</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 坐标系状态
const isCoordinateEnabled = ref(false) // 默认关闭
const showGrid = ref(false)
const showCursor = ref(false)
const gridSize = ref(50)

// 鼠标位置和幻灯片信息
const mousePosition = ref({ x: 0, y: 0 })
const slideRect = ref(null)

// 计算基于 slidev-layout 的坐标
const slideCoords = computed(() => {
  if (!slideRect.value) return null
  
  const x = mousePosition.value.x - slideRect.value.left
  const y = mousePosition.value.y - slideRect.value.top
  
  return {
    x: Math.max(0, Math.min(Math.round(x), slideRect.value.width)),
    y: Math.max(0, Math.min(Math.round(y), slideRect.value.height))
  }
})

// 计算百分比坐标
const percentage = computed(() => {
  if (!slideCoords.value || !slideRect.value) return null
  
  return {
    x: Math.round((slideCoords.value.x / slideRect.value.width) * 100),
    y: Math.round((slideCoords.value.y / slideRect.value.height) * 100)
  }
})

// 网格样式
const gridStyle = computed(() => ({
  backgroundSize: `${gridSize.value}px ${gridSize.value}px`
}))

// 刻度计算
const xTicks = computed(() => {
  if (!slideRect.value) return []
  
  const ticks = []
  const maxTicks = Math.floor(slideRect.value.width / gridSize.value)
  
  for (let i = 1; i <= maxTicks; i++) {
    const value = i * gridSize.value
    if (value <= slideRect.value.width) {
      ticks.push({
        value,
        position: slideRect.value.left + value
      })
    }
  }
  return ticks
})

const yTicks = computed(() => {
  if (!slideRect.value) return []
  
  const ticks = []
  const maxTicks = Math.floor(slideRect.value.height / gridSize.value)
  
  for (let i = 1; i <= maxTicks; i++) {
    const value = i * gridSize.value
    if (value <= slideRect.value.height) {
      ticks.push({
        value,
        position: slideRect.value.top + value
      })
    }
  }
  return ticks
})

// 坐标显示样式
const cursorStyle = computed(() => ({
  left: `${mousePosition.value.x + 15}px`,
  top: `${mousePosition.value.y + 15}px`,
  transform: 'translate(-50%, -50%)'
}))

// 鼠标移动处理
const handleMouseMove = (event) => {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY
  }
}

// 获取幻灯片布局信息
const updateSlideRect = () => {
  const layout = document.querySelector('.slidev-layout')
  if (layout) {
    slideRect.value = layout.getBoundingClientRect()
  }
}

// 切换函数
const toggleGrid = () => {
  showGrid.value = !showGrid.value
}

const toggleCursor = () => {
  showCursor.value = !showCursor.value
}

const toggleEnabled = () => {
  isCoordinateEnabled.value = !isCoordinateEnabled.value
  if (isCoordinateEnabled.value) {
    // 开启时默认显示网格和坐标
    showGrid.value = true
    showCursor.value = true
    updateSlideRect()
  }
}

// 键盘快捷键
const handleKeyDown = (event) => {
  if (event.ctrlKey && event.key === 'g') {
    event.preventDefault()
    toggleGrid()
  }
  if (event.ctrlKey && event.key === 'c') {
    event.preventDefault()
    toggleCursor()
  }
  if (event.ctrlKey && event.key === '\\') {
    event.preventDefault()
    toggleEnabled()
  }
}

onMounted(() => {
  // 监听鼠标移动
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('keydown', handleKeyDown)
  
  // 监听窗口大小变化
  window.addEventListener('resize', updateSlideRect)
  
  // 监听幻灯片切换
  const observer = new MutationObserver(() => {
    updateSlideRect()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('resize', updateSlideRect)
    observer.disconnect()
  })
})
</script>

<style scoped>
/* 原有的布局样式保持不变 */
.slidev-layout.default {
  position: relative;
}

.slide-content {
  position: relative;
}

/* 全局坐标系样式 */
.coordinate-system-global {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* 不干扰鼠标事件 */
  z-index: 9999; /* 确保在幻灯片之上 */
}

.coordinate-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.grid-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
}

.axis-x, .axis-y {
  position: absolute;
  background: rgba(59, 130, 246, 0.3);
}

.axis-x {
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
}

.axis-y {
  top: 0;
  left: 0;
  bottom: 0;
  width: 1px;
}

.tick-x, .tick-y {
  position: absolute;
  font-size: 10px;
  color: rgba(59, 130, 246, 0.5);
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 4px;
  border-radius: 2px;
}

.tick-x {
  bottom: 5px;
  transform: translateX(-50%);
}

.tick-y {
  left: 5px;
  transform: translateY(-50%);
}

.cursor-coordinates {
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: monospace;
  pointer-events: none;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  min-width: 120px;
  text-align: center;
}

.coord-percentage {
  font-size: 10px;
  color: #aaa;
  margin-top: 4px;
}

.coordinate-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 10000; /* 控制面板在最上层 */
  pointer-events: auto; /* 允许控制面板交互 */
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.control-btn {
  background: var(--slidev-theme-primary);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  pointer-events: auto;
}

.control-btn:hover {
  opacity: 0.9;
}

.grid-slider {
  width: 100px;
  pointer-events: auto;
}
</style>