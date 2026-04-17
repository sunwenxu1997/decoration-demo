// 通用工具函数库

/**
 * 生成唯一ID
 * @returns {string} 唯一ID字符串
 */
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9)
}

/**
 * 深拷贝对象
 * @param {Object} obj 要拷贝的对象
 * @returns {Object} 拷贝后的对象
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 首字母大写
 * @param {string} str 要转换的字符串
 * @returns {string} 首字母大写后的字符串
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export const debounce = (func, delay) => {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} func 要执行的函数
 * @param {number} delay 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export const throttle = (func, delay) => {
  let lastTime = 0
  return function() {
    const now = Date.now()
    if (now - lastTime >= delay) {
      func.apply(this, arguments)
      lastTime = now
    }
  }
}