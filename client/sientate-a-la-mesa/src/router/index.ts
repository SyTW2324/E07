import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RegisterMain from '../views/RegisterMain.vue';
import RegisterUsers from '../views/RegisterUsers.vue';




const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register-main',
    name: 'register-main',
    component: RegisterMain
  },
  {
    path: '/register-users',
    name: 'register-users',
    component: RegisterUsers
  },

];


const router =  createRouter({
  history: createWebHistory(),
  routes
});

export default router