# Banner组件

## 基本信息

### 功能描述
Banner组件是一个灵活的轮播图组件，用于在页面顶部或中部展示图片轮播效果，支持自动播放、自定义间隔、点击跳转等功能。适用于移动端页面装修场景，可作为广告位、产品展示等用途。

### 引入方式
```javascript
// 从组件库中导入
import { widgetComponents } from 'opple-decoration'
const { BannerPreview } = widgetComponents

// 或直接导入
import BannerPreview from '@/components/DecorationBuilder/widgets/Banner/preview.vue'
import BannerEditor from '@/components/DecorationBuilder/widgets/Banner/editor.vue'
```

### 兼容性
- 支持 Vue 2.6.x
- 依赖 antd-design-vue 1.7.x

## API 文档

### Props 参数

| 字段名 | 类型 | 默认值 | 是否必传 | 描述 |
|-------|------|--------|----------|------|
| initData | Object | 见下方默认值 | 是 | 轮播图配置数据 |

#### initData 属性结构

| 字段名 | 类型 | 默认值 | 描述 |
|-------|------|--------|------|
| images | Array | [] | 轮播图片数组 |
| autoPlay | Boolean | true | 是否自动播放 |
| interval | Number | 3000 | 自动播放间隔时间（毫秒） |
| dots | Boolean | true | 是否显示指示器 |
| arrows | Boolean | false | 是否显示箭头按钮 |

#### images 数组项结构

| 字段名 | 类型 | 描述 |
|-------|------|------|
| url | String | 图片地址 |
| link | String | 图片点击跳转链接（可选） |

### 事件回调

当前组件没有自定义事件

### 插槽

当前组件没有插槽

## 使用示例

### 基本使用

```vue
<template>
  <div class="banner-container">
    <BannerPreview :init-data="bannerData" />
  </div>
</template>

<script>
import { widgetComponents } from 'opple-decoration'
const { BannerPreview } = widgetComponents

export default {
  name: 'BannerExample',
  components: {
    BannerPreview
  },
  data() {
    return {
      bannerData: {
        images: [
          { url: 'https://picsum.photos/800/450?random=1', link: 'https://example.com' },
          { url: 'https://picsum.photos/800/450?random=2', link: '' },
          { url: 'https://picsum.photos/800/450?random=3', link: '' }
        ],
        autoPlay: true,
        interval: 3000,
        dots: true,
        arrows: false
      }
    }
  }
}
</script>

<style scoped>
.banner-container {
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
        }
      ]
    }
  },
  methods: {
    handleUpdateComponent(component) {
      console.log('更新的Banner组件:', component)
    }
  }
}
</script>
```

## 注意事项

1. **图片尺寸**：建议使用宽高比为 16:9 的图片，以获得最佳显示效果
2. **图片数量**：建议轮播图片数量控制在 3-5 张，过多会影响加载性能
3. **链接处理**：如果图片没有设置链接，将不会添加 `<a>` 标签
4. **响应式设计**：组件会自适应容器宽度，高度固定为 200px
5. **性能优化**：建议使用压缩后的图片资源，可考虑使用 CDN 加速