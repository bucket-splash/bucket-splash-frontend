<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <h1>로그인</h1>

        <form
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
          @submit="handleSubmit"
        >
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
              placeholder="Name"
              name="password"
              id="password"
              v-model="password"
              required
            />
            <label for="password" class="form__label">비밀번호</label>
          </div>
          <button class="button-26 my-4" :disabled="isLoading" role="button">
            로그인
          </button>
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
          아직 회원이 아니신가요?
          <router-link to="signup">회원가입</router-link>
        </p>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
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
    async handleSubmit(e) {
      e.preventDefault();
      this.isLoading = true;
      const { data } = await axios({
        url: this.$store.state.baseUrl + 'user/login',
        method: 'POST',
        data: {
          email: this.email,
          password: this.password,
        },
      });
      if (data.message === 'fail') {
        this.$toast.open({
          message: '이메일 혹은 비밀번호가 옳바르지 않습니다',
          type: 'error',
        });
      } else {
        this.$store.dispatch('userStore/login', {
          token: data.accessToken,
          userInfo: data.userInfo,
        });
        this.$router.push('/');
      }
      this.isLoading = false;
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
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
</style>
