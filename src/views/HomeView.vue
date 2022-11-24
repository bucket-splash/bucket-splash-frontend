<template>
  <div>
    <LandingView />
    <InfiniteBoard />
  </div>
</template>

<script>
import LandingView from '@/components/LandingView.vue';
import InfiniteBoard from '@/components/InfiniteBoard.vue';
import { mapState } from 'vuex';
export default {
  name: 'HomeView',
  components: { LandingView, InfiniteBoard },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  mounted() {},
};
</script>
