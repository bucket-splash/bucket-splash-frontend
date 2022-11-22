<template lang="">
  <div class="container">
    <div @click="goUp" class="float-button">
      <b-icon icon="arrow-up" aria-hidden="true" scale="1.5"></b-icon>
    </div>
    <div v-if="userInfo" @click="handleClick" class="float-button">
      <b-icon icon="plus-lg" aria-hidden="true"></b-icon>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'FloatButton',
  methods: {
    handleClick() {
      this.$router.push('/regist');
    },
    goUp() {
      const myEl = document.getElementById('window-top');
      this.$smoothScroll({
        scrollTo: myEl,
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
}
</style>
