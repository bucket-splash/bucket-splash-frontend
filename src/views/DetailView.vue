<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <div class="profile-container">
          <img :src="boardDetail.user.avatarUrl" alt="" />
          <div class="profile-item">
            <div>
              <h4>박이롱</h4>
              <button>팔로우</button>
            </div>
            <h6>11월 17일 작성</h6>
          </div>
        </div>

        <!-- 캐러셀 -->
        <b-carousel
          id="carousel-1"
          v-model="slide"
          controls
          indicators
          :interval="0"
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="margin-bottom: 1rem"
        >
          <b-carousel-slide
            v-for="(item, index) in boardDetail.board.images"
            :key="index"
          >
            <template #img>
              <img
                class="d-block img-fluid w-100 my-img"
                width="1024"
                height="480"
                :src="item"
                alt="image slot"
                style="height: 15rem"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
        <!-- 캐러셀 끗  -->
        <h2>{{ boardDetail.board.title }}</h2>
        <p>{{ boardDetail.board.content }}</p>
        <div style="display: flex; gap: 0.7rem">
          <span>
            <b-icon color="red" icon="heart-fill" aria-hidden="true"></b-icon>
          </span>
          <span>
            <b-icon icon="chat-dots" aria-hidden="true"></b-icon>
          </span>
          <span><b-icon icon="share-fill" aria-hidden="true"></b-icon></span>
        </div>
        <p style="font-size: 0.8rem">
          좋아요 {{ boardDetail.board.likeCnt }}개
        </p>
        <!-- 여기부터 댓글창 -->
        <div class="divider"></div>

        <div
          v-for="(comment, index) in boardDetail.comments"
          :key="index"
          class="card p-3 mt-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div class="user d-flex flex-row align-items-center">
              <img
                :src="comment.user.avatarUrl"
                width="30"
                class="user-img rounded-circle mr-2"
              />
              <span
                ><small class="font-weight-bold">{{ comment.user.name }}</small>
              </span>
            </div>

            <small>이틀 전</small>
          </div>

          <div
            class="action d-flex justify-content-between mt-2 align-items-center"
          >
            <div class="reply px-4">{{ comment.payload }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  async created() {
    await this.getBoardDetail();
  },
  computed: {
    ...mapState('boardStore', ['boardDetail']),
  },
  methods: {
    ...mapActions('boardStore', ['getBoardDetail']),
    focusImg(e) {
      e.target.style = '';
      e.target.parentElement.style.height = '100%';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.wrapper {
  background-color: $blue;
  min-height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-wrapper {
  width: 50%;
  height: 100%;
  min-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  justify-content: center;
  gap: 2rem;
  font-family: 'maple';
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.8) 0px 1px 2px;
  border-radius: 1rem;
}
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
