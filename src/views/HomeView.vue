<template>
  <div>
    <div
      class="first-section bg-container"
      style="
        background-color: yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      "
    >
      <img
        style="width: 100%; position: absolute; top: 0"
        src="../assets/bgimg.png"
        class="bg-img"
      />
    </div>
    <div class="second-section bg-container"></div>
  </div>
</template>

<script>
import gsap from 'gsap';
export default {
  name: 'HomeView',
  components: {},
  mounted() {
    gsap.fromTo(
      '.second-section',
      {
        top: 0,
      },
      {
        delay: 0.5,
        duration: 1,
        top: '90vh',
      }
    );
    gsap.to('.bg-img', {
      delay: 1.5,
      duration: 1.2,
      clipPath: 'circle(100%)',
    });
  },
};
</script>

<style lang="scss" scoped>
.bg-container {
  width: 100vw;
  height: 100vh;
  background-color: aqua;
}
.second-section {
  position: absolute;
  top: 0;
}
.bg-img {
  clip-path: circle(0%);
}
</style>
