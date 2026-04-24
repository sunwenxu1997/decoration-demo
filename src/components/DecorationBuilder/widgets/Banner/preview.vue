<template>
  <div class="banner-component">
    <a-carousel 
      v-if="initData.images && initData.images.length > 0"
      :autoplay="initData.autoPlay"
      :dots="true"
      :autoplaySpeed="initData.interval"
      :style="{ height: '200px' }"
    >
      <div 
        v-for="(image, index) in initData.images" 
        :key="index"
        class="carousel-item"
      >
        <a v-if="image.link" :href="image.link" target="_blank">
          <img 
            :src="image.url || 'https://via.placeholder.com/375x200'" 
            :alt="`轮播图 ${index + 1}`"
            class="carousel-image"
          />
        </a>
        <img 
          v-else
          :src="image.url || 'https://via.placeholder.com/375x200'" 
          :alt="`轮播图 ${index + 1}`"
          class="carousel-image"
        />
      </div>
    </a-carousel>
    <div v-else class="empty-banner">
      请添加轮播图片
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerPreview',
  props: {
    initData: {
      type: Object,
      default: () => ({
        images: [],
        autoPlay: true,
        interval: 3000
      })
    }
  }
}
</script>

<style scoped>
.banner-component {
  width: 100%;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none; /* 禁止图片被点击, 否则会影响组件拖拽 */
}

.empty-banner {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #999;
  border: 1px dashed #d9d9d9;
}
</style>