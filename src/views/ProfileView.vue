<template lang="">
  <div class="wrapper py-5">
    <section
      class="container inner-wrapper"
      style="clip-path: circle(0% at 0 0)"
    >
      <section>
        <div class="profile">
          <button
            @click="handleLogout"
            class="button-26"
            style="
              position: absolute;
              right: 1rem;
              top: 1rem;
              width: 6rem;
              background-color: tomato;
            "
          >
            logout
          </button>
          <img :src="userInfo.profile_image" alt="" style="object-fit: cover" />
          <h3 style="display: flex; align-items: center; gap: 0.3rem">
            {{ userInfo.nickname }}
            <b-icon @click="toggleEdit" icon="pencil-square"></b-icon>
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
          <h2>내 버킷리스트</h2>
          <div class="bucket-container">
            <div class="inputGroup">
              <input id="option1" name="option1" type="checkbox" />
              <label for="option1">Option One</label>
            </div>

            <div class="inputGroup">
              <input id="option2" name="option2" type="checkbox" />
              <label for="option2">Option Two</label>
            </div>
            <div class="inputGroup">
              <input id="option3" name="option3" type="checkbox" />
              <label for="option3">Option Two</label>
            </div>
            <div class="inputGroup">
              <input id="option4" name="option4" type="checkbox" />
              <label for="option4">Option Two</label>
            </div>
            <div class="inputGroup">
              <input id="option5" name="option5" type="checkbox" />
              <label for="option5">Option Two</label>
            </div>
            <div class="inputGroup">
              <input id="option6" name="option6" type="checkbox" />
              <label for="option6">Option Two</label>
            </div>
          </div>
          <h2>함께 만든 버킷리스트</h2>
          <div class="team-container">
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span>코코와의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
            <div class="team-card">
              <img :src="defaultTeamBg" alt="" />
              <span> 13반의 버킷리스트 </span>
            </div>
          </div>
        </div>
      </section>
      <section>게시글들이 올거임</section>
    </section>

    <modal name="editModal" height="80%">
      <div class="my-modal-content p-4">
        <img
          :src="profilePreview ? profilePreview : userInfo.profile_image"
          alt=""
        />
        <label
          for="picture"
          style="font-family: maple; font-size: 1.2rem; margin-top: 1rem"
          >이미지 수정 <b-icon @click="toggleEdit" icon="pencil-square"></b-icon
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
            required
          />
          <label for="editNickname" class="form__label">{{
            userInfo.nickname
          }}</label>
        </div>
        <b-form-textarea
          style="width: 80%"
          v-model="editForm.bio"
          id="textarea-auto-height"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
        <button
          @click="handleSubmit"
          class="button-26 my-4"
          :disabled="isLoading || !validForm"
          role="button"
        >
          수정하기
        </button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import gsap from 'gsap';
import axios from 'axios';

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
      modalOpen: false,
      defaultAvatar: '',
      profilePreview: '',
      defaultTeamBg: require('@/assets/images/teamBgDefault.jpg'),
      isLoading: false,
      editForm: {
        nickname: '',
        bio: '',
        uploadImg: '',
      },
    };
  },

  mounted() {
    gsap.to('.container', {
      delay: 0.1,
      duration: 1.6,
      clipPath: 'circle(150% at 0 0)',
      ease: 'Power1.easeOut',
    });
    this.editForm.bio = this.userInfo.bio;
    this.editForm.nickname = this.userInfo.nickname;
  },
  methods: {
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
      this.isLoading = true;
      let imgUrl = this.userInfo.profile_image;
      if (this.profilePreview.length > 0) {
        const form = new FormData();
        form.append('file', this.editForm.uploadImg);
        form.append('upload_preset', 'quzqjwbp');
        const { data } = await axios.post(
          'https://api.cloudinary.com/v1_1/dohkkln9r/upload',
          form
        );
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
    @media screen and (max-width: 1000px) {
      grid-template-columns: 100%;
    }
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
