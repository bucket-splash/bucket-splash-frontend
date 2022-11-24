<template lang="">
  <div class="wrapper py-5">
    <div class="container inner-wrapper">
      <div @click.stop="() => 1 + 1" style="cursor: default" ref="detailRef" class="recruit-detail">
        <div style="height: 4rem"></div>
        <h4>모집제목</h4>
        <input type="text" class="my-input" style="width: 100%" v-model="title" />
        <div class="grid-container" style="padding: 0; margin: 2rem 0">
          <div style="display: flex; align-items: center">
            모집인원 <input v-model="personNum" class="my-input" type="number" />명
          </div>
          <div style="display: flex; align-items: center">
            예약금 <input v-model="deposit" class="my-input" type="text" /> 원
          </div>
          <div style="grid-column-start: 1; grid-column-end: -1">
            일정
            <date-picker format="YYYY-MM-DD HH:mm:ss" :range="true" v-model="time" valueType="format"></date-picker>
          </div>
          <div style="grid-column-start: 1; grid-column-end: -1">
            카테고리
            <b-dropdown right :text="categories[categoryId]">
              <b-dropdown-item
                @click="() => (categoryId = item)"
                v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
                :key="index"
                >{{ categories[item] }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <h4>모집내용</h4>
        <b-form-textarea
          style="width: 100%"
          v-model="content"
          id="textarea-auto-height"
          rows="3"
          max-rows="8"
          required
        ></b-form-textarea>

        <div style="margin-top: 2rem" class="divider"></div>

        <div style="display: flex; justify-content: center; align-items: center; height: 5rem">
          <button @click="handleSubmit" style="z-index: 999" class="button-26">제출하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'RegistView',
  components: { DatePicker },
  mounted() {
    if (!this.$store.state.userStore.userInfo.email) {
      this.$router.push('/');
    }
  },
  computed: {
    validForm() {
      if (this.title.length == 0) {
        return {
          value: false,
          message: '제목을 알려주세요',
        };
      }
      if (this.title.length < 2 || this.title.length > 25) {
        return {
          value: false,
          message: '제목은 2글자이상, 25글자이하로 설정해주세요',
        };
      }

      if (this.content.length < 10) {
        return {
          value: false,
          message: '모집내용을 더 상세하게 알려주세요',
        };
      }
      if (this.content.length > 1000) {
        return {
          value: false,
          message: '모집내용을 간략화 해주세요',
        };
      }
      return {
        value: true,
        message: '굿!',
      };
    },
  },
  data() {
    return {
      time: '',
      noImg: require('../assets/images/noImg.jpg'),
      title: '',
      content: '',
      isLoading: false,
      title: '',
      personNum: 1,
      deposit: 0,
      categoryId: 6,
      categories: {
        1: '스포츠/피트니스',
        2: '어학',
        3: '요리/음료/맛집',
        4: '재테크/투자',
        5: '교양',
        6: '기타',
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.validForm.value) {
        this.$toast.open({
          message: this.validForm.message,
          type: 'error',
        });
        return;
      }

      this.isLoading = true;
      // 2022-11-24T07:11:04.229Z
      console.log(this.time[0].split(' ')[0] + 'T00:00:00.000Z');
      await axios({
        url: `${this.$store.state.baseUrl}recruit`,
        method: 'POST',
        data: {
          category_id: this.categoryId,
          recruit_title: this.title,
          recruit_content: this.content,
          people_num: this.personNum,
          deposit: this.deposit,
          start_date: this.time[0].split(' ')[0] + 'T00:00:00.000Z',
          end_date: this.time[1].split(' ')[0] + 'T00:00:00.000Z',
          created_by: this.$store.state.userStore.userInfo.email,
        },
      });
      this.$router.push('/recruit');
      this.isLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/wrapper.scss';
@import '../style/colors.scss';
@import '../style/input.scss';
@import '../style/button.scss';
@import '../style/recruit.scss';
.image-input {
  border: none;
  background: $lightGray;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  outline: none;
}
.grid-container {
  input {
    width: 5rem;
  }
}
.mx-input-wrapper {
  width: 100%;
}
</style>
