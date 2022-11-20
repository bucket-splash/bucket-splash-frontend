<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer>asd</Footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import jwtDecode from 'jwt-decode';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  created() {
    const { email } = jwtDecode(localStorage.getItem('ssafy-token'));
    console.log(email);
  },
};
</script>
<style lang="scss">
body {
  max-width: 100vw;
  overflow-x: hidden;
}
@font-face {
  font-family: 'maple';
  src: url('./assets/fonts/MaplestoryLight.ttf');
}
@font-face {
  font-family: 'maple-bold';
  src: url('./assets/fonts/MaplestoryBold.ttf');
}
</style>
