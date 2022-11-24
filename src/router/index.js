import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DetailView from '../views/DetailView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import ProfileView from '../views/ProfileView.vue';
import UserProfileView from '../views/UserProfileView.vue';
import RegistView from '../views/RegistView.vue';
import RegistRecruitView from '../views/RegistRecruitView.vue';
import RegistBucketView from '../views/RegistBucketView.vue';
import FollowBoardView from '../views/FollowBoardView.vue';
import RecruitBoardView from '../views/RecruitBoardView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/board/:id',
    name: 'DetailView',
    component: DetailView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView,
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView,
  },
  {
    path: '/profile/:email',
    name: 'UserProfileView',
    component: UserProfileView,
  },
  {
    path: '/regist',
    name: 'RegistView',
    component: RegistView,
  },
  {
    path: '/regist/bucket',
    name: 'RegistBucketView',
    component: RegistBucketView,
  },
  {
    path: '/regist/recuruit',
    name: 'RegistView',
    component: RegistView,
  },
  {
    path: '/follow',
    name: 'FollowBoardView',
    component: FollowBoardView,
  },
  {
    path: '/recruit',
    name: 'RecruitBoardView',
    component: RecruitBoardView,
  },
  {
    path: '/regist/recruit',
    name: 'RegistRecruitView',
    component: RegistRecruitView,
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
