<template lang="">
  <div class="container">
    <div @click="handleClick" class="float-button">
      <b-icon icon="plus-lg" aria-hidden="true"></b-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FloatButton',
  methods: {
    handleClick() {
      this.$router.push('/regist');
    },
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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
  flex-direction: row-reverse;
}
</style>
