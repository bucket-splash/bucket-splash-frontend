import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// module import
import boardStore from '@/store/modules/boardStore';
import userStore from '@/store/modules/userStore';
import todoStore from '@/store/modules/todoStore';

Vue.use(Vuex);
// 192.168.35.122
export default new Vuex.Store({
  modules: {
    boardStore,
    userStore,
    todoStore,
  },
  state: {
    baseUrl: 'http://192.168.35.122:8080/',
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
