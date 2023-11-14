
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
              v-model="email"
              :rules="emailRules"
              label="Correo electrónico*"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Teléfono*"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              label="Nombre de usuario*"
              v-model="username"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Contraseña*"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
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

        <v-btn type="submit" color="primary">Enviar</v-btn>

        </v-container>
      </v-form>

      <v-alert v-if="!valid" type="error">
        Por favor, corrija los errores en el formulario.
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

//CORS
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  export default {
    data: () => ({
      valid: true,
      firstname: '',
      lastname: '',
      username: '',
      address: '',
      profilePhoto: [],
      nameError: '',
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
        
        console.log('Formulario inválido. Por favor, corrija los errores.');
      }
    },

    async RegisterUserApi() {
      try {
        // Realiza la llamada a la API utilizando Axios
        //   "name": "John",
        //   "surname": "Doe",
        //   "userName": "johndoe10",
        //   "password": "MiContraseña1",
        //   "email": "john10@example.es",
        //   "phoneNumber": "123456789",
        //   "address": "123 Main St",
        //   "profilePhoto": null
        // }
        // const newUserJson = {
        //   name: this.firstname,
        //   surname: this.lastname,
        //   userName: this.username,
        //   password: this.password,
        //   email: this.email,
        //   phoneNumber: this.phone,
        //   address: this.address,
        //   profilePhoto: null,
        // };
        //const response = await axios.post('http://10.6.128.143:3000/users/', newUserJson);
        const response = await axios.get('http://10.6.128.143:3000/users/');
        console.log('Datos obtenidos de la API', response.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
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
  },
  };
</script>