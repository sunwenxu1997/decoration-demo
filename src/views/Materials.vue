<template>
    <div class="material-gallery">
        <!-- 顶部左上角增加全选复选框 -->
        <div class="material-header-container">
            <div class="material-header">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                <span>{{ selectAll ? '取消全选' : '全选' }}</span>
            </div>
        </div>
        <!-- 素材网格布局 -->
        <div class="material-grid">
            <div v-for="material in materials" :key="material.id" class="material-card" :title="material.name"
                :class="{ 'selected': selectedIds.includes(material.id) }" @click="toggleSelection(material.id)">
                <!-- 复选框 -->
                <div class="checkbox-wrapper">
                    <input type="checkbox" :checked="selectedIds.includes(material.id)" @click.stop
                        @change="toggleSelection(material.id)" />
                </div>

                <!-- 素材预览 -->
                <div class="material-preview">
                    <img :src="material.thumbnail" :alt="material.name" />
                </div>
            </div>
        </div>

        <!-- 底部悬浮操作栏 -->
        <transition name="fade">
            <div v-if="selectedIds.length > 0" class="floating-action-bar">
                <div class="selected-count">已选择 {{ selectedIds.length }} 项</div>
                <div class="action-buttons">
                    <button class="action-btn view" @click="handleView" title="查看">
                        <a-icon type="eye" />
                    </button>
                    <button class="action-btn share" @click="handleShare" title="分享">
                        <a-icon type="share-alt" />
                    </button>
                    <button class="action-btn cancel" @click="handleCancel" title="取消">
                        <a-icon type="close" />
                    </button>
                    <!-- <button class="action-btn delete" @click="handleDelete" title="删除">
                        <a-icon type="delete" />
                    </button> -->
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { manager } from '../components/DecorationBuilder/utils/materials'
export default {
    name: 'MaterialsView',
    data() {
        return {
            // 模拟素材数据
            materials: [
                { id: 1, name: 'OLL 界Edge 壁灯1200（SDL)3', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/0a924e25-8890-4030-b254-b7d16cb7b3b2.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/0a924e25-8890-4030-b254-b7d16cb7b3b2.jpg' },
                { id: 2, name: 'OLL 界 Edge 壁灯240（SDL)', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/22fdf5d1-7bfc-4301-82e7-0557635ba676.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/22fdf5d1-7bfc-4301-82e7-0557635ba676.jpg' },
                { id: 3, name: 'OLL 界Edge 金属落地灯1500（SDL)3', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/2fa66a15-5826-42f4-8d6d-c265e737ba3f.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/2fa66a15-5826-42f4-8d6d-c265e737ba3f.jpg' },
                { id: 4, name: 'OLL 界Edge 金属壁灯1500（SDL)', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/40f435e8-2d63-43d3-b6da-ea10b566a74a.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/40f435e8-2d63-43d3-b6da-ea10b566a74a.jpg' },
                { id: 5, name: 'OLL 界 Edge 壁灯1200（SDL)', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/6062686c-1d3e-4f4e-8e2c-d20c0f893733.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/6062686c-1d3e-4f4e-8e2c-d20c0f893733.jpg' },
                { id: 6, name: 'OLL 界 Edge 金属餐吊灯1500（SDL)2', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/8da806c9-3eeb-4b20-81f0-98b97b612b52.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/8da806c9-3eeb-4b20-81f0-98b97b612b52.jpg' },
                { id: 7, name: 'OLL 界 Edge 金属落地灯1500（SDL)', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/900d2fdb-3079-4255-85d1-fb3d2a9397e9.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/900d2fdb-3079-4255-85d1-fb3d2a9397e9.jpg' },
                { id: 8, name: 'OLL 界 Edge 金属壁灯1500（SDL) (2)', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/da922a47-1f26-4d02-9467-653a7c296639.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/da922a47-1f26-4d02-9467-653a7c296639.jpg' },
                { id: 9, name: 'OLL 界 Edge 金属餐吊灯1500（SDL)1', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/e5f70a8e-8e90-4bc2-ae0d-7ac4827cb64d.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/e5f70a8e-8e90-4bc2-ae0d-7ac4827cb64d.jpg' },
                { id: 10, name: 'OLL 界Edge 壁灯1200（SDL)2', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/f8bd6a26-4454-4061-8770-557fba55adc6.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/f8bd6a26-4454-4061-8770-557fba55adc6.jpg' },
                { id: 11, name: 'OLL 界 Edge 移动台灯1515', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/fd2cf2e0-4f87-45e6-8db1-5afe75ab491b.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/fd2cf2e0-4f87-45e6-8db1-5afe75ab491b.jpg' },
                { id: 12, name: '界吸顶灯1', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/267843f8-48df-4064-afbc-5cb01b6e0387.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260514/267843f8-48df-4064-afbc-5cb01b6e0387.jpg' },
                { id: 13, name: 'INK系列-OLL品牌-2025年-产品图片47', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/feaa3133-d66d-4c3f-9810-a95791153ff5.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/feaa3133-d66d-4c3f-9810-a95791153ff5.jpg' },
                { id: 14, name: 'INK系列-OLL品牌-2025年-产品图片35', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/f5dadbc7-c92c-4642-952d-8bf814141c19.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/f5dadbc7-c92c-4642-952d-8bf814141c19.jpg' },
                { id: 15, name: 'INK系列-OLL品牌-2025年-产品图片32', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/f310ed2f-5757-439f-ab4d-d24399d32102.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/f310ed2f-5757-439f-ab4d-d24399d32102.jpg' },
                { id: 16, name: 'INK系列-OLL品牌-2025年-产品图片51', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e35b1b73-7591-4862-87cc-786417a0ad54.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e35b1b73-7591-4862-87cc-786417a0ad54.jpg' },
                { id: 17, name: 'INK系列-OLL品牌-2025年-产品图片40', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e1809b60-b3b4-4b13-93eb-55fef826c905.png?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e1809b60-b3b4-4b13-93eb-55fef826c905.png' },
                { id: 18, name: 'INK系列-OLL品牌-2025年-产品图片6', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e142409a-f92e-4d47-b236-eb73c09c43d0.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/e142409a-f92e-4d47-b236-eb73c09c43d0.jpg' },
                { id: 19, name: 'INK系列-OLL品牌-2025年-产品图片30', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/d1a6ac1c-f881-4565-83c9-c1124cf84fe3.jpeg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/d1a6ac1c-f881-4565-83c9-c1124cf84fe3.jpeg' },
                { id: 20, name: 'INK系列-OLL品牌-2025年-产品图片31', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/d168f2ad-ca09-4274-8ac9-4ca77e35e928.jpeg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/d168f2ad-ca09-4274-8ac9-4ca77e35e928.jpeg' },
                { id: 21, name: 'INK系列-OLL品牌-2025年-产品图片20', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c8c4758d-55ad-4270-8de0-2b1291eae977.jpeg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c8c4758d-55ad-4270-8de0-2b1291eae977.jpeg' },
                { id: 22, name: 'INK系列-OLL品牌-2025年-产品图片14', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c2a5f0dc-418f-4144-8c38-3891ecf6f292.png?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c2a5f0dc-418f-4144-8c38-3891ecf6f292.png' },
                { id: 23, name: 'INK系列-OLL品牌-2025年-产品图片2', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c0ff4d4b-42dd-4715-be76-a7094210dd5d.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c0ff4d4b-42dd-4715-be76-a7094210dd5d.jpg' },
                { id: 24, name: 'INK系列-OLL品牌-2025年-产品图片1', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c0dbdbdf-dbba-48b0-8faa-40fe2711d0a2.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/c0dbdbdf-dbba-48b0-8faa-40fe2711d0a2.jpg' },
                { id: 25, name: 'INK系列-OLL品牌-2025年-产品图片3', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/be37d490-468d-4ee5-a9dc-34ece2a24c6f.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/be37d490-468d-4ee5-a9dc-34ece2a24c6f.jpg' },
                { id: 26, name: 'INK系列-OLL品牌-2025年-产品图片10', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/b845a48a-1e18-42fa-9a1f-c87c78f68335.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/b845a48a-1e18-42fa-9a1f-c87c78f68335.jpg' },
                { id: 27, name: 'INK系列-OLL品牌-2025年-产品图片13', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/b1acc791-0af6-4f1c-a803-9766fc52c5e0.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/b1acc791-0af6-4f1c-a803-9766fc52c5e0.jpg' },
                { id: 28, name: 'INK系列-OLL品牌-2025年-产品图片23', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/ad0e855d-e33d-4ceb-b0e5-5c3368f74382.jpeg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/ad0e855d-e33d-4ceb-b0e5-5c3368f74382.jpeg' },
                { id: 29, name: 'INK系列-OLL品牌-2025年-产品图片16', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/a4ac9440-3238-488b-b11b-0d804ebea8ce.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/a4ac9440-3238-488b-b11b-0d804ebea8ce.jpg' },
                { id: 30, name: 'INK系列-OLL品牌-2025年-产品图片34', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/98f964fd-3dcb-4521-aca4-0b5f1702c9ad.jpg?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/98f964fd-3dcb-4521-aca4-0b5f1702c9ad.jpg' },
                { id: 31, name: 'INK系列-OLL品牌-2025年-产品图片39', thumbnail: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/90a0f040-8c03-4b95-a253-c5b9e20d2ea8.png?x-image-process=style/thumbnail', url: 'https://cmp-bucket-prod.obs.cn-east-3.myhuaweicloud.com/cmp/image/original/20260317/90a0f040-8c03-4b95-a253-c5b9e20d2ea8.png' },
            ],
            // 全选状态
            selectAll: false,
            // 选中的素材ID列表
            selectedIds: [],
            // 选中的素材列表
            selectedMaterials: []
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.selectedMaterials = manager.get().getSelected()
            console.log(this.selectedMaterials)
            this.selectedIds = this.selectedMaterials.map(m => m.id)
        })
        manager.get().onChange((materials) => {
            // console.log('已选素材:', materials);
            this.selectedMaterials = materials
            this.selectedIds = materials.map(m => m.id)
        })
    },
    methods: {
        // 切换选中状态
        toggleSelection(id) {
            const index = this.selectedIds.indexOf(id)
            // 找到对应的素材
            const material = this.materials.find(m => m.id === id)
            if (index > -1) {
                this.selectedIds.splice(index, 1)
                // 从选中的素材列表中移除
                this.selectedMaterials.splice(index, 1)
                // 先初始化场景管理器，再移除素材
                manager.get().remove(material)
            } else {
                this.selectedIds.push(id)
                // 添加到选中的素材列表
                this.selectedMaterials.push(material)
                // 先初始化场景管理器，再添加素材
                manager.get().add(material)
            }
        },
        // 全选/取消全选
        toggleSelectAll() {
            if (this.selectAll) {
                this.selectedIds = this.materials.map(m => m.id)
                this.selectedMaterials = this.materials
                manager.get().addBatch(this.materials)
            } else {
                this.selectedIds = []
                this.selectedMaterials = []
                manager.get().clear()
            }
        },
        // 查看操作
        handleView() {
            console.log('查看选中的素材:', this.selectedIds)
        },
        // 分享操作
        handleShare() {
            console.log('分享选中的素材:', this.selectedIds)
        },
        // 删除操作
        handleDelete() {
            console.log('删除选中的素材:', this.selectedIds)
            // 这里可以添加删除逻辑
            this.selectedIds = []
            manager.get().clear()
        },
        // 取消操作
        handleCancel() {
            console.log('取消选中的素材:', this.selectedIds)
            // 这里可以添加取消逻辑
            this.selectedIds = []
            manager.get().clear()
        },
    }
}
</script>

<style scoped>
/* 全屏铺满 */
.material-gallery {
    min-height: 100vh;
    padding: 0 24px;
    background: #fff;
    box-sizing: border-box;
}

.material-header {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
}

/* 网格布局 */
.material-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    padding-bottom: 100px;
    /* 为底部操作栏预留空间 */
}

/* 卡片样式 */
.material-card {
    padding: 10px;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.material-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* 鼠标悬浮时，未勾选的默认展示，已勾选的不悬浮也展示 */
.material-card:hover .checkbox-wrapper input[type="checkbox"] {
    opacity: 1;
}

.material-card.selected {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* 复选框 */
.checkbox-wrapper {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
}

/* 鼠标悬浮时，未勾选的默认展示，已勾选的不悬浮也展示 */
.checkbox-wrapper input:checked {
    opacity: 1 !important;
}

.checkbox-wrapper input[type="checkbox"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
    accent-color: var(--primary-color);
    opacity: 0;
}


/* 素材预览 */
.material-preview {
    width: 100%;
    max-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.material-preview img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
}


/* 底部悬浮操作栏 */
.floating-action-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(0px);
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 30px;
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
    z-index: 100;
}

.selected-count {
    font-size: 12px;
    color: #606266;
    font-weight: 500;
    padding-right: 16px;
    border-right: 1px solid #e4e7ed;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--primary-color);
}

.action-btn:hover {
    background: var(--primary-color);
    color: white;
}
</style>
