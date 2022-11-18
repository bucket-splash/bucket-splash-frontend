<template>
  <div>
    <LandingView />
    <InfiniteBoard />
  </div>
</template>

<script>
import LandingView from '@/components/LandingView.vue';
import InfiniteBoard from '@/components/InfiniteBoard.vue';

export default {
  name: 'HomeView',
  components: { LandingView, InfiniteBoard },
};
</script>
