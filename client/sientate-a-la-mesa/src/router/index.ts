import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RegisterMain from '../views/RegisterMain.vue';
import RegisterUsers from '../views/RegisterUsers.vue';
import RegisterRestaurants from '../views/RegisterEstablecimiento.vue';
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
    path: '/register-restaurants',
    name: 'register-restaurants',
    component: RegisterRestaurants
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

  const publicPages = ['/login', '/register-main', '/password-recovery', '/', '/register-users', '/register-restaurants'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const expired = auth.isExpired();
  console.log('expired', expired);
  if (authRequired && (!auth.user || expired === false))  {
    //auth.returnUrl = to.fullPath;
    auth.logout();
    return '/login';
  } else if (to.path === '/login' && auth.user != null && expired === true) {
    return '/my-profile';
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