<template>
  <div class="mobile-preview-container">
    <div class="browser-preview">
      <div class="browser-header">
        <div class="browser-toolbar">
          <div 
            class="toolbar-btn" 
            @click="$emit('close-editor')"
            title="预览"
          >
            <a-icon type="eye"/>
          </div>
          <div 
            class="toolbar-btn" 
            @click="$emit('show-selector')"
            title="添加组件"
          >
            <a-icon type="plus-circle"  />
          </div>
        </div>
      </div>
      <div class="browser-content">
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
                :data="element.props"
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
                  <a-menu-item @click="handleInsertComponent()">
                    <a-icon type="plus-circle" style="margin-right: 8px;" />
                    添加组件
                  </a-menu-item>
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
          <p>点击右下角添加组件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// 引入组件注册表
import { widgets } from '../widgets'

// 创建组件映射
const widgetMap = {}
widgets.forEach(widget => {
  widgetMap[widget.type] = widget.Preview
})

export default {
  name: 'MobilePreview',
  components: {
    draggable,
    // 注册所有预览组件
    ...widgets.reduce((acc, widget) => {
      acc[widget.Preview.name] = widget.Preview
      return acc
    }, {})
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
      loadedPreviews: widgetMap
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
    
    handleInsertComponent() {
      this.$emit('insert-component')
    },
    
    handleDragEnd() {
      // 拖拽结束后通知父组件更新顺序
      this.$emit('update-order', [...this.components])
    }
  }
}
</script>

<style scoped>
.mobile-preview-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
}

/* 浏览器样式 */
.browser-preview {
  /* 保持375:812的比例 */
  aspect-ratio: 375 / 812;
  width: 375px;
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 100px);
  /* 等比例缩放 */
  width: min(375px, calc((100vh - 100px) * (375 / 812)));
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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

/* 浏览器工具栏 */
.browser-toolbar {
  display: flex;
  gap: 5px;
  align-items: center;
}

/* 工具栏按钮 */
.toolbar-btn {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toolbar-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 浏览器控制按钮已移除 */

.browser-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  /* 内容不可选中 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 组件样式 */
.component-item {
  position: relative;
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: move;
  overflow: hidden;
}

.component-item:hover {
  border-color: #d9d9d9;
}

.component-selected {
  border-color: #1890ff !important;
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
  width: 28px;
  height: 28px;
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