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
// 引入组件工具函数
import { getWidgetDefaultProps } from '@/utils/componentUtils'

export default {
  name: 'DecorationBuilder',
  components: {
    // 基础组件
    Editor,
    Preview,
    Selector
  },
  props: {
    // 初始组件数据，用于页面初始化渲染
    initialComponents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      components: [],
      showComponentSelector: false,
      selectedComponentId: null
    }
  },
  created() {
    // 如果有初始数据，复制到组件列表中
    if (this.initialComponents && this.initialComponents.length > 0) {
      this.components = [...this.initialComponents]
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
        // 从组件配置中获取默认属性
        props: getWidgetDefaultProps(componentType)
      }
      
      // 检查是否需要在选中组件后面插入
      if (this.selectedComponentId) {
        const index = this.components.findIndex(comp => comp.id === this.selectedComponentId)
        if (index !== -1) {
          // 在选中组件后面插入新组件
          this.components.splice(index + 1, 0, newComponent)
        } else {
          // 如果找不到选中组件，默认添加到末尾
          this.components.push(newComponent)
        }
      } else {
        // 默认添加到末尾
        this.components.push(newComponent)
      }
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
      this.showComponentSelector = true
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