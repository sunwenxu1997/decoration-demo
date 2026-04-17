<template>
  <div class="browser-toolbar">
    <div 
      class="toolbar-btn" 
      @click="handlePreview"
      :title="isPreviewing ? '关闭预览' : '预览'"
    >
      <a-icon v-if="!isPreviewing" type="eye"/>
      <a-icon v-else type="eye-invisible" />
    </div>
    <div 
      class="toolbar-btn" 
      @click="handlePublish"
      title="发布"
    >
      <a-icon type="check-circle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrowserToolbar',
  props: {
    // 可以添加需要的属性
  },
  emits: ['close-editor', 'publish'],
  data() {
    return {
      isPreviewing: false
    }
  },
  methods: {
    // 预览
    handlePreview() {
      this.isPreviewing = !this.isPreviewing
      this.$emit('preview', this.isPreviewing)
      // this.$router.push({ name: 'Published' })
    },
    handlePublish() {
      this.$emit('publish')
    }
  }
}
</script>

<style scoped>
/* 浏览器工具栏 */
.browser-toolbar {
  display: flex;
  gap: 5px;
  align-items: center;
}

/* 工具栏按钮 */
.toolbar-btn {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toolbar-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>