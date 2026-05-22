// 组件相关工具函数
import { COMPONENT_TYPES, COMPONENT_METADATA } from '../config/componentTypes'
import { DEFAULT_COMPONENT_STYLE } from '../config/settings'
import { widgets } from '../widgets'

/**
 * 根据组件类型获取元数据
 * @param {string} type 组件类型
 * @returns {Object|null} 组件元数据
 */
export const getComponentMetadata = (type) => {
  return COMPONENT_METADATA[type] || null
}

/**
 * 获取所有组件类型列表
 * @returns {Array<string>} 组件类型列表
 */
export const getAllComponentTypes = () => {
  return Object.values(COMPONENT_TYPES)
}

/**
 * 获取组件类型分组
 * @returns {Object} 按分类分组的组件类型
 */
export const getComponentTypesByCategory = () => {
  const categories = {}
  
  Object.entries(COMPONENT_METADATA).forEach(([type, metadata]) => {
    const category = metadata.category || '未分类'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(type)
  })
  
  return categories
}

/**
 * 根据组件类型获取组件配置
 * @param {string} type 组件类型
 * @returns {Object|null} 组件配置
 */
export const getWidgetConfig = (type) => {
  return widgets.find(widget => widget.type === type)
}

/**
 * 获取所有组件的类型列表
 * @returns {Array<string>} 组件类型列表
 */
export const getWidgetTypes = () => {
  return widgets.map(widget => widget.type)
}

/**
 * 获取组件的默认属性（直接从组件配置中获取）
 * @param {string} type 组件类型
 * @returns {Object} 默认属性对象
 */
export const getWidgetDefaultProps = (type) => {
  const config = getWidgetConfig(type)
  if (config && config.defaultProps) {
    // 深拷贝避免引用问题
    return JSON.parse(JSON.stringify(config.defaultProps))
  }
  return {}
}

/**
 * 根据组件类型获取预览组件
 * @param {string} type 组件类型
 * @returns {Object|null} 预览组件
 */
export const getWidgetPreview = (type) => {
  const config = getWidgetConfig(type)
  return config ? config.Preview : null
}

/**
 * 根据组件类型获取编辑组件
 * @param {string} type 组件类型
 * @returns {Object|null} 编辑组件
 */
export const getWidgetEditor = (type) => {
  const config = getWidgetConfig(type)
  return config ? config.Editor : null
}

/**
 * 根据组件类型生成默认间距样式
 * 从 DEFAULT_COMPONENT_STYLE 中取值，支持 enableSpacing 配置过滤方向
 * @param {string} type 组件类型
 * @returns {Object|null} 间距样式对象，未启用则返回 null
 */
export const getWidgetDefaultStyle = (type) => {
  const config = getWidgetConfig(type)
  const enableSpacing = config && config.enableSpacing
  if (!enableSpacing) return null

  // enableSpacing 为 true 时从 DEFAULT_COMPONENT_STYLE 取全部方向
  // enableSpacing 为数组时只取指定方向，如 ['paddingTop', 'paddingBottom']
  const dirs = Array.isArray(enableSpacing) ? enableSpacing : Object.keys(DEFAULT_COMPONENT_STYLE)
  const style = {}
  dirs.forEach(d => {
    style[d] = DEFAULT_COMPONENT_STYLE[d] !== undefined ? DEFAULT_COMPONENT_STYLE[d] : 0
  })
  return style
}