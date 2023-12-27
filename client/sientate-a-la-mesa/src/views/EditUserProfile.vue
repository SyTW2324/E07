
<template>

<v-app>
  <Barnav></Barnav>
  <v-main v-if="allInfoIsLoaded == 0">
    <v-container v-if="allInfoIsLoaded == 0" class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
          <v-progress-circular
          indeterminate
          size="150" 
          color="teal"></v-progress-circular> 
    </v-container>
  </v-main>
  <v-main v-if="allInfoIsLoaded == 1">
    <v-container class="d-flex align-center justify-center">
      <h1>Editar perfil</h1>
    </v-container>

    <v-container v-if="allInfoIsLoaded == 1">
        <v-form @submit.prevent="submitForm">
          <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                id="firstname"
                v-model="name"
                label="Nombre"
                readonly
                outlined
                @mouseover="onmouseover('firstname')"
                :value="name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="lastname"
                v-model="surname"
                label="Apellidos"
                readonly
                outlined
                @mouseover="onmouseover('lastname')"
                :value="surname"
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="email"
                v-model="email"
                label="Correo electrónico"
                readonly
                outlined
                @mouseover="onmouseover('email')"
                :value="email"
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="phone"
                v-model="phoneNumber"
                label="Teléfono"
                readonly
                outlined
                @mouseover="onmouseover('phone')"
                :value="phoneNumber"
              ></v-text-field>
            </v-col>
  
            <!-- <v-col cols="12" md="4">
              <v-text-field
                id="username"
                label="Nombre de usuario*"
                v-model="username"
                hide-details
                required
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
              <v-text-field v-if="showPassword == false"
              id="password"
              v-model="password"
              :rules="passwordRules"
              label="Contraseña*"
              type="password"
              hide-details
              required
              ></v-text-field>
              <v-text-field v-else
              id="password"
              v-model="password"
              :rules="passwordRules"
              label="Contraseña*"
              type="text"
              hide-details
              required
              ></v-text-field>
              <v-btn @click="controlShowPassword" icon>
                <v-icon v-if="showPassword == false">mdi-eye</v-icon>
                <v-icon v-else>mdi-eye-off</v-icon>
              </v-btn>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="address"
                label="Calle*"
                v-model="address"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="4">
              <v-file-input
                label="Foto de perfil"
                v-model="profilePhoto"
                accept="image/*"
                placeholder="Seleccione una imagen"
              ></v-file-input>
            </v-col> -->
          </v-row>
  
          <!-- <v-btn id="enviarRegistroUsuario" @click="submitForm" color="primary">Enviar</v-btn> -->
  
          </v-container>
        </v-form>
  
  
      </v-container>
      <!-- <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        <v-alert v-if="!valid" type="warning" closable class="my-custom-alert">
          Por favor, corrija los errores en el formulario.
          <br>
          - Contraseña: La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
          <br>
          - Correo: El correo debe ser válido.
          <br>
          - Teléfono: El teléfono debe tener 9 dígitos.
        </v-alert>
  
        <v-alert v-if="!validUserName" type="error" closable class="my-custom-alert">
          El nombre de usuario ya existe elige otro.
        </v-alert>
  
        <v-alert v-if="!validEmail" type="error" closable class="my-custom-alert">
          El correo ya existe.
        </v-alert>
  
        <v-alert v-if="!validPhone" type="error" closable class="my-custom-alert">
          El teléfono ya existe.
        </v-alert>
  
        <v-alert v-if="userRegistered" type="success" closable class="my-custom-alert">
          Usuario registrado correctamente.
        </v-alert>
      </v-container> -->
      <v-container style="padding: 2em;">
        <v-card class="mx-auto my-custom-card-home"  color="red-accent-4" style=""> 
              <v-card-title> Página en desarrollo</v-card-title>
              <v-card-text>
                <p>Esta paǵina está en desarrollo, todavía no puedes editar tu perfil.</p>
                <p>Pronto estará disponible.</p>
              </v-card-text>
              <v-card-actions>
                <router-link to="/home-base">
                  <v-btn color="white" >Volver al inicio</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
        </v-container>
  </v-main>
  

  <Footer></Footer>
  
</v-app>

</template>


<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
import { ref } from 'vue';
import router from '../router';
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { baseUrl } from '../env/env-variables';

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
              allInfoIsLoaded.value = 2;
            }
          }
        } 
        if (response.data.message.historicReservations.length > 0) {
          historicReservationsFlag.value = true
          console.log("dentro de historicReservations");
          console.log(response.data.message.historicReservations);
          reservations = response.data.message.historicReservations;
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
              historicReservations.value.push(newReservation);
            } else {
              console.log("Error al obtener las reservas");
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

async function submitForm() {

}

function onmouseover(elementId: string) {
  const firstnameElement = document.getElementById(elementId);
  if (firstnameElement) {
    firstnameElement.style.cursor = 'not-allowed';
  }
}
</script>

