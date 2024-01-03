
<template>

  <v-app>
    <Barnav></Barnav>
    <v-main>
      <div>
        <v-container class="d-flex align-center justify-center" >
          <h1>Mi establecimiento</h1>
        </v-container>
      </div>
  
      <div>
        <v-container class="d-flex align-center justify-center">
          <v-row>
            <v-col class="d-flex align-center justify-center">
              <v-avatar size="200" color="grey" >
                <img :src="profilePhoto" alt="Imagen" style="width: 100%; height: 100%; object-fit: cover; display: block; margin: 0 auto;" />
              </v-avatar>
            </v-col>
            <v-col>
              <p><strong>Nombre del restaurante: </strong>{{ restaurantName }}</p>
              <p><strong>Nombre de usuario: </strong>{{ userName }}</p>
              <p><strong>Email: </strong>{{ email }}</p>
              <p><strong>Teléfono: </strong>{{ phoneNumber }}</p>
              <p><strong>Dirección: </strong>{{ restaurantAddress }}</p>
              <p><strong>Horario: </strong>{{ selectedDays }} | {{ hours }}</p>   
              <p><strong>Categoría: </strong>{{ category }}</p>
              <br/>
              <v-btn color="teal">Editar datos</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <br>
      <div>
        <v-container>
          <v-row>
            <v-col col="50">
              <v-card max-width="75%" elevation="16" color="teal" density="compact">
                <v-title>Mis próximas reservas</v-title>
                <v-card-item v-if="nextReservationsFlag == false">No tienes reservas</v-card-item>
                <v-card-item v-else v-for="(reservation, index) in paginatedNextReservations" :key="index" cols="12">
                  <p>Cliente: {{ reservation.client }} || Fecha: {{ reservation.date }} </p>
                </v-card-item>
              </v-card>
              <v-container v-if="nextReservationsFlag == true">
                <v-row>
                  <v-col cols="12">
                    <v-pagination v-model="currentPageNextReservations" :length="totalPagesNextReservations" @input="changePage" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col col="50">
              <v-card max-width="75%" elevation="16" color="teal" density="compact">
                <v-title>Histórico de reservas reservas</v-title>
                <v-card-item v-if="nextReservationsFlag == false">No tienes reservas</v-card-item>
                <v-card-item v-else v-for="(reservation, index) in paginatedNextReservations" :key="index" cols="12">
                  <p>Cliente: {{ reservation.client }} || Fecha: {{ reservation.date }} </p>
                </v-card-item>
              </v-card>
              <v-container v-if="nextReservationsFlag == true">
                <v-row>
                  <v-col cols="12">
                    <v-pagination v-model="currentPageNextReservations" :length="totalPagesNextReservations" @input="changePage" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
  import { computed } from 'vue';

  interface Reservation {
    client: string;
    date: string;
    reservationId: string;
  }

  
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
  let hours = ref("");
  let nextReservationsFlag = ref(false);
  let nextReservations = ref<Reservation[]>([]);

  
  
  async function getRestaurant() {
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
                client: response.data.message.client as string,
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