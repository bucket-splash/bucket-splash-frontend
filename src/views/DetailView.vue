<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <div @click="seeProfile" class="profile-container">
          <img :src="boardDetail.profile_image" alt="" />
          <div class="profile-item">
            <div>
              <h4>{{ boardDetail.nickname }}</h4>
              <button>팔로우</button>
            </div>
            <h6>{{ boardDetail.created_at }}</h6>
          </div>
        </div>

        <!-- 캐러셀 -->
        <!-- <b-carousel
          id="carousel-1"
          v-model="slide"
          :indicators="false"
          :interval="0"
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="margin-bottom: 1rem"
        >
          <b-carousel-slide>
            <template #img>
              <img
                class="d-block img-fluid w-100 my-img"
                width="1024"
                height="480"
                :src="boardDetail.board_image ? boardDetail.board_image : noImg"
                alt="image slot"
                style="height: 15rem"
              />
            </template>
          </b-carousel-slide>
        </b-carousel> -->

        <img
          class="img-fluid w-100 mb-4"
          :src="boardDetail.board_image ? boardDetail.board_image : noImg"
          alt="image slot"
        />
        <!-- 캐러셀 끗  -->
        <h2>{{ boardDetail.board_title }}</h2>
        <p>{{ boardDetail.board_content }}</p>
        <div style="display: flex; gap: 0.7rem">
          <span>
            <b-icon color="red" icon="heart-fill" aria-hidden="true"></b-icon>
          </span>
          <span>
            <b-icon icon="chat-dots" aria-hidden="true"></b-icon>
          </span>
          <span><b-icon icon="share-fill" aria-hidden="true"></b-icon></span>
        </div>
        <p style="font-size: 0.8rem">좋아요 {{ 13 }}개</p>
        <!-- 여기부터 댓글창 -->
        <div class="divider"></div>
        <div v-for="(comment, index) in comments" :key="index" class="card p-3 mt-3">
          <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center">
              <img :src="comment.avatarUrl" width="30" class="user-img rounded-circle mr-2" />
              <span
                ><small class="font-weight-bold">{{ comment.user.name }}</small>
              </span>
            </div>

            <small>이틀 전</small>
          </div>

          <div class="action d-flex justify-content-between mt-2 align-items-center">
            <div class="reply px-4">{{ comment.payload }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: `${this.$store.state.baseUrl}board/${this.$route.params.id}`,
    });
    console.log(data);
    this.boardDetail = data;
    console.log(this.boardDetail);
  },
  data() {
    return {
      boardDetail: {
        profile_image: '',
        board_title: '',
        nickname: '',
        board_content: '',
        email: '',
        created_at: '',
      },
      comments: [],
      noImg: require('../assets/images/noImg.jpg'),
    };
  },
  methods: {
    seeProfile() {
      console.log(this.boardDetail.email);
      console.log(this.$store.state.userStore.userInfo.email);
      if (this.boardDetail.email === this.$store.state.userStore.userInfo.email) {
        this.$router.push(`/profile`);
        return;
      }
      this.$router.push(`/profile/${this.boardDetail.email}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
@import '../style/wrapper.scss';

.profile-container {
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.profile-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  h4 {
    margin: 0;
  }
  div {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }
  button {
    padding: 0.2rem 0.6rem;
    border: none;
    border-radius: 1rem;
    font-size: 0.8rem;
    height: 2rem;
  }
  h6 {
    margin: 0;
    font-size: 0.8rem;
    color: $gray;
  }
}
.carousel-item {
  height: 15rem;
  img {
    object-fit: cover;
  }
}
.divider {
  width: 100%;
  height: 1px;
  background: $gray;
  margin: 1rem 0;
}
</style>
