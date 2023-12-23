
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
                <img :src="profilePicture" alt="Imagen" style="width: 100%; height: 100%; object-fit: cover; display: block; margin: 0 auto;" />
              </v-avatar>
            </v-col>
            <v-col>
              <p>Nombre del restaurante: {{ restaurantName }}</p>
              <p>Nombre de usuario: {{ userName }}</p>
              <p>Email: {{ email }}</p>
              <p>Teléfono: {{ phoneNumber }}</p>
              <p>Dirección: {{ restaurantAddress }}</p>
              <p>Horario: {{ selectedDays }} | {{ hours }}</p>   
              <p>Categoría: {{ category }}</p>
              <br />
              <v-btn color="teal">Editar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <br>
      <div  class="d-flex align-center justify-center">
        <v-container>
          <v-row >
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
  let profilePicture = ref("");
  let hours = ref("");
  
  async function getRestaurant() {
    const authStore = useAuthStore();
    console.log("dentro de getUser");
    if (authStore.user) {
    if (authStore.isExpired() === true) {
        const userToken = authStore.getToken();
        const response = await axios.get(`${baseUrl}restaurants/?token=${userToken}&userName=${authStore.user.username}`)
        console.log("response:", response);

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
          

          if (authStore.getProfilePhotoRestaurant() === " " || authStore.getProfilePhotoRestaurant() === null || authStore.getProfilePhotoRestaurant() === "undefined") {
            console.log("dentro de if");
            profilePicture.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
          } else {
            // Reducir tamaño de la imagen
            console.log("dentro de else");
            const photoUrl = authStore.getProfilePhotoRestaurant();
            console.log("URL de la foto de perfil:", photoUrl);

            profilePicture.value = authStore.getProfilePhotoRestaurant() as string;
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
  
  getRestaurant();
  </script>