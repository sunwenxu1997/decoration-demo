# opple-decoration

一个基于 Vue 2 的灵活装饰组件库，提供完整的移动端页面装修功能和纯预览功能。

## 功能特性

- ✅ 完整的组件编辑器（支持拖拽排序、属性编辑）
- ✅ 纯预览组件（用于展示已发布内容）
- ✅ 独立组件模块（可单独使用的 Banner、News 等组件）
- ✅ 自定义主题支持
- ✅ 响应式设计
- ✅ 可调整大小的预览窗口

## 安装

### NPM 安装

```bash
npm install opple-decoration --save
```

### Yarn 安装

```bash
yarn add opple-decoration
```

## 导入方式

### 完整导入

导入整个组件库：

```javascript
import Vue from 'vue'
import OppleDecoration from 'opple-decoration'
import 'opple-decoration/lib/opple-decoration.css'

Vue.use(OppleDecoration)
```

### 按需导入

只导入需要的组件：

```javascript
// 导入完整编辑器
import { DecorationBuilder } from 'opple-decoration'

// 导入纯预览组件
import { PublishedPreview } from 'opple-decoration'

// 导入组件集合
import { widgets } from 'opple-decoration'

// 导入样式
import 'opple-decoration/lib/opple-decoration.css'
```

## 使用示例

### 使用完整编辑器

```vue
<template>
  <div class="admin-container">
    <DecorationBuilder 
      :initial-components="initialComponents"
      @update-order="handleUpdateOrder"
      @add-component="handleAddComponent"
      @delete-component="handleDeleteComponent"
      @update-component="handleUpdateComponent"
    />
  </div>
</template>

<script>
import { DecorationBuilder } from 'opple-decoration'
import 'opple-decoration/lib/opple-decoration.css'

export default {
  name: 'AdminDecorationPage',
  components: {
    DecorationBuilder
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
            interval: 3000
          }
        },
        {
          id: 'news-1',
          type: 'news-list',
          props: {
            title: '最新资讯',
            news: [
              { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
              { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' }
            ]
          }
        }
      ]
    }
  },
  methods: {
    handleUpdateOrder(components) {
      console.log('组件排序更新:', components)
    },
    handleAddComponent(component) {
      console.log('添加组件:', component)
    },
    handleDeleteComponent(componentId) {
      console.log('删除组件:', componentId)
    },
    handleUpdateComponent(component) {
      console.log('更新组件:', component)
    }
  }
}
</script>
```

### 使用纯预览组件

```vue
<template>
  <div class="preview-container">
    <PublishedPreview 
      :components="publishedComponents" 
      :full-screen="true"
    />
  </div>
</template>

<script>
import { PublishedPreview } from 'opple-decoration'
import 'opple-decoration/lib/opple-decoration.css'

export default {
  name: 'PagePreview',
  components: {
    PublishedPreview
  },
  data() {
    return {
      publishedComponents: [] // 从后端获取的已发布组件数据
    }
  },
  created() {
    this.fetchPublishedComponents()
  },
  methods: {
    async fetchPublishedComponents() {
      // 模拟从后端获取数据
      const response = await fetch('/api/published-components')
      this.publishedComponents = await response.json()
    }
  }
}
</script>
```

### 使用单个组件

```vue
<template>
  <div class="custom-page">
    <BannerPreview :data="bannerData" />
    <NewsPreview :data="newsData" />
  </div>
</template>

<script>
import { widgets } from 'opple-decoration'
import 'opple-decoration/lib/opple-decoration.css'

// 提取所需的组件
const BannerPreview = widgets.Banner.Preview
const NewsPreview = widgets.News.Preview

export default {
  name: 'CustomPage',
  components: {
    BannerPreview,
    NewsPreview
  },
  data() {
    return {
      bannerData: {
        images: [
          { url: 'https://picsum.photos/800/450?random=1', link: '' },
          { url: 'https://picsum.photos/800/450?random=2', link: '' }
        ],
        autoPlay: true,
        interval: 3000
      },
      newsData: {
        title: '最新资讯',
        news: [
          { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
          { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' }
        ]
      }
    }
  }
}
</script>
```

## 组件数据结构

### 完整编辑器组件数据结构

```javascript
[
  {
    id: 'banner-1', // 组件唯一标识
    type: 'banner', // 组件类型
    props: { // 组件属性
      images: [
        { url: '图片URL', link: '链接URL' },
        { url: '图片URL', link: '链接URL' }
      ],
      autoPlay: true,
      interval: 3000
    }
  },
  {
    id: 'news-1',
    type: 'news-list',
    props: {
      title: '最新资讯',
      news: [
        { id: 1, title: '新闻标题', date: '2026-04-01', link: '链接URL' },
        { id: 2, title: '新闻标题', date: '2026-04-02', link: '链接URL' }
      ]
    }
  }
]
```

## 主题配置

可以通过 CSS 变量覆盖默认主题颜色：

```css
:root {
  --primary-color: #1890ff;       /* 主色调 */
  --primary-hover: #40a9ff;       /* 悬停色 */
  --primary-active: #096dd9;      /* 激活色 */
  --success-color: #52c41a;       /* 成功色 */
  --warning-color: #faad14;       /* 警告色 */
  --error-color: #f5222d;         /* 错误色 */
  --info-color: #1890ff;          /* 信息色 */
}
```

## 构建与发布

### 构建组件库

```bash
npm run build:lib
```

### 发布到 npm

```bash
npm publish
```

## 许可证

MIT
