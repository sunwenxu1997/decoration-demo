<template>
  <div class="mobile-preview-container">
    <!-- 尺寸编辑器 -->
    <SizeEditor 
      :width="previewWidth" 
      :height="previewHeight"
      @update-size="handleSizeChange"
    />
    <div class="browser-preview" :style="previewStyle">
      <div class="browser-header">
        <BrowserToolbar 
          @preview="handlePreview"
          @publish="$emit('publish')"
        />
      </div>
      <div v-if="!isPreviewing" class="browser-content">
        <draggable 
          :list="components" 
          group="components"
          handle=".component-item"
          @end="handleDragEnd"
          :element="'div'"
        >
          <div 
            v-for="element in components" 
            :key="element.id"
            class="component-item"
            :class="{ 'component-selected': element.id === selectedComponentId }"
            @click.stop="handleSelectComponent(element.id)"
          >
            <div class="component-content">
              <component 
                v-if="isComponentLoaded(element.type)"
                :is="loadedPreviews[element.type]"
                :init-data="element.props"
              />
              <div v-else class="loading-component">
                <a-spin />
              </div>
            </div>
            
            <!-- 更多操作按钮 -->
            <div class="component-actions">
              <a-dropdown 
                :trigger="['click']"
                @click.stop
              >
                <span class="more-btn">
                  <a-icon type="ellipsis" :style="{ fontSize: '16px', color: '#999' }" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item 
                    @click="handleDeleteComponent(element.id)"
                    style="color: #ff4d4f;"
                  >
                    <a-icon type="close-circle" style="margin-right: 8px;" />
                    删除组件
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </draggable>
        
        <div v-if="components.length === 0" class="empty-state">
          <a-icon type="plus-circle" :style="{ fontSize: '25px', color: '#ccc' }" />
          <p>点击左侧添加组件</p>
        </div>
      </div>
      <!-- 预览模式下的内容 -->
      <PublishedPreview 
        v-else
        :init-data="components"
      />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// 引入组件注册表
import { widgets } from '../../widgets'
// 引入尺寸编辑器组件
import SizeEditor from './components/SizeEditor'
// 引入工具栏组件
import BrowserToolbar from './components/BrowserToolbar'
// 引入预览设置配置
import { PREVIEW_SETTINGS } from '../../config/settings'
// 引入纯净预览组件
import PublishedPreview from './components/PublishedPreview'

// 创建组件映射
const widgetMap = {}
widgets.forEach(widget => {
  widgetMap[widget.type] = widget.Preview
})

export default {
  name: 'MobilePreview',
  components: {
    // 注册所有预览组件
    ...widgets.reduce((acc, widget) => {
      acc[widget.Preview.name] = widget.Preview
      return acc
    }, {}),
    // 注册基础组件
    draggable,
    SizeEditor,
    BrowserToolbar,
    PublishedPreview
  },
  props: {
    components: {
      type: Array,
      required: true
    },
    selectedComponentId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      loadedPreviews: widgetMap,
      // 使用配置文件中的默认尺寸
      previewWidth: PREVIEW_SETTINGS.MOBILE_WIDTH,
      previewHeight: PREVIEW_SETTINGS.MOBILE_HEIGHT,
      isPreviewing: false
    }
  },
  computed: {
    previewStyle() {
      // 计算最大允许尺寸，确保不超出窗口
      const maxWidth = window.innerWidth - 100
      const maxHeight = window.innerHeight - 100
      
      // 计算宽高比
      const aspectRatio = this.previewWidth / this.previewHeight
      
      // 确保等比例缩放且不超出窗口大小
      let width = this.previewWidth
      let height = this.previewHeight
      
      // 如果宽度超过最大允许宽度，按比例缩小
      if (width > maxWidth) {
        width = maxWidth
        height = width / aspectRatio
      }
      
      // 如果高度超过最大允许高度，按比例缩小
      if (height > maxHeight) {
        height = maxHeight
        width = height * aspectRatio
      }
      
      return {
        width: `${width}px`,
        aspectRatio: `${this.previewWidth} / ${this.previewHeight}`
      }
    }
  },
  methods: {
    isComponentLoaded(type) {
      return !!this.loadedPreviews[type]
    },
    
    handleSelectComponent(componentId) {
      this.$emit('select-component', componentId)
    },
    
    handleDeleteComponent(componentId) {
      this.$emit('delete-component', componentId)
    },
    
    handleDragEnd() {
      // 拖拽结束后通知父组件更新顺序
      this.$emit('update-order', [...this.components])
    },
    handleSizeChange(size) {
      // 更新尺寸并保持等比例
      const { width, height } = size
      if (!isNaN(width) && !isNaN(height)) {
        this.previewWidth = width
        this.previewHeight = height
      }
    },
    // 预览
    handlePreview(isPreviewing) {
      this.isPreviewing = isPreviewing
      this.$emit('close-editor')
    },
  }
}
</script>

<style scoped>
.mobile-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
}

/* 浏览器样式 */
.browser-preview {
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
}

.browser-header {
  height: 36px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #e0e0e0;
  justify-content: flex-end;
}

/* 浏览器工具栏样式已移至Toolbar组件 */

/* 浏览器控制按钮已移除 */

.browser-content {
  flex: 1;
  overflow-y: auto;
  /* padding: 10px; */
  /* 内容不可选中 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
/* 自定义滚动样式 */
.browser-content::-webkit-scrollbar {
  width: 3px;
}

.browser-content::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.browser-content::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.browser-content::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

/* 组件样式 */
.component-item {
  position: relative;
  /* margin-bottom: 10px; */
  border: 3px dashed transparent;
  /* border-radius: 8px; */
  /* transition: all 0.3s ease; */
  cursor: move;
  overflow: hidden;
}

.component-item:hover {
  border-color: #d9d9d9;
}

.component-selected {
  border-color: var(--primary-color) !important;
  background-color: rgba(24, 144, 255, 0.05);
}

.component-content {
  /* 移除左侧padding，因为没有拖拽图标了 */
  padding: 0;
}

/* 更多操作按钮样式 */
.component-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

/* 在选中或悬浮时显示操作按钮 */
.component-selected .component-actions {
  opacity: 1;
}

/* 更多按钮样式 */
.more-btn {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.more-btn:hover {
  background-color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.loading-component {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #fafafa;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #999;
  margin-top: calc(100% - 150px);
}

.empty-state p {
  margin-top: 10px;
  font-size: 12px;
}
</style>