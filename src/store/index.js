import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// module import
import boardStore from '@/store/modules/boardStore';
import userStore from '@/store/modules/userStore';
import recruitStore from '@/store/modules/recruitStore';
export const baseUrl = `http://localhost:8080/`;
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    boardStore,
    userStore,
    recruitStore,
  },
  state: {
    baseUrl: `http://localhost:8080/`,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
