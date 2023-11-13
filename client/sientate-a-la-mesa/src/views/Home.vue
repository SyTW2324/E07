<template>


<v-app>

  <v-app-bar>
      
    
    <v-app-bar-title></v-app-bar-title>

    <v-btn density="default" color="teal">Acceso restaurantes</v-btn>

  </v-app-bar>

  <v-main>

    <v-card
    class="mx-auto my-16"
    
    width="900"
    height="300"
    
   
    color="teal"
    
    >
    <v-card-title> Bienvenido a sientate a la mesa</v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </v-card-text>
      
    </v-card>
    <v-divider></v-divider>
    <v-container>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-btn density="default" color="teal">Iniciar sesión</v-btn>
      </v-col>

      <router-link to="/register-main">
         <v-col cols="auto">
        <v-btn density="default" color="teal">Registrate</v-btn>
      </v-col>
      </router-link>
     
    </v-row>
  </v-container>


  </v-main>

  <Footer> </Footer>


</v-app>



</template>



<script setup lang="ts">
import Footer from '../components/Footer.vue'
</script>