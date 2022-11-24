<template lang="">
  <div class="wrapper py-5">
    <section class="container inner-wrapper" style="clip-path: circle(0% at 0 0)">
      <section
        style="
          border-bottom: 1px solid $lightGray;
          display: grid;
          justify-content: center;
          grid-template-columns: 80%;
          gap: 3rem;
        "
      >
        <div class="profile">
          <button
            @click="handleLogout"
            class="button-26"
            style="position: absolute; right: 1rem; top: 1rem; width: 6rem; background-color: tomato"
          >
            logout
          </button>
          <img
            :src="userInfo.profile_image ? userInfo.profile_image : defaultAvatar"
            alt=""
            style="object-fit: cover"
          />
          <h3 @click="toggleEdit" style="display: flex; align-items: center; gap: 0.3rem; cursor: pointer">
            {{ userInfo.nickname }}
            <b-icon icon="pencil-square"></b-icon>
          </h3>
          <div class="profile-meta">
            <div style="cursor: pointer" @click="showFollowing">
              <h5>팔로잉</h5>
              <h6>{{ userInfo.following_count }}</h6>
            </div>
            <div style="cursor: pointer" @click="showFollowed">
              <h5>팔로워</h5>
              <h6>{{ userInfo.followed_count }}</h6>
            </div>
            <div style="cursor: pointer" @click="goBoard">
              <h5>게시글</h5>
              <h6>{{ boards.length }}</h6>
            </div>
          </div>
          <p>
            {{ userInfo.bio?.length > 1 ? userInfo.bio : '자기소개가 없습니다' }}
          </p>
        </div>
        <div>
          <h2 style="display: flex; justify-content: space-between; align-items: center">
            내 버킷리스트
            <span
              v-if="registBucket === null"
              @click="toggleRegist"
              style="font-size: 1rem; color: #007bff; cursor: pointer"
              >버킷리스트 작성하기
            </span>
            <span v-else @click="toggleRegist" style="font-size: 1rem; color: red; cursor: pointer">취소 </span>
          </h2>

          <form
            @submit.stop="submitBucket"
            v-if="registBucket !== null"
            style="margin: 0; width: 100%; position: relative"
            class="form__group field mb-4"
          >
            <input
              type="text"
              style="padding-right: 5rem; padding-top: 0; height: 3rem="
              class="form__field"
              placeholder="버킷리스트를 알려주세요"
              name="registBucket"
              id="registBucket"
              v-model="registBucket"
            />
            <label for="registBucket" class="form__label">버킷리스트를 알려주세요 </label>
            <button style="position: absolute; width: 3rem; height: 2rem; right: 0; top: 1rem">작성</button>
          </form>

          <div
            v-for="(bucket, index) in buckets"
            :key="index"
            class="bucket-container"
            style="margin-bottom: 0.5rem; position: relative"
          >
            <div
              v-if="toggleEditBucket !== bucket.bucket_id"
              class="inputGroup"
              style="cursor: default; position: relative"
            >
              <input
                @change="() => toggleBucket(bucket)"
                :id="index"
                name="option1"
                type="checkbox"
                :checked="bucket.check"
              />
              <label :for="index" style="width: 100%">{{ bucket.bucket_title }} </label>
            </div>
            <!-- <form v-else style="height: 42px; position: relative; display: flex; align-items: center">
              <input type="text" />
              <button>수정</button>
            </form> -->

            <b-input-group v-else class="mt-3">
              <b-form-input v-model="bucketEdit"></b-form-input>
              <b-input-group-append>
                <b-button @click="() => editBucket(bucket)" variant="primary">수정</b-button>
                <b-button @click="() => (toggleEditBucket = -1)" variant="danger">취소</b-button>
              </b-input-group-append>
            </b-input-group>

            <b-dropdown
              v-if="toggleEditBucket !== bucket.bucket_id"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
              style="position: absolute; top: 2px; right: -10px; z-index: 999"
              dropleft
            >
              <template #button-content>
                <img :src="ellipsisVertical" alt="" style="width: 1rem; height: 1rem" />
              </template>
              <b-dropdown-item @click="() => editBucket(bucket)">
                <div style="display: flex; justify-content: space-between; color: #007bff">
                  수정<b-icon icon="pencil-square"></b-icon>
                </div>
              </b-dropdown-item>
              <b-dropdown-item @click="() => deleteBucket(bucket)">
                <div style="display: flex; justify-content: space-between; color: red">
                  삭제<b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </div>
              </b-dropdown-item>
            </b-dropdown>

            <!-- <span @click.stop="" style="position: absolute; top: 0.5rem; right: 0">
              <img :src="ellipsisVertical" alt="" style="width: 1rem; height: 1rem" />
            </span> -->
          </div>

          <div v-if="buckets.length === 0">버킷리스트가 없습니다</div>

          <!-- <h2 style="margin-top: 1rem">우리 팀</h2>
          <div class="team-container">
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span>코코와의 버킷리스트 </span>
            </div>
          </div> -->
          <h2 style="margin: 2rem 0">내가올린 모집글</h2>
          <div>
            <div
              style="border-radius: 0.5rem; padding: 1rem; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
              v-for="(item, index) in recruitList"
              :key="index"
            >
              <h3
                @click="
                  () => {
                    if (focusId == index) {
                      focusId = -1;
                    } else {
                      focusId = index;
                    }
                  }
                "
                style="cursor: pointer; color: #007bff"
              >
                {{ item.recruitInfo.recruit_title }}
              </h3>
              <div v-if="focusId == index">
                <div style="display: flex; flex-direction: row-reverse">작성일 : {{ item.recruitInfo.created_at }}</div>
                <div class="grid-container">
                  <div>
                    모집인원 <span>{{ item.applyedInfo.length }}/{{ item.recruitInfo.people_num }}</span>
                  </div>
                  <div v-if="item.recruitInfo.start_date != item.recruitInfo.end_date">
                    시작일
                    <span>
                      {{ item.recruitInfo.start_date }}
                    </span>
                  </div>
                  <div v-if="item.recruitInfo.start_date != item.recruitInfo.end_date">
                    종료일
                    <span>
                      {{ item.recruitInfo.end_date }}
                    </span>
                  </div>
                  <div v-else>일정 {{ item.recruitInfo.start_date }} 당일치기</div>
                  <div>
                    예약금 <span>{{ item.recruitInfo.deposit }}원</span>
                  </div>
                </div>
                <div class="divider"></div>
                <h4>모집내용</h4>
                <p>
                  {{ item.recruitInfo?.recruit_content ? item.recruitInfo.recruit_content : 'Loading...' }}
                </p>

                <div class="divider"></div>
                <div class="apply-container">
                  <h4>지원현황</h4>
                  <div class="profile-container">
                    <img
                      style="object-fit: cover"
                      v-for="(item, index) in item.applyedInfo"
                      :key="index"
                      :src="item.profile_image ? item.profile_image : defaultProfile"
                    />
                    <p v-if="item.applyedInfo.length === 0">아직 지원자가 없습니다</p>
                  </div>
                </div>
                <div style="margin-top: 2rem" class="divider"></div>

                <div style="display: flex; justify-content: center; align-items: center; height: 5rem">
                  <button style="z-index: 999; background-color: #35d8ac" class="button-26">팀 확정하기</button>
                </div>
              </div>
            </div>
          </div>

          <div style="height: 4rem"></div>
        </div>
      </section>
      <section>
        <div style="height: 4rem"></div>
        <h1 id="boards">내 게시글</h1>
        <div v-for="(board, index) in boards" @click="() => showMore(board)" :key="index" class="board-container">
          <img :src="board.board_image ? board.board_image : defaultBoardImg" alt="" />
          <h3>{{ board.board_title }}</h3>
          <span style="color: #868e96">{{ board.created_at }} 작성</span>
          <p>{{ board.board_content }}</p>
        </div>
      </section>
    </section>

    <modal name="editModal" height="80%">
      <div class="my-modal-content p-4">
        <label for="picture" style="cursor: pointer">
          <img
            style="width: 100%; object-fit: cover; aspect-ratio: 1"
            :src="profilePreview ? profilePreview : userInfo.profile_image"
            alt=""
          />
        </label>
        <label for="picture" style="font-family: maple; cursor: pointer; font-size: 1.2rem; margin-top: 1rem"
          >이미지 수정 <b-icon icon="pencil-square"></b-icon
        ></label>
        <b-form-file
          id="picture"
          ref="imageRef"
          style="display: none"
          @change="changePreview"
          v-model="editForm.uploadImg"
          :state="Boolean(editForm.uploadImg)"
          placeholder="프로필이미지 수정"
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div style="margin: 0" class="form__group field mb-4">
          <input
            type="text"
            class="form__field"
            :placeholder="userInfo.nickname"
            name="editNickname"
            id="editNickname"
            v-model="editForm.nickname"
          />
          <label for="editNickname" class="form__label">{{ userInfo.nickname }}</label>
        </div>
        <b-form-textarea
          style="width: 80%"
          v-model="editForm.bio"
          id="textarea-auto-height"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
        <button
          style="font-family: maple"
          @click="handleSubmit"
          class="button-26 mt-2"
          :disabled="isLoading || !validForm"
          role="button"
        >
          수정하기
        </button>
      </div>
    </modal>
    <modal name="followModal" :scrollable="true" :resizable="true" height="auto">
      <div class="my-modal-content p-4" style="align-items: start; gap: 0.5rem">
        <div class="followCard" v-for="(item, index) in followList" :key="index">
          <div style="display: flex; align-items: center; gap: 1rem; font-family: 'maple'">
            <img
              style="width: 5rem; height: 5rem"
              :src="item.profile_image ? item.profile_image : defaultAvatar"
              alt=""
            />
            <h4>{{ item.nickname }}</h4>
          </div>
          <button @click="() => showProfile(item)" class="button-26" style="width: auto; font-family: maple">
            자세히보기
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import gsap from 'gsap';
import axios from 'axios';
import { timeUtil } from '@/utils/timeUtil';

