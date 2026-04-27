// 组件注册表，集中管理所有可用组件
// 新增组件时只需在此处导入并添加到widgets数组即可

import BannerComponent from './Banner'
import NewsListComponent from './NewsList'

// 组件数组，包含所有可用组件的配置信息
export const widgets = [
  BannerComponent,
  NewsListComponent
]

export const widgetComponents = {
  BannerPreview: BannerComponent.Preview,
  NewsListPreview: NewsListComponent.Preview,
}
