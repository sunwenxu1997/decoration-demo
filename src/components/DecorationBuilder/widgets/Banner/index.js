// Banner组件配置文件，定义组件的预览和编辑组件
import BannerPreview from './preview.vue'
import BannerEditor from './editor.vue'
import { COMPONENT_TYPES } from '../../config/componentTypes'

export default {
  // 组件类型标识（使用统一的类型定义）
  type: COMPONENT_TYPES.BANNER,
  // 预览组件
  Preview: BannerPreview,
  // 编辑组件
  Editor: BannerEditor,
  // 默认属性配置
  defaultProps: {
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
}