<template>
  <div class="news-component">
    <h3 class="news-title">{{ data.title || '新闻列表' }}</h3>
    <div class="news-list">
      <div 
        v-for="news in data.news" 
        :key="news.id"
        class="news-item"
      >
        <a v-if="news.link" :href="news.link" target="_blank" class="news-link">
          <div class="news-content">
            <h4 class="news-item-title">{{ news.title || '未标题新闻' }}</h4>
            <p class="news-item-date">{{ news.date || '日期待定' }}</p>
          </div>
          <a-icon type="right" class="news-arrow" />
        </a>
        <div v-else class="news-link">
          <div class="news-content">
            <h4 class="news-item-title">{{ news.title || '未标题新闻' }}</h4>
            <p class="news-item-date">{{ news.date || '日期待定' }}</p>
          </div>
          <a-icon type="right" class="news-arrow" />
        </div>
      </div>
      <div v-if="!data.news || data.news.length === 0" class="empty-news">
        暂无新闻数据
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPreview',
  props: {
    data: {
      type: Object,
      default: () => ({
        title: '新闻列表',
        news: []
      })
    }
  }
}
</script>

<style scoped>
.news-component {
  padding: 15px;
  background-color: white;
  border-radius: 8px;
}

.news-title {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.news-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.news-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.news-content {
  flex: 1;
}

.news-item-title {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.news-link:hover .news-item-title {
  color: var(--primary-color);
}

.news-item-date {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.news-arrow {
  color: #ccc;
  font-size: 14px;
}

.empty-news {
  text-align: center;
  padding: 30px 0;
  color: #999;
  background-color: #fafafa;
  border-radius: 4px;
}
</style>