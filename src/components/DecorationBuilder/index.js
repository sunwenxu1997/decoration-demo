// 主入口文件 - 提供选择性导出功能

// 导入全局样式
import './styles/main.css'

// 导出完整的组件编辑器
import DecorationBuilder from './index.vue'

// 导出纯预览组件
import PublishedPreview from './bases/Preview/components/PublishedPreview'

// 导出配置
import * as componentTypes from './config/componentTypes'

// 导出组件集合
import { widgets, widgetComponents } from './widgets'
// 导出所有功能
export {
  DecorationBuilder,
  PublishedPreview,
  componentTypes,
  widgets,
  widgetComponents,
}

// 默认导出
export default {
  DecorationBuilder,
  PublishedPreview,
  componentTypes
}