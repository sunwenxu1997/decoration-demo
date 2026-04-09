<template>
  <div class="property-editor">
    <h3>组件属性</h3>
    <div class="property-content">
      <component 
        v-if="currentEditor"
        :is="currentEditor"
        :component="localComponent"
        ref="componentEditor"
      />
      <div v-else class="no-properties">
        该组件暂无可编辑属性
      </div>
    </div>
    
    <div class="property-footer">
      <a-button type="primary" @click="saveChanges">保存</a-button>
    </div>
  </div>
</template>

<script>
// 引入组件注册表
import { widgets } from '../widgets'
// 引入工具函数
import { deepClone } from '@/utils'

// 创建编辑器组件映射
const editorMap = {}
widgets.forEach(widget => {
  editorMap[widget.type] = widget.Editor
})

export default {
  name: 'PropertyEditor',
  components: {
    // 注册所有编辑器组件
    ...widgets.reduce((acc, widget) => {
      acc[widget.Editor.name] = widget.Editor
      return acc
    }, {})
  },
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localComponent: deepClone(this.component),
      currentEditor: null
    }
  },
  watch: {
    component: {
      handler(newVal) {
        this.localComponent = deepClone(newVal)
        this.loadComponentEditor(newVal.type)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loadComponentEditor(type) {
      // 从映射中直接获取编辑器组件
      if (editorMap[type]) {
        this.currentEditor = editorMap[type]
      } else {
        console.error(`No editor found for component type: ${type}`)
        this.currentEditor = null
      }
    },
    
    saveChanges() {
      // 从编辑器组件获取更新后的组件数据
      if (this.$refs.componentEditor && this.$refs.componentEditor.localComponent) {
        this.$emit('update-component', this.$refs.componentEditor.localComponent)
      } else {
        this.$emit('update-component', this.localComponent)
      }
    }
  }
}
</script>

<style scoped>
.property-editor {
  width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

.property-editor h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.property-content {
  max-height: calc(100vh - 170px);
  overflow-y: auto;
}

.image-item,
.news-item {
  position: relative;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 15px;
}

.image-item .ant-btn,
.news-item .ant-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}

.no-properties {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.property-footer {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
}
</style>