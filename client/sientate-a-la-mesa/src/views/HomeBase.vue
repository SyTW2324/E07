<template>


  <v-app>
  
    <v-app-bar>
        
      
      <v-app-bar-title></v-app-bar-title>
  
      <!-- <v-btn density="default" color="teal">Acceso restaurantes</v-btn> -->
  
    </v-app-bar>
  
    <v-main>
  
      <v-divider></v-divider>
      <v-card
      class="mx-auto my-16"
      
      width="900"
      height="300"
      
     
      color="teal"
      
      >
      <v-card-title> RESERVA YA! SIMPLEMENTE ME DABA PEREZA MIRAR EL MOCKUP DE ESTO </v-card-title>
      <v-card-text>
        <p> Nombre de usuario: {{ user.userName }}</p>
        
      </v-card-text>
      <img :src="user.profilePicture" alt="Imagen de perfil" />
      </v-card>
      
  
    </v-main>
  
    <Footer> </Footer>
  
  
  </v-app>
  
  
  
  </template>
  
  
  
  <script setup lang="ts">
  import Footer from '../components/Footer.vue'
  import { useUserStore } from '../stores/UserStore';

  const user = useUserStore();
  const profilePicture = user.profilePicture // Obtén la imagen de perfil
  console.log(profilePicture)
  </script>