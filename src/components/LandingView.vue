<template>
  <div style="height: calc(100vh - 4rem); overflow: hidden">
    <div class="main-section bg-container">
      <img src="../assets/bgimg.jpg" class="bg-img" />
      <div class="title-container" style="clip-path: circle(0)">
        <div class="content">
          <h2>BucketSplash</h2>
          <h2>BucketSplash</h2>
        </div>
      </div>
    </div>
    <div class="first-section bg-container scroll-section">
      <p>&copy; SSAFY 8기 박이령 하훈목</p>
    </div>
    <div class="second-section bg-container scroll-section">
      <p>&copy; SSAFY 8기 박이령 하훈목</p>
    </div>
  </div>
</template>
<script>
import gsap from 'gsap';
export default {
  name: 'LandingView',
  mounted() {
    gsap.fromTo(
      '.second-section',
      {
        y: '-170vh',
      },
      {
        ease: 'Power1.easeIn',
        delay: 0.5,
        duration: 1,
        y: '-90vh',
      }
    );
    gsap.fromTo(
      '.first-section',
      {
        y: '-70vh',
      },
      {
        ease: 'Power1.easeIn',
        delay: 0.7,
        duration: 1,
        y: '0vh',
      }
    );
    gsap.to('.bg-img', {
      delay: 1.7,
      duration: 1.2,
      clipPath: 'circle(100%)',
      ease: 'Power1.easeOut',
    });
    gsap.to('.title-container', {
      delay: 1.7,
      duration: 1.2,
      clipPath: 'circle(435px)',
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';
.bg-container {
  width: 100vw;
  height: 100vh;
  background-color: $blue;
}
.second-section {
  z-index: 9;
}
.first-section {
  background-color: $lightGray;
}
.scroll-section {
  display: flex;
  justify-content: center;
  p {
    font-family: 'maple';
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    height: 10vh;
  }
}
.main-section {
  background-color: $lightGray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.main-section {
  background-color: transparent;
  height: 70vh;
}
.bg-img {
  clip-path: circle(0%);
  width: 100%;
  position: absolute;
  top: 0;
  object-fit: cover;
  height: 70vh;
}

.content {
  position: relative;
  width: 100%;
  height: 6rem;
}

.content h2 {
  font-family: 'maple-bold';
  color: #fff;
  font-size: 6rem;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
}

.content h2:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 2px $blue;
}

.content h2:nth-child(2) {
  color: $blue;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
</style>
