<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <h1>회원가입</h1>

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
            <label for="confirmPassword" class="form__label"
              >비밀번호확인</label
            >
          </div>
          <button class="button-26 my-4" :disabled="isLoading" role="button">
            회원가입
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
      this.$toast.open({
        message: `${this.email}는 이미 존재하는 이메일 입니다`,
        type: 'error',
      });
    },
    async kakaoLogin() {
      window.Kakao.Auth.login({
        success: function async() {
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: async function (res) {
              // todo 카카오 로그인 api
              // const { data } = await axios({});
              // this.$store.dispatch('login', {
              //   data: { token: data.accessToken },
              //   userInfo: data.userInfo,
              // });
              this.$store.dispatch('login', {
                data: { token: 'kakao-token', userInfo: {} },
              });
              return res;
            },
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
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
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 80%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
.button-26 {
  width: 80%;
  appearance: button;
  background-color: #1899d6;
  border: none;
  /* background-color: #1899d6; */
  /* background-color: #1cb0f6; */
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.15;
  overflow: visible;
  padding: 12px 16px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: all 80ms ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-26:disabled {
  opacity: 0.5;
}

.button-26:focus {
  outline: 0;
}

.button-26:hover {
  filter: brightness(1.1);
}
</style>
