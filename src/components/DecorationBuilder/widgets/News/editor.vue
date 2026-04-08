<template>
  <div class="news-editor">
    <a-form :model="localComponent.props" layout="vertical">
      <a-form-item label="列表标题">
        <a-input v-model="localComponent.props.title" />
      </a-form-item>
      
      <a-form-item label="新闻列表">
        <div 
          v-for="(news, index) in localComponent.props.news" 
          :key="news.id"
          class="news-item"
        >
          <a-form-item :label="`新闻 ${index + 1}`" :label-col="{ span: 24 }">
            <a-input 
              v-model="news.title" 
              placeholder="新闻标题"
              style="margin-bottom: 8px"
            />
            <a-input 
              v-model="news.date" 
              placeholder="日期"
              style="margin-bottom: 8px"
            />
            <a-input 
              v-model="news.link" 
              placeholder="跳转链接（可选）"
            />
          </a-form-item>
          <a-button 
            type="text" 
            danger 
            size="small"
            @click="removeNews(index)"
          >
            删除
          </a-button>
        </div>
        <a-button type="dashed" block @click="addNews">
          <a-icon type="plus" /> 添加新闻
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'NewsEditor',
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localComponent: JSON.parse(JSON.stringify(this.component))
    }
  },
  watch: {
    component: {
      handler(newVal) {
        this.localComponent = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  },
  methods: {
    // 新闻列表相关方法
    addNews() {
      const newId = Math.max(...this.localComponent.props.news.map(n => n.id)) + 1
      this.localComponent.props.news.push({
        id: newId,
        title: '',
        date: '',
        link: ''
      })
    },
    
    removeNews(index) {
      if (this.localComponent.props.news.length > 1) {
        this.localComponent.props.news.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.news-editor {
  width: 100%;
}

.news-item {
  position: relative;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  margin-bottom: 15px;
}

.news-item .ant-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}
</style>