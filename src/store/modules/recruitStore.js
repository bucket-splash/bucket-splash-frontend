import axios from 'axios';
import { timeUtil } from '@/utils/timeUtil';
import { baseUrl } from '..';

const recruitStore = {
  namespaced: true,
  state: {
    recruitList: [],
  },
  actions: {
    getRecruitList: async ({ state }) => {
      let URL = baseUrl + 'recruit';
      const { data } = await axios({
        method: 'GET',
        url: URL,
      });
      state.recruitList = data;
      state.recruitList = data.map((item) => {
        return {
          ...item.recruitInfo,
          created_at: timeUtil(item.recruitInfo.created_at),
          start_date: timeUtil(item.recruitInfo.start_date),
          end_date: timeUtil(item.recruitInfo.end_date),
          userInfo: item.userInfo,
        };
      });
    },
  },
};

export default recruitStore;
