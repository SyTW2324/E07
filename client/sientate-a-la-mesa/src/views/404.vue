<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    
    <v-container style="padding: 2em;">
    <v-card class="mx-auto my-custom-card-home"  color="red-accent-4" style=""> 
          <v-card-title> Ups, parace que te has perdido!</v-card-title>
          <v-card-text>
            <p>La página que estás buscando no existe o no está disponible.</p>
            <p>Si crees que esto es un error, por favor, ponte en contacto con nosotros.</p>
          </v-card-text>
          <v-card-actions>
            <router-link to="/">
              <v-btn color="white" >Volver a la página principal</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
    </v-container>
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>