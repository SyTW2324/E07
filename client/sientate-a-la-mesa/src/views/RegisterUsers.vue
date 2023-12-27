
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
              :counter="10"
              label="Nombre*"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              id="lastname"
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Apellidos*"
              hide-details
              required
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
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
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
          </v-col>

        </v-row>

        <v-btn id="enviarRegistroUsuario" @click="submitForm" color="primary">Enviar</v-btn>

        </v-container>
      </v-form>


    </v-container>
    <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
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
    </v-container>
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>

<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<!-- Está separado en dos scripts por el export defaults, en Footer ya hay uno y entra en conflicto con el nuevo export default -->
<script lang="ts">

import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { baseUrl } from '../env/env-variables';

//CORS
  // let validUserNameVar: boolean = true;
  // let validEmailVar: boolean = true;
  // let validPhoneVar: boolean = true;

  export default {
    data: () => ({
      valid: true,
      validUserName: true,
      validEmail: true,
      validPhone: true,
      userRegistered: false,
      firstname: '',
      lastname: '',
      username: '',
      address: '',
      profilePhoto: [],
      nameError: '',
      showPassword: false,
      nameRules: [
        (value: string) => {
          if (value) return true;

          return 'El nombre  y los apellidos son obligatorios.';
        },
      ] as ((value: string) => true | string)[], // Asigna un tipo a nameRules
      email: '',
      emailError: '',
      emailRules: [
        (value: string) => {
          if (value) return true;

          return 'El correo es obligatorio.';
        },
        (value: string) => {
          if (/.+@.+\..+/.test(value)) return true;

          return 'El correo debe ser válido.';
        },
      ] as ((value: string) => true | string)[], // Asigna un tipo a emailRules
      phone: '',
      phoneError: '',
      phoneRules: [
        (value: string) => {
          if (value) return true;

          return 'El teléfono es obligatorio.';
        },
        (value: string) => {
          if (/^\d{9}$/.test(value)) return true;

          return 'El teléfono debe tener 9 dígitos.';
        },
      ] as ((value: string) => true | string)[], // Asigna un tipo a phoneRules
      // Patrón de la contraseña [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one lowercase letter, one uppercase letter and one number' ],
      password: '',
      passwordError: '',
      passwordRules: [
        (value: string) => {
          if (value) return true;

          return 'La contraseña es obligatoria.';
        },
        (value: string) => {
          if (value.length >= 8 && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/).test(value)) return true;

          return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
        },
      ] as ((value: string) => true | string)[], // Asigna un tipo a passwordRules
    }),
    methods: {
    submitForm() {
      // Validar los campos del formulario
      const isValid = this.validateForm();

      if (isValid) {
        // Aquí puedes enviar el formulario, por ejemplo, hacer una llamada a la API
        console.log('Formulario válido. Enviar datos.');
        this.RegisterUserApi();
      } else {
        // al usuario debe mostrarle en la web el problema 
        // y no enviar el formulario hasta que no lo corrija
        this.valid = false;
        console.log('Formulario inválido. Por favor, corrija los errores.');
      }
    },
    controlShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async convertFileToBase64(file: File) {
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
    },

    async RegisterUserApi() {
      try {

        // Inicializa las variables de error
        this.validUserName = true;
        this.validEmail = true;
        this.validPhone = true;
        this.valid = true;
      

        console.log("foto", this.profilePhoto)


        //const formDataPhoto = new FormData();
        let photoBase64: string = ' ';
        if (this.profilePhoto.length > 0) {
          photoBase64 = await this.convertFileToBase64(this.profilePhoto[0]) as string;
        }
       
        console.log("photoBase64", photoBase64)
        const newUserJson = {
          name: this.firstname,
          surname: this.lastname,
          userName: this.username,
          password: this.password,
          email: this.email,
          phoneNumber: this.phone,
          address: this.address,
          profilePhoto: photoBase64,
        };
        console.log("newUserJson", newUserJson)
        const response = await axios.post(`${baseUrl}users/`, newUserJson);
       //const response = await axios.get('http://localhost:3000/users/');
        console.log('Datos obtenidos de la API', response.data);
        //Prueba de que la imagen se ha subido correctamente y luego se puede renderizar

        // Añade la imagen al contenedor
        if (response.status === 201) {
          //this.$router.push('/login');
          console.log('Usuario registrado correctamente');
          
          this.userRegistered = true;

          const authStore = useAuthStore();
          return authStore.login(this.username, this.password).catch(error => console.log(error));
          
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
        const response = error.response;

        if (response.status === 400) {
          if (response.data.code === 1) {
          console.error('Faltan campos obligatorios');
          } else if (response.data.code === 2) {
          console.error('El nombre de usuario ya existe');
          this.validUserName = false;

          } else if (response.data.code === 3) {
          console.error('El correo ya existe');
          this.validEmail = false;

          } else if (response.data.code === 4) {
          console.error('El teléfono ya existe');
          this.validPhone = false;

          }
        } else {
        console.error('Error al realizar la solicitud:', error.message);
        // Puedes manejar el error de manera adecuada, por ejemplo, mostrar un mensaje al usuario.
        }
        }

      }
    },

    validateForm() {
      // Lógica para validar cada campo según las reglas definidas
      // Devuelve true si el formulario es válido, false de lo contrario
      // También puedes actualizar el estado "valid" si es necesario
      this.nameError = '';
      this.emailError = '';
      this.phoneError = '';
      this.passwordError = '';
      const isNameValid = this.nameRules.every(rule => {
        const isValid = rule(this.firstname) === true;
        if (!isValid) this.nameError = rule(this.firstname) as string;
        return isValid;
      });

      const isEmailValid = this.emailRules.every(rule => {
        const isValid = rule(this.email) === true;
        if (!isValid) this.emailError = rule(this.email) as string;
        return isValid;
      });

      const isPhoneValid = this.phoneRules.every(rule => {
        const isValid = rule(this.phone) === true;
        if (!isValid) this.phoneError = rule(this.phone) as string;
        return isValid;
      });

      const isPasswordValid = this.passwordRules.every(rule => {
        const isValid = rule(this.password) === true;
        if (!isValid) this.passwordError = rule(this.password) as string;
        return isValid;
      });

      // Actualizar el estado "valid" si es necesario
      this.valid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid;

      return this.valid;
    },
    // validUserName() {
    //   if (validUserNameVar == false) {
    //     return false
    //   }
    // },
    // validEmail() {
    //   if (validEmailVar == false) {
    //     return false
    //   }
    // },
    // validPhone() {
    //   if (validPhoneVar == false) {
    //     return false
    //   }
    // },
  },
  };
</script>