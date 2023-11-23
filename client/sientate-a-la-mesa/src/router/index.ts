import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RegisterMain from '../views/RegisterMain.vue';
import RegisterUsers from '../views/RegisterUsers.vue';
import RecuperarContraseña from '../views/RecuperarContraseña.vue';
import Login from '../views/Login.vue';
import MyProfile from '../views/MyProfile.vue'
import HomeBase from '../views/HomeBase.vue'

import { useAuthStore } from '../stores/useAuthStore';

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
  },
  {
    path: '/home-base',
    name: 'home-base',
    component: HomeBase

  }

];


const router =  createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach( async (to) => {

  const publicPages = ['/login', '/register-main', '/password-recovery', '/'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const expired = auth.isExpired();
  console.log('expired', expired);
  if (authRequired && (!auth.user || expired === false))  {
      //auth.returnUrl = to.fullPath;
      auth.logout();
      return '/login';
  }
}
);

export default router


/**
 * Notas:
 * - Al logear no funciona correctamente
 * - Algunos arreglos en el data devuelto en fethc-wrapper.ts
 * - En lo que devuelve data se podría guardar el token en el store
 */