// Banner组件配置文件，定义组件的默认属性和元数据
import BannerPreview from './preview.vue'
import BannerEditor from './editor.vue'

export default {
  // 组件类型标识
  type: 'banner',
  // 组件名称
  name: '轮播图',
  // 组件描述
  description: '支持多张图片轮播展示',
  // 组件图标
  icon: 'picture',
  // 默认属性
  defaultProps: {
    images: [
      { url: 'https://picsum.photos/800/450?random=1', link: '' },
      { url: 'https://picsum.photos/800/450?random=2', link: '' },
      { url: 'https://picsum.photos/800/450?random=3', link: '' }
    ],
    autoPlay: true,
    interval: 3000
  },
  // 预览组件
  Preview: BannerPreview,
  // 编辑组件
  Editor: BannerEditor
}