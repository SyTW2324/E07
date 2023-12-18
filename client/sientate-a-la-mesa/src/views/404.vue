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
          <v-card-title> ERROR 404</v-card-title>
        </v-card>
    </v-container>
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>