import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RegisterMain from '../views/RegisterMain.vue';
import RegisterUsers from '../views/RegisterUsers.vue';
import RecuperarContraseña from '../views/RecuperarContraseña.vue';
import Login from '../views/Login.vue';
import MyProfile from '../views/MyProfile.vue'



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
  {
    path: '/password-recovery',
    name: 'password-recovery',
    component: RecuperarContraseña
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: MyProfile
  }

];


const router =  createRouter({
  history: createWebHistory(),
  routes
});

export default router