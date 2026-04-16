<template>
  <div class="browser-toolbar">
    <div 
      class="toolbar-btn" 
      @click="$emit('close-editor')"
      title="预览"
    >
      <a-icon type="eye"/>
    </div>
    <div 
      class="toolbar-btn" 
      @click="$emit('publish')"
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
  emits: ['close-editor', 'publish']
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