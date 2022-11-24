<template lang="">
  <div style="padding: 6rem 0; background-color: #03a9f4; min-height: calc(100vh - 8rem)">
    <InfiniteFollowBoard />
  </div>
</template>
<script>
import InfiniteFollowBoard from '@/components/InfiniteFollowBoard.vue';
import { mapState } from 'vuex';
export default {
  name: 'FollowBoardView',
  components: { InfiniteFollowBoard },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  mounted() {},
};
</script>
<style lang=""></style>
