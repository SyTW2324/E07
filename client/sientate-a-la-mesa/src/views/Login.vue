

<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main    >
   

    <v-container style="padding-top: 4em; text-align: center;">
      
      <h1 style="font-size: 3em; font-weight: bold; color: teal; border-bottom: 1px solid rgb(100, 100, 100);">Inicia Sesión</h1>
    
    </v-container>


   <v-container style="padding-top: 4em">

      <v-card class="mx-auto px-6 py-8" max-width="400" style="padding: ;"    >
      <v-form
        
        @submit.prevent="login"
      >
        
        <v-text-field
          v-model="username"
          class="mb-2"
          clearable
          label="User"
        ></v-text-field>

        <v-text-field
          v-model="password"

          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
 
          block
          color="wihite"
          size="large"
          type="submit"
          
          variant="elevated"
          
        >
          <p style="color: teal;">  Iniciar sesión</p>
        </v-btn>
      </v-form>
    
      
      </v-card>
    </v-container>  
       <v-alert v-if="!valid" type="error">
          Error! Usuario o contraseña incorrectos!.
        </v-alert>

    <v-container style="padding-top: 4em; text-align: center;">
      
      <router-link to="password-recovery" >
      <p >Olvidaste la contraseña?</p>
      </router-link>
    </v-container>  
    




  </v-main>

  <Footer></Footer>
  
</v-app>

</template>

<script lang="ts">

import axios from 'axios';

//CORS

  export default {
    data: () => ({
      valid: true,
      username: '',
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
      async login() {
        console.log(this.username);
        //mandar un get a la api con un json con el username y el password
        const data = await axios.get('http://localhost:3000/users', {
          params: {
            userName: this.username,
            password: this.password,
          },
        });
        console.log(data);
        //comprobar si devuelve el usuario es login correcto, si devuleve en el json un codigo 1 o 3 es invalido 
        if (data.data.code === 1 || data.data.code === 3) {
          //si es invalido mostrar un mensaje de error
          this.valid = false;
          
          console.log('Usuario o contraseña incorrectos');
        } else {
          console.log(data.data);
          //si es valido redirigir a la pagina de inicio
          this.$router.push('/home-base');
        }
      },
      validateForm() {
        // Lógica para validar cada campo según las reglas definidas
        // Devuelve true si el formulario es válido, false de lo contrario
        // También puedes actualizar el estado "valid" si es necesario

        this.passwordError = '';


        const isPasswordValid = this.passwordRules.every(rule => {
          const isValid = rule(this.password) === true;
          if (!isValid) this.passwordError = rule(this.password) as string;
          return isValid;
        });

        // Actualizar el estado "valid" si es necesario
        this.valid = isPasswordValid;

        return this.valid;
      },
    },
  };
</script>





