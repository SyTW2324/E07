<template>


<v-app>

  <v-app-bar
  :image="imgbar"
  >
      
  <template v-slot:image>
          <v-img
          gradient="to top right, rgba(220, 230, 245, 0.6), rgba(245, 240, 255, 0.2)"
          ></v-img>
  </template>
    <v-app-bar-title></v-app-bar-title>

    <!-- <v-btn density="default" color="teal">Acceso restaurantes</v-btn> -->

  </v-app-bar>

  <v-main>

   
    <v-container style="padding-bottom: 3em; padding-top: 3em;">
    <v-card color="teal" align-center >
      <!-- Utiliza las clases de Vuetify para centrar la imagen -->
      <v-img class="mx-auto" style="height: 20%; width: 40%;" :src="imgPresentacion"></v-img>
    </v-card>
  </v-container>
    <v-divider style="padding: 1em; " ></v-divider>
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
import imgPresentacion from '../img/presentacion2.png';
import imgbar from '../img/image.jpg';
</script>