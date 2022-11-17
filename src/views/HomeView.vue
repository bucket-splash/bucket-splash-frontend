<template>
  <div>
    <LandingView />
    <div class="item-container">
      <div v-for="(item, i) in buckets" :key="i">
        <img src="" alt="" />
        <h1></h1>
        <p></p>
        <p></p>
        <div>divider</div>
        <div>
          <img src="" alt="" />
          <span>by</span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingView from '@/components/LandingView.vue';
import axios from 'axios';
export default {
  name: 'HomeView',
  components: { LandingView },
  data() {
    return {
      buckets: [],
    };
  },
  async created() {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:8080/items.json',
    });
    this.buckets = data.buckets;
    console.log(this.buckets);
  },
};
</script>

<style lang="scss" scoped>
@import '../style/colors.scss';
.item-container {
  background-color: $blue;
}
</style>
