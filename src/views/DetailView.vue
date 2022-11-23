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
        <form style="position: relative" @submit="submitComment">
          <input
            type="text"
            v-model="commentContent"
            class="my-input"
            style="width: 100%; padding-right: 4rem; height: 4rem"
          />
          <b-button
            type="submit"
            variant="outline-primary"
            style="position: absolute; right: 0; top: 50%; transform: translate(-1rem, -50%)"
            >작성하기</b-button
          >
        </form>
        <div v-for="(comment, index) in comments" :key="index" class="card p-3 mt-3">
          <div class="d-flex justify-content-between align-items-center">
            <div
              @click="() => showProfile(comment)"
              style="cursor: pointer"
              class="user d-flex flex-row align-items-center"
            >
              <img
                :src="comment.profile_image ? comment.profile_image : defaultProfile"
                width="30"
                class="user-img rounded-circle mr-2"
                style="aspect-ratio: 1; object-fit: cover"
              />
              <span
                ><small class="font-weight-bold">{{ comment.nickname }}</small>
              </span>
            </div>

            <small style="display: flex; gap: 0.5rem; align-items: center">
              {{ comment.created_at }}
              <span
                v-if="comment.email === userInfo?.email"
                @click.stop="() => editComment(comment)"
                style="cursor: pointer; font-size: 1.2rem"
                color="green"
                ><b-icon
                  color="green"
                  v-if="toggleCommentEdit === comment.board_comment_id"
                  icon="check-lg"
                  aria-hidden="true"
                ></b-icon>
                <b-icon v-else icon="pencil-square" aria-hidden="true"></b-icon>
              </span>

              <span
                v-if="comment.email === userInfo?.email"
                @click.stop="() => deleteComment(comment)"
                style="color: tomato; cursor: pointer; font-size: 1.2rem"
                ><b-icon icon="trash-fill" aria-hidden="true"></b-icon
              ></span>
            </small>
          </div>

          <div class="action d-flex justify-content-between mt-2 align-items-center">
            <div v-if="toggleCommentEdit !== comment.board_comment_id" class="reply px-4">
              {{ comment.board_comment_content }}
            </div>
            <div v-if="toggleCommentEdit === comment.board_comment_id" class="reply px-4" style="width: 100%">
              <input class="my-input" type="text" v-model="commentEdit" style="width: 100%" />
            </div>
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
          class="my-input d-block w-100"
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
import { mapState } from 'vuex';
import { timeUtil } from '@/utils/timeUtil';
export default {
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: `${this.$store.state.baseUrl}board/${this.$route.params.id}`,
    });
    this.boardDetail = data;
    this.boardDetail.created_at = timeUtil(this.boardDetail.created_at);
    const commentRes = await axios({
      method: 'GET',
      url: `${this.$store.state.baseUrl}board/comment/`,
      params: {
        board_id: data.board_id,
        page: 1,
      },
    });
    this.comments = commentRes.data.map((item) => {
      console.log(item.created_at);
      return { ...item, created_at: timeUtil(item.created_at) };
    });
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
      commentContent: '',
      editForm: {
        board_title: '',
        board_content: '',
      },
      uploadImg: '',
      previewImg: '',
      uploadImgUrl: '',
      toggleCommentEdit: -1,
      commentEdit: '',
      comments: [],
      isLoading: false,
      noImg: require('../assets/images/noImg.jpg'),
      defaultProfile: require('../assets/images/defaultProfile.jpg'),
    };
  },
  methods: {
    showProfile(item) {
      console.log(item);
      this.$router.push(`/profile/${item.email}`);
    },
    editComment(item) {
      if (this.toggleCommentEdit === -1) {
        console.log(item);
        this.commentEdit = item.board_comment_content;
        this.toggleCommentEdit = item.board_comment_id;
        return;
      }
      const newComments = this.comments.map((comment) => {
        if (comment.board_comment_id !== item.board_comment_id) return comment;
        return { ...comment, board_comment_content: this.commentEdit };
      });
      axios({
        url: `${this.$store.state.baseUrl}board/comment/`,
        method: 'PUT',
        data: {
          board_comment_content: this.commentEdit,
          board_comment_id: item.board_comment_id,
          created_by: this.userInfo.email,
        },
      });
      this.comments = newComments;
      this.toggleCommentEdit = -1;
    },
    deleteComment(item) {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseUrl}board/comment/${item.board_comment_id}`,
      });
      const newComments = this.comments.filter((comment) => comment.board_comment_id !== item.board_comment_id);
      this.comments = newComments;
    },
    submitComment(e) {
      e.preventDefault();
      if (this.commentContent.length < 5) {
        this.$toast.open({
          message: '댓글을 5글자 이상 입력해주세요',
          type: 'error',
        });
        return;
      }
      const newComment = {
        profile_image: this.userInfo.profile_image,
        nickname: this.userInfo.nickname,
        created_at: '2022-11-22T04:50:51.000+00:00',
        email: this.userInfo.email,
        board_comment_content: this.commentContent,
      };
      this.comments = [newComment, ...this.comments];
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}board/comment/`,
        data: {
          board_comment_content: this.commentContent,
          board_id: this.boardDetail.board_id,
          created_by: this.userInfo.email,
        },
      });
      this.commentContent = '';
    },
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
      if (this.boardDetail.email === this.userInfo?.email) {
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
          created_by: this.userInfo.email,
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
