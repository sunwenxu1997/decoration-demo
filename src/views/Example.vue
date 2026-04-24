<template>
  <div class="example-container">
    <BannerPreview :init-data="bannerData" />
    <NewsListPreview :init-data="newsListData" />
    <PublishedPreview :init-data="initialComponents" />
  </div>
</template>

<script>
import { PublishedPreview } from 'opple-decoration'
import { widgetComponents } from '../components/DecorationBuilder'
const { BannerPreview, NewsListPreview } = widgetComponents
export default {
  name: 'ExampleView',
  components: {
    // 纯预览组件
    PublishedPreview,
    BannerPreview,
    NewsListPreview
  },
  data() {
    return {
      // 初始组件数据（用于编辑器）
      initialComponents: [
        {
          id: 'banner-1',
          type: 'banner',
          props: {
            images: [
              { url: 'https://picsum.photos/800/450?random=1', link: '' },
              { url: 'https://picsum.photos/800/450?random=2', link: '' },
              { url: 'https://picsum.photos/800/450?random=3', link: '' }
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
            title: '最新资讯',
            news: [
              { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: 'https://www.baidu.com' },
              { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' },
              { id: 3, title: '如何选择合适的装修材料', date: '2026-04-03', link: '' },
              { id: 4, title: '现代简约风格装修案例', date: '2026-04-04', link: '' }
            ],
            showDate: true
          }
        }
      ],
      // 单个Banner组件数据
      bannerData: {
        images: [
          { url: 'https://picsum.photos/800/450?random=4', link: '' },
          { url: 'https://picsum.photos/800/450?random=5', link: '' }
        ],
        autoPlay: true,
        interval: 4000,
        dots: true,
        arrows: true
      },
      // 单个News组件数据
      newsListData: {
        title: '最新资讯',
        news: [
          { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: 'https://www.baidu.com' },
          { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' },
          { id: 3, title: '如何选择合适的装修材料', date: '2026-04-03', link: '' },
          { id: 4, title: '现代简约风格装修案例', date: '2026-04-04', link: '' }
        ],
        showDate: true
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped></style>