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
  Editor: NewsEditor,
  // 默认属性配置
  defaultProps: {
    title: '最新资讯',
    news: [
      { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
      { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' },
      { id: 3, title: '现代简约风格解析', date: '2026-04-03', link: '' }
    ],
    showDate: true,
    showArrow: true,
    maxItems: 5
  }
}