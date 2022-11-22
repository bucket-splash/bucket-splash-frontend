import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// module import
import boardStore from '@/store/modules/boardStore';
import userStore from '@/store/modules/userStore';
import todoStore from '@/store/modules/todoStore';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    boardStore,
    userStore,
    todoStore,
  },
  state: {
    baseUrl: `http://70.12.50.130:8080/`,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
