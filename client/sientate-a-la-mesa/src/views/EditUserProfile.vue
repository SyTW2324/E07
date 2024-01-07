
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
                label="Nombre"
                readonly
                outlined
                v-model="name"
                @mouseover="onmouseover('firstname')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="lastname"
                label="Apellidos"
                readonly
                outlined
                @mouseover="onmouseover('lastname')"
                v-model="surname"
              ></v-text-field>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="email"
                label="Correo electrónico"
                outlined
                v-model="modifiedEmail"
              ></v-text-field>
              <v-alert v-if="validEmail == false" type="warning" closable class="my-custom-alert">
                El correo debe ser válido.
              </v-alert>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="phone"
                label="Teléfono"
                outlined
                v-model="modifedPhoneNumber"
              ></v-text-field>
              <v-alert v-if="validPhone == false" type="warning" closable class="my-custom-alert">
                El teléfono debe tener 9 dígitos.
              </v-alert>
            </v-col>
  
            <v-col cols="12" md="4">
              <v-text-field
                id="username"
                label="Nombre de usuario"
                readonly
                outlined
                @mouseover="onmouseover('username')"
                v-model="username"
              ></v-text-field>
            </v-col>
            
            <v-col cols="12" md="4" class="d-flex align-center justify-space-between">
              <v-text-field v-if="showPassword == false"
              id="password"
              v-model="modifiedPassword"
              label="Contraseña"
              type="password"
              hide-details
              required
              @update="checkPassword"
              ></v-text-field>
              <v-text-field v-else
              id="password"
              v-model="modifiedPassword"
              label="Contraseña"
              type="text"
              hide-details
              required
              ></v-text-field>
              <v-btn @click="controlShowPassword" icon>
                <v-icon v-if="showPassword == false">mdi-eye</v-icon>
                <v-icon v-else>mdi-eye-off</v-icon>
              </v-btn>
              <v-alert v-if="validPassword == false" type="warning" closable class="my-custom-alert">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
              </v-alert>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                id="address"
                label="Calle"
                v-model="modifiedAddress"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" md="4">
              <v-file-input
                label="Foto de perfil"
                v-model="modifiedProfilePhoto"
                accept="image/*"
                placeholder="Seleccione una imagen"
                :multiple="false"
                :maxSize="1024*1024*4"
              ></v-file-input>
              <v-alert v-if="validProfilePhoto == false" type="warning" closable class="my-custom-alert">
                La foto de perfil debe tener un tamaño máximo de 4MB.
              </v-alert>
            </v-col> 
          </v-row>
  
          <v-btn id="enviarRegistroUsuario" @click="submitForm" color="primary">Guardar</v-btn>
  
          </v-container>
        </v-form>
  
  
      </v-container>
      <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
        

        <v-alert v-if="existEmail == true" type="error" closable class="my-custom-alert">
          El correo ya existe.
        </v-alert>
  
        <v-alert v-if="existPhone == true" type="error" closable class="my-custom-alert">
          El teléfono ya existe.
        </v-alert>
  
        <v-alert v-if="userRegistered == true" type="success" closable class="my-custom-alert">
          Perfil modificado correctamente.
        </v-alert>
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


// Flags
let allInfoIsLoaded = ref(0); // 0 = no cargado, 1 = cargado, 2 = error
let showPassword = ref(false);
let userRegistered = ref(false);

// Datos del usuario logueado
let username = ref("");
let name = ref("");
let surname = ref("");
let email = ref("");
let phoneNumber = ref("");
let address = ref("");

let password = ref(useAuthStore().getPassWord());






// Flags alertas
let validPassword = ref(true);
let validEmail = ref(true);
let validPhone = ref(true);
let validProfilePhoto = ref(true);

// Flags alertas atributos ya existentes
let existEmail = ref(false);
let existPhone = ref(false);

/// Datos modificados
let modifiedProfilePhoto = ref<File[]>([]);

let modifiedPassword = ref(useAuthStore().getPassWord());
let modifedPhoneNumber = ref("");
let modifiedEmail = ref("");
let modifiedAddress = ref("");

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

        modifiedEmail.value = response.data.message.email;
        modifedPhoneNumber.value = response.data.message.phoneNumber;
        modifiedAddress.value = response.data.message.address;
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

function checkPassword(): boolean {
  if (modifiedPassword.value && modifiedPassword.value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(modifiedPassword.value)) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(): boolean {
  if ((/.+@.+\..+/).test(modifiedEmail.value)) {
    return true;
  } else {
    return false;
  }
}

async function submitForm() {

  try {
  // Inicialiación de flags
  validPassword.value = true;
  validEmail.value = true;
  validPhone.value = true;
  validProfilePhoto.value = true;
  existEmail.value = false;
  existPhone.value = false;

  // Usuario modificado
  let modifiedUser = {}

  if (modifiedPassword.value !== password.value) {
    if (checkPassword()) {
      modifiedUser = {
        ...modifiedUser,
        password: modifiedPassword.value
      }
      validPassword.value = true;
    } else {
      validPassword.value = false;
      return
    }

  }

  if (modifiedEmail.value !== email.value) {
    if (checkEmail()) {
      modifiedUser = {
        ...modifiedUser,
        email: modifiedEmail.value
      }
      validEmail.value = true;
    } else {
      validEmail.value = false;
      return
    }
  }

  if (modifedPhoneNumber.value !== phoneNumber.value) {
    if ((/^\d{9}$/).test(modifedPhoneNumber.value)) {
      modifiedUser = {
        ...modifiedUser,
        phoneNumber: modifedPhoneNumber.value
      }
      validPhone.value = true;
    } else {
      validPhone.value = false;
      return
    }
  }

  if (modifiedAddress.value !== address.value) {
    modifiedUser = {
      ...modifiedUser,
      address: modifiedAddress.value
    }
  }

  if (modifiedProfilePhoto.value.length > 0) {
    if (modifiedProfilePhoto.value[0].size > (1024 * 1024 * 4)) {
      validProfilePhoto.value = false;
      return
    } else {
      validProfilePhoto.value = true;
      const base64: string  = await convertFileToBase64(modifiedProfilePhoto.value[0]) as string;
      console.log(base64);
      if (base64) {
        modifiedUser = {
          ...modifiedUser,
          profilePhoto: base64
        }
      }
    }
    
  }

  const response = await axios.put(`${baseUrl}users/?token=${useAuthStore().getToken()}&userName=${useAuthStore().user.username}`, modifiedUser);

  if (response.data.code === 0) {
    userRegistered.value = true;
    await useAuthStore().reLogin(username.value, modifiedPassword.value);
    router.push('/my-profile');
  }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response;

      if (response.status === 400) {
        if (response.data.code === 3) {
          existEmail.value = true;
        } else if (response.data.code === 4) {
          existPhone.value = true;
        } else {
          console.error('Error al realizar la solicitud:', error.message);

        }
      } else {
        console.error('Error al realizar la solicitud:', error.message);
        // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
      } 
    } else {
      console.error('Error al realizar la solicitud');
      // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
    }
  }
}

async function convertFileToBase64(file: File){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload =  () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
  
function onmouseover(elementId: string) {
  const firstnameElement = document.getElementById(elementId);
  if (firstnameElement) {
    firstnameElement.style.cursor = 'not-allowed';
  }
}

function controlShowPassword() {
  showPassword.value = !showPassword.value;
}
</script>

