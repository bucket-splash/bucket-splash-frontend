<template lang="">
  <div style="padding: 6rem 0; background-color: #03a9f4">
    <InfiniteFollowBoard />
    <FloatButton />
  </div>
</template>
<script>
import InfiniteFollowBoard from '@/components/InfiniteFollowBoard.vue';
import FloatButton from '@/components/FloatButton.vue';
import { mapState } from 'vuex';
export default {
  name: 'FollowBoardView',
  components: { InfiniteFollowBoard, FloatButton },
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  mounted() {},
};
</script>
<style lang=""></style>
