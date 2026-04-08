// 组件注册表，集中管理所有可用组件
// 新增组件时只需在此处导入并添加到components数组即可

import BannerComponent from './Banner'
import NewsComponent from './News'

// 组件数组，包含所有可用组件的配置信息
export const components = [
  BannerComponent,
  NewsComponent
]

// 根据组件类型获取组件配置
export const getComponentConfig = (type) => {
  return components.find(component => component.type === type)
}

// 获取所有组件的类型列表
export const getComponentTypes = () => {
  return components.map(component => component.type)
}

// 获取组件的默认属性
export const getComponentDefaultProps = (type) => {
  const config = getComponentConfig(type)
  return config ? JSON.parse(JSON.stringify(config.defaultProps)) : {}
}