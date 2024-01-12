
<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
      <h1>Registro de usuario</h1>
    </v-container>

    <v-container>

      <v-form @submit.prevent="submitForm">
        <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              id="firstname"
              v-model="firstname"
              :rules="nameRules"
              label="Nombre*"
              required
              hide-details
              @input="nameAlert = false"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              id="lastname"
              v-model="lastname"
              :rules="lastnameRules"
              label="Apellidos*"
              hide-details
              required
              @input="surnameAlert = false"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              id="email"
              v-model="email"
              :rules="emailRules"
              label="Correo electrónico*"
              hide-details
              required
              @input="emailAlert = false; existEmail = true; validEmail = true"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              id="phone"
              v-model="phone"
              :rules="phoneRules"
              label="Teléfono*"
              hide-details
              required
              @input="phoneAlert = false; existPhone = true; validPhone = true"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              id="username"
              label="Nombre de usuario*"
              v-model="username"
              :rules="usernameRules"
              hide-details
              required
              @input="usernameAlert = false; existUserName = true; validUserName = true"
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
            @input="passwordAlert = false; existPassword = true; validPassword = true"
            ></v-text-field>
            <v-text-field v-else
            id="password"
            v-model="password"
            :rules="passwordRules"
            label="Contraseña*"
            type="text"
            hide-details
            required
            @input="passwordAlert = false; existPassword = true; validPassword = true"
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
              :rules="addressRules"
              hide-details
              required
              @input="addressAlert = false"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="4">
            <v-file-input
              label="Foto de perfil (límite 2MB)"
              v-model="profilePhoto"
              :multiple="false"
              :maxSize="1024*1024*2"
              :rules="photoRules"
              accept="image/*"
              placeholder="Seleccione una imagen"
              @input="profilePhotoAlert = false; validPhoto = true"
            ></v-file-input>
          </v-col>

        </v-row>

        <v-btn id="enviarRegistroUsuario" @click="submitForm" color="primary">Enviar</v-btn>

        </v-container>
      </v-form>
      <v-container v-if="processingRegister == true" class="d-flex align-center justify-center" style="padding-top: 1em; padding-bottom: 1em;">
        <v-progress-circular
          indeterminate
          size="50" 
          color="teal"
          >
        </v-progress-circular> 
      </v-container>

    </v-container>
    <v-container class="align-center justify-center">
      <v-alert v-if="nameAlert == true" type="warning" closable class="my-custom-alert2">
        El nombre es obligatorio.
      </v-alert>

      <v-alert v-if="surnameAlert == true" type="warning" closable class="my-custom-alert2">
        El apellido es obligatorio.
      </v-alert>

      <v-alert v-if="emailAlert == true" type="warning" closable class="my-custom-alert2">
        <p v-if="existEmail == false">El correo es obligatorio.</p>
        <p v-if="validEmail == false">El correo debe ser válido.</p>
      </v-alert>

      <v-alert v-if="phoneAlert == true" type="warning" closable class="my-custom-alert2">
        <p v-if="existPhone == false">El teléfono es obligatorio.</p>
        <p v-if="validPhone == false">El teléfono debe tener 9 dígitos.</p>
      </v-alert>

      <v-alert v-if="addressAlert == true" type="warning" closable class="my-custom-alert2">
        La dirección es obligatoria.
      </v-alert>

      <v-alert v-if="passwordAlert == true" type="warning" closable class="my-custom-alert2">
        <p v-if="existPassword == false">La contraseña es obligatoria.</p>
        <p v-if="validPassword == false">La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.</p>
      </v-alert>

      
      <v-alert v-if="usernameAlert == true" type="warning" closable class="my-custom-alert2">
        <p v-if="validUserName == false">El nombre de usuario no puede contener espacios.</p>
        <p v-if="validUserName == true">El nombre de usuario es obligatorio.</p>
      </v-alert>
      
      <v-alert v-if="profilePhotoAlert == true" type="warning" closable class="my-custom-alert2">
        La foto de perfil no puede superar los 2MB.
      </v-alert>

      <v-alert v-if="repeatedUserName == true" type="error" closable class="my-custom-alert2">
        El nombre de usuario ya existe elige otro.
      </v-alert>

      <v-alert v-if="repeatedEmail == true" type="error" closable class="my-custom-alert2">
        El correo ya existe.
      </v-alert>

      <v-alert v-if="repeatedPhone == true" type="error" closable class="my-custom-alert2">
        El teléfono ya existe.
      </v-alert>

      <v-alert v-if="userRegistered" type="success" closable class="my-custom-alert2">
        Usuario registrado correctamente.
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
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { baseUrl } from '../env/env-variables';

