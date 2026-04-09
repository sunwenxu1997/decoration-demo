// 组件注册表，集中管理所有可用组件
// 新增组件时只需在此处导入并添加到widgets数组即可

import BannerComponent from './Banner'
import NewsComponent from './News'
import { getDefaultProps } from '../config/defaultProps'

// 组件数组，包含所有可用组件的配置信息
export const widgets = [
  BannerComponent,
  NewsComponent
]

// 根据组件类型获取组件配置
export const getWidgetConfig = (type) => {
  return widgets.find(widget => widget.type === type)
}

// 获取所有组件的类型列表
export const getWidgetTypes = () => {
  return widgets.map(widget => widget.type)
}

// 获取组件的默认属性（从配置文件中获取）
export const getWidgetDefaultProps = (type) => {
  return getDefaultProps(type)
}

// 根据组件类型获取预览组件
export const getWidgetPreview = (type) => {
  const config = getWidgetConfig(type)
  return config ? config.Preview : null
}

// 根据组件类型获取编辑组件
export const getWidgetEditor = (type) => {
  const config = getWidgetConfig(type)
  return config ? config.Editor : null
}