<template lang="">
  <div class="container" style="display: flex; justify-content: center">
    <main class="leaderboard__profiles" style="max-width: 800px">
      <article
        @click="() => showDetail(item)"
        v-for="(item, index) in recruitList"
        :key="index"
        class="leaderboard__profile"
      >
        <img
          @click="() => $router.push(`/profile/${item.userInfo.email}`)"
          :src="item.userInfo.profile_image?.length > 1 ? item.userInfo.profile_image : defaultProfile"
          class="leaderboard__picture"
        />
        <span class="leaderboard__name">{{ item.userInfo.nickname }}</span>
        <span class="leaderboard__content">{{ item.recruit_title }}</span>
        <span class="leaderboard__value">{{ item.deposit }}<span>원</span></span>

        <div
          @click.stop="() => 1 + 1"
          style="cursor: default"
          ref="detailRef"
          v-if="focusId == item.recruit_id"
          class="recruit-detail"
        >
          <div style="height: 4rem"></div>
          <h2>{{ item.recruit_title }}</h2>
          <div class="date">작성일 : {{ recruitDetail.recruitInfo.created_at }}</div>
          <div class="grid-container">
            <div>
              카테고리 <span>{{ recruitDetail.recruitInfo.category_name }}</span>
            </div>
            <div>
              모집인원 <span>{{ recruitDetail.applyed.length }}/{{ recruitDetail.recruitInfo.people_num }}</span>
            </div>
            <div v-if="recruitDetail.recruitInfo.start_date != recruitDetail.recruitInfo.end_date">
              시작일
              <span>
                {{ recruitDetail.recruitInfo.start_date }}
              </span>
            </div>
            <div v-if="recruitDetail.recruitInfo.start_date != recruitDetail.recruitInfo.end_date">
              종료일
              <span>
                {{ recruitDetail.recruitInfo.end_date }}
              </span>
            </div>
            <div v-else>일정 {{ recruitDetail.recruitInfo.start_date }} 당일치기</div>
            <div>
              예약금 <span>{{ recruitDetail.recruitInfo.deposit }}원</span>
            </div>
          </div>
          <div class="divider"></div>
          <h4>모집내용</h4>
          <p>
            {{ recruitDetail.recruitInfo?.recruit_content ? recruitDetail.recruitInfo.recruit_content : 'Loading...' }}
          </p>

          <div class="divider"></div>
          <div class="apply-container">
            <h4>지원현황</h4>
            <div class="profile-container">
              <img
                style="object-fit: cover"
                v-for="(item, index) in recruitDetail.applyed"
                :key="index"
                :src="item.profile_image ? item.profile_image : defaultProfile"
              />
              <p v-if="recruitDetail.applyed.length === 0">아직 지원자가 없습니다</p>
            </div>
          </div>
          <div style="margin-top: 2rem" class="divider"></div>

          <div style="display: flex; justify-content: center; align-items: center; height: 5rem">
            <button
              v-if="recruitDetail.createdBy.email == userInfo?.email"
              style="z-index: 999; background-color: #35d8ac"
              class="button-26"
            >
              팀 확정하기
            </button>
            <button
              v-else-if="!isApplyed"
              @click.stop="
                () => {
                  if (!userInfo?.email) {
                    $toast.open({
                      message: '지원하려면 로그인 해주세요',
                      type: 'warning',
                    });
                    return;
                  }
                  $modal.show('applyModal');
                }
              "
              style="z-index: 999"
              class="button-26"
            >
              지원하기
            </button>

            <button v-else disabled style="z-index: 999" class="button-26">이미 지원했습니다</button>
          </div>
        </div>
      </article>
    </main>

    <modal name="applyModal" :scrollable="true" height="auto">
      <div class="my-modal-content pb-4">
        <div
          style="
            width: 100%;
            padding: 1.5rem;
            font-size: 1.5rem;
            background: red;
            margin-bottom: 1rem;
            font-family: 'maple';
            color: white;
          "
        >
          한번 지원하면 취소할 수 없고 예약금을 환불하지 않습니다
        </div>

        <h3 style="padding: 0 2rem 1rem; font-family: 'maple'">{{ recruitDetail.recruitInfo.recruit_title }}</h3>
        <div class="grid-container">
          <div>
            카테고리 <span>{{ recruitDetail.recruitInfo.category_name }}</span>
          </div>
          <div>
            모집인원 <span>{{ recruitDetail.applyed.length }}/{{ recruitDetail.recruitInfo.people_num }}</span>
          </div>
          <div v-if="recruitDetail.recruitInfo.start_date != recruitDetail.recruitInfo.end_date">
            일정 <span> {{ recruitDetail.recruitInfo.start_date }} ~ {{ recruitDetail.recruitInfo.end_date }} </span>
          </div>
          <div v-else>일정 {{ recruitDetail.recruitInfo.start_date }} 당일치기</div>
          <div>
            예약금 <span>{{ recruitDetail.recruitInfo.deposit }}원</span>
          </div>
        </div>

        <b-form-textarea
          style="width: 80%"
          v-model="applyMessage"
          id="textarea-auto-height"
          placeholder="주최자에게 간단하게 자신을 소개해주세요"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
        <button
          style="font-family: maple; background-color: #028a0f"
          @click="handleSubmit"
          class="button-26 mt-2"
          :disabled="isLoading"
          role="button"
        >
          확정
        </button>
        <button
          style="font-family: maple; background-color: tomato; color: white"
          @click="
            () => {
              $modal.hide('applyModal');
              focusId = -1;
              this.applyMessage = '';
            }
          "
          class="button-26 mt-2"
          :disabled="isLoading"
          role="button"
        >
          취소
        </button>
      </div>
    </modal>
  </div>
