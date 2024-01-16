
<template>

<v-app>
  <Barnav></Barnav>
  
  <v-main v-if="allInfoIsLoaded == 0" >
    <v-container class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
      <v-progress-circular
        indeterminate
        size="150" 
        color="teal"
        >
      </v-progress-circular> 
    </v-container>
  </v-main>

  <v-main v-if="allInfoIsLoaded == 1">

      <v-container>
        <div>
          <v-container class="d-flex align-center justify-center" >
            <h1>Mi Perfil</h1>
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
                <p><strong>Nombre: </strong>{{ name }}</p>
                <p><strong>Apellidos: </strong>{{ surname }}</p>
                <p><strong>Dirección: </strong>{{ address }}</p>
                <p><strong>Correo: </strong>{{ email }}</p>
                <p><strong>Nombre de usuario: </strong>{{ username }}</p>
                <p><strong>Telefono: </strong>{{ phoneNumber }}</p>
                <br>
                <router-link to="/edit-user-profile">
                  <v-btn id="editarPerfilUsuario" color="teal">Editar perfil</v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container>
      <br>
      <div>
        <v-container>
          <v-row >
              <v-col col="50">
                <v-card max-width="75%" elevation="16" color="teal" density="compact">
                  <h2>Mis próximas reservas</h2>
                  <v-card-item v-if="nextReservationsFlag == false">No tienes reservas</v-card-item>
                  <v-card-item v-else v-for="(reservation, index) in paginatedNextReservations" :key="index" cols="12">
                    <p><strong>Restaurante: </strong>{{ reservation.restaurant }}</p>
                    <p><strong>Fecha: </strong>{{ reservation.date }} </p>
                    <p><v-btn @click="cancelReservation(reservation.reservationId)" color="white">Cancelar</v-btn></p>
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
      
              <v-col cols="40">
                  <v-card max-width="75%" elevation="16" color="teal" density="compact">
                    <h2>Mis reservas anteriores</h2>
                    <v-card-item v-if="historicReservationsFlag == false">No tienes reservas anteriores</v-card-item>
                    <v-card-item v-else v-for="(reservation, index) in paginatedHistoricReservations" :key="index" cols="12">
                      <p><strong>Restaurante: </strong>{{ reservation.restaurant }}</p>
                      <p><strong>Fecha: </strong>{{ reservation.date }} </p>
                    </v-card-item>
                  </v-card>
                  <v-container v-if="historicReservationsFlag == true">
                    <v-row>
                      <v-col cols="12">
                        <v-pagination v-model="currentPageHistoricReservations" :length="totalPagesHistoricReservations" @input="changePageHistoricReservations" />
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
import router from '../router';
import { computed } from 'vue';

interface Reservation {
  restaurant: string;
  date: string;
  reservationId: string;
}

let allInfoIsLoaded = ref(0); // 0 = no cargado, 1 = cargado, 2 = error

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
  if (authStore.user) {
  if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.get(`${baseUrl}users/?token=${userToken}&userName=${authStore.user.username}`)
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
            const response = await axios.get(`${baseUrl}reservations/?id=${reservations[i]}`);
            
            if (response.data.code === 0) {
              const fecha = new Date(response.data.message.day);

              // Formatear las horas y minutos con ceros iniciales
              const horaFormateada = fecha.getHours().toString().padStart(2, '0');
              const minutoFormateado = fecha.getMinutes().toString().padStart(2, '0');

              const fechaString = fecha.getDate().toLocaleString() + "/" + (fecha.getMonth() + 1).toLocaleString() + "/" + fecha.getFullYear().toLocaleString() + " " + horaFormateada + ":" + minutoFormateado;             

              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: fechaString as string ,
                reservationId: reservations[i] as string
              }
              nextReservations.value.push(newReservation);
            } else {
              allInfoIsLoaded.value = 2;
            }
          }
        } 
        if (response.data.message.historicReservations.length > 0) {
          historicReservationsFlag.value = true
          reservations = response.data.message.historicReservations;
          for (let i in reservations) {
            const response = await axios.get(`${baseUrl}reservations/?id=${reservations[i]}`);
            if (response.data.code === 0) {
              const fecha = new Date(response.data.message.day);

              // Formatear las horas y minutos con ceros iniciales
              const horaFormateada = fecha.getHours().toString().padStart(2, '0');
              const minutoFormateado = fecha.getMinutes().toString().padStart(2, '0');

              const fechaString = fecha.getDate().toLocaleString() + "/" + (fecha.getMonth() + 1).toLocaleString() + "/" + fecha.getFullYear().toLocaleString() + " " + horaFormateada + ":" + minutoFormateado;

              const newReservation: Reservation = {
                restaurant: response.data.message.restaurant as string,
                date: fechaString as string ,
                reservationId: reservations[i] as string
              }
              historicReservations.value.push(newReservation);
            } else {
              allInfoIsLoaded.value = 2;
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
      if (allInfoIsLoaded.value === 2) {
        router.push({ name: '404' });
      }
      allInfoIsLoaded.value = 1;
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
        window.location.reload();
        
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


