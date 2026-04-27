# opple-decoration

一个基于 Vue 2 的灵活装饰组件库，提供完整的移动端页面装修功能和纯预览功能。

## 功能特性

- ✅ 完整的组件编辑器（支持拖拽排序、属性编辑）
- ✅ 纯预览组件（用于展示已发布内容）
- ✅ 独立组件模块（可单独使用的 Banner、NewsList 等组件）
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

// 导入组件集合（数组形式）
import { widgets } from 'opple-decoration'

// 导入组件对象（直接获取Preview组件，推荐）
import { widgetComponents } from 'opple-decoration'

// 导入配置
import { componentTypes } from 'opple-decoration'

// 导入样式
import 'opple-decoration/lib/opple-decoration.css'
```

## 使用示例

### 使用完整编辑器

```vue
<template>
  <div class="admin-container">
    <DecorationBuilder 
      :init-data="initialComponents"
      @update-order="handleUpdateOrder"
      @add-component="handleAddComponent"
      @delete-component="handleDeleteComponent"
      @update-component="handleUpdateComponent"
      @select-component="handleSelectComponent"
      @close-editor="handleCloseEditor"
      @publish="handlePublish"
    />
  </div>
</template>

<script>
import { DecorationBuilder } from 'opple-decoration'

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
          type: 'newsList',
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
    /**
     * 组件排序更新事件
     * @param {Array} components 更新后的组件数组
     */
    handleUpdateOrder(components) {
      console.log('组件排序更新:', components)
      // 保存排序结果到后端
    },
    
    /**
     * 添加组件事件
     * @param {Object} component 新添加的组件对象
     */
    handleAddComponent(component) {
      console.log('添加组件:', component)
      // 保存新组件到后端
    },
    
    /**
     * 删除组件事件
     * @param {string} componentId 被删除的组件ID
     */
    handleDeleteComponent(componentId) {
      console.log('删除组件:', componentId)
      // 从后端删除组件
    },
    
    /**
     * 更新组件属性事件
     * @param {Object} component 更新后的组件对象
     */
    handleUpdateComponent(component) {
      console.log('更新组件:', component)
      // 保存组件更新到后端
    },
    
    /**
     * 选择组件事件
     * @param {Object} component 被选中的组件对象
     */
    handleSelectComponent(component) {
      console.log('选择组件:', component)
      // 处理组件选择逻辑
    },
    
    /**
     * 关闭编辑器事件
     */
    handleCloseEditor() {
      console.log('关闭编辑器')
      // 处理关闭编辑器逻辑
    },
    
    /**
     * 发布事件
     * @param {Array} components 要发布的组件数组
     */
    handlePublish(components) {
      console.log('发布组件:', components)
      // 处理发布逻辑，如保存到后端或生成静态文件
    }
  }
}
</script>
```
### 使用单个组件

#### 方式1：通过widgetComponents直接导入（推荐）

```vue
<template>
  <div class="custom-page">
    <BannerPreview :init-data="bannerData" />
    <NewsListPreview :init-data="newsData" />
  </div>
</template>

<script>
import { widgetComponents } from 'opple-decoration'
import 'opple-decoration/lib/opple-decoration.css'

// 提取所需的组件
const { BannerPreview, NewsListPreview } = widgetComponents

export default {
  name: 'CustomPage',
  components: {
    BannerPreview,
    NewsListPreview
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

## 组件事件

### DecorationBuilder 事件列表

| 事件名称 | 描述 | 参数 |
|---------|------|------|
| update-order | 组件排序发生变化时触发 | `components`：更新后的组件数组 |
| add-component | 添加新组件时触发 | `component`：新添加的组件对象 |
| delete-component | 删除组件时触发 | `componentId`：被删除的组件ID |
| update-component | 更新组件属性时触发 | `component`：更新后的组件对象 |
| select-component | 选择组件时触发 | `component`：被选中的组件对象 |
| close-editor | 关闭编辑器时触发 | 无 |
| publish | 点击发布按钮时触发 | `components`：要发布的组件数组 |

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