# NewsList组件

## 基本信息

### 功能描述
NewsList组件是一个新闻列表展示组件，用于在页面中展示资讯、公告等列表内容，支持标题、日期显示和点击跳转功能。适用于移动端页面装修场景，可作为资讯模块、公告栏等用途。

### 引入方式
```javascript
// 从组件库中导入
import { widgetComponents } from 'opple-decoration'
const { NewsListPreview } = widgetComponents

// 或直接导入
import NewsListPreview from '@/components/DecorationBuilder/widgets/News/preview.vue'
import NewsListEditor from '@/components/DecorationBuilder/widgets/News/editor.vue'
```

### 兼容性
- 支持 Vue 2.6.x
- 依赖 antd-design-vue 1.7.x

## API 文档

### Props 参数

| 字段名 | 类型 | 默认值 | 是否必传 | 描述 |
|-------|------|--------|----------|------|
| initData | Object | 见下方默认值 | 是 | 新闻列表配置数据 |

#### initData 属性结构

| 字段名 | 类型 | 默认值 | 描述 |
|-------|------|--------|------|
| title | String | '最新资讯' | 新闻列表标题 |
| news | Array | [] | 新闻数据数组 |
| showDate | Boolean | true | 是否显示新闻日期 |
| showArrow | Boolean | true | 是否显示右箭头图标 |
| maxItems | Number | 5 | 最多显示的新闻数量 |

#### news 数组项结构

| 字段名 | 类型 | 描述 |
|-------|------|------|
| id | Number/String | 新闻唯一标识 |
| title | String | 新闻标题 |
| date | String | 新闻发布日期 |
| link | String | 新闻点击跳转链接（可选） |

### 事件回调

当前组件没有自定义事件

### 插槽

当前组件没有插槽

## 使用示例

### 基本使用

```vue
<template>
  <div class="news-container">
    <NewsListPreview :init-data="newsData" />
  </div>
</template>

<script>
import { widgetComponents } from 'opple-decoration'
const { NewsListPreview } = widgetComponents

export default {
  name: 'NewsExample',
  components: {
    NewsListPreview
  },
  data() {
    return {
      newsData: {
        title: '最新资讯',
        news: [
          { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: 'https://example.com/news/1' },
          { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' },
          { id: 3, title: '现代简约风格解析', date: '2026-04-03', link: '' }
        ],
        showDate: true,
        showArrow: true,
        maxItems: 5
      }
    }
  }
}
</script>

<style scoped>
.news-container {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
}
</style>
```

### 在DecorationBuilder中使用

```vue
<template>
  <div class="builder-container">
    <DecorationBuilder 
      :init-data="initialComponents"
      @update-component="handleUpdateComponent"
    />
  </div>
</template>

<script>
import { DecorationBuilder } from 'opple-decoration'

export default {
  name: 'BuilderExample',
  components: {
    DecorationBuilder
  },
  data() {
    return {
      initialComponents: [
        {
          id: 'news-1',
          type: 'news-list',
          props: {
            title: '最新资讯',
            news: [
              { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
              { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' }
            ],
            showDate: true,
            showArrow: true
          }
        }
      ]
    }
  },
  methods: {
    handleUpdateComponent(component) {
      console.log('更新的NewsList组件:', component)
    }
  }
}
</script>
```

## 注意事项

1. **数据结构**：news数组中的每个项必须包含id字段作为唯一标识
2. **日期格式**：建议使用YYYY-MM-DD格式的日期字符串，以获得最佳显示效果
3. **链接处理**：如果新闻没有设置链接，将不会添加`<a>`标签
4. **内容长度**：建议新闻标题长度控制在20-30个字符，过长会影响显示效果
5. **样式定制**：可以通过CSS变量覆盖默认样式，如颜色、字体大小等