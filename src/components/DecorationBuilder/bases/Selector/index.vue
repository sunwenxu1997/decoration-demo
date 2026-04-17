<template>
  <div class="component-selector-container">
    <!-- 组件选择器面板 -->
    <div class="component-selector" :class="{ 'expanded': isExpanded }">
      <!-- 展开/收缩按钮 -->
      <div class="toggle-btn" @click="isExpanded = !isExpanded" :title="isExpanded ? '收起组件列表' : '展开组件列表'">
        <a-icon :type="isExpanded ? 'left' : 'right'" />
      </div>

      <!-- 组件列表 -->
      <div class="component-list">
        <div class="component-card" v-for="component in availableComponents" :key="component.type"
          @click="handleSelectComponent(component.type)" :title="component.name">

          <!-- 标题和描述，在展开时显示 -->
          <div v-if="isExpanded" class="component-info">
            <div class="component-header">
              <a-icon class="component-icon" :type="component.icon" />
              <div class="component-name">{{ component.name }}</div>
            </div>
            <div class="component-desc">{{ component.description }}</div>
          </div>
          <a-icon v-else class="component-icon" :type="component.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件类型定义和元数据
import { COMPONENT_METADATA } from '../../config/componentTypes'
// 引入组件工具函数
import { getAllComponentTypes } from '@/utils/componentUtils'

export default {
  name: 'ComponentSelector',
  data() {
    return {
      isExpanded: false // 控制组件选择器的展开/收缩状态
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
    },
    closeSelector() {
      this.isExpanded = false
    }
  }
}
</script>

<style scoped>
/* 组件选择器容器 */
.component-selector-container {
  display: flex;
  align-items: stretch;
}

/* 组件选择器面板 */
.component-selector {
  width: 60px;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 展开/收缩按钮 */
.toggle-btn {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
}

.toggle-btn i {
  font-size: 10px;
}

.toggle-btn:hover {
  background-color: var(--primary-hover);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.1);
}

/* 组件列表 */
.component-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  padding: 5px;
  gap: 5px;
}

/* 自定义滚动条 */
.component-list::-webkit-scrollbar {
  width: 4px;
}

.component-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.component-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.component-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* 组件卡片 */
.component-card {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


/* 展开状态 */
.component-selector.expanded {
  width: 250px;
}

.component-selector.expanded .component-list {
  padding: 10px;
  gap: 10px;
}

/* 展开状态下的卡片 */
.component-selector.expanded .component-card {
  padding: 15px 20px;
  /* 组件展开时，上下排列 */
  flex-direction: column;
  aspect-ratio: 2 / 1;
  background: #f3f3f3;
}

.component-selector.expanded .component-icon {
  font-size: 18px;
  margin-right: 10px;
}

.component-selector.expanded .component-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.component-selector.expanded .component-info .component-name {
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  margin: 6px 0;
}

.component-selector.expanded .component-info .component-desc {
  font-size: 11px;
  color: #666;
}

.component-card:hover {
  background-color: #f1f6fc !important;
}

/* 组件图标 */
.component-icon {
  font-size: 14px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}
</style>