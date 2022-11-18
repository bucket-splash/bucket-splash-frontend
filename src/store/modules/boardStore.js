import axios from 'axios';

const boardStore = {
  namespaced: true,
  state: {
    boards: [],
    boardDetail: null,
  },
  getters: {},

  actions: {
    getBoardList: async ({ state }, page) => {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:8080/items.json',
        params: page,
      });
      state.boards = [...state.boards, ...data.buckets];
    },
    getBoardDetail: ({ state }, id) => {},
  },
};

export default boardStore;
