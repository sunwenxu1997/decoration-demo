<template>
  <div class="spacing-editor">
    <div class="spacing-editor__header" @click="toggleCollapse">
      <span class="spacing-editor__title">组件间距</span>
      <a-icon style="font-size: 10px;" :type="collapsed ? 'down' : 'up'" />
    </div>
    <div v-show="!collapsed" class="spacing-editor__body">
      <div class="spacing-editor__grid">
        <div class="spacing-editor__item">
          <span class="spacing-editor__label">上</span>
          <a-input-number
            :value="value.paddingTop"
            :min="0"
            :max="100"
            :step="1"
            size="small"
            @change="(val) => handleChange('paddingTop', val)"
          />
        </div>
        <div class="spacing-editor__item">
          <span class="spacing-editor__label">下</span>
          <a-input-number
            :value="value.paddingBottom"
            :min="0"
            :max="100"
            :step="1"
            size="small"
            @change="(val) => handleChange('paddingBottom', val)"
          />
        </div>
        <div class="spacing-editor__item">
          <span class="spacing-editor__label">左</span>
          <a-input-number
            :value="value.paddingLeft"
            :min="0"
            :max="100"
            :step="1"
            size="small"
            @change="(val) => handleChange('paddingLeft', val)"
          />
        </div>
        <div class="spacing-editor__item">
          <span class="spacing-editor__label">右</span>
          <a-input-number
            :value="value.paddingRight"
            :min="0"
            :max="100"
            :step="1"
            size="small"
            @change="(val) => handleChange('paddingRight', val)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpacingEditor',
  props: {
    value: {
      type: Object,
      default: () => ({
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
      })
    },
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    handleChange(key, val) {
      this.$emit('input', {
        ...this.value,
        [key]: val || 0
      })
    }
  }
}
</script>

<style scoped>
.spacing-editor {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
}

.spacing-editor__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background-color: #fafafa;
  cursor: pointer;
  user-select: none;
}

.spacing-editor__header:hover {
  background-color: #f0f0f0;
}

.spacing-editor__title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.spacing-editor__body {
  padding: 12px;
}

.spacing-editor__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.spacing-editor__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spacing-editor__label {
  font-size: 12px;
  color: #666;
  min-width: 20px;
  text-align: center;
}

.spacing-editor__item .ant-input-number {
  flex: 1;
  width: 100%;
}
</style>
