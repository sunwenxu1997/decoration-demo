// 组件默认属性配置
// 集中管理所有组件的默认属性，与元数据分离

import { COMPONENT_TYPES } from './componentTypes'

/**
 * 组件默认属性配置
 */
export const DEFAULT_PROPS = {
  [COMPONENT_TYPES.BANNER]: {
    images: [
      { url: 'https://picsum.photos/800/450?random=1', link: '' },
      { url: 'https://picsum.photos/800/450?random=2', link: '' },
      { url: 'https://picsum.photos/800/450?random=3', link: '' }
    ],
    autoPlay: true,
    interval: 3000,
    dots: true,
    arrows: false
  },
  [COMPONENT_TYPES.NEWS_LIST]: {
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

/**
 * 根据组件类型获取默认属性
 * @param {string} type 组件类型
 * @returns {Object} 默认属性对象
 */
export const getDefaultProps = (type) => {
  // 深拷贝避免引用问题
  return JSON.parse(JSON.stringify(DEFAULT_PROPS[type] || {}))
}

/**
 * 更新组件默认属性
 * @param {string} type 组件类型
 * @param {Object} newProps 新的默认属性
 */
export const updateDefaultProps = (type, newProps) => {
  if (DEFAULT_PROPS[type]) {
    DEFAULT_PROPS[type] = { ...DEFAULT_PROPS[type], ...newProps }
  }
}

/**
 * 添加新组件的默认属性
 * @param {string} type 组件类型
 * @param {Object} props 默认属性
 */
export const addComponentDefaultProps = (type, props) => {
  DEFAULT_PROPS[type] = props
}