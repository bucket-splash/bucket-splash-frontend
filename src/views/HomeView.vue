<template>
  <div>
    <LandingView />
    <div class="wrapper">
      <div class="item-container">
        <div class="bucket-container" v-for="(item, i) in buckets" :key="i">
          <img :src="item.bucket.imageUrl" class="thumbnail" />
          <div class="bucket-content">
            <h1>{{ item.bucket.title }}</h1>
            <p class="bucket-text">{{ item.bucket.content }}</p>
            <p class="bucket-time">
              {{ item.bucket.createdAt }} · {{ item.bucket.commentCnt }}개의
              댓글
            </p>
          </div>
          <div class="divider"></div>
          <div class="bucket-footer">
            <div>
              <img :src="item.user.avatarUrl" alt="" class="avatar-img" />
              <span style="color: #868e96">by </span>
              <span>{{ item.user.name }}</span>
            </div>
            <div>
              <b-icon icon="heart-fill" aria-hidden="true"></b-icon>
              {{ item.bucket.likeCnt }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingView from '@/components/LandingView.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: { LandingView },
  data() {
    return {
      buckets: [],
    };
  },
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:8080/items.json',
    });
    this.buckets = data.buckets;
    console.log(this.buckets);
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';
.bucket-time {
  font-size: 0.8rem;
  color: $gray;
  margin: 0;
}
.bucket-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.wrapper {
  background-color: $blue;
}
.item-container {
  max-width: 90rem;
  width: 90vw;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  justify-content: center;
  gap: 2rem;
  font-family: 'maple';
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.8) 0px 1px 2px;
  border-radius: 1rem;
}
.bucket-container {
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px, rgba(0, 0, 0, 0.32) 0px 1px 2px;
}
.bucket-content {
  padding: 1rem 1rem 0.5rem;
  h1 {
    font-size: 1.5rem;
  }
}
.thumbnail {
  width: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.divider {
  height: 1px;
  background: $lightGray;
  width: 100%;
}
.bucket-footer {
  padding: 1rem;
  .avatar-img {
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
