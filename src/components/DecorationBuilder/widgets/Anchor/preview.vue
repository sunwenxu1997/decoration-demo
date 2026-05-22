<template>
  <div class="anchor-component" :class="{ 'anchor-sticky': initData.sticky }" :style="anchorStyle">
    <div class="anchor-nav">
      <div
        v-for="(item, index) in initData.items"
        :key="index"
        class="anchor-nav__item"
        :class="{ 'anchor-nav__item--active': activeIndex === index }"
        :style="itemStyle(index)"
        @click="handleClick(item, index)"
      >
        {{ item.title || `导航${index + 1}` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnchorPreview',
  props: {
    initData: {
      type: Object,
      default: () => ({
        items: [],
        sticky: true,
        backgroundColor: '',
        activeColor: '',
        textColor: ''
      })
    }
  },
  data() {
    return {
      activeIndex: 0,
      scrollContainer: null,
      // 是否由点击触发的滚动（避免滚动时覆盖用户点击的高亮）
      isClickScrolling: false
    }
  },
  computed: {
    anchorStyle() {
      return {
        backgroundColor: this.initData.backgroundColor
      }
    }
  },
  mounted() {
    this.findScrollContainer()
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    // 向上查找滚动容器
    findScrollContainer() {
      let el = this.$el.parentElement
      while (el) {
        const style = window.getComputedStyle(el)
        if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          this.scrollContainer = el
          return
        }
        el = el.parentElement
      }
      // 降级到 window
      this.scrollContainer = window
    },

    // 滚动监听：根据当前位置自动高亮对应导航项
    handleScroll() {
      if (this.isClickScrolling) return

      const items = this.initData.items || []
      let closestIndex = -1
      let closestTop = Infinity

      items.forEach((item, index) => {
        if (!item.targetId) return
        const targetEl = document.querySelector(`[data-component-id="${item.targetId}"]`)
        if (!targetEl) return

        const containerRect = this.scrollContainer === window
          ? { top: 0 }
          : this.scrollContainer.getBoundingClientRect()
        const rect = targetEl.getBoundingClientRect()
        // 计算目标元素相对于滚动容器顶部的距离
        const relativeTop = rect.top - containerRect.top

        // 找到最接近顶部且已经滚过（relativeTop <= 阈值）的那个
        if (relativeTop <= 60 && Math.abs(relativeTop) < closestTop) {
          closestTop = Math.abs(relativeTop)
          closestIndex = index
        }
      })

      if (closestIndex !== -1) {
        this.activeIndex = closestIndex
      }
      
    },

    itemStyle(index) {
      const isActive = this.activeIndex === index
      return {
        color: isActive ? (this.initData.activeColor) : (this.initData.textColor),
        borderBottomColor: isActive ? (this.initData.activeColor) : 'transparent'
      }
    },
    handleClick(item, index) {
      this.activeIndex = index
      // 如果绑定了目标组件ID，滚动到对应位置
      if (item.targetId) {
        this.isClickScrolling = true
        this.scrollToTarget(item.targetId)
        // 滚动动画结束后恢复滚动监听高亮
        setTimeout(() => {
          this.isClickScrolling = false
        }, 600)
      }
    },
    scrollToTarget(targetId) {
      // 查找目标组件元素（通过 data-component-id 属性定位）
      const targetEl = document.querySelector(`[data-component-id="${targetId}"]`)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
.anchor-component {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #e8e8e8;
  z-index: 10;
}

.anchor-sticky {
  position: sticky;
  top: 0;
}

.anchor-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.anchor-nav::-webkit-scrollbar {
  display: none;
}

.anchor-nav__item {
  flex-shrink: 0;
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;
  white-space: nowrap;
  text-align: center;
  user-select: none;
}

.anchor-nav__item:hover {
  opacity: 0.8;
}

.anchor-nav__item--active {
  font-weight: 500;
  color: var(--primary-color); /* 使用主题色 */
  border-color: var(--primary-color); /* 使用主题色 */
}
</style>
