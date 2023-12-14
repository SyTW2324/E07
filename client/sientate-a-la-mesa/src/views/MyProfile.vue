
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
          <v-col>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Mis próximas reservas
              </v-title>
              <v-card-item>
                Reserva 1
              </v-card-item>
              <v-card-item>
                Reserva 2
              </v-card-item>
              <v-card-item>
                Reserva 3
              </v-card-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Mis reservas anteriores
              </v-title>
              <v-card-item>
                Reserva 1
              </v-card-item>
              <v-card-item>
                Reserva 2
              </v-card-item>
              <v-card-item>
                Reserva 3
              </v-card-item>
            </v-card>
          </v-col>
          <v-col>
            <v-card max-width="344" elevation="16" color="teal" density="compact">
              <v-title>
                Buzón de notificaciones
              </v-title>
              <v-card-item>
                Notificación 1
              </v-card-item>
              <v-card-item>
                Notificación 2
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

let username = ref("");
let name = ref("");
let surname = ref("");
let email = ref("");
let phoneNumber = ref("");
let address = ref("");

let profilePhoto = ref("");


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