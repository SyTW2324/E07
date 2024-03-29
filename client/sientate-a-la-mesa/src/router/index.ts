import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import RegisterMain from '../views/RegisterMain.vue';
import RegisterUsers from '../views/RegisterUsers.vue';
import RegisterEstablecimiento from '../views/RegisterEstablecimiento.vue';
import Login from '../views/Login.vue';
import MyProfile from '../views/MyProfile.vue'
import HomeBase from '../views/HomeBase.vue'
import HomeEstablecimiento from '../views/HomeEstablecimiento.vue'
import MyProfileRestaurants from '../views/MiEstablecimiento.vue'
import Establecimiento from '../views/EstablecimientoVista.vue'
import E404 from '../views/404.vue'
import EditUserProfile from '../views/EditUserProfile.vue'
import EditRestaurantProfile from '../views/EditRestaurantProfile.vue'

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
    component: RegisterEstablecimiento
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
    path: '/my-profile-restaurants',
    name: 'my-profile-restaurants',
    component: MyProfileRestaurants
  },
  {
    path: '/establecimientos/:userName',
    name: 'establecimientos',
    component: Establecimiento
  },
  {
    path: '/home-base',
    name: 'home-base',
    component: HomeBase

  },
  {
    path: '/home-restaurants',
    name: 'home-restaurants',
    component: HomeEstablecimiento

  },
  {
    path: '/404',
    name: '404',
    component: E404

  },
  {
    path: '/edit-user-profile',
    name: 'edit-user-profile',
    component: EditUserProfile
  }, 
  {
    path: '/edit-restaurant-profile',
    name: 'edit-restaurant-profile',
    component: EditRestaurantProfile
  },
  {
    path: '/*',
    component: E404
  },


];


const router =  createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach( async (to) => {

  const publicPages = ['/login', '/register-main', '/', '/register-users', '/register-restaurants'];
  const userPages = ['/my-profile', '/home-base', '/establecimientos', '/edit-user-profile']; // Página a las que solo puede acceder un usuario
  const restaurantPages = ['/my-profile-restaurants', '/home-restaurants']; // Página a las que solo puede acceder un restaurante

  const authRequired = !publicPages.includes(to.path);

  const userPagesAccess = userPages.includes(to.path);
  const restaurantPagesAccess = restaurantPages.includes(to.path);

  const auth = useAuthStore();
  const expired = auth.isExpired();
  if (authRequired && (!auth.user || expired === false))  {
    //auth.returnUrl = to.fullPath;
    auth.logout();
    return '/login';
  } else if (to.path === '/login' && auth.user != null && expired === true) {
    if (auth.user.tipo === 'user') {
      return '/home-base';
    } else if (auth.user.tipo === 'restaurant') {
      return '/home-restaurants';
    } else {
      auth.logout();
    }
    return '/login';
  } else if (userPagesAccess && auth.user.tipo === 'restaurant') {
    return '/404';
  } else if (restaurantPagesAccess && auth.user.tipo === 'user') {
    return '/404';
  }
}
);
//
export default router


/**
 * Notas:
 * - Al logear no funciona correctamente
 * - Algunos arreglos en el data devuelto en fethc-wrapper.ts
 * - En lo que devuelve data se podría guardar el token en el store
 */