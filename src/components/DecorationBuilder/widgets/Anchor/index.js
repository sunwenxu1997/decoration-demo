// Anchor锚点导航组件配置文件
import AnchorPreview from './preview.vue'
import AnchorEditor from './editor.vue'
import { COMPONENT_TYPES } from '../../config/componentTypes'

export default {
  // 组件类型标识
  type: COMPONENT_TYPES.ANCHOR,
  // 预览组件
  Preview: AnchorPreview,
  // 编辑组件
  Editor: AnchorEditor,
  // 是否启用通用间距配置
  enableSpacing: true,
  // 默认属性配置
  defaultProps: {
    items: [
      { title: '导航一', targetId: '' },
      { title: '导航二', targetId: '' },
    ],
    sticky: true,
    backgroundColor: '#ffffff',
    activeColor: '',
    textColor: '#333333'
  }
}