export default {
  name: 'ProfileView',
  computed: {
    ...mapState('userStore', ['userInfo']),
    validForm() {
      if (this.editForm.nickname.length <= 0) {
        return false;
      } else {
        return true;
      }
    },
  },

  data() {
    return {
      ellipsisVertical: require('@/assets/images/ellipsis-vertical-solid.svg'),
      modalOpen: false,
      defaultAvatar: require('@/assets/images/defaultProfile.jpg'),
      profilePreview: '',
      defaultTeamBg: require('@/assets/images/teamBgDefault.jpg'),
      isLoading: false,
      focusId: -1,
      boards: [],
      buckets: [],
      followList: [],
      recruitList: [],
      bucketEdit: '',
      toggleEditBucket: -1,
      registBucket: null,
      editForm: {
        nickname: '',
        bio: '',
        uploadImg: '',
      },
    };
  },

  async mounted() {
    gsap.to('.container', {
      delay: 0.1,
      duration: 1.6,
      clipPath: 'circle(150% at 0 0)',
      ease: 'Power1.easeOut',
    });
    this.editForm.bio = this.userInfo.bio;
    this.editForm.nickname = this.userInfo.nickname;

    const { data } = await axios({
      url: `${this.$store.state.baseUrl}user/${this.userInfo.email}`,
    });
    this.$store.dispatch('userStore/login', {
      userInfo: data.userInfo,
    });
    this.boards = data.Boards.map((item) => {
      return { ...item, created_at: timeUtil(item.created_at) };
    });
    this.buckets = data.Buckets;

    const res = await axios({
      url: `${this.$store.state.baseUrl}recruit/user/${this.userInfo.email}`,
    });
    this.recruitList = res.data.map((data) => {
      return {
        ...data,
        recruitInfo: {
          ...data.recruitInfo,
          start_date: timeUtil(data.recruitInfo.start_date),
          created_at: timeUtil(data.recruitInfo.created_at),
          end_date: timeUtil(data.recruitInfo.end_date),
        },
      };
    });
  },
  methods: {
    deleteUser() {
      // axios({
      //   url: `${this.$store.state.baseUrl}user`,
      //   method:"DELETE"
      // })
      this.$store.dispatch('userStore/logout');
      this.$router.push('/');
    },
    toggleBucket(item) {
      const newBuckets = this.buckets.map((bucket) => {
        if (bucket.bucket_id !== item.bucket_id) {
          return bucket;
        }
        return { ...bucket, check: bucket.check == 1 ? 0 : 1 };
      });
      axios({
        url: `${this.$store.state.baseUrl}bucket/check`,
        method: 'PUT',
        data: {
          bucket_id: item.bucket_id,
          check: item.check == 1 ? 0 : 1,
        },
      });
      this.buckets = newBuckets;
      console.log(item);
    },
    editBucket(item) {
      if (this.toggleEditBucket === -1) {
        this.bucketEdit = item.bucket_title;
        this.toggleEditBucket = item.bucket_id;
        return;
      }
      if (this.toggleEditBucket !== item.bucket_id) {
        this.bucketEdit = item.bucket_title;
        this.toggleEditBucket = item.bucket_id;
        return;
      }
      if (this.bucketEdit.length < 5) {
        this.$toast.open({
          message: '버킷리스트는 5글자 이상 입력해주세요',
          type: 'error',
        });
        return;
      }
      const newBuckets = this.buckets.map((bucket) => {
        if (bucket.bucket_id !== item.bucket_id) return bucket;
        return { ...bucket, bucket_title: this.bucketEdit };
      });
      axios({
        url: `${this.$store.state.baseUrl}bucket`,
        method: 'PUT',
        data: {
          bucket_id: item.bucket_id,
          bucket_title: this.bucketEdit,
          created_by: this.userInfo.email,
          check: item.check,
          category_id: 1,
        },
      });
      this.buckets = newBuckets;
      this.toggleEditBucket = -1;
    },
    deleteBucket(item) {
      axios({
        method: 'DELETE',
        url: `${this.$store.state.baseUrl}bucket/${item.bucket_id}`,
      });
      const newBuckets = this.buckets.filter((bucket) => bucket.bucket_id !== item.bucket_id);
      this.buckets = newBuckets;
    },
    async submitBucket(e) {
      e.preventDefault();
      if (this.isLoading) return;
      this.isLoading = true;

      if (this.registBucket.length < 5) {
        this.$toast.open({
          message: '버킷리스트는 5글자 이상 입력해주세요',
          type: 'error',
        });
        this.isLoading = false;

        return;
      }
      console.log(this.buckets);
      const newBuckets = [
        {
          bucket_title: this.registBucket,
          bucket_id: 'notYet',
          check: false,
        },
        ...this.buckets,
      ];
      this.buckets = newBuckets;

      console.log(this.buckets);
      const { data } = await axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}bucket`,
        data: {
          category_id: 1,
          check: 0,
          bucket_title: this.registBucket,
          bucket_content: 'string',
          created_by: this.userInfo.email,
        },
      });
      this.buckets[0] = data;
      console.log(this.buckets);
      this.registBucket = null;
      this.isLoading = false;
    },

    toggleRegist() {
      this.registBucket === null ? (this.registBucket = '') : (this.registBucket = null);
    },
    showProfile(item) {
      this.$router.push(`/profile/${item.email}`);
    },
    async showFollowed() {
      this.$modal.show('followModal');
      const {
        data: { Followed },
      } = await axios({
        url: `${this.$store.state.baseUrl}follow/followed/${this.userInfo.email}`,
      });
      this.followList = Followed;
    },
    async showFollowing() {
      this.$modal.show('followModal');
      const {
        data: { Following },
      } = await axios({
        url: `${this.$store.state.baseUrl}follow/following/${this.userInfo.email}`,
      });
      this.followList = Following;
    },
    goBoard() {
      this.$smoothScroll({
        scrollTo: document.getElementById('boards'),
        duration: 0.5,
      });
    },
    showMore(item) {
      this.$router.push(`/board/${item.board_id}`);
    },
    toggleEdit() {
      this.$modal.show('editModal');
    },
    handleLogout() {
      axios({
        url: `${this.$store.state.baseUrl}user/logout/${this.userInfo.email}`,
      });
      this.$store.dispatch('userStore/logout');
      this.$router.push('/');
    },
    async changePreview(e) {
      await this.$nextTick();
      this.profilePreview = URL.createObjectURL(this.editForm.uploadImg);
      console.log(this.profilePreview.length);
    },
    async handleSubmit() {
      if (this.isLoading) return;
      if (this.editForm.nickname.length < 3 || this.editForm.nickname.length > 11) {
        this.$toast.open({
          message: '닉네임은 3글자이상 10글자이하로 설정해주세요',
          type: 'error',
        });
        return;
      }
      this.isLoading = true;
      let imgUrl = this.userInfo.profile_image;
      if (this.profilePreview.length > 0) {
        const form = new FormData();
        form.append('file', this.editForm.uploadImg);
        form.append('upload_preset', 'quzqjwbp');
        const { data } = await axios.post('https://api.cloudinary.com/v1_1/dohkkln9r/upload', form);
        imgUrl = data.url;
      }
      const newData = {
        bio: this.editForm.bio,
        nickname: this.editForm.nickname,
        profile_image: imgUrl,
        user_id: this.userInfo.user_id,
      };
      await axios({
        method: 'PUT',
        url: this.$store.state.baseUrl + 'user/update',
        data: newData,
      });
      this.$store.dispatch('userStore/edit', {
        ...this.userInfo,
        ...newData,
      });
      this.isLoading = false;
      this.$modal.hide('editModal');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
@import '../style/input.scss';
@import '../style/button.scss';

.apply-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  .profile-container {
    display: flex;
    gap: 1rem;
  }
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin: 1rem 0;
  div {
    display: flex;
    justify-content: space-between;
    span {
      font-family: maple-bold;
    }
  }
}
.followCard {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid $lightGray;
}
.board-container {
  cursor: pointer;
  padding-bottom: 1rem;
  border-bottom: 1px solid $lightGray;
  img {
    width: 100%;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
}
.bucket-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 2rem;
}
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
.team-container {
  display: flex;
  gap: 0.5rem;
  overflow-x: scroll;
}
.team-card {
  background-color: #3c454c;
  width: 8rem;
  height: 8rem;
  aspect-ratio: 1;
  position: relative;
  img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    position: absolute;
  }
  span {
    width: 100%;
    z-index: 99;
    color: white;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    display: flex;
    justify-content: center;
  }
}
.wrapper {
  background-color: $blue;
  min-height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-wrapper {
  overflow: hidden;
  position: relative;
  min-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  max-width: 550px;
  background-color: #fff;
  justify-content: center;
  gap: 2rem;
  font-family: 'maple';
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.8) 0px 1px 2px;
  border-radius: 1rem;
  section {
    border-bottom: 1px solid $lightGray;
    display: grid;
    justify-content: center;
    grid-template-columns: 80%;
    gap: 3rem;
  }
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  img {
    width: 15rem;
    border-radius: 50%;
    aspect-ratio: 1;
    object-fit: contain;
    background: beige;
  }
  h3 {
    button {
      border: none;
      font-size: 1rem;
    }
  }
  p {
    margin-bottom: 2rem;
  }
  div {
    width: 100%;
    font-size: 1.3rem;
  }
}
.profile-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid $lightGray;
  border-bottom: 1px solid $lightGray;
  padding: 1rem 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
/* checkbox */

.inputGroup {
  max-width: 550px;
  background-color: #fff;
  display: block;
  margin: 0;
  position: relative;

  label {
    padding: 6px 42px 12px 12px;
    width: 100%;
    display: block;
    text-align: left;
    color: #3c454c;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;
    margin: 0;

    &:before {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      content: '';
      background-color: #5562eb;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale3d(1, 1, 1);
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      z-index: -1;
    }

    &:after {
      width: 32px;
      height: 32px;
      content: '';
      border: 2px solid #d1d7dc;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: 2px 3px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    color: #fff;

    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #54e0c7;
      border-color: #54e0c7;
    }
  }

  input {
    width: 32px;
    height: 32px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
}
</style>
