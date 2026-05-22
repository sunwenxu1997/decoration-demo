<template>
  <div class="anchor-editor">
    <a-form :model="localComponent.props" layout="vertical">
      <!-- 吸顶开关 -->
      <a-form-item label="吸顶效果">
        <a-switch v-model="localComponent.props.sticky" />
        <span class="form-hint">开启后滚动时导航栏自动吸顶</span>
      </a-form-item>

      <!-- 导航项列表 -->
      <a-form-item label="导航选项">
        <div 
          v-for="(item, index) in localComponent.props.items"
          :key="index"
          class="nav-item"
        >
          <a-form-item :label="`选项 ${index + 1}`" :label-col="{ span: 24 }">
            <a-input 
              v-model="item.title" 
              placeholder="导航标题"
              style="margin-bottom: 8px"
            />
            <a-input 
              v-model="item.targetId" 
              placeholder="目标组件ID（从组件列表中获取）"
            >
              <a-icon slot="prefix" type="link" />
            </a-input>
          </a-form-item>
          <a-button 
            type="text" 
            danger 
            size="small"
            @click="removeItem(index)"
          >
            删除
          </a-button>
        </div>
        <a-button type="dashed" block @click="addItem">
          <a-icon type="plus" /> 添加选项
        </a-button>
      </a-form-item>

      <!-- 颜色配置 -->
      <a-form-item label="背景颜色">
        <div class="color-row">
          <input type="color" v-model="localComponent.props.backgroundColor" class="color-picker" />
          <a-input v-model="localComponent.props.backgroundColor" style="flex: 1" />
        </div>
      </a-form-item>

      <a-form-item label="文字颜色">
        <div class="color-row">
          <input type="color" v-model="localComponent.props.textColor" class="color-picker" />
          <a-input v-model="localComponent.props.textColor" style="flex: 1" />
        </div>
      </a-form-item>

      <a-form-item label="选中颜色">
        <div class="color-row">
          <input type="color" v-model="localComponent.props.activeColor" class="color-picker" />
          <a-input v-model="localComponent.props.activeColor" style="flex: 1" />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'AnchorEditor',
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localComponent: JSON.parse(JSON.stringify(this.component))
    }
  },
  watch: {
    component: {
      handler(newVal) {
        this.localComponent = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  },
  methods: {
    addItem() {
      this.localComponent.props.items.push({
        title: `导航${this.localComponent.props.items.length + 1}`,
        targetId: ''
      })
    },
    removeItem(index) {
      if (this.localComponent.props.items.length > 1) {
        this.localComponent.props.items.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.anchor-editor {
  width: 100%;
}

.nav-item {
  position: relative;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 15px;
}

.nav-item .ant-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}

.form-hint {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
}

.color-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-picker {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  background: none;
}
</style>
