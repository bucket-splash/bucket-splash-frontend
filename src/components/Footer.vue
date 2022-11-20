<template lang="">
  <div class="footer-container">&copy; SSAFY 8기 알박하</div>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';

.footer-container {
  height: 4rem;
  padding: 1rem;
  background-color: $lightGray;
  font-family: 'maple';
}
</style>
