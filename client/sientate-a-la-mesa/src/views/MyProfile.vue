
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
                <p>Restaurante: {{ reservation.restaurant }} || Fecha: {{reservation.date}} <v-btn @click="cancelReservation(reservation.reservationId)" color="white">Cancelar</v-btn> </p> 
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
import router from '../router';

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

async function getUser() {
  const authStore = useAuthStore();
  if (authStore.user) {
  if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.get(`${baseUrl}users/?token=${userToken}&userName=${authStore.user.username}`)
      console.log(response.data);
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
          for (let i in reservations) {
            console.log("aqui");
            console.log(reservations[i]);
            console.log("aqui");
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
            }
          }
        } 
        if (response.data.message.historicReservations.length > 0) {
          historicReservationsFlag.value = true;
          let reservations = response.data.message.historicReservations;

          for (let i in reservations) {

            const response = await axios.get(`${baseUrl}reservations/?id=${reservations[i]}`);
            if (response.data.code === 0) {
              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: response.data.message.date as string,
                reservationId: i as string
              }
              historicReservations.value.push(newReservation);
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
    const authStore = useAuthStore();
    if (authStore.user) {
    if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.delete(`${baseUrl}reservations/?token=${userToken}&userName=${authStore.user.username}&reservationId=${reservationId}`)
      if (response.data.code === 0) {
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
          
          console.error('Error al realizar la solicitud:', response.data.message);
        } else {
          console.error('Error al realizar la solicitud:', error.message);
        }
    } else {
        console.error('Error al realizar la solicitud');
    }
      
  }
}
  

</script>


