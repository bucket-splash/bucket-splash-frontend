import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../views/DetailView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import ProfileView from '../views/ProfileView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import RegistView from '../views/RegistView.vue';
import RegistBucketView from '../views/RegistBucketView.vue';
import FollowBoardView from '../views/FollowBoardView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/board/:id',
    name: 'detail',
    component: DetailView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/profile/:email',
    name: 'UserProfileView',
    component: UserProfileView,
  },
  {
    path: '/regist',
    name: 'regist',
    component: RegistView,
  },
  {
    path: '/regist/bucket',
    name: 'registBucket',
    component: RegistBucketView,
  },
  {
    path: '/regist/recuruit',
    name: 'registBucket',
    component: RegistView,
  },
  {
    path: '/follow',
    name: 'followBoardList',
    component: FollowBoardView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
  },
});

export default router;
