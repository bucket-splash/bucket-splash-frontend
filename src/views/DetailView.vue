<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <div @click.stop="seeProfile" class="profile-container" style="cursor: pointer">
          <img :src="boardDetail.profile_image ? boardDetail.profile_image : defaultProfile" alt="" />
          <div class="profile-item">
            <div>
              <h4>{{ boardDetail.nickname }}</h4>
              <!-- <button>팔로우</button> -->
            </div>
            <h6>{{ boardDetail.created_at }}</h6>
          </div>
          <button
            class="button-26"
            @click.stop="showModal"
            v-if="boardDetail.email === this.$store.state.userStore?.userInfo?.email"
          >
            편집
          </button>
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

    <modal name="editModal" height="80%">
      <div class="my-modal-content p-4">
        <label for="picture" style="cursor: pointer">
          <img :src="previewImg ? previewImg : boardDetail.board_image ? boardDetail.board_image : noImg" alt="" />
        </label>
        <label for="picture" style="font-family: maple; font-size: 1.2rem; margin-top: 1rem; cursor: pointer"
          >이미지 수정 <b-icon icon="pencil-square"></b-icon
        ></label>
        <b-form-file
          id="picture"
          ref="imageRef"
          style="display: none"
          @change="changePreview"
          v-model="uploadImg"
          :state="Boolean(uploadImg)"
          placeholder="프로필이미지 수정"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <input
          class="image-input d-block w-100"
          v-model="uploadImgUrl"
          @change="changePreviewByUrl"
          type="input"
          placeholder="또는 이미지URL"
        />
        <div style="margin: 0" class="form__group field mb-4">
          <input
            type="text"
            class="form__field"
            :placeholder="boardDetail.board_title"
            name="editTitle"
            id="editTitle"
            v-model="editForm.board_title"
            required
          />
          <label for="editTitle" class="form__label">{{ boardDetail.board_title }}</label>
        </div>
        <b-form-textarea
          style="width: 80%"
          v-model="editForm.board_content"
          :placeholder="boardDetail.board_content"
          id="textarea-auto-height"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
        <button @click="handleSubmit" class="button-26 mt-4" :disabled="isLoading" role="button">수정하기</button>
        <button
          @click="handleDelete"
          class="button-26 mt-2"
          :disabled="isLoading"
          role="button"
          style="background-color: #ff6961"
        >
          삭제하기
        </button>
      </div>
    </modal>
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
    this.boardDetail = data;
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
        board_image: '',
      },
      editForm: {
        board_title: '',
        board_content: '',
      },
      uploadImg: '',
      previewImg: '',
      uploadImgUrl: '',
      comments: [],
      isLoading: false,
      noImg: require('../assets/images/noImg.jpg'),
      defaultProfile: require('../assets/images/defaultProfile.jpg'),
    };
  },
  methods: {
    handleDelete() {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseUrl}board/${this.boardDetail.board_id}`,
      });
      this.$router.push('/');
    },
    showModal() {
      this.$modal.show('editModal');
    },
    seeProfile() {
      if (this.boardDetail.email === this.$store.state.userStore?.userInfo?.email) {
        this.$router.push(`/profile`);
        return;
      }
      this.$router.push(`/profile/${this.boardDetail.email}`);
    },
    changePreviewByUrl() {
      this.previewImg = this.uploadImgUrl;
      this.uploadImg = '';
    },
    async changePreview() {
      await this.$nextTick();
      if (this.uploadImg.size > 2097152) {
        this.$toast.open({
          message: '파일의 크기가 너무 큽니다 (2MB이상)',
          type: 'error',
        });
        return;
      }
      this.uploadImgUrl = '';
      this.previewImg = URL.createObjectURL(this.uploadImg);
    },
    async handleSubmit() {
      if (this.uploadImg) {
        const form = new FormData();
        form.append('file', this.uploadImg);
        form.append('upload_preset', 'quzqjwbp');
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/dohkkln9r/upload', form);
        this.uploadImgUrl = data.url;
      }

      axios({
        method: 'PUT',
        url: this.$store.state.baseUrl + 'board',
        data: {
          board_content: this.editForm.board_content ? this.editForm.board_content : this.boardDetail.board_content,
          board_title: this.editForm.board_title ? this.editForm.board_title : this.boardDetail.board_title,
          created_by: this.$store.state.userStore.userInfo.email,
          board_image: this.uploadImgUrl ? this.uploadImgUrl : this.boardDetail.board_image,
          board_id: this.boardDetail.board_id,
        },
      });

      this.boardDetail.board_image = this.uploadImgUrl;
      this.boardDetail.board_title = this.editForm.board_title;
      this.boardDetail.board_content = this.editForm.board_content;
      this.uploadImgUrl = '';
      this.editForm.board_title = '';
      this.editForm.board_content = '';
      this.$modal.hide('editModal');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
@import '../style/wrapper.scss';
@import '../style/button.scss';
@import '../style/input.scss';
.my-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
  }
}
.profile-container {
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  button {
    position: absolute;
    width: 30%;
    right: 0;
    background-color: #ff6961;
  }
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