let firstname = ref('');
let lastname = ref('');
let username = ref(''); 
let email = ref('');
let phone = ref('');
let address = ref('');
let password = ref('');
let profilePhoto = ref<File[]>([]);

// Flags procesamiento
let processingRegister = ref(false);
let valid = ref(true);
let userRegistered = ref(false);
let showPassword = ref(false);

// Flags campos obligatorios
let existEmail = ref(true);
let existPhone = ref(true);
let existPassword = ref(true);
let existUserName = ref(true);

// Flags validez de campos
let validPassword = ref(true);
let validUserName = ref(true);
let validEmail = ref(true);
let validPhone = ref(true);
let validPhoto = ref(true);

// Flags alertas
let nameAlert = ref(false);
let surnameAlert = ref(false);
let emailAlert = ref(false);
let phoneAlert = ref(false);
let addressAlert = ref(false);
let passwordAlert = ref(false);
let profilePhotoAlert = ref(false);
let usernameAlert = ref(false);

// Flags valores repetidos
let repeatedUserName = ref(false);
let repeatedEmail = ref(false);
let repeatedPhone = ref(false);



// Rules
const nameRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {

      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a nameRules

const lastnameRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a lastnameRules

const usernameRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
  (value: string) => {
    if (value.indexOf(' ') === -1){
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a usernameRules

const emailRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) {
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a emailRules

const phoneRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
  (value: string) => {
    if (/^\d{9}$/.test(value)) {
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a phoneRules

const passwordRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
  (value: string) => {
    if (value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(value)) {
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a passwordRules


const addressRules = [
  (value: string) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  },
] as ((value: string) => true | false)[]; // Asigna un tipo a addressRules

const photoRules = [
  (value: File) => {
    const fileSize = value.size;
    const maxFileSize = 2 * 1024 * 1024; // 2 MB
    if (fileSize > maxFileSize) {
      return false;
    } else {
      return true;
    }
  },
] as ((value: File) => true | false)[]; // Asigna un tipo a photoRules

// Methods
function controlShowPassword() {
  showPassword.value = !showPassword.value;
}

async function submitForm() {
    // Inicializa las variables de error
  nameAlert.value = false;
  surnameAlert.value = false;
  emailAlert.value = false;
  phoneAlert.value = false;
  addressAlert.value = false;
  passwordAlert.value = false;
  profilePhotoAlert.value = false;
  usernameAlert.value = false;

  const isValid = validateForm();

  if (isValid) {

    await RegisterUserApi();
  } else {

    valid.value = false;
    console.error('Formulario inválido. Por favor, corrija los errores.');
  }
}

async function convertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
}

async function RegisterUserApi() {
  try {

  // Inicializa las variables de error
  nameAlert.value = false;
  surnameAlert.value = false;
  emailAlert.value = false;
  phoneAlert.value = false;
  addressAlert.value = false;
  passwordAlert.value = false;
  profilePhotoAlert.value = false;
  usernameAlert.value = false;
  repeatedUserName.value = false;
  repeatedEmail.value = false;
  repeatedPhone.value = false;



  //const formDataPhoto = new FormData();
  let photoBase64: string = ' ';
  if (profilePhoto.value.length > 0) {
    photoBase64 = await convertFileToBase64(profilePhoto.value[0]) as string;
  }

  const newUserJson = {
    name: firstname.value,
    surname: lastname.value,
    userName: username.value,
    password: password.value,
    email: email.value,
    phoneNumber: phone.value,
    address: address.value,
    profilePhoto: photoBase64,
  };
  processingRegister.value = true;

  const response = await axios.post(`${baseUrl}users/`, newUserJson);

  processingRegister.value = false;

  if (response.status === 201) {
    
    userRegistered.value= true;

    const authStore = useAuthStore();
    return authStore.login(username.value, password.value).catch(error => console.error(error));
    
  }
  } catch (error) {
  processingRegister.value = false;
  if (axios.isAxiosError(error) && error.response) {
  const response = error.response;

  if (response.status === 400) {
    if (response.data.code === 1) {
    console.error('Faltan campos obligatorios');
    } else if (response.data.code === 2) {
    console.error('El nombre de usuario ya existe');
    repeatedUserName.value = true;

    } else if (response.data.code === 3) {
    console.error('El correo ya existe');
    repeatedEmail.value = true;

    } else if (response.data.code === 4) {
    console.error('El teléfono ya existe');
    repeatedPhone.value = true;

    }
  } else {
  console.error('Error al realizar la solicitud:', error.message);

  }
  }

  }
}

function validateForm(): boolean {
  if (firstname.value) {
    nameAlert.value = false;
  } else {
    nameAlert.value = true;
  }

  if (lastname.value) {
    surnameAlert.value = false;
  } else {
    surnameAlert.value = true;
  }

  if (email.value) {
    if (emailIsvValid(email.value)) {
      emailAlert.value = false;
    } else {
      validEmail.value = false;
      emailAlert.value = true;
    }
  } else {
    existEmail.value = false;
    emailAlert.value = true;
  }

  if (phone.value) {
    if (phoneIsValid(phone.value)) {
      phoneAlert.value = false;
    } else {
      validPhone.value = false;
      phoneAlert.value = true;
    }
  } else {
    existPhone.value = false;
    phoneAlert.value = true;
  }

  if (address.value) {
    addressAlert.value = false;
  } else {
    addressAlert.value = true;
  }

  if (password.value) {
    if (passwordIsValid(password.value)) {
      passwordAlert.value = false;
    } else {
      validPassword.value = false;
      passwordAlert.value = true;
    }
  } else {
    existPassword.value = false;
    passwordAlert.value = true;
  }

  if (profilePhoto.value.length > 0) {
    if (photoIsValid(profilePhoto.value[0])) {
      profilePhotoAlert.value = false;
    } else {
      validPhoto.value = false;
      profilePhotoAlert.value = true;
    }
  } 

  if (username.value) {
    if (userNameIsValid(username.value)) {
      usernameAlert.value = false;
    } else {
      validUserName.value = false;
      usernameAlert.value = true;
    }
    existUserName.value = true;
  } else {
    existUserName.value = false;
    usernameAlert.value = true;
  }



  
  return !nameAlert.value && !surnameAlert.value && !emailAlert.value && !phoneAlert.value && !addressAlert.value && !passwordAlert.value && !profilePhotoAlert.value && !usernameAlert.value;

}


function emailIsvValid(value: string): boolean {
  if (/.+@.+\..+/.test(value)) {
    return true;
  } else {

    return false;
  }
}

function phoneIsValid(value: string): boolean {
  if (/^\d{9}$/.test(value)) {
    return true;
  } else {
    return false;
  }
}

function passwordIsValid(value: string): boolean {
  if (value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(value)) {
    return true;
  } else {
    return false;
  }
}

function userNameIsValid(value: string): boolean {
  if (!value.includes(' ')) {
    return true;
  } else {
    return false;
  }
}


function photoIsValid(value: File): boolean {
  const fileSize = value.size;
  const maxFileSize = 2 * 1024 * 1024; // 2 MB
  if (fileSize > maxFileSize) {
    return false;
  } else {
    return true;
  }
}


</script>