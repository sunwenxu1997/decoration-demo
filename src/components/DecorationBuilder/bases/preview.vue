<template>
  <div class="mobile-preview-container">
    <div class="mobile-frame">
      <div class="mobile-header">
        <div class="notch"></div>
      </div>
      <div class="mobile-content">
        <draggable 
          :list="components" 
          group="components"
          handle=".component-drag-handle"
          @end="handleDragEnd"
          :element="'div'"
        >
          <div 
            v-for="element in components" 
            :key="element.id"
            class="component-item"
            :class="{ 'component-selected': element.id === selectedComponentId }"
            @click="handleSelectComponent(element.id)"
          >
            <div class="component-drag-handle">
              <a-icon type="menu-unfold" />
            </div>
            
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
            
            <div class="component-actions">
              <a-button 
                type="text" 
                size="small"
                @click.stop="handleInsertComponent()"
              >
                <a-icon type="plus-circle" />
              </a-button>
              <a-button 
                type="text" 
                size="small" 
                danger
                @click.stop="handleDeleteComponent(element.id)"
              >
                <a-icon type="close-circle" />
              </a-button>
            </div>
          </div>
        </draggable>
        
        <div v-if="components.length === 0" class="empty-state">
          <a-icon type="plus-circle" :style="{ fontSize: '48px', color: '#ccc' }" />
          <p>点击右上角添加组件</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// 引入组件注册表
import { components } from '../widgets'

// 创建组件映射
const componentMap = {}
components.forEach(component => {
  componentMap[component.type] = component.Preview
})

export default {
  name: 'MobilePreview',
  components: {
    draggable,
    // 注册所有预览组件
    ...components.reduce((acc, component) => {
      acc[component.Preview.name] = component.Preview
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
      loadedPreviews: componentMap
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
}

.mobile-frame {
  width: 375px;
  height: 812px;
  border: 10px solid #333;
  border-radius: 40px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
}

.mobile-header {
  height: 44px;
  background-color: #000;
  position: relative;
}

.notch {
  width: 180px;
  height: 22px;
  background-color: #000;
  border-radius: 0 0 20px 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.mobile-content {
  height: calc(100% - 44px);
  overflow-y: auto;
  padding: 10px;
}

.component-item {
  position: relative;
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.component-item:hover {
  background-color: #fafafa;
  border-color: #d9d9d9;
}

.component-selected {
  border-color: #1890ff !important;
  background-color: rgba(24, 144, 255, 0.05);
}

.component-drag-handle {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
  color: #999;
  cursor: move;
  z-index: 10;
}

.component-content {
  padding-left: 30px;
}

.component-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.component-item:hover .component-actions {
  opacity: 1;
}

.component-selected .component-actions {
  opacity: 1;
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
}

.empty-state p {
  margin-top: 10px;
  font-size: 14px;
}
</style>