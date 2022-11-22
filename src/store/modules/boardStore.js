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
        url: `http://192.168.201.240:8080/board`,
        params: { page },
      });
      console.log(data);
      if (data.length === 0) return false;
      state.boards = [...state.boards, ...data];
      return true;
    },
    initBoard: async ({ state }) => {
      const { data } = await axios({
        method: 'GET',
        url: `http://192.168.201.240:8080/board`,
        params: { page: 1 },
      });
      state.boards = data;
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
