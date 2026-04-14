<template>
  <div class="decoration-builder">
    
    <div class="builder-content">
      <!-- 中间移动端预览 -->
      <Preview 
        :components="components" 
        :selected-component-id="selectedComponentId"
        @select-component="handleSelectComponent"
        @delete-component="handleDeleteComponent"
        @insert-component="handleInsertComponent"
        @update-order="handleUpdateOrder"
        @close-editor="closeEditor"
        @show-selector="showComponentSelector = true"
        @publish="handlePublish"
      />
    </div>
      <!-- 右侧属性编辑 -->
      <Editor 
        v-if="selectedComponent"
        :component="selectedComponent"
        @update-component="handleUpdateComponent"
      />
    <!-- 组件选择弹窗 -->
    <Selector 
      :visible="showComponentSelector"
      @update:visible="showComponentSelector = $event"
      @select-component="handleAddComponent"
    />
  </div>
</template>

<script>
import Editor from './bases/Editor/index'
import Preview from './bases/Preview/index'
import Selector from './bases/Selector/index'

// 引入工具函数
import { generateId } from '@/utils'
// 引入默认属性配置
import { getDefaultProps } from './config/defaultProps'

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
    handleAddComponent(componentType) {
      const newComponent = {
        id: generateId(),
        type: componentType,
        // 从配置文件获取默认属性
        props: getDefaultProps(componentType)
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
    },
    closeEditor() {
      // 关闭编辑器（取消选中组件）
      this.selectedComponentId = null
    },
    
    handlePublish() {
      // 处理发布逻辑
      console.log('发布组件内容:', this.components)
      // 这里可以添加发布到服务器的逻辑
      alert('组件已发布！')
    }
  }
}
</script>

<style scoped>
.decoration-builder {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
}


.builder-content {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}
</style>