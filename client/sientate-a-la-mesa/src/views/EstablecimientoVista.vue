<script setup lang="ts">
import { ref } from 'vue';
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { baseUrl } from '../env/env-variables';
import router from '../router';
import { useAuthStore } from '../stores/useAuthStore';
import { onBeforeMount } from 'vue';
import VuePdfApp from "vue3-pdf-app";


let loading = ref(false);
const selection = ref<string | null>(null);
// Define un array con las horas disponibles
let availableHours = ref<string[]>([]);
let restaurants = ref<any>(null);
let restaurantName = ref<string>('');
let selectedDate = ref<string | null>(null);
let calendar = ref<boolean>(true);
let pictures = ref<string[]>([]);
const authStore = useAuthStore();
let carga = ref(false);
let description = ref<string>('');
let menu = ref<string>('');
let email = ref<string>('');
let phoneNumber = ref<string>('');
let restaurantAddress = ref<string>('');
let category = ref<string>('');


onBeforeMount(async () => {

  fetchRestaurantData();
 });

async function fetchRestaurantData() {
  
  try {
    const route = useRoute();
    const restaurant = await axios.get(`${baseUrl}restaurants/info/?userName=${route.params.userName}`);

   // if (restaurant.data === null) router.push(`/404}`);;

    restaurants.value = restaurant.data;

    restaurantName.value = restaurant.data.restaurantName;

    description.value = restaurant.data.description;
    menu.value = restaurant.data.menu;
    email.value = restaurant.data.email;
    phoneNumber.value = restaurant.data.phoneNumber;
    restaurantAddress.value = restaurant.data.restaurantAddress;
    category.value = restaurant.data.category;
    // pictures

    
       // Añade un nuevo evento load a cada imagen
    pictures.value = restaurant.data.pictures.map((picture: string) => {
      const image = new Image();
      image.src = picture;
      image.onload = () => (loading.value = false);
      image.onerror = () => (loading.value = false);
      return picture;
    });



    loading.value = false; // Se debe establecer a false aquí, después de obtener los datos.

    // hacer que espere aqui hasta que se carguen los datos

    

    await esperar(5500);
    carga.value = true; 

  } catch (error) {
    console.error('Error al obtener los datos del restaurante:', error);
    loading.value = false; // También se debe establecer a false en caso de error.
    router.push('/404');
  }
}

function esperar(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Función para reservar
async function reserve(selection: string | null) {
  loading.value = true;

  //  una reserva exitosa después de 2 segundos

  //Crear un post con el body incluye el token, nombre restaurante, nombre usuario, y el dia y hora de la reserva en el tipo Date

  const date = new Date();

  date.setHours(Number(availableHours.value[Number(selection)].split(':')[0]));
  date.setMinutes(Number(availableHours.value[Number(selection)].split(':')[1].split(' ')[0]));
  
  //pon el dia, mes y año de la reserva
  date.setDate(selectedDate.value ? new Date(selectedDate.value).getDate() : 0);
  date.setMonth(selectedDate.value ? new Date(selectedDate.value).getMonth() : 0);
  date.setFullYear(selectedDate.value ? new Date(selectedDate.value).getFullYear() : 0);

  
  const body = {
    token: authStore.getToken(),
    restaurantName: restaurantName.value,
    userName: authStore.user.username,
    day: date
    
  }

  const response = await axios.post(`${baseUrl}reservations`, body);


  if (response.data.code === 0) {
    calendar.value = true;
  } 





  

  setTimeout(() => (loading.value = false), 2000);
}

async function selectionDay() {
  
    //!OJO FORMATO MES/DIA/AÑO
  const selectedDateValue = selectedDate.value ? new Date(selectedDate.value) : null;
  const day = selectedDateValue ? (selectedDateValue.getMonth() + 1) + '/' + selectedDateValue.getDate() + '/' + selectedDateValue.getFullYear() : '';

  calendar.value = false;
  const availableHoursGet = await axios.get(`${baseUrl}reservationsAvilable/?RestaurantName=${restaurantName.value}&day=${day}`);
  if (availableHoursGet.data.code === 0) {
    availableHours.value = availableHoursGet.data.message;
  }  
}





</script>

<template>
  <v-app>
    <Barnav></Barnav>
    <v-main v-show="!carga">

      <!-- CARGA circulo -->
      <v-container class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;"> 
        <v-progress-circular
          indeterminate
          size="150" 
          color="teal"></v-progress-circular> 
      </v-container>

    </v-main>
    <v-main v-show="carga">
        <v-container style="padding-top: 4em; padding: 4em;">
          <v-row justify="center">
            <v-col>
              <v-card class="elegant-card" color="teal" >
                <v-card-title class="teal white--text headline-style">
                  <span class="headline">{{ restaurantName }} </span>
                </v-card-title>
                <v-card-subtitle class="description-style" style="padding-bottom: 1em;">
                  {{description}}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      <v-container class="d-flex align-center justify-center" > 
        <v-container v-show="calendar"  >
                <v-row>
                  <v-date-picker v-model="selectedDate" title="Seleciona el día deseado" show-adjacent-months>Reserva ya!</v-date-picker>
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
        <v-container>
          <v-card class="mx-auto"  theme=""> 
                <v-carousel cycle height="400" hide-delimiters >
                    <v-carousel-item
                      v-for="(item,i) in pictures"
                      :key="i"
                      :src="item"
                    ></v-carousel-item>
                  </v-carousel>
                <v-card-title> Sobre nosotros</v-card-title>
                <v-card-text>
                  <p>{{ email }} </p>
                  <p>{{ phoneNumber }} </p>
                  <p>{{ restaurantAddress }} </p>
                  <p>{{ category }} </p>
                  
                </v-card-text>
              </v-card>
          </v-container>
      </v-container>
  
      <v-container>
        <v-container>
              <v-container>
                <v-card color="teal">
                  <v-card-title>
                    <h2>Menú</h2>
                  </v-card-title>
                  <vue-pdf-app v-if="menu !== ''" style="height: 100vh;" :pdf="menu"></vue-pdf-app>
                  <v-card-text v-if="menu === ''">
                    <p>No hay un menú disponible</p>
                  </v-card-text>
                </v-card>
              </v-container>
        </v-container>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400&display=swap');

.elegant-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.elegant-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.headline-style {
  font-family: 'Playfair Display', serif; /* Utiliza Playfair Display como fuente para el título */
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  padding: 24px 0;
}

.description-style {
  font-family: 'Roboto', sans-serif; /* Utiliza Roboto como fuente para la descripción */
  font-size: 1.25rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 16px;
}
</style>