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
     @material-selector-open="handleSelectMaterialOpen"
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
      initialComponents: [{
        "id": "1779445422526b2xbyb2eb",
        "type": "anchor",
        "props": {
          "items": [
            {
              "title": "🏠 装修资讯",
              "targetId": "news-1"
            },
            {
              "title": "🎨 设计灵感",
              "targetId": "news-2"
            },
            {
              "title": "🛠️ 施工指南",
              "targetId": "news-3"
            }
          ],
          "sticky": true,
          "backgroundColor": "#ffffff",
          "activeColor": "",
          "textColor": "#333333"
        },
        "style": {
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0
        }
      },
      // ===== 轮播图区域 1 - 首页横幅 =====
        {
          id: 'banner-1',
          type: 'banner',
          props: {
            images: [
            { url: 'https://picsum.photos/1200/400?random=1', link: '#section-1' },
            { url: 'https://picsum.photos/1200/400?random=2', link: '#section-2' },
            { url: 'https://picsum.photos/1200/400?random=3', link: '#section-3' }
            ],
            autoPlay: true,
          interval: 4000,
            dots: true,
          arrows: true
          }
        },

      // ===== 新闻区域 1 - 装修资讯 =====
        {
          id: 'news-1',
          type: 'newsList',
          props: {
          title: '🏠 装修资讯',
          news: [
            { id: 1, title: '2026年装修流行趋势大盘点', date: '2026-05-20', link: '#trends' },
            { id: 2, title: '小户型装修技巧：空间翻倍秘诀', date: '2026-05-19', link: '#small-home' },
            { id: 3, title: '环保材料选择指南，让家更健康', date: '2026-05-18', link: '#eco-materials' },
            { id: 4, title: '智能家居装修方案推荐', date: '2026-05-17', link: '#smart-home' }
          ],
          showDate: true,
        }
      },

      // ===== 轮播图区域 2 - 装修风格展示 =====
      {
        id: 'banner-2',
        type: 'banner',
        props: {
          images: [
            { url: 'https://picsum.photos/1200/500?random=10', link: '#modern-style' },
            { url: 'https://picsum.photos/1200/500?random=11', link: '#european-style' },
            { url: 'https://picsum.photos/1200/500?random=12', link: '#chinese-style' },
            { url: 'https://picsum.photos/1200/500?random=13', link: '#minimalist-style' }
          ],
          autoPlay: true,
          interval: 5000,
          dots: true,
          arrows: true
        }
      },

      // ===== 新闻区域 2 - 设计灵感 =====
      {
        id: 'news-2',
        type: 'newsList',
        props: {
          title: '🎨 设计灵感',
          news: [
            { id: 1, title: '北欧风客厅设计案例分享', date: '2026-05-22', link: '#nordic' },
            { id: 2, title: '日式禅意空间打造方法', date: '2026-05-21', link: '#japanese' },
            { id: 3, title: '工业风装修要点解析', date: '2026-05-20', link: '#industrial' },
            { id: 4, title: '轻奢风格装修预算规划', date: '2026-05-19', link: '#luxury' }
          ],
          showDate: true,
        }
      },

      // ===== 轮播图区域 3 - 精选案例 =====
      {
        id: 'banner-3',
        type: 'banner',
        props: {
          images: [
            { url: 'https://picsum.photos/1200/450?random=20', link: '#case-1' },
            { url: 'https://picsum.photos/1200/450?random=21', link: '#case-2' },
            { url: 'https://picsum.photos/1200/450?random=22', link: '#case-3' }
          ],
          autoPlay: false,
          interval: 3000,
          dots: true,
          arrows: true
        }
      },

      // ===== 新闻区域 3 - 施工指南 =====
      {
        id: 'news-3',
        type: 'newsList',
        props: {
          title: '🛠️ 施工指南',
            news: [
            { id: 1, title: '水电改造注意事项全攻略', date: '2026-05-22', link: '#water-electric' },
            { id: 2, title: '墙面刷漆步骤详解', date: '2026-05-21', link: '#wall-paint' },
            { id: 3, title: '瓷砖铺贴技巧与验收标准', date: '2026-05-20', link: '#tiles' },
            { id: 4, title: '吊顶安装常见问题及解决', date: '2026-05-19', link: '#ceiling' }
            ],
            showDate: true,
          }
      },

      // ===== 轮播图区域 4 - 材料展示 =====
      {
        id: 'banner-4',
        type: 'banner',
        props: {
          images: [
            { url: 'https://picsum.photos/1200/500?random=30', link: '#materials-1' },
            { url: 'https://picsum.photos/1200/500?random=31', link: '#materials-2' },
            { url: 'https://picsum.photos/1200/500?random=32', link: '#materials-3' },
            { url: 'https://picsum.photos/1200/500?random=33', link: '#materials-4' },
            { url: 'https://picsum.photos/1200/500?random=34', link: '#materials-5' }
          ],
          autoPlay: true,
          interval: 4500,
          dots: true,
          arrows: false
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
    },
    handleSelectMaterialOpen() {
      // 打开素材选择页面，如果已打开则跳转到该页签
      window.open('#/materials', 'materials-selector')
    }
  }
}
</script>

<style></style>
