<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px" >

      

      <v-text-field label="Label"></v-text-field>



  </v-main>

  <Footer></Footer>
  
</v-app>

</template>