<template>
  <a-modal
    :visible="visible"
    title=""
    :footer="null"
    :closable="false"
    width="600px"
    @cancel="handleCancel"
  >
    <div class="component-selector">
      <div class="component-list">
        <div 
          class="component-card"
          v-for="component in availableComponents"
          :key="component.type"
          @click="handleSelectComponent(component.type)"
          :title="component.description"
        >
          <div class="component-icon">
            <a-icon :type="component.icon" />
          </div>
          <div class="component-info">
            <h4>{{ component.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
// 引入组件类型定义和元数据
import { COMPONENT_METADATA, getAllComponentTypes } from '../../config/componentTypes'

export default {
  name: 'ComponentSelector',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    availableComponents() {
      // 从组件元数据配置获取可用组件列表
      return getAllComponentTypes().map(type => ({
        type,
        name: COMPONENT_METADATA[type].name,
        description: COMPONENT_METADATA[type].description,
        icon: COMPONENT_METADATA[type].icon
      }))
    }
  },
  methods: {
    handleSelectComponent(componentType) {
      this.$emit('select-component', componentType)
      this.$emit('update:visible', false)
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
.component-selector {
  height: 100%;
  min-height: 400px;
  padding: 20px;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  gap: 10px;
  padding: 0 10px;
}

.component-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
  width: 120px;
  height: 120px;
}

.component-card:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.component-icon {
  font-size: 28px;
  color: #1890ff;
  margin-bottom: 8px;
}

.component-info h4 {
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: center;
  font-weight: 500;
}
</style>