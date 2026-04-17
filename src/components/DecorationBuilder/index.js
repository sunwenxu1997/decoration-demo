// 主入口文件 - 提供选择性导出功能

// 导入全局样式
import './styles/main.css'

// 导出完整的组件编辑器
import DecorationBuilder from './index.vue'

// 导出纯预览组件
import PublishedPreview from './bases/Preview/components/PublishedPreview'

// 导出组件集合
import { widgets } from './widgets'

// 导出工具函数
import * as componentUtils from './utils'

// 导出配置
import * as componentTypes from './config/componentTypes'
import * as settings from './config/settings'

// 导出所有功能
export {
  DecorationBuilder,
  PublishedPreview,
  widgets,
  componentUtils,
  componentTypes,
  settings
}

// 默认导出
export default {
  DecorationBuilder,
  PublishedPreview,
  widgets,
  componentUtils,
  componentTypes,
  settings
}