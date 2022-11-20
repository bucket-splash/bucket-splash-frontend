import axios from 'axios';

const boardStore = {
  namespaced: true,
  state: {
    boards: [],
    boardDetail: null,
  },
  actions: {
    getBoardList: async ({ state }, page) => {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:8080/items.json',
        params: { page },
      });
      if (state.boards.length > 50) {
        return false;
      } else if (data) {
        state.boards = [...state.boards, ...data.buckets];
        return true;
      } else {
        return false;
      }
    },
    getBoardDetail: async ({ state }, id) => {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:8080/detailItem.json',
        params: { id },
      });
      state.boardDetail = data;
    },
  },
};

export default boardStore;
