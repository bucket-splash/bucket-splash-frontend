<template lang="">
  <div style="padding: 6rem 0; background-color: #03a9f4">
    <InfiniteRecruitBoard />
  </div>
</template>
<script>
import InfiniteRecruitBoard from '@/components/InfiniteRecruitBoard.vue';
import { mapState } from 'vuex';

export default {
  name: 'RecruitBoardView',
  components: {
    InfiniteRecruitBoard,
  },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
};
</script>
<style lang=""></style>
