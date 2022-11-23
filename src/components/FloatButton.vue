<template lang="">
  <div class="container">
    <div @click="goUp" class="float-button">
      <b-icon icon="arrow-up" aria-hidden="true" scale="1.5"></b-icon>
    </div>

    <b-dropdown variant="link" no-caret style="padding: 0">
      <template #button-content>
        <div v-if="userInfo" class="float-button" style="padding: 0">
          <b-icon icon="plus-lg" aria-hidden="true"></b-icon>
        </div>
        <span class="sr-only">Search</span>
      </template>
      <b-dropdown-item @click="registBucket">버킷리스트 작성</b-dropdown-item>
      <b-dropdown-item @click="registBoard">게시글 작성</b-dropdown-item>
      <b-dropdown-item @click="registRecruit">모집글 작성</b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'FloatButton',
  methods: {
    registBoard() {
      this.$router.push('/regist');
    },
    registBucket() {
      this.$router.push('/regist');
    },
    registRecruit() {
      this.$router.push('/regist');
    },
    goUp() {
      const myEl = document.getElementById('window-top');
      this.$smoothScroll({
        scrollTo: myEl,
        duration: 0.5,
      });
    },
  },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';

.float-button {
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  right: 1rem;
  width: 5rem;
  height: 5rem;
  aspect-ratio: 1;
  opacity: 0.4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: $gray;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  &:hover {
    opacity: 1;
  }
}
.container {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  gap: 1rem;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
