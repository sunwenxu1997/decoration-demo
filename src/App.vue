<template>
  <div id="app">
    <DecorationBuilder :initial-components="initialComponents" />
    <!-- <PublishedPreview :initial-components="initialComponents" /> -->
  </div>
</template>

<script>
import DecorationBuilder from './components/DecorationBuilder/index.vue'
// import PublishedPreview from './components/PublishedPreview/index.vue'

export default {
  name: 'App',
  components: {
    DecorationBuilder,
    // PublishedPreview
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
          type: 'news-list',
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
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
