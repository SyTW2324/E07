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


async function fetchRestaurantData() {
  
  try {
    const route = useRoute();
    const restaurant = await axios.get(`${baseUrl}restaurants/${route.params.id}`);

    if (restaurant.data === null) router.push(`/404}`);;

    restaurants.value = restaurant.data;
    
    const startingHour = restaurant.data.timeTable[0].startingHour;
    const finishingHour = restaurant.data.timeTable[0].finishingHour;
    const timePeriod = 30;


    const periodosDisponibles = calcularPeriodosDisponibles(startingHour, finishingHour, timePeriod);
    availableHours.value = periodosDisponibles;
    restaurantName.value = restaurant.data.restaurantName;

    loading.value = false; // Se debe establecer a false aquí, después de obtener los datos.

  } catch (error) {
    console.error('Error al obtener los datos del restaurante:', error);
    loading.value = false; // También se debe establecer a false en caso de error.
    router.push('/404');
  }
}

// ... (las funciones calcularPeriodosDisponibles y formatTime también deben estar aquí)

function calcularPeriodosDisponibles(startingHour: string, finishingHour: string, timePeriod: number): string[] {
    // Convertir las horas de apertura y cierre a objetos Date para facilitar la manipulación
    const startTime = new Date(`2000-01-01T${startingHour}:00`);
    if (finishingHour === '00:00') finishingHour = '24:00';
    const endTime = new Date(`2000-01-01T${finishingHour}:00`);

    // Calcular la cantidad total de minutos disponibles durante el horario de apertura
    const totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    // Calcular la cantidad de periodos disponibles
    const numberOfPeriods = Math.floor(totalMinutes / timePeriod);

    // Calcular los periodos disponibles y almacenarlos en un array de strings
    const availablePeriods: string[] = [];
    let currentPeriodTime = startTime;

    for (let i = 0; i < numberOfPeriods; i++) {
        const periodEndTime = new Date(currentPeriodTime.getTime() + timePeriod * 60 * 1000);
        availablePeriods.push(`${formatTime(currentPeriodTime)} - ${formatTime(periodEndTime)}`);
        currentPeriodTime = periodEndTime;
    }

    return availablePeriods;
}

// Función auxiliar para formatear la hora en formato HH:mm
function formatTime(time: Date): string {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
  date.setDate(1);
  date.setMonth(1);
  date.setFullYear(2021);

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






  

  setTimeout(() => (loading.value = false), 2000);
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
        <v-container style="align-items: center: inherit;">
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
