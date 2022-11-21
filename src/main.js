import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VModal from 'vue-js-modal';

gsap.registerPlugin(ScrollTrigger);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueToast);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
Kakao.init('c435bbb032b0ee1803ca300ff3027491');
