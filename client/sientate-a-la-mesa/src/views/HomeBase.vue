<template>


  <v-app>
    
    <Barnav></Barnav>
    
    <v-main>
  
      <v-card
      class="mx-auto my-16"
      
      width="900"
      height="300"
      
     
      color="teal"
      
      >
      <v-card-title> RESERVA YA! Home-Base </v-card-title>
      <v-card-text>
        <p> Nombre de usuario: {{ user.user.username }}</p>
        
      </v-card-text>

      </v-card>
      
  
    </v-main>
  
    <Footer> </Footer>
  
  
  </v-app>
  
  
  
  </template>
  
  
  
  <script setup lang="ts">
  import Footer from '../components/Footer.vue'
  import Barnav from '../components/Barnav.vue';
  import { useAuthStore } from '../stores/useAuthStore';

  const user = useAuthStore();
  </script>