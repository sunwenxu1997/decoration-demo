// News组件配置文件，定义组件的预览和编辑组件
import NewsPreview from './preview.vue'
import NewsEditor from './editor.vue'
import { COMPONENT_TYPES } from '../../config/componentTypes'

export default {
  // 组件类型标识（使用统一的类型定义）
  type: COMPONENT_TYPES.NEWS_LIST,
  // 预览组件
  Preview: NewsPreview,
  // 编辑组件
  Editor: NewsEditor
}