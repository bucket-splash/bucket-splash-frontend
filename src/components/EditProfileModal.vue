<template lang="">
  <div>
    <modal name="editModal" height="80%">
      <div class="my-modal-content p-4">
        <img
          :src="profilePreview ? profilePreview : userInfo.profile_image ? userInfo.profile_image : defaultAvatar"
          alt=""
        />
        <label for="picture" style="font-family: maple; font-size: 1.2rem; margin-top: 1rem"
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
            required
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
        <button @click="handleSubmit" class="button-26 my-4" :disabled="isLoading" role="button">수정하기</button>
      </div>
    </modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('userStore', ['userInfo']),
  },
  date() {
    return {
      isLoading: false,
      profilePreview: '',
      defaultAvatar: require('@/assets/images/defaultProfile.jpg'),
      editForm: {
        nickname: '',
        bio: '',
        uploadImg: '',
      },
    };
  },
  methods: {
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
<style lang=""></style>
