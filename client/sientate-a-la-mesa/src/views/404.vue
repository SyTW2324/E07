<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    
    <v-container style="padding: 2em;">
    <v-card class="mx-auto" width="700" height="320" color="red-accent-4" style=""> 
          <v-card-title> ERROR 404</v-card-title>
        </v-card>
    </v-container>
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>