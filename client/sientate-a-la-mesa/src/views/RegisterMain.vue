<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  
  <v-main>
    <br>
    <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
      <h1>Registrarme</h1>
    </v-container>
    <br>
    <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
      <v-row justify="center" align="center">
        <router-link to="/register-users">
          <v-col cols="auto">
          <v-btn id="botonRegistroUsuario" density="default" color="teal">Registrarme como usuario</v-btn>
          </v-col>
        </router-link>

        <router-link to="/register-restaurants">
          <v-col cols="auto">
          <v-btn id="botonRegistroEstablecimiento" density="default" color="teal">Registarme como establecimiento</v-btn>
          </v-col>
        </router-link>
      </v-row>

     
    </v-container> 

   
    
  </v-main>




  <Footer></Footer>
  
</v-app>

</template>