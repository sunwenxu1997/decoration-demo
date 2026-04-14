// 组件类型定义
// 统一管理所有组件类型，确保命名一致性

/**
 * 组件类型枚举
 * 使用小写短横线命名规范
 */
export const COMPONENT_TYPES = {
  // 基础组件
  BANNER: 'banner',          // 轮播图
  NEWS_LIST: 'news-list'     // 新闻列表
}

/**
 * 组件类型元数据
 * 包含组件的显示名称、描述、图标等信息
 */
export const COMPONENT_METADATA = {
  [COMPONENT_TYPES.BANNER]: {
    name: '轮播图',
    description: '支持多张图片轮播展示，可配置自动播放和跳转链接',
    icon: 'picture',
    category: '基础组件'
  },
  [COMPONENT_TYPES.NEWS_LIST]: {
    name: '新闻列表',
    description: '展示最新资讯或文章列表，支持标题和日期显示',
    icon: 'file-text',
    category: '基础组件'
  }
}