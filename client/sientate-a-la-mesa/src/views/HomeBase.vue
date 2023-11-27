<template>


  <v-app>
    
    <Barnav></Barnav>
    
    <v-main>
      <v-container >
      <v-card
      class="mx-auto my-16"
      
      width="900"
      height="300"
      
     
      color="teal"
      
      >
      <v-card-title> RESERVA YA! Home-Base </v-card-title>
      <v-card-text>
        <p> Nombre de usuario: {{ user.user.username }}</p>
        
      </v-card-text>


      </v-card>
      </v-container>

      <v-container >
        <v-row>
          <v-col v-for="(restaurant, index) in paginatedRestaurants" :key="index" cols="12" md="4">
            <v-card>
              <v-card-title>{{ restaurant }}</v-card-title>
              <v-card-subtitle>{{ restaurant }}</v-card-subtitle>
              <v-card-text class="d-flex justify-space-between">
                  <v-chip
                    prepend-icon="mdi-brightness-5"
                    @click=""
                  >
                    Se
                  </v-chip>
                  <v-chip
                    prepend-icon="mdi-alarm-check"
                    @click=""
                  >
                    vienen
                  </v-chip>
                  <v-chip
                    icon="mdi-blinds"
                    @click=""
                  >
                    cositas
                  </v-chip>
               </v-card-text>
              <v-btn
 
                block
                color="wihite"
                size="large"
                type="submit"
                
                variant="elevated"
                >
                <RouterLink to="/establecimientos">
                <p style="color: teal;"> More info</p>
                </RouterLink>
                </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" />
          </v-col>
        </v-row>
      </v-container>     
  
    </v-main>
  
    <Footer> </Footer>
  
  
  </v-app>
  
  
  
  </template>
  
  
  
  <script setup lang="ts">
  import Footer from '../components/Footer.vue'
  import Barnav from '../components/Barnav.vue';
  import { useAuthStore } from '../stores/useAuthStore';

  const user = useAuthStore();
  </script>

  <script lang="ts">
  export default {
    data() {
      return {
        restaurants: ["pepe", "juan", "mario", "tus" ,"amigos", "chachis"],  // Tu lista de restaurantes
        itemsPerPage: 3,
        currentPage: 1,
      };
    },
    computed: {
      paginatedRestaurants() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.restaurants.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.restaurants.length / this.itemsPerPage);
      },
    },
    methods: {
      changePage(page: number) {
        this.currentPage = page;
      },
    },
  };
  </script>
