<template>
  <a-modal
    :visible="visible"
    title="选择组件"
    :footer="null"
    width="600px"
    @cancel="handleCancel"
  >
    <div class="component-selector">
      <div class="component-category">
        <h3>基础组件</h3>
        <div class="component-list">
          <div 
            class="component-card"
            v-for="component in availableComponents"
            :key="component.type"
            @click="handleSelectComponent(component.type)"
          >
            <div class="component-icon">
              <a-icon :type="component.icon" />
            </div>
            <div class="component-info">
              <h4>{{ component.name }}</h4>
              <p>{{ component.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
// 引入组件注册表
import { components } from '../widgets'

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
      // 从组件注册表获取可用组件列表
      return components.map(component => ({
        type: component.type,
        name: component.name,
        description: component.description,
        icon: component.icon
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
  max-height: 400px;
  overflow-y: auto;
}

.component-category {
  margin-bottom: 20px;
}

.component-category h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 8px;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.component-card {
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;
}

.component-card:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.component-icon {
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 10px;
}

.component-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.component-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style>