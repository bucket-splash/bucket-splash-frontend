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
          <img
            :src="userInfo.profile_image ? userInfo.profile_image : defaultProfileImg"
            alt=""
            style="object-fit: cover"
          />
          <h3 style="display: flex; align-items: center; gap: 0.3rem">
            {{ userInfo.nickname }}
          </h3>
          <div class="profile-meta">
            <div>
              <h5>팔로잉</h5>
              <h6>1</h6>
            </div>
            <div>
              <h5>팔로워</h5>
              <h6>63k</h6>
            </div>
            <div>
              <h5>게시글</h5>
              <h6>21</h6>
            </div>
          </div>
          <p>
            {{ userInfo.bio ? userInfo.bio : '자기소개가 없습니다' }}
          </p>
        </div>
        <div>
          <h2>{{ userInfo.nickname }}의 버킷리스트</h2>
          <div class="bucket-container">
            <div class="inputGroup" style="cursor: default">
              <input id="option1" name="option1" type="checkbox" checked disabled />
              <label for="option1">Option One</label>
            </div>
          </div>
          <h2>{{ userInfo.nickname }}와 함께 만든 버킷리스트</h2>
          <div class="team-container">
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div v-for="(board, index) in boards" :key="index">
          <div>{{ index }}</div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import gsap from 'gsap';
import axios from 'axios';

export default {
  name: 'ProfileView',

  data() {
    return {
      modalOpen: false,
      defaultAvatar: '',
      profilePreview: '',
      defaultTeamBg: require('@/assets/images/teamBgDefault.jpg'),
      defaultProfileImg: require('@/assets/images/noImg.jpg'),
      isLoading: false,

      userInfo: {
        bio: null,
        email: null,
        nickname: null,
        password: null,
        profile_image: null,
        teamlist_id: null,
        user_id: null,
      },
      boards: [],
      buckets: [],
    };
  },

  async mounted() {
    window.scrollTo(0, 0);
    gsap.to('.container', {
      delay: 0.1,
      duration: 1.6,
      clipPath: 'circle(150% at 0 0)',
      ease: 'Power1.easeOut',
    });

    const accessToken = localStorage.getItem('ssafy-token');
    const { data } = await axios({
      url: `${this.$store.state.baseUrl}user/info/${this.$route.params.email}`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        accessToken,
      },
    });
    this.userInfo = data.userInfo;
    this.boards = data.Boards;
    this.buckets = data.Buckets;
    console.log(data);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
@import '../style/input.scss';
@import '../style/button.scss';
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
    background: tomato;
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
    padding: 12px 30px;
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
