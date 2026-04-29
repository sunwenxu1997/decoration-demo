<template>
    <div class="material-selector">
        <div class="material-list" v-if="isOpened">
            <div v-for="material in selectedMaterials" :key="material.id" class="selected-material">
                <!-- 图片预览 -->
                <div class="material-preview">
                    <img class="material-image" :src="material.url" alt="素材预览" />
                    <!-- 悬浮操作按钮 -->
                    <div class="material-actions">
                        <div class="action-btn" @click.stop="viewMaterial(material.url)" title="查看图片">
                            <a-icon type="eye" />
                        </div>
                        <div class="action-btn" @click.stop="copyMaterialUrl(material.url)" title="复制URL">
                            <a-icon type="copy" />
                        </div>
                        <div class="action-btn" :title="`${material.name}`">
                            <a-icon type="info-circle" />
                        </div>
                        <!-- 移除 -->
                        <div class="action-btn" @click.stop="removeMaterial(material.id)" title="移除">
                            <a-icon type="delete" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="material-header-container">
            <div class="material-header" :class="{ 'expanded': isOpened }" @click="handleToggle"  title="已选择素材">
                <a-icon type="folder-open" class="folder-icon" />
                <!-- 已选数量提示 -->
                <div v-if="selectedMaterials.length > 0" class="selected-count">
                    {{ selectedMaterials.length > 99 ? '99+' : selectedMaterials.length }}
                </div>
            </div>
            <div v-if="isExpanded" class="material-add" @click="openMaterialsPage" title="添加素材">
                <a-icon type="plus" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MaterialSelector',
    props: {
        isExpanded: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isExpanded(newVal) {
            if (!newVal) {
                this.isOpened = false
            }
        }
    },
    data() {
        return {
            isOpened: false, // 是否打开素材列表状态
            selectedMaterials: [
                { id: 1, name: '轮播图1', url: 'https://picsum.photos/800/450?random=1' },
                { id: 2, name: '轮播图2', url: 'https://picsum.photos/800/450?random=12' },
                { id: 3, name: '轮播图1', url: 'https://picsum.photos/800/450?random=11' },
                { id: 4, name: '轮播图2', url: 'https://picsum.photos/800/450?random=112' },
                { id: 5, name: '轮播图1', url: 'https://picsum.photos/800/450?random=111' },
                { id: 6, name: '轮播图2', url: 'https://picsum.photos/800/450?random=23' },
                { id: 7, name: '轮播图1', url: 'https://picsum.photos/800/450?random=14' },
                { id: 8, name: '轮播图2', url: 'https://picsum.photos/800/450?random=25' },
                { id: 9, name: '轮播图1', url: 'https://picsum.photos/800/450?random=16' },
                { id: 10, name: '轮播图2', url: 'https://picsum.photos/450/450?random=27' },
                { id: 11, name: '轮播图1', url: 'https://picsum.photos/800/450?random=189' },
                { id: 12, name: '轮播图2', url: 'https://picsum.photos/800/450?random=290' },
                { id: 13, name: '轮播图1', url: 'https://picsum.photos/800/450?random=10' },
                { id: 14, name: '轮播图2', url: 'https://picsum.photos/800/450?random=22' },
            ] // 已选择的素材列表
        }
    },
    methods: {
        // 打开素材列表页面
        openMaterialsPage() {
            // window.open('/example', '_blank')
            this.$emit('add', this.selectedMaterials)
        },
        // 复制素材URL到剪贴板
        async copyMaterialUrl(url) {
            try {
                await navigator.clipboard.writeText(url)
                this.$message.success('URL已复制到剪贴板')
            } catch (err) {
                console.error('复制失败:', err)
                this.$message.error('复制失败，请重试')
            }
        },

        // 查看图片
        viewMaterial(url) {
            // 在新窗口中打开图片
            window.open(url, '_blank')
            this.$emit('view', url)
        },
        // 移除素材
        removeMaterial(id) {
            this.selectedMaterials = this.selectedMaterials.filter(material => material.id !== id)
            this.$emit('remove', id)
        },
        // 处理切换素材选择器状态
        handleToggle() {
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
    max-height: 100vh;
    background-color: white;
    border-radius: 4px;
    padding: 5px;
    padding-bottom: 55px;
    top: 0px;
    left: 0px;
    overflow-y: auto;
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
    width: 100%;
    height: 100%;
    max-height: 200px;
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