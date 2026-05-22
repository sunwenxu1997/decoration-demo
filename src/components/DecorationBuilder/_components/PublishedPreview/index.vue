<template>
  <div class="published-preview-container" >
    <div class="preview-content">
      <div 
        v-for="element in initData" 
        :key="element.id"
        class="component-item"
        :class="{ 'component-item--sticky-allowed': isStickyEnabled(element) }"
        :style="getComponentStyle(element)"
        :data-component-id="element.id"
      >
        <div class="component-content">
          <component 
            :is="loadedPreviews[element.type]"
            :init-data="element.props"
          />
        </div>
      </div>
      
      <div v-if="initData.length === 0" class="empty-state">
        <a-icon type="info-circle" :style="{ fontSize: '25px', color: '#ccc' }" />
        <p>暂无页面内容</p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件注册表
import { widgets } from '../../widgets'

// 创建组件映射
const widgetMap = {}
widgets.forEach(widget => {
  widgetMap[widget.type] = widget.Preview
})

export default {
  name: 'PublishedPreview',
  components: {
    // 注册所有预览组件
    ...widgets.reduce((acc, widget) => {
      acc[widget.Preview.name] = widget.Preview
      return acc
    }, {})
  },
  props: {
    // 组件数据数组
    initData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      loadedPreviews: widgetMap
    }
  },
  methods: {
    // 判断组件是否启用了sticky吸顶（如锚点导航）
    isStickyEnabled(element) {
      return element.props && element.props.sticky
    },
    // 获取组件的间距样式
    getComponentStyle(element) {
      const style = element.style || {}
      return {
        paddingTop: `${style.paddingTop || 0}px`,
        paddingBottom: `${style.paddingBottom || 0}px`,
        paddingLeft: `${style.paddingLeft || 0}px`,
        paddingRight: `${style.paddingRight || 0}px`
      }
    }
  }
}
</script>

<style scoped>
.published-preview-container {
  flex: 1;
  overflow-y: auto;
}
/* 自定义滚动样式 */
.published-preview-container::-webkit-scrollbar {
  width: 3px;
}

.published-preview-container::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.published-preview-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.published-preview-container::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.preview-content {
  background-color: white;
  position: relative;
}

.component-item {
  width: 100%;
  box-sizing: border-box;
}

/* 允许子组件使用sticky定位（如锚点导航吸顶） */
.component-item--sticky-allowed {
  overflow: visible !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 1 !important;
}

.component-content {
  width: 100%;
  height: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #ccc;
  margin-top: calc(100% - 150px);
}

.empty-state p {
  margin-top: 10px;
  font-size: 12px;
}
</style>