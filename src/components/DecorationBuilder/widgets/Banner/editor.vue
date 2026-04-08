<template>
  <div class="banner-editor">
    <a-form :model="localComponent.props" layout="vertical">
      <a-form-item label="自动播放">
        <a-switch v-model="localComponent.props.autoPlay" />
      </a-form-item>
      
      <a-form-item label="轮播间隔（毫秒）">
        <a-input-number 
          v-model="localComponent.props.interval" 
          :min="1000"
          :max="10000"
        />
      </a-form-item>
      
      <a-form-item label="图片列表">
        <div 
          v-for="(image, index) in localComponent.props.images" 
          :key="index"
          class="image-item"
        >
          <a-form-item :label="`图片 ${index + 1}`" :label-col="{ span: 24 }">
            <a-input 
              v-model="image.url" 
              placeholder="图片URL"
              style="margin-bottom: 8px"
            />
            <a-input 
              v-model="image.link" 
              placeholder="跳转链接（可选）"
            />
          </a-form-item>
          <a-button 
            type="text" 
            danger 
            size="small"
            @click="removeImage(index)"
          >
            删除
          </a-button>
        </div>
        <a-button type="dashed" block @click="addImage">
          <a-icon type="plus" /> 添加图片
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'BannerEditor',
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
    // 轮播图相关方法
    addImage() {
      this.localComponent.props.images.push({
        url: '',
        link: ''
      })
    },
    
    removeImage(index) {
      if (this.localComponent.props.images.length > 1) {
        this.localComponent.props.images.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.banner-editor {
  width: 100%;
}

.image-item {
  position: relative;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 15px;
}

.image-item .ant-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>