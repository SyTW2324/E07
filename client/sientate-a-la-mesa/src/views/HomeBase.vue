<template>
  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container v-if="allInfoIsLoaded == 0" class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
        <v-progress-circular
        indeterminate
        size="150" 
        color="teal"></v-progress-circular> 
      </v-container>
      <v-container v-else-if="allInfoIsLoaded == 1">
        <v-container>
          <v-card class="mx-auto my-16 my-custom-card-home" color="teal">
            <v-card-title> RESERVA YA!</v-card-title>
            <v-card-text class="my-custom-card-text">
              <p> Nombre de usuario: {{ user.user.username }}</p>
            </v-card-text>
          </v-card>
        </v-container>
        <v-container>
        <v-row>
          <v-col v-for="(restaurant, index) in paginatedRestaurants" :key="index" cols="12" md="4">
            <v-card>
              <v-card-title>{{ restaurant[0] }}</v-card-title>
              <v-card-subtitle>{{ restaurant[3] }}</v-card-subtitle>
              <v-card-text class="d-flex justify-space-between">
                <!-- <v-chip prepend-icon="mdi-brightness-5" @click="">Se</v-chip>
                <v-chip prepend-icon="mdi-alarm-check" @click="">vienen</v-chip> -->
                <v-chip icon="mdi-blinds" @click="">Categoria: {{ restaurant[2] }}</v-chip>
              </v-card-text>
              <v-btn
                block
                color="white"
                size="large"
                type="submit"
                variant="elevated"
                @click="$router.push(`/establecimientos/${restaurant[1]}`)"
              >
                <p style="color: teal;"> Más información</p>
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
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>


</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Barnav from '../components/Barnav.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'
import axios from 'axios'
import { onMounted } from 'vue'
import { baseUrl } from '../env/env-variables';

const user = useAuthStore();
const restaurants = ref < [string, string, string, string] []>();
const itemsPerPage = 3;
const currentPage = ref(1);

const allInfoIsLoaded = ref(0); // 0 = no, 1 = si, 2 = error

const paginatedRestaurants = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return restaurants.value?.slice(startIndex, endIndex);
})

const totalPages = computed(() => {
  if (restaurants.value) {
    return Math.ceil(restaurants.value.length / itemsPerPage);
  }
  return 0;
});

const changePage = (page: number) => {
  currentPage.value = page
}


onMounted(async () => {
  // Realizar la solicitud a tu backend para obtener la lista de restaurantes
  try {
 
    const response = await axios.get(`${baseUrl}restaurants/info/?userName=all`);

    // array de tuplas string
    let names: [string, string, string, string] [] = [];
    for (let i = 0; i < response.data.length; i++) {
      names.push([response.data[i].restaurantName, response.data[i].userName, response.data[i].category, response.data[i].description]);
    }
    restaurants.value = names;
    allInfoIsLoaded.value = 1;
  } catch (error) {
    console.error('Error al obtener restaurantes', error);
  }
});


</script>