</template>
<script>
import axios from 'axios';
import gsap from 'gsap';
import { mapState } from 'vuex';
import { timeUtil } from '@/utils/timeUtil';

export default {
  name: 'InfiniteRecruitBoard',
  data() {
    return {
      isLoading: false,
      focusId: -1,
      applyMessage: '',
      isApplyed: false,
      recruitDetail: {
        recruitInfo: {
          recruit_id: -1,
          category_name: '',
          recruit_title: '',
          created_by: '',
          recruit_content: '',
          people_num: '-1',
          closed: 0,
          deposit: -1,
          category_id: -1,
          created_at: '',
          start_date: '',
          end_date: '',
        },
        createdBy: {
          email: 'hi6724',
          nickname: '바다의 현제',
          profile_image: 'http://res.cloudinary.com/dohkkln9r/image/upload/v1669179767/rs4lehurnzr6hykbg2df.jpg',
        },
        applyed: [],
      },
      defaultProfile: require('../assets/images/defaultProfile.jpg'),
    };
  },
  async mounted() {
    this.$store.dispatch('recruitStore/getRecruitList');
  },
  computed: {
    ...mapState('recruitStore', ['recruitList']),
    ...mapState('userStore', ['userInfo']),
  },
  methods: {
    async showDetail(item) {
      if (this.focusId == item.recruit_id) {
        this.focusId = -1;
        return;
      }
      this.focusId = item.recruit_id;
      await this.$nextTick();
      gsap.fromTo(
        this.$refs.detailRef[0],
        {
          duration: 0.5,
          height: 0,
          yPercent: -100,
        },
        {
          height: '100%',
          yPercent: 0,
        }
      );
      const { data } = await axios({
        method: 'GET',
        url: `${this.$store.state.baseUrl}recruit/${this.focusId}`,
      });
      this.recruitDetail = data;
      this.recruitDetail.recruitInfo.created_at = timeUtil(data.recruitInfo.created_at);
      this.recruitDetail.recruitInfo.start_date = timeUtil(data.recruitInfo.start_date);
      this.recruitDetail.recruitInfo.end_date = timeUtil(data.recruitInfo.end_date);

      if (!this.userInfo?.email) {
        return;
      }
      const res = await axios({
        method: 'GET',
        url: `${this.$store.state.baseUrl}apply/check`,
        params: {
          recruit_id: this.recruitDetail.recruitInfo.recruit_id,
          user_email: this.userInfo.email,
        },
      });

      this.isApplyed = res.data;
    },
    handleSubmit() {
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}apply/`,
        data: {
          apply_content: this.applyMessage,
          created_by: this.userInfo.email,
          recruit_id: this.recruitDetail.recruitInfo.recruit_id,
        },
      });

      this.recruitDetail.applyed = [...this.recruitDetail.applyed, this.userInfo];
      this.$modal.hide('applyModal');
      this.isApplyed = true;

      this.applyMessage = '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/recruit.scss';
@import '../style/button.scss';
.my-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
