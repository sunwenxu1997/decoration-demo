<template>
  <div class="decoration-builder">
    <div class="builder-header">
      <h2>组件装修页面</h2>
      <a-button type="primary" @click="showComponentSelector = true">添加组件</a-button>
    </div>
    
    <div class="builder-content">
      <!-- 中间移动端预览 -->
      <Preview 
        :components="components" 
        :selected-component-id="selectedComponentId"
        @select-component="handleSelectComponent"
        @delete-component="handleDeleteComponent"
        @insert-component="handleInsertComponent"
        @update-order="handleUpdateOrder"
      />
      
      <!-- 右侧属性编辑 -->
      <Editor 
        v-if="selectedComponent"
        :component="selectedComponent"
        @update-component="handleUpdateComponent"
      />
    </div>
    
    <!-- 组件选择弹窗 -->
    <Selector 
      :visible="showComponentSelector"
      @update:visible="showComponentSelector = $event"
      @select-component="handleAddComponent"
    />
  </div>
</template>

<script>
// 引入基础组件
import Editor from './bases/editor.vue'
import Preview from './bases/preview.vue'
import Selector from './bases/selector.vue'

// 引入组件注册表
import { getComponentDefaultProps } from './widgets'

export default {
  name: 'DecorationBuilder',
  components: {
    // 基础组件
    Editor,
    Preview,
    Selector
  },
  data() {
    return {
      components: [],
      showComponentSelector: false,
      selectedComponentId: null
    }
  },
  computed: {
    selectedComponent() {
      return this.components.find(comp => comp.id === this.selectedComponentId)
    }
  },
  methods: {
    generateId() {
      return Date.now() + Math.random().toString(36).substr(2, 9)
    },
    
    handleAddComponent(componentType) {
      const newComponent = {
        id: this.generateId(),
        type: componentType,
        // 从组件注册表获取默认属性
        props: getComponentDefaultProps(componentType)
      }
      
      this.components.push(newComponent)
      this.selectedComponentId = newComponent.id
      this.showComponentSelector = false
    },
    
    handleSelectComponent(componentId) {
      this.selectedComponentId = componentId
    },
    
    handleDeleteComponent(componentId) {
      const index = this.components.findIndex(comp => comp.id === componentId)
      if (index > -1) {
        this.components.splice(index, 1)
        if (this.selectedComponentId === componentId) {
          this.selectedComponentId = null
        }
      }
    },
    
    handleInsertComponent() {
      this.selectedComponentId = null
      this.showComponentSelector = true
      // 这里可以记录插入位置，后续在handleAddComponent中处理
    },
    
    handleUpdateOrder(newComponents) {
      this.components = newComponents
    },
    
    handleUpdateComponent(updatedComponent) {
      const index = this.components.findIndex(comp => comp.id === updatedComponent.id)
      if (index > -1) {
        this.components.splice(index, 1, updatedComponent)
      }
    }
  }
}
</script>

<style scoped>
.decoration-builder {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.builder-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.builder-header h2 {
  margin: 0;
  color: #333;
}

.builder-content {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
}
</style>