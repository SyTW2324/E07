<template>
  
      <v-app-bar color="teal"  scroll-behavior="elevate">
        <template v-slot:prepend>
          <router-link v-if="userLogged.user == null" to="/">
            <v-app-bar-nav-icon> <img :src="icoWeb" alt="Logo">  </v-app-bar-nav-icon>
          </router-link>
          <router-link v-else to="/home-base">
            <v-app-bar-nav-icon> <img :src="icoWeb" alt="Logo">  </v-app-bar-nav-icon>
          </router-link>
          
        </template>

        <v-app-bar-title> 
          <router-link v-if="userLogged.user == null" to="/" style="text-decoration: none; color: #ffffff;"><p>Sientate a la mesa</p>
          </router-link> 
          <router-link v-else to="/home-base" style="text-decoration: none; color: #ffffff;"><p>Sientate a la mesa</p> 
          </router-link>
        </v-app-bar-title>
       
      

        <v-btn icon v-if="userLogged.user == null">
          <v-avatar size="40">
            <img :src="usuario" alt="Profile Photo">
          </v-avatar>
        </v-btn>
        <v-btn v-else-if="userLogged.getProfilePhoto() ===' '">
          {{ userLogged.user.username }}
          <v-menu activator="parent">
          <v-list>
          <v-list-item>
            <v-btn
 
              block
              color="wihite"
              size="large"
              type="submit"
      
              variant="elevated"
              >
              <router-link to="/my-profile" style="text-decoration: none;" v-if="userLogged.user.tipo == 'user'">
              <p style="color: teal;">  Mi perfil</p>
              </router-link>
              <router-link to="/my-profile-restaurants" style="text-decoration: none;" v-else>
              <p style="color: teal;">  Mi establecimiento</p>
              </router-link>
              </v-btn>
          </v-list-item>
        <v-list-item @click="userLogged.logout()">
            <v-btn
 
              block
              color="wihite"
              size="large"
              type="submit"
              
              variant="elevated"
              >
              <p style="color: teal;"> Salir</p>
              </v-btn>
          </v-list-item>
          </v-list>
          </v-menu>  
        </v-btn>

        <v-btn v-else>
          <v-avatar size="40">
            <img :src="profilePhoto" alt="Imagen" style="width: 100%; height: 100%; object-fit: cover;"/>
            <v-menu activator="parent">
              <v-list>
              <v-list-item>
                <v-btn
     
                  block
                  color="wihite"
                  size="large"
                  type="submit"
          
                  variant="elevated"
                  >
                  <router-link to="/my-profile" style="text-decoration: none;" v-if="userLogged.user.tipo == 'user'">
                  <p style="color: teal;">  Mi perfil</p>
                  </router-link>
                  <router-link to="/my-profile-restaurants" style="text-decoration: none;" v-else>
                  <p style="color: teal;">  Mi establecimiento</p>
                  </router-link>
                  </v-btn>
              </v-list-item>
            <v-list-item @click="userLogged.logout()">
                <v-btn
     
                  block
                  color="wihite"
                  size="large"
                  type="submit"
                  
                  variant="elevated"
                  >
                  <p style="color: teal;"> Salir</p>
                  </v-btn>
              </v-list-item>
              </v-list>
              </v-menu>  
          </v-avatar>
        </v-btn>
        
        <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
          <v-menu activator="parent">
          <v-list>
          <v-list-item>
            <v-btn
 
              block
              color="wihite"
              size="large"
              type="submit"
      
              variant="elevated"
              >
              <p style="color: teal;">  Salir!</p>
              </v-btn>
          </v-list-item>
          </v-list>
        </v-menu>
      </v-btn> -->
      </v-app-bar>
  
</template>

<script setup lang="ts">

import icoWeb from '../img/icoWeb.png'
import usuario from '../img/usuario.png'
import { useAuthStore } from '../stores/useAuthStore';

const userLogged = useAuthStore();

const profilePhoto = userLogged.getProfilePhoto() as string;

</script>