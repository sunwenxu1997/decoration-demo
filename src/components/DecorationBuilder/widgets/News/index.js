// News组件配置文件，定义组件的默认属性和元数据
import NewsPreview from './preview.vue'
import NewsEditor from './editor.vue'

export default {
  // 组件类型标识
  type: 'news',
  // 组件名称
  name: '新闻列表',
  // 组件描述
  description: '展示最新资讯或文章列表',
  // 组件图标
  icon: 'file-text',
  // 默认属性
  defaultProps: {
    title: '最新资讯',
    news: [
      { id: 1, title: '装修小技巧分享', date: '2026-04-01', link: '' },
      { id: 2, title: '春季装修注意事项', date: '2026-04-02', link: '' },
      { id: 3, title: '现代简约风格解析', date: '2026-04-03', link: '' }
    ]
  },
  // 预览组件
  Preview: NewsPreview,
  // 编辑组件
  Editor: NewsEditor
}