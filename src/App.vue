<template>
  <div id="app">
    <Header></Header>
    <router-view :key="$route.fullPath" />
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
      url: `${this.$store.state.baseUrl}user/info/${email}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        accessToken,
      },
    });
    console.log('DATA', data);
    if (data.message == 'fail') {
      localStorage.removeItem('ssafy-token');
      return;
    }
    this.$store.dispatch('userStore/login', {
      userInfo: data.userInfo,
      token: accessToken,
    });
  },
};
</script>
<style lang="scss">
* {
  scroll-behavior: smooth;
}
body {
  max-width: 100vw;
  overflow-x: hidden;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none;
}
body::-webkit-scrollbar {
  display: none; /* 크롬, 사파리, 오페라, 엣지 */
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
