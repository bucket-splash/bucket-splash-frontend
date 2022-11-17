<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    user && this.$store.dispatch('login', user);
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: 'maple';
  src: url('./assets/fonts/MaplestoryLight.ttf');
}
@font-face {
  font-family: 'maple-bold';
  src: url('./assets/fonts/MaplestoryBold.ttf');
}
</style>
