
<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    <div>
      <v-container class="d-flex align-center justify-center" >
        <h1>Mi perfil</h1>
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
            <p>Nombre: {{ name }}</p>
            <p>Apellidos: {{ surname }}</p>
            <p>Dirección: {{ address }}</p>
            <p>Correo: {{ email }}</p>
            <p>Nombre de usuario: {{ username }}</p>
            <p>Telefono: {{ phoneNumber }}</p>
            <br />
            <v-btn color="teal">Editar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <br>
    <div>
      <v-container class="d-flex align-center justify-center">
        <v-row align-content="stretch" >
          <v-col v-if="nextReservationsFlag == false">
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Mis próximas reservas
              </v-title>
              <v-card-item >
                No tienes resevas
              </v-card-item>
            </v-card>
          </v-col>
          <v-col v-else>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Mis próximas reservas
              </v-title>
              <v-card-item v-for="reservation in nextReservations">
                <p>Restaurante: {{ reservation.restaurant }} || Fecha: {{reservation.date}} </p>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Mis reservas anteriores
              </v-title>
              <v-card-item v-if="historicReservationsFlag == false">
                No tienes resevas anteriores
              </v-card-item>
            </v-card>
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
import Reservation from './Reservation.vue';

interface Reservation {
  restaurant: string;
  date: string;
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

        // prueba
        // nextReservationsFlag.value = true;
        // const newReservation: Reservation = {
        //   restaurant: "restaurante",
        //   date: "24/12/2023 23:00"
        // }
        // nextReservations.value.push(newReservation);

        // const newReservation2: Reservation = {
        //   restaurant: "restaurante2",
        //   date: "24/12/2023 23:00"
        // }
        // nextReservations.value.push(newReservation2);
        if (response.data.message.nextReservations.length > 0) {
          nextReservationsFlag.value = true
          for (let i in response.data.message.nextReservations) {
            const response = await axios.get(`${baseUrl}reservations/?id=${i}`);
            if (response.data.code === 0) {
              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: response.data.message.date as string
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
                date: response.data.message.date as string
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
</script>