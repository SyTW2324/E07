
<template>

  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container class="d-flex align-center justify-center" >
        <h1>Mi perfil establecimiento</h1>
      </v-container>
     
        
    </v-main>
  
    <Footer></Footer>
    
  </v-app>
  
  </template>
  
  
  <script setup lang="ts">
  import Barnav from '../components/Barnav.vue';
  import Footer from '../components/Footer.vue'
  //import axios  from 'axios';
  
  // import { useAuthStore } from '../stores/useAuthStore';
  
  // const userLogged = useAuthStore();
  
  // async function getUser() {
  //   const requiredUserJSON = {
  //     username: "user1"
  
  //   }
  //   const response = await axios.get('http://10.6.129.207/api/users/', 
  //   {params: requiredUserJSON});
  //   console.log(response.data);
    
  // }
  
  // getUser();
  
  
  </script>