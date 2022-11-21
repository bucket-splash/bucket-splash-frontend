<template>
  <div>
    <LandingView />
    <InfiniteBoard />
    <FloatButton v-if="userInfo" />
  </div>
</template>

<script>
import LandingView from '@/components/LandingView.vue';
import InfiniteBoard from '@/components/InfiniteBoard.vue';
import FloatButton from '@/components/FloatButton.vue';
import { mapState } from 'vuex';
export default {
  name: 'HomeView',
  components: { LandingView, InfiniteBoard, FloatButton },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
};
</script>
