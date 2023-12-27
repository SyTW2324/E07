
<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    <v-container>
      <v-container class="d-flex align-center justify-center">
        <h1>Mi perfil</h1>
      </v-container>

      <v-container class="d-flex align-center justify-center">
        <v-col>
          <v-container>
            <v-avatar size="30%" color="grey">
              <img :src="profilePhoto" alt="Imagen" style="width: 100%; height: 100%; object-fit: cover; display: block; margin: 0 auto;" />
            </v-avatar>
  
            <p>Nombre: {{ name }}</p>
            <p>Apellidos: {{ surname }}</p>
            <p>Dirección: {{ address }}</p>
            <p>Correo: {{ email }}</p>
            <p>Nombre de usuario: {{ username }}</p>
            <p>Telefono: {{ phoneNumber }}</p>
  
          </v-container>
          <v-btn color="teal">Editar</v-btn>
        </v-col>
  
        <v-col>
          <v-container>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>Mis próximas reservas</v-title>
              <v-card-item v-if="nextReservationsFlag == false">No tienes reservas</v-card-item>
              <v-card-item v-else v-for="(reservation, index) in paginatedNextReservations" :key="index" cols="12" md="4">
                <p>Restaurante: {{ reservation.restaurant }} || Fecha: {{reservation.date}} <v-btn @click="cancelReservation(reservation.reservationId)" color="white">Cancelar</v-btn></p>
              </v-card-item>
            </v-card>
          </v-container>
          <v-container v-if = "nextReservationsFlag == true">
            <v-row>
              <v-col cols="12">
                <v-pagination v-model="currentPageNextReservations" :length="totalPagesNextReservations" @input="changePage" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
  
        <v-col>
          <v-container>
            <v-card max-width="50%" elevation="40%" color="teal" density="compact">
              <v-title>Mis reservas anteriores</v-title>
              <v-card-item v-if="historicReservationsFlag == false">No tienes reservas anteriores</v-card-item>
              <v-card-item v-else v-for="(reservation, index) in paginatedHistoricReservations" :key="index" cols="12" md="4">
                <p>Restaurante: {{ reservation.restaurant }} || Fecha: {{reservation.date}}</p>
              </v-card-item>
            </v-card>
          </v-container>
          <v-container v-if = "historicReservationsFlag == true">
            <v-row>
              <v-col cols="12">
                <v-pagination v-model="currentPageHistoricReservations" :length="totalPagesHistoricReservations" @input="changePageHistoricReservations" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-container>
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
import router from '../router';
import { computed } from 'vue';

interface Reservation {
  restaurant: string;
  date: string;
  reservationId: string;
}

let username = ref("");
let name = ref("");
let surname = ref("");
let email = ref("");
let phoneNumber = ref("");
let address = ref("");
let profilePhoto = ref("");
let nextReservationsFlag = ref(false);
let historicReservationsFlag = ref(false);

let nextReservations = ref<Reservation[]>([]);
let historicReservations = ref<Reservation[]>([]);

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

// Paginación de las reservas anteriores
const currentPageHistoricReservations = ref(1);

const paginatedHistoricReservations = computed(() => {
  const startIndex = (currentPageHistoricReservations.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return historicReservations.value?.slice(startIndex, endIndex);
})

const totalPagesHistoricReservations = computed(() => {
  if (historicReservationsFlag.value === true) {
    return Math.ceil(historicReservations.value.length / itemsPerPage);
  }
  return 0;
});

const changePageHistoricReservations = (page: number) => {
  currentPageHistoricReservations.value = page
}

async function getUser() {
  const authStore = useAuthStore();
  console.log("dentro de getUser");
  if (authStore.user) {
  if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.get(`${baseUrl}users/?token=${userToken}&userName=${authStore.user.username}`)
      console.log(response);
      if (response.data.code === 0) {
        username.value = response.data.message.userName;
        name.value = response.data.message.name;
        surname.value = response.data.message.surname;
        email.value = response.data.message.email;
        phoneNumber.value = response.data.message.phoneNumber;
        address.value = response.data.message.address;
        let reservations = response.data.message.nextReservations;
        if (response.data.message.nextReservations.length > 0) {
          nextReservationsFlag.value = true
          console.log("dentro de nextReservations");
          console.log(response.data.message.nextReservations);
          console.log(reservations)
          for (let i in reservations) {
            const response = await axios.get(`${baseUrl}reservations/?id=${reservations[i]}`);
            if (response.data.code === 0) {
              const date = new Date(response.data.message.day);
              //pasar la fecha a string
              const dateString = date.getDate().toLocaleString() + "/" + (date.getMonth() + 1).toLocaleString() + "/" + date.getFullYear().toLocaleString() + " " + date.getHours().toLocaleString() + ":" + date.getMinutes().toLocaleString();
              
              

              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: dateString as string ,
                reservationId: reservations[i] as string
              }
              nextReservations.value.push(newReservation);
            } else {
              console.log("Error al obtener las reservas");
            }
          }
        } 
        if (response.data.message.historicReservations.length > 0) {
          historicReservationsFlag.value = true;
          for (let i in response.data.message.historicReservations) {
            const response = await axios.get(`${baseUrl}reservations/?id=${i}`);
            if (response.data.code === 0) {
              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: response.data.message.date as string,
                reservationId: i as string
              }
              historicReservations.value.push(newReservation);
            } else {
              console.log("Error al obtener las reservas");
            }
          }
        }

        if (authStore.getProfilePhoto() === " ") {
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

getUser();

async function cancelReservation(reservationId: string) {
  try {
    console.log("dentro de cancelReservation");
    const authStore = useAuthStore();
    if (authStore.user) {
    if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.delete(`${baseUrl}reservations/?token=${userToken}&userName=${authStore.user.username}&reservationId=${reservationId}`)
      if (response.data.code === 0) {
        console.log("Reserva cancelada");
        // Recargar la página
        router.push({ name: 'home-base' });
        
      }
    } else {
      authStore.logout();
    }
    } else {
    authStore.logout();
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        const response = error.response;
        if (response.status === 400 || response.status === 404 || response.status === 500) {
          console.log(response.data.message);
        } else {
          console.error('Error al realizar la solicitud:', error.message);
        }
    } else {
        console.error('Error al realizar la solicitud');
    }
      
  }
}
  

</script>


