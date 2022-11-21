<template lang="">
  <div class="wrapper py-5">
    <div class="container inner-wrapper">
      <section
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <img
          :src="previewImg ? previewImg : noImg"
          style="width: 100%; object-fit: cover"
        />
        <label
          for="picture"
          style="font-family: maple; font-size: 1.2rem; margin-top: 1rem"
        >
          이미지 업로드 <b-icon icon="pencil-square"></b-icon>
        </label>

        <b-form-file
          id="picture"
          style="display: none"
          @change="changePreview"
          v-model="uploadImg"
          :state="Boolean(uploadImg)"
        ></b-form-file>
        <div style="margin: 0" class="form__group field mb-4">
          <input
            type="text"
            class="form__field"
            placeholder="제목"
            name="title"
            id="title"
            v-model="title"
            required
          />
          <label for="title" class="form__label">제목</label>
        </div>
        <b-form-textarea
          style="width: 80%"
          v-model="content"
          id="textarea-auto-height"
          rows="3"
          max-rows="8"
        ></b-form-textarea>
        <button @click="handleSubmit" class="button-26 my-4" role="button">
          등록
        </button>
      </section>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'RegistView',
  data() {
    return {
      previewImg: '',
      noImg: require('../assets/images/noImg.jpg'),
      title: '',
      uploadImg: '',
      content: '',
      isLoading: false,
    };
  },
  methods: {
    async changePreview() {
      await this.$nextTick();
      this.previewImg = URL.createObjectURL(this.uploadImg);
    },
    async handleSubmit() {
      this.isLoading = true;
      let imgUrl = null;
      if (this.previewImg.length > 0) {
        const form = new FormData();
        form.append('file', this.uploadImg);
        form.append('upload_preset', 'quzqjwbp');
        const { data } = await axios.post(
          'https://api.cloudinary.com/v1_1/dohkkln9r/upload',
          form
        );
        imgUrl = data.url;
      }
      const boardData = {
        board_content: this.content,
        board_title: this.title,
        created_by: this.$store.state.userStore.userInfo.email,
        board_image: imgUrl,
      };
      axios({
        method: 'POST',
        url: this.$store.state.baseUrl + 'board',
        data: boardData,
      });

      this.isLoading = false;
      this.$router.push('/');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/wrapper.scss';
@import '../style/colors.scss';
@import '../style/input.scss';
@import '../style/button.scss';
</style>
