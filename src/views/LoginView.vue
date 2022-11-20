<template lang="">
  <div class="wrapper py-5">
    <section class="container">
      <div class="inner-wrapper">
        <h1>환영합니다</h1>

        <b-form @submit.stop.prevent>
          <label for="feedback-user">User ID</label>
          <b-form-input
            v-model="userId"
            :state="validId"
            id="feedback-user"
          ></b-form-input>

          <b-form-input
            v-model="password"
            :state="validPassword"
            id="feedback-user"
          ></b-form-input>

          <b-form-invalid-feedback :state="validForm.value">
            {{ validForm.message }}
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validForm.value">
            {{ validForm.message }}
          </b-form-valid-feedback>
        </b-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: '',
      password: '',
    };
  },
  computed: {
    validForm() {
      return {
        value: this.userId.length > 4 && this.userId.length < 13,
        message: 'ok',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../style/colors.scss';
.wrapper {
  background-color: $blue;
  min-height: calc(100vh - 8rem);
  width: 100%;
  display: flex;
  justify-content: center;
}

.inner-wrapper {
  width: 50%;
  height: 100%;
  min-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: 'maple';
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 3px, rgba(0, 0, 0, 0.8) 0px 1px 2px;
  border-radius: 1rem;
}
</style>
