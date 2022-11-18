import { sidoList, gugunList, houseList } from '@/api/house.js';

const houseStore = {
  namespaced: true,
  state: {
    houses: [],
    house: null,
  },
  getters: {},

  actions: {
    getBoardList: ({ commit }, gugunCode) => {},
    getBoardDetail: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
    },
  },
};

export default houseStore;
