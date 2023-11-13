<template>


  <v-app>

    <Barnav></Barnav>
    
    <v-main>

      <v-select
  label="Select"
  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
></v-select>

    </v-main>



    <Footer> </Footer>


  </v-app>




</template>


<script setup lang="ts">

import Barnav from './components/Barnav.vue';
import Footer from './components/Footer.vue';

</script>