<template>
  <div id="app">
    <DecorationBuilder 
     :init-data="initialComponents"
     @add-component="handleAddComponent"
     @delete-component="handleDeleteComponent"
     @update-component="handleUpdateComponent"
     @select-component="handleSelectComponent"
     @close-editor="handleCloseEditor"
     @publish="handlePublish"
     @update-order="handleUpdateOrder"
     >

    </DecorationBuilder>
  </div>
</template>

<script>
import DecorationBuilder from '../components/DecorationBuilder/index.vue'

export default {
  name: 'HomeView',
  components: {
    DecorationBuilder,
  },
  data() {
    return {
      initialComponents: [
        {
          id: 'banner-1',
          type: 'banner',
          props: {
            images: [
              { url: 'https://picsum.photos/800/450?random=1', link: '' },
              { url: 'https://picsum.photos/800/450?random=2', link: '' }
            ],
            autoPlay: true,
            interval: 3000,
            dots: true,
            arrows: false
          }
        },
        {
          id: 'news-1',
          type: 'newsList',
          props: {
            title: '最新资讯aaaaa',
            news: [
              { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
              { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' }
            ],
            showDate: true,
          }
        }
      ]
    }
  },
  methods: {
    handleAddComponent(component) {
      console.log('添加组件:', component);
      
    },
    handleDeleteComponent(componentId) {
      console.log('删除组件:', componentId);
    },
    handleUpdateComponent(component) {
      console.log('更新组件:', component);
    },
    handleSelectComponent(component) {
      console.log('选择组件:', component);
    },
    handleCloseEditor() {
      console.log('关闭编辑器');
    },
    handleUpdateOrder(components) {
      console.log('更新组件排序:', components);
    },
    handlePublish(components) {
      console.log('发布组件:', components);
    }
  }
}
</script>

<style>
</style>
