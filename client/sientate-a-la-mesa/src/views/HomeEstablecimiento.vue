<template>
  <v-app>
    <Barnav></Barnav>
    <v-main v-if="pageIsLoaded == false">
      <v-container class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
        <v-progress-circular
          indeterminate
          size="150" 
          color="teal"
          >
        </v-progress-circular> 
      </v-container>
    </v-main> 
    <v-main v-if="pageIsLoaded == true">
      <v-container>
        <!-- carrousel pictures -->
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel cycle height="400" hide-delimiters>
              <v-carousel-item
                v-for="(item,i) in pictures"
                :key="i"
                :src="item"
              ></v-carousel-item>
            </v-carousel>
            <br />
            <v-card color="teal">
              <v-card-title>
                <h2>{{ restaurantName }}</h2>
              </v-card-title>
              <v-card-subtitle>
                <h3>{{ category }}</h3>
              </v-card-subtitle>
              <v-card-text>
                <p>{{ restaurantAddress }}</p>
                <p>{{ phoneNumber }}</p>
                <p>{{ email }}</p>
                <p>{{ hours }}</p>
              </v-card-text>
            </v-card>
            <v-container>
              <v-card max-width="100%" elevation="16" color="teal" density="compact">
                <v-title>Mis próximas reservas</v-title>
                <v-card-item v-if="nextReservationsFlag == false">No tienes reservas</v-card-item>
                <v-card-item v-else v-for="(reservation, index) in paginatedNextReservations" :key="index" cols="12">
                  <p><strong>Cliente: </strong>{{ reservation.clientName }}</p>
                  <p><strong>Teléfono: </strong>{{ reservation.clientPhone }}</p>
                  <p><strong>Fecha: </strong>{{ reservation.date }} </p>
                </v-card-item>
              </v-card>
              <v-container v-if="nextReservationsFlag == true">
                <v-row>
                  <v-col cols="12">
                    <v-pagination v-model="currentPageNextReservations" :length="totalPagesNextReservations" @input="changePage" />
                  </v-col>
                </v-row>
              </v-container>
    
            </v-container>
          </v-col>

          <v-col cols="12" md="6">
            <v-card color="teal">
              <v-card-title>
                <h2>Menú</h2>
              </v-card-title>
              <vue-pdf-app v-if="menu !== ''" style="height: 100vh;" :pdf="menu"></vue-pdf-app>
              <v-card-text v-if="menu === ''">
                <p> No hay un menú disponible</p>
              </v-card-text>
            </v-card>
          </v-col>

          
          
        </v-row>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>


</template>

<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { baseUrl } from '../env/env-variables';
import { ref } from 'vue';
import VuePdfApp from "vue3-pdf-app";
import { computed } from 'vue';

interface Reservation {
  clientName: string;
  clientPhone: string;
  date: string;
  reservationId: string;
}

let pageIsLoaded = ref(false);

let userName = ref("");
let restaurantName = ref("");
let email = ref("");
let phoneNumber = ref("");
let restaurantAddress = ref("");
let timeTable = ref("");
let category = ref("");
let selectedDays = ref("");
let startingHour = ref("");
let finishingHour = ref("");
let profilePhoto = ref("");
let pictures = ref<string[]>([]);
let hours = ref("");
let nextReservationsFlag = ref(false);
let nextReservations = ref<Reservation[]>([]);
let menu = ref("");

async function getRestaurant() {
  pageIsLoaded.value = false;
  const authStore = useAuthStore();
  if (authStore.user) {
  if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.get(`${baseUrl}restaurants/?token=${userToken}&userName=${authStore.user.username}`)
      if (response.data.code === 0) {
        userName.value = response.data.message.userName;
        restaurantName.value = response.data.message.restaurantName;
        email.value = response.data.message.email;
        phoneNumber.value = response.data.message.phoneNumber;
        restaurantAddress.value = response.data.message.restaurantAddress;
        timeTable.value = response.data.message.timeTable;
        category.value = response.data.message.category;

        selectedDays.value = response.data.message.timeTable[0].selectedDays;
        startingHour.value = response.data.message.timeTable[0].startingHour;
        finishingHour.value = response.data.message.timeTable[0].finishingHour;
        hours.value = startingHour.value + " - " + finishingHour.value;
        menu.value = response.data.message.menu;

        pictures.value = response.data.message.pictures;
        let reservations = response.data.message.nextReservations;

        if (response.data.message.nextReservations.length > 0) {
          nextReservationsFlag.value = true
          for (let i in reservations) {
            
            const response = await axios.get(`${baseUrl}reservations/?id=${reservations[i]}`);
            
            if (response.data.code === 0) {
              const fecha = new Date(response.data.message.day);

              // Formatear las horas y minutos con ceros iniciales
              const horaFormateada = fecha.getHours().toString().padStart(2, '0');
              const minutoFormateado = fecha.getMinutes().toString().padStart(2, '0');

              const fechaString = fecha.getDate().toLocaleString() + "/" + (fecha.getMonth() + 1).toLocaleString() + "/" + fecha.getFullYear().toLocaleString() + " " + horaFormateada + ":" + minutoFormateado;

              const newReservation: Reservation = {
                clientName: response.data.message.clientName as string,
                clientPhone: response.data.message.clientPhone as string,
                date: fechaString as string ,
                reservationId: reservations[i] as string
              }
              nextReservations.value.push(newReservation);
            } else {
              console.log("Error al obtener las reservas");
              // allInfoIsLoaded.value = 2;
            }
          }
        } 
        

        if (authStore.getProfilePhoto() === " " || authStore.getProfilePhoto() === null || authStore.getProfilePhoto() === "undefined") {
          profilePhoto.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        } else {
          // Reducir tamaño de la imagen
          profilePhoto.value = authStore.getProfilePhoto() as string;
        }

        //pictures
        if(pictures.value.length === 0) {
          pictures.value = [];
          pictures.value[0] = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
        }
        pageIsLoaded.value = true;
      } else {
        authStore.logout();
      }

  } else {
    authStore.logout();
  }
  } else {
    authStore.logout();
  }

}

const itemsPerPage = 3;

// Paginación de las próximas reservas
const currentPageNextReservations = ref(1);

const paginatedNextReservations = computed(() => {
  const startIndex = (currentPageNextReservations.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return nextReservations.value?.slice(startIndex, endIndex);
})

const totalPagesNextReservations = computed(() => {
  if (nextReservationsFlag.value === true) {
    return Math.ceil(nextReservations.value.length / itemsPerPage);
  }
  return 0;
});

const changePage = (page: number) => {
  currentPageNextReservations.value = page
}

getRestaurant();
</script>
