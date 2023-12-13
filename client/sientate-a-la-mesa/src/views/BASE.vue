<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      Main Content
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      aod
     
      <router-link to="/">
         <v-col cols="auto">
        <v-btn density="default" color="teal">ATRAS</v-btn>
      </v-col>
      </router-link>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      aod
      Main Content
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      aod
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>

