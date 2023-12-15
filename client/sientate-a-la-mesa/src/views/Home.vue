<template>


<v-app>

  <v-app-bar>
      
    
    <v-app-bar-title></v-app-bar-title>

    <!-- <v-btn density="default" color="teal">Acceso restaurantes</v-btn> -->

  </v-app-bar>

  <v-main>

    <v-card class="mx-auto my-16 my-custom-card-home" color="teal" >
      <v-card-title class="my-custom-card-home"> Bienvenido a sientate a la mesa</v-card-title>
      
    </v-card>
    <v-divider></v-divider>
    <v-container>
    <v-row justify="center" align="center">
      <router-link to="/login">
        <v-col cols="auto">
          <v-btn id="botonIniciarSesion" density="default" color="teal">Iniciar sesión</v-btn>
        </v-col>
      </router-link>
      
      <router-link to="/register-main">
         <v-col cols="auto">
        <v-btn id="botonRegistro" density="default" color="teal">Registrate</v-btn>
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