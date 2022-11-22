<template lang="">
  <div>
    <div class="wrapper">
      <div class="item-container" ref="buckets">
        <div class="bucket-container" v-for="(item, i) in boards" :key="i">
          <div style="cursor: pointer" @click="() => handleClick(item.board_id)">
            <img :src="item.board_image ? item.board_image : noImg" class="thumbnail" />
            <div class="bucket-content">
              <h1>{{ item.board_title }}</h1>
              <p class="bucket-text">{{ item.board_content }}</p>
              <p class="bucket-time">{{ item.created_at }} · {{ 12 }}개의 댓글</p>
            </div>
          </div>
          <div class="divider"></div>
          <div class="bucket-footer" style="cursor: pointer">
            <div @click="() => seeProfile(item)">
              <img :src="item.profile_image ? item.profile_image : defaultProfile" alt="" class="avatar-img" />
              <span style="color: #868e96">by </span>
              <span>{{ item.nickname }}</span>
            </div>
            <div>
              <b-icon icon="heart-fill" aria-hidden="true"></b-icon>
              {{ 13 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty">
      <span v-if="finish">더 이상 로드할 게시글이 없습니다</span>
    </div>
    <InfiniteLoading v-if="!isLoading" @infinite="infiniteHandler" spinner="waveDots"></InfiniteLoading>
  </div>
</template>
<script>
import gsap from 'gsap';
import InfiniteLoading from 'vue-infinite-loading';
import { mapState } from 'vuex';

export default {
  name: 'InfiniteBoard',
  components: { InfiniteLoading },
  data() {
    return {
      buckets: [],
      isLoading: false,
      limit: 12,
      page: 2,
      defaultProfile: require('../assets/images/defaultProfile.jpg'),
      noImg: require('../assets/images/noImg.jpg'),
      finish: false,
    };
  },
  methods: {
    async infiniteHandler($state) {
      const result = await this.$store.dispatch('boardStore/getBoardList', this.page);
      if (result) {
        $state.loaded();
        this.page += 1;
        return;
      }
      $state.complete();
      this.finish = true;
      this.isLoading = true;
    },
    handleClick(id) {
      this.$router.push(`board/${id}`);
    },
    seeProfile(item) {
      if (item.email === this.$store.state.userStore?.userInfo?.email) {
        this.$router.push(`/profile`);
        return;
      }
      this.$router.push(`/profile/${item.email}`);
    },
  },
  async mounted() {
    this.$store.dispatch('boardStore/initBoard');
  },

  computed: {
    ...mapState('boardStore', ['boards']),
  },

  watch: {
    async boards(newValue, oldValue) {
      await this.$nextTick();
      gsap.from(this.$refs.buckets.childNodes, {
        scrollTrigger: {
          trigger: this.$refs.buckets,
          start: 'top 50%',
        },
        scale: 0.1,
        opacity: 0,
        y: 40,
        ease: 'power1.inOut',
        duration: (index) => {
          const delay = index / this.limit - (newValue.length - this.limit) / this.limit;
          return delay >= 0 ? 0.6 : 0;
        },
        stagger: (index) => {
          const delay = index / this.limit - (newValue.length - this.limit) / this.limit;
          return delay >= 0 ? delay : 0;
        },
        onStart: () => (this.isLoading = true),
        onComplete: () => {
          this.isLoading = false;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';
.empty {
  height: 10rem;
  background-color: $blue;
  display: flex;
  justify-content: center;
  font-family: 'maple';
  font-size: 1.5rem;
}
.bucket-time {
  font-size: 0.8rem;
  color: $gray;
  margin: 0;
}
.bucket-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.wrapper {
  background-color: $blue;
  padding-bottom: 10vh;
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
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
}
.bucket-content {
  padding: 1rem 1rem 0.5rem;
  h1 {
    font-size: 1.5rem;
  }
}
.thumbnail {
  width: 100%;
  aspect-ratio: 16/9;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  object-fit: cover;
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
