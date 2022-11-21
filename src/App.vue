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
import axios from 'axios';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  async created() {
    this.$router.push('/');
    const accessToken = localStorage.getItem('ssafy-token');
    const { email } = jwtDecode(accessToken);
    const { data } = await axios({
      url: `http://172.20.10.8:8080/user/info/${email}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        accessToken,
      },
    });
    console.log(data);
    if (data.message === 'fail') return;
    this.$store.dispatch('userStore/login', {
      userInfo: data.userInfo,
      token: accessToken,
    });
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
