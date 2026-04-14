<template>
  <div class="size-editor">
    <a-input-number
      v-model="localWidth"
      :min="200"
      :max="2000"
      :precision="0"
      :step="5"
      size="small"
      placeholder="宽度"
      class="size-input"
      @change="handleWidthChange"
      @pressEnter="handleWidthChange"
      :style="{ width: '60px' }"
    />
    <span class="size-separator">×</span>
    <a-input-number
      v-model="localHeight"
      :min="300"
      :max="2000"
      :precision="0"
      :step="5"
      size="small"
      placeholder="高度"
      class="size-input"
      @change="handleHeightChange"
      @pressEnter="handleHeightChange"
      :style="{ width: '60px' }"
    />
  </div>
</template>

<script>
export default {
  name: 'SizeEditor',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localWidth: this.width,
      localHeight: this.height
    }
  },
  watch: {
    width(newVal) {
      this.localWidth = newVal
    },
    height(newVal) {
      this.localHeight = newVal
    }
  },
  methods: {
    handleWidthChange() {
      this.$emit('update-width', this.localWidth)
      this.handleSizeChange()
    },
    handleHeightChange() {
      this.$emit('update-height', this.localHeight)
      this.handleSizeChange()
    },
    handleSizeChange() {
      this.$emit('update-size', {
        width: this.localWidth,
        height: this.localHeight
      })
    }
  }
}
</script>

<style scoped>
.size-editor {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  position: absolute;
  top: -20px;
}

.size-input {
  margin: 0;
  text-align: center;
}

.size-separator {
  color: #666;
  font-weight: 500;
}
</style>