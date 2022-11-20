/**
 * 로그인 or 회원가입 =>
 * 토큰 발급받음 =>
 * localstorage 에 토큰저장 and vueX 에 전역으로 userinfo 저장=>
 * vueX에 유저 정보가 있다면, 토큰이 유효한지 굳이 검사 할 필요없음
 * 토큰은 다시 접속 했을때 자동 로그인 시키기 위해서만 존재
 */

import axios from 'axios';

const userStore = {
  namespaced: true,
  state: {
    userInfo: null,
  },
  actions: {
    async login({ state }, user) {
      const { data } = await axios({
        url: 'http://localhost:8080/loginSucess.json',
        method: 'get',
        params: { id: user.id },
      });
      if (data.ok) {
        localStorage.setItem('ssafy-token', data.token);
        state.userInfo = data.userInfo;
      }
      console.log(data);
    },
    logout({ state }) {
      localStorage.removeItem('ssafy-token');
      state.userInfo = null;
    },
    async getInfoByToken({ state, dispatch }, token) {
      const { data } = await axios({
        url: 'http://localhost:8080/loginSucess.json',
        method: 'GET',
        params: { token },
      });
      if (data) {
        state.userInfo = data.userInfo;
        return;
      }
      dispatch('logout');
    },
  },
};

export default userStore;
