import axios from 'axios';
import { timeUtil } from '@/utils/timeUtil';
import { baseUrl } from '..';

const boardStore = {
  namespaced: true,
  state: {
    boards: [],
    followBoards: [],
    boardDetail: null,
    page: 2,
  },
  actions: {
    getBoardList: async ({ state }, { sortBy, email }) => {
      let URL = baseUrl + 'board';
      if (email) {
        URL += '/following';
      }
      if (sortBy == 'like') {
        URL += `/order`;
      }

      const { data } = await axios({
        method: 'GET',
        url: URL,
        params: { page: state.page, user_email: email },
      });
      state.page += 1;
      if (data.length === 0) return false;
      if (email) {
        state.followBoards = [
          ...state.followBoards,
          ...data.map((item) => {
            return { ...item, created_at: timeUtil(item.created_at) };
          }),
        ];
        return;
      }
      state.boards = [
        ...state.boards,
        ...data.map((item) => {
          return { ...item, created_at: timeUtil(item.created_at) };
        }),
      ];
      return true;
    },
    initBoard: async ({ state }, { sortBy, email }) => {
      state.page = 2;
      let URL = baseUrl + 'board';
      if (email) {
        URL += '/following';
      }
      if (sortBy == 'like') {
        URL += `/order`;
      }
      const { data } = await axios({
        method: 'GET',
        url: URL,
        params: { page: 1, user_email: email },
      });
      if (email) {
        state.followBoards = [
          ...data.map((item) => {
            return { ...item, created_at: timeUtil(item.created_at) };
          }),
        ];
        return;
      }
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
