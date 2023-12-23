<script setup lang="ts">
import { ref } from 'vue';
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { baseUrl } from '../env/env-variables';
import router from '../router';
import { useAuthStore } from '../stores/useAuthStore';



let loading = ref(false);
const selection = ref<string | null>(null);
// Define un array con las horas disponibles
let availableHours = ref<string[]>([]);
let restaurants = ref<any>(null);
let restaurantName = ref<string>('');
let selectedDate = ref<string | null>(null);
let calendar = ref<boolean>(true);



async function fetchRestaurantData() {
  
  try {
    const route = useRoute();
    const restaurant = await axios.get(`${baseUrl}restaurants/${route.params.id}`);

    if (restaurant.data === null) router.push(`/404}`);;

    restaurants.value = restaurant.data;

    restaurantName.value = restaurant.data.restaurantName;


    loading.value = false; // Se debe establecer a false aquí, después de obtener los datos.

  } catch (error) {
    console.error('Error al obtener los datos del restaurante:', error);
    loading.value = false; // También se debe establecer a false en caso de error.
    router.push('/404');
  }
}


// Función para reservar
async function reserve(selection: string | null) {
  loading.value = true;
  const authStore = useAuthStore();

  console.log('Reservando...');
  console.log('Seleccionado:', availableHours.value[Number(selection)]);

  //  una reserva exitosa después de 2 segundos

  //Crear un post con el body incluye el token, nombre restaurante, nombre usuario, y el dia y hora de la reserva en el tipo Date

  const date = new Date();

  date.setHours(Number(availableHours.value[Number(selection)].split(':')[0]));
  date.setMinutes(Number(availableHours.value[Number(selection)].split(':')[1].split(' ')[0]));
  
  //pon el dia, mes y año de la reserva
  date.setDate(selectedDate.value ? new Date(selectedDate.value).getDate() : 0);
  date.setMonth(selectedDate.value ? new Date(selectedDate.value).getMonth() : 0);
  date.setFullYear(selectedDate.value ? new Date(selectedDate.value).getFullYear() : 0);

  console.log(date);

  console.log("------------------------------------------");
  
  const body = {
    token: authStore.getToken(),
    restaurantName: restaurantName.value,
    userName: authStore.user.username,
    day: date
    
  }

  const response = await axios.post(`${baseUrl}reservations`, body);

  console.log(response);

  if (response.data.code === 0) {
    console.log('Reserva exitosa');
    calendar.value = true;
  } else {
    console.log('Error al reservar');
  }






  

  setTimeout(() => (loading.value = false), 2000);
}

async function selectionDay() {
  console.log(selectedDate.value)
  
    //!OJO FORMATO MES/DIA/AÑO
  const selectedDateValue = selectedDate.value ? new Date(selectedDate.value) : null;
  const day = selectedDateValue ? (selectedDateValue.getMonth() + 1) + '/' + selectedDateValue.getDate() + '/' + selectedDateValue.getFullYear() : '';

  console.log(day);
  calendar.value = false;
  const availableHoursGet = await axios.get(`${baseUrl}reservationsAvilable/?RestaurantName=${restaurantName.value}&day=${day}`);
  if (availableHoursGet.data.code === 0) {
    availableHours.value = availableHoursGet.data.message;
  }  
}



fetchRestaurantData();


</script>

<template>
  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container class="d-flex align-center justify-center" style="padding-top: 5em; padding-bottom: 5em;"> 
        <v-card class="mx-auto" width="1100" height="320" image="https://cdn.vuetifyjs.com/images/cards/docks.jpg" theme="dark"> 
          <v-card-title> {{ restaurantName  }}</v-card-title>
        </v-card>
      </v-container>

      <v-container>

        <v-container v-show="calendar">
          <v-row justify="space-around">
            <v-date-picker v-model="selectedDate" show-adjacent-months></v-date-picker>
          </v-row>

          <v-row justify="center" class="mt-3">
            <v-btn @click="selectionDay()">Selección</v-btn>
          </v-row>
        </v-container>
        <v-container style="align-items: center: inherit;" v-show="!calendar">
          <v-card :loading="loading" class="mx-auto my-12 " max-width="1000" >
            <template v-slot:loader="{ isActive }">
              <v-progress-linear :active="isActive" color="teal" height="4" indeterminate></v-progress-linear>
            </template>
            <v-card-title>Disponibilidad: </v-card-title>

            <div class="px-10">
              <v-chip-group v-model="selection">
                <!-- Utiliza v-for para iterar sobre el array de horas -->
                <v-chip v-for="hour in availableHours" :key="hour">{{ hour }}</v-chip>
              </v-chip-group>
            </div>

            <v-card-actions>
              <v-btn color="teal" variant="text" @click="reserve(selection)">Reservar</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>



      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>
