<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <h1>회원가입</h1>

        <form style="width: 100%; display: flex; flex-direction: column; align-items: center" @submit="handleSubmit">
          <label for="picture" style="cursor: pointer; display: flex; justify-content: center; width: 100%">
            <img
              :src="previewImg ? previewImg : defaultProfile"
              style="width: 50%; object-fit: cover; border-radius: 50%; aspect-ratio: 1"
            />
          </label>
          <label for="picture" style="cursor: pointer; font-family: maple; font-size: 1.2rem; margin-top: 1rem">
            이미지 업로드 <b-icon icon="pencil-square"></b-icon>
          </label>

          <input
            class="image-input d-block w-100 my-input"
            v-model="uploadImgUrl"
            @change="changePreviewByUrl"
            type="input"
            placeholder="또는 이미지URL"
          />

          <b-form-file
            id="picture"
            style="display: none"
            @change="changePreview"
            v-model="uploadImg"
            :state="Boolean(uploadImg)"
          ></b-form-file>

          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="닉네임"
              name="nickname"
              id="nickname"
              v-model="nickname"
              required
            />
            <label for="nickname" class="form__label">닉네임</label>
          </div>

          <div class="form__group field">
            <input
              type="input"
              class="form__field"
              placeholder="이메일"
              name="email"
              id="email"
              v-model="email"
              required
            />
            <label for="email" class="form__label">이메일</label>
          </div>

          <div class="form__group field">
            <input
              type="password"
              class="form__field"
              placeholder="비밀번호"
              name="password"
              id="password"
              v-model="password"
              required
            />
            <label for="password" class="form__label">비밀번호</label>
          </div>

          <div class="form__group field">
            <input
              type="password"
              class="form__field"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
            <label for="confirmPassword" class="form__label">비밀번호확인</label>
          </div>
          <button class="button-26 my-4" :disabled="isLoading" role="button">회원가입</button>
        </form>
        <div class="divider"></div>
        <!-- HTML !-->
        <button
          style="background-color: #fdd61b; color: #59473f"
          class="button-26 my-4"
          role="button"
          :disabled="isLoading"
          @click="kakaoLogin"
        >
          카카오로 시작하기
        </button>

        <p>
          이미 회원이 아니신가요?
          <router-link to="login">로그인</router-link>
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'SignupView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      isLoading: false,
      defaultProfile: require('../assets/images/defaultProfile.jpg'),
      previewImg: '',
      uploadImgUrl: '',
      uploadImg: '',
    };
  },
  computed: {
    validForm() {
      return {
        value: this.email.length > 4 && this.userId.length < 13,
        message: 'ok',
      };
    },
  },
  methods: {
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
    async handleSubmit(e) {
      e.preventDefault();
      this.isLoading = true;

      if (this.uploadImg) {
        const form = new FormData();
        form.append('file', this.uploadImg);
        form.append('upload_preset', 'quzqjwbp');
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/dohkkln9r/upload', form);
        this.uploadImgUrl = data.url;
      }

      const { data } = await axios({
        url: `${this.$store.state.baseUrl}user/signup`,
        method: 'POST',
        data: {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          profile_image: this.uploadImgUrl,
        },
      });

      if (data === 0) {
        this.$toast.open({
          message: `${this.email}는 이미 존재하는 이메일 입니다`,
          type: 'error',
        });
        this.isLoading = false;
        return;
      }
      const login = await axios({
        url: this.$store.state.baseUrl + 'user/login',
        method: 'POST',
        data: {
          email: this.email,
          password: this.password,
        },
      });
      this.$store.dispatch('userStore/login', {
        token: login.data.accessToken,
        userInfo: login.data.userInfo,
      });
      this.$router.push('/');
    },
    async kakaoLogin() {
      this.isLoading = true;
      window.Kakao.Auth.login({
        success: async () => {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: async (res) => {
              // todo 카카오 로그인 api
              const { data } = await axios({
                url: this.$store.state.baseUrl + 'user/kakao/login',
                method: 'POST',
                data: {
                  email: res.id,
                  nickname: res.properties.nickname,
                  password: res.id,
                  profile_image: res.properties.profile_image,
                },
              });
              if (data.message === 'fail') {
                this.$toast.open({
                  message: 'unknown error',
                  type: 'error',
                });
                return;
              }
              this.$store.dispatch('userStore/login', {
                token: data.accessToken,
                userInfo: data.userInfo,
              });
              this.$router.push('/');
              return;
            },
          });
        },
      });
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
@import '../style/input.scss';
@import '../style/button.scss';
.divider {
  height: 1px;
  background: $lightGray;
  width: 100%;
}
.wrapper {
  background-color: $blue;
  min-height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-wrapper {
  width: 80%;
  max-width: 600px;
  height: 100%;
  min-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'maple';
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.8) 0px 1px 2px;
  border-radius: 1rem;
}
</style>
