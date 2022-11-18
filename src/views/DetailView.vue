<template lang="">
  <div>detail View</div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      bucket: {},
      user: {},
      comments: {},
    };
  },
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:8080/detailItem.json',
    });
    this.bucket = data.bucket;
    this.user = data.user;
    this.comments = data.comments;
  },
};
</script>
<style lang=""></style>
