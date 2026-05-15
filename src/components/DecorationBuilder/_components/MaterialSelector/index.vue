<template>
    <div class="material-selector">
        <div class="material-list" v-if="isOpened">
            <div v-for="material in selectedMaterials" :key="getField(material, 'id')" class="selected-material">
                <!-- 图片预览 -->
                <div class="material-preview">
                    <img class="material-image" :src="getImageUrl(material)" alt="素材预览" />
                    <!-- 悬浮操作按钮 -->
                    <div class="material-actions">
                        <div class="action-btn" @click.stop="view(getField(material, 'url'))" title="查看图片">
                            <a-icon type="eye" />
                        </div>
                        <div class="action-btn" @click.stop="copyUrl(getImageUrl(material))" title="复制URL">
                            <a-icon type="copy" />
                        </div>
                        <div class="action-btn" :title="`${getField(material, 'name')}`">
                            <a-icon type="info-circle" />
                        </div>
                        <!-- 移除 -->
                        <div class="action-btn" @click.stop="remove(getField(material, 'id'))" title="移除">
                            <a-icon type="delete" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedMaterials.length === 0" class="no-materials">暂无已选择素材</div>
        </div>
        <div class="material-header-container">
            <div class="material-header" :class="{ 'expanded': isOpened }" @click="toggle" title="已选择素材">
                <a-icon v-if="isOpened" type="folder-open" class="folder-icon" />
                <a-icon v-else type="folder"  class="folder-icon" />
                <!-- 已选数量提示 -->
                <div v-if="selectedMaterials.length > 0" class="selected-count">
                    {{ selectedMaterials.length > 99 ? '99+' : selectedMaterials.length }}
                </div>
            </div>
            <div v-if="isExpanded" class="material-add" @click="open" title="添加素材">
                <a-icon type="plus" />
            </div>
        </div>
    </div>
</template>
<script>
import { manager } from '../../utils/materials'
export default {
    name: 'MaterialSelector',
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        },
        // 受控属性，用于同步父组件的已选素材列表
        value: {
            type: Array,
            default: () => []
        },
        // 字段映射配置，允许用户自定义数据字段的key
        options: {
            type: Object,
            default: () => ({
                id: 'id',           // 素材唯一标识字段
                url: 'url',         // 素材预览/访问地址字段
                name: 'name',       // 素材名称字段
                thumbnail: 'thumbnail' // 缩略图地址字段（优先使用）
            })
        }
    },
    watch: {
        isExpanded(newVal) {
            if (!newVal) {
                this.isOpened = false
            }
        },
        value:{
            handler(newVal) {
                if (newVal.length > 0) {
                    manager.get().addBatch(newVal)
                }
            },
            immediate: true
        }
    },

    computed: {
        // 使用props作为数据源，保持组件受控
        selectedMaterials:{
            get() {
                return this.syncMaterials.length > 0 ? this.syncMaterials : this.value
            },
            set(val) {
                this.$emit('update:value', val)
            }
        }
    },
    inject: ['builderContext'],
    data() {
        return {
            // manager 实例，用于监听素材变化
            managerContext: manager.get(),
            isOpened: false, // 是否打开素材列表状态
            syncMaterials: []
        }
    },
    mounted() {
        this.managerContext.onChange((materials) => {
            console.log('跨页签素材变化:', materials);
            this.syncMaterials = materials
            // this.$set(this, 'selectedMaterials', materials);
        })
    },
    methods: {
        // 获取素材字段值（支持字段映射）
        getField(material, fieldName) {
            const key = this.options[fieldName] || fieldName
            return material[key]
        },

        // 获取图片预览地址（优先thumbnail，最后url）
        getImageUrl(material) {
            const thumbnail = this.getField(material, 'thumbnail')
            const url = this.getField(material, 'url')
            return thumbnail || url || ''
        },

        // 打开素材列表页面
        open() {
            this.$emit('material-selector-open', this.selectedMaterials)
            this.builderContext.emit('material-selector-open', this.selectedMaterials)
        },

        // 复制素材URL到剪贴板
        async copyUrl(url) {
            try {
                await navigator.clipboard.writeText(url)
                this.$message.success('URL已复制到剪贴板')
            } catch (err) {
                console.error('复制失败:', err)
                this.$message.error('复制失败，请重试')
            }
        },

        // 查看图片
        view(url) {
            window.open(url, '_blank')
            this.$emit('view', url)
        },

        // 移除素材（支持字段映射）
        remove(id) {
            const idx = this.selectedMaterials.findIndex(
                material => this.getField(material, 'id') === id
            )
            if (idx !== -1) {
                const material = this.selectedMaterials[idx]
                this.managerContext.remove(material)
                this.$emit('remove', id)
            }
        },
        // 处理切换素材选择器状态
        toggle() {
            this.isOpened = !this.isOpened
            this.$emit('toggle', true)
        }
    }
}
</script>

<style scoped>
.material-selector {
    padding: 5px;
}

.material-header-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.material-add {
    min-width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    border-radius: 4px;
    background: white;
}

.material-add:hover {
    background-color: #f3f3f3;
}

/* 头部样式 */
.material-header {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
    z-index: 5;
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background: #f3f3f3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.folder-icon {
    color: var(--primary-color);
}


.material-header.expanded {
    background: var(--primary-color);
}

.material-header.expanded .folder-icon {
    color: white;
}

.selected-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #ee434c;
    color: white;
    font-size: 10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 素材列表样式 */
.material-list {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 4px;
    padding: 5px;
    padding-bottom: 55px;
    top: 0px;
    left: 0px;
    overflow-y: auto;
}
.no-materials {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #999;
}

/* 自定义滚动条 */
.material-list::-webkit-scrollbar {
    width: 4px;
}

.material-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
}

.material-list::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
}

.material-list::-webkit-scrollbar-thumb:hover {
    background-color: #999;
}

.material-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

/* 单个素材样式 */
.selected-material {
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    transition: all 0.3s;
    margin-bottom: 5px;
}

.selected-material:hover {
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
}

/* 图片预览样式 */
.material-preview {
    width: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
}

.material-preview:hover {
    transform: scale(1.02);
}

/* 悬浮操作按钮 */
.material-actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.material-preview:hover .material-actions {
    opacity: 1;
}

.action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
}

/* 素材信息样式 */
.material-info {
    padding: 8px;
    background-color: #fafafa;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.material-info span {
    font-size: 12px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
}
</style>