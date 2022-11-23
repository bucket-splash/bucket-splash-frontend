import axios from 'axios';
import { timeUtil } from '@/utils/timeUtil';

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
        url: `http://localhost:8080/board`,
        params: { page },
      });
      console.log(data);
      if (data.length === 0) return false;
      state.boards = [
        ...state.boards,
        ...data.map((item) => {
          return { ...item, created_at: timeUtil(item.created_at) };
        }),
      ];
      return true;
    },
    initBoard: async ({ state }) => {
      const { data } = await axios({
        method: 'GET',
        url: `http://localhost:8080/board`,
        params: { page: 1 },
      });
      state.boards = data.map((item) => {
        return { ...item, created_at: timeUtil(item.created_at) };
      });
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
