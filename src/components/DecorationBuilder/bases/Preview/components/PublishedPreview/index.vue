<template>
  <div class="published-preview-container" >
    <div class="preview-content">
      <div 
        v-for="element in initData" 
        :key="element.id"
        class="component-item"
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
import { widgets } from '../../../../widgets'

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