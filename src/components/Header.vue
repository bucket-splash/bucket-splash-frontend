<template lang="">
  <div class="header-container">
    <div class="container">
      <img
        src="https://www.peengler.com/wp-content/uploads/logo-de-peengler.png"
        alt=""
        style="cursor: pointer"
        @click="() => this.$router.push('/')"
      />
      <b-nav>
        <b-nav-item @click="() => this.$router.push('/recruit')"
          >모집중</b-nav-item
        >
        <b-nav-item v-if="!userInfo" @click="() => this.$router.push('/login')"
          >로그인</b-nav-item
        >
        <b-nav-item v-if="userInfo" @click="() => this.$router.push('/recruit')"
          >우리팀</b-nav-item
        >
        <b-nav-item v-if="userInfo" @click="() => this.$router.push('/recruit')"
          >팔로우</b-nav-item
        >
        <b-nav-item v-if="userInfo" @click="() => this.$router.push('/recruit')"
          >내버킷</b-nav-item
        >
        <b-nav-item v-if="userInfo" @click="() => this.$router.push('/login')"
          >프로필</b-nav-item
        >

        <b-nav-form style="position: relative">
          <b-form-input
            style="padding-right: 2rem; opacity: 0; width: 0"
            aria-label="Input"
            class="header-input"
          >
          </b-form-input>
          <b-icon
            @click="handleClick"
            icon="search"
            font-scale="1.5rem"
            class="search-icon"
          ></b-icon>
        </b-nav-form>
      </b-nav>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap';
import { mapState } from 'vuex';
export default {
  name: 'Header',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleClick() {
      this.active = !this.active;
      gsap.to('.header-input', {
        width: this.active ? 0 : '12rem',
        opacity: this.active ? 0 : 1,
      });
      gsap.to('.search-icon', {
        color: this.active ? '#fff' : '#000',
      });
    },
  },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  mounted() {
    console.log(this.userInfo);
  },
};
</script>
<style lang="scss" scoped>
.header-container {
  z-index: 99999;
  position: sticky;
  top: 0;
  width: 100vw;
  padding: 0.5rem 0;
  background: #2989d8;
  background: linear-gradient(to right, #2989d8 0, #b524b5 52%, #f4af84 100%);
  box-shadow: 0 0 6px rgb(0 0 0 / 40%);
  color: #fff;
  height: 4rem;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  color: #fff;
  right: 0;
  margin-right: 0.5rem;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    gap: 1rem;
    font-size: 1.2rem;
    font-family: 'maple';
  }
}
.nav-link {
  color: #fff;
  font-family: 'maple';
}
</style>
