import Vue from 'vue'

// ==============================================
// 素材选择状态管理器
//
// 【使用说明】
//
// 1. 简单场景（90%的场景直接用）：
//    import materialManager from './materials'
//    materialManager.add({ id: 1, name: 'test.jpg', url: '...' })
//    监听变化
//    materialManager.onChange((list) => {
//      console.log('素材列表变化', list)
//    })
//
//
// 2. 多场景隔离（需要多个独立已选列表）：
//    import { multiPage } from './materials'
//    const page1Ctx = multiPage.get('业务场景ID')
//    page1Ctx.add(material)
//
// 支持跨浏览器页签自动同步同场景ID的状态
// ==============================================

// 跨浏览器页签通信通道
let broadcastChannel = null
const CHANNEL_NAME = 'material-selector-sync'

function initBroadcast() {
  if (typeof BroadcastChannel !== 'undefined' && !broadcastChannel) {
    console.log(CHANNEL_NAME + '初始化跨浏览器页签通信通道', CHANNEL_NAME)
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME)
  }
}

// 单个素材选择上下文
class MaterialSelection {
  constructor(id) {
    this.id = id
    this.list = []
    this.bus = new Vue()
    
    if (broadcastChannel) {
      console.log('注册跨浏览器页签通信通道', CHANNEL_NAME)
      broadcastChannel.onmessage = (e) => {
        console.log('收到跨浏览器页签通信消息', e.data)
        if (e.data.sceneId === this.id) {
          this.list = [...e.data.data]
          this.bus.$emit('change', this.list)
        }
      }
    }
  }

  /**
   * 获取已选素材列表
   * @returns {Array} 已选素材副本
   */
  getSelected() {
    return [...this.list]
  }
  setSelected(materials) {
    this.list = [...materials]
    this._notify()
  }

  add(material) {
    if (!material || !material.id) return false
    const idx = this.list.findIndex(m => m.id === material.id)
    if (idx === -1) {
      console.log('跨浏览器页签添加素材', material)
      this.list.push(material)
      this._notify()
      return true
    }
    return false
  }

  // 批量添加素材，更新到list
  addBatch(materials) {
    if (!materials || materials.length === 0) return false
    console.log('跨浏览器页签批量添加素材', materials)
    // 批量添加时统一提醒一次监听事件
    this.list = [...this.list, ...materials]
    this._notify()
    return true
   }

  // 移除素材
  remove(material) {
    if (!material || !material.id) return false
    const idx = this.list.findIndex(m => m.id === material.id)
    if (idx !== -1) {
      console.log('跨浏览器页签移除素材', material)
      this.list.splice(idx, 1)
      this._notify()
      return true
    }
    return false
  }

  clear() {
    console.log('跨浏览器页签清空素材列表')
    this.list = []
    this._notify()
  }

  onChange(cb) {
    console.log('跨浏览器页签监听素材列表变化')
    this.bus.$on('change', cb)
  }

  offChange(cb) {
    console.log('跨浏览器页签移除素材列表变化监听')
       this.bus.$off('change', cb)
  }

  _notify() {
    console.log('跨浏览器页签通知素材列表变化', this.getSelected())
    this.bus.$emit('change', this.getSelected())
    if (broadcastChannel) {
      broadcastChannel.postMessage({
        sceneId: this.id,
        data: this.getSelected()
      })
    }
  }
}

// 多场景管理器
class MultiPageManager {
  constructor() {
    this.map = new Map()
    initBroadcast()
  }

  get(sceneId = 'default') {
    if (!this.map.has(sceneId)) {
      this.map.set(sceneId, new MaterialSelection(sceneId))
    }
    return this.map.get(sceneId)
  }
}

const simpleManager = new MaterialSelection('default')
const multiPage = new MultiPageManager()

export default simpleManager
export { multiPage, multiPage as manager, MaterialSelection }
