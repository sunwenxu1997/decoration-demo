<template>
  <div class="decoration-builder">
    <!-- 组件选择器 -->
    <Selector 
      ref="selector"
      @select-component="handleAddComponent"
    />
    <div class="builder-content">
      <!-- 中间移动端预览 -->
      <Preview 
        :components="components" 
        :selected-component-id="selectedComponentId"
        @select-component="handleSelectComponent"
        @delete-component="handleDeleteComponent"
        @update-order="handleUpdateOrder"
        @close-editor="closeEditor"
        @publish="handlePublish"
      />
    </div>
      <!-- 右侧属性编辑 -->
      <Editor 
        v-if="selectedComponent"
        :component="selectedComponent"
        @update-component="handleUpdateComponent"
      />
  </div>
</template>

<script>
import Editor from './bases/Editor/index'
import Preview from './bases/Preview/index'
import Selector from './bases/Selector/index'

// 引入工具函数
import { generateId } from './utils'
// 引入组件工具函数
import { getWidgetDefaultProps } from './utils/componentUtils'

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
    initData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      components: [],
      selectedComponentId: null
    }
  },
  created() {
    // 如果有初始数据，复制到组件列表中
    if (this.initData && this.initData.length > 0) {
      this.components = [...this.initData]
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
      this.$emit('add-component', newComponent)
    },
    
    handleSelectComponent(componentId) {
      this.selectedComponentId = componentId
      this.$emit('select-component', componentId)
    },
    
    handleDeleteComponent(componentId) {
      const index = this.components.findIndex(comp => comp.id === componentId)
      if (index > -1) {
        this.components.splice(index, 1)
        if (this.selectedComponentId === componentId) {
          this.selectedComponentId = null
        }
      }
      this.$emit('delete-component', componentId)
    },
    
    handleUpdateOrder(newComponents) {
      this.components = newComponents
      this.$emit('update-order', newComponents)
    },
    
    handleUpdateComponent(updatedComponent) {
      const index = this.components.findIndex(comp => comp.id === updatedComponent.id)
      if (index > -1) {
        this.components.splice(index, 1, updatedComponent)
      }
      this.$emit('update-component', updatedComponent)
    },
    closeEditor() {
      // 关闭编辑器（取消选中组件）
      this.selectedComponentId = null
      // 关闭左侧组件选择框
      this.$refs.selector.closeSelector()
      this.$emit('close-editor')
    },
    
    handlePublish() {
      // 处理发布逻辑
      this.$emit('publish', this.components)
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