// 装修工具全局设置

/**
 * 预览相关设置
 */
export const PREVIEW_SETTINGS = {
  // 移动端预览尺寸
  MOBILE_WIDTH: 375,
  MOBILE_HEIGHT: 812,
  // 预览设备类型
  DEVICE_TYPE: 'mobile', // mobile, tablet, desktop
  // 是否显示设备边框
  SHOW_DEVICE_FRAME: true,
  // 默认背景色
  BACKGROUND_COLOR: '#ffffff'
}

/**
 * 拖拽相关设置
 */
export const DRAG_SETTINGS = {
  // 是否启用拖拽
  ENABLED: true,
  // 拖拽手柄选择器
  HANDLE: '.component-drag-handle',
  // 拖拽动画时长（毫秒）
  ANIMATION_DURATION: 300
}

/**
 * 组件相关设置
 */
export const COMPONENT_SETTINGS = {
  // 组件最大数量
  MAX_COMPONENTS: 20,
  // 组件默认间距（像素）
  DEFAULT_SPACING: 15,
  // 是否允许删除所有组件
  ALLOW_EMPTY: true
}

/**
 * 编辑器相关设置
 */
export const EDITOR_SETTINGS = {
  // 编辑器宽度
  WIDTH: 350,
  // 是否显示保存按钮
  SHOW_SAVE_BUTTON: true,
  // 是否自动保存
  AUTO_SAVE: false,
  // 自动保存间隔（毫秒）
  AUTO_SAVE_INTERVAL: 30000
}

/**
 * 导出全局设置对象
 */
export default {
  PREVIEW: PREVIEW_SETTINGS,
  DRAG: DRAG_SETTINGS,
  COMPONENT: COMPONENT_SETTINGS,
  EDITOR: EDITOR_SETTINGS
}