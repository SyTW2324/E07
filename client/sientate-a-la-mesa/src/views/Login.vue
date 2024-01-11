

<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue';
</script>

<script lang="ts">
import { useAuthStore } from '../stores/useAuthStore';

  export default {
    data: () => ({
      username: '',
      password: '',
      showPassword: false,
      loggedIn: true,
      serverError: false,
      requiredField: false,
      petitionSent: false,
    }),
    methods: {
      controlShowPassword(): void {
        this.showPassword = !this.showPassword;
      },
      async loginOne(): Promise<void> {
        try {
          this.requiredField = false;
          if (this.username === '' || this.password === '') {
            this.requiredField = true;
            return;
          }
          this.petitionSent = true;
          const authStore = useAuthStore();
          const result = await authStore.login(this.username, this.password);
          this.petitionSent = false;
          if (result.code) {
            if (result.code === 4 || result.code === 1) {
              this.loggedIn = false;
            } else if (result.code === 5){
              this.serverError = true;
            }         
          }
        }catch(error) {
          console.error('Error al iniciar sesión', error);
        }
      }
    },
  };
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main    >
   

    <v-container style="padding-top: 4em; text-align: center;">
      
      <h1 style="font-size: 3em; font-weight: bold; color: teal; border-bottom: 1px solid rgb(100, 100, 100);">Inicia Sesión</h1>
    
    </v-container>
    <v-container style="  display: flex; align-items: center;  justify-content: center; "  > 
      <img style=" max-width: 400px; max-height: 400px;" src="../img/icoWeb.png" alt="Logo"> 
    </v-container>

   <v-container >

      <v-card class="mx-auto px-6 py-8" max-width="400" style="padding: ;"    >
      <v-form
        
        @submit.prevent="loginOne"
      >
        <v-col class="d-flex align-center justify-space-between">
          <v-text-field
            name="username"
            v-model="username"
            class="mb-2"
            label="Usuario"
            placeholder="Introduce tu nombre de usuario"
            id="username"

          ></v-text-field>
        </v-col>
        <v-col class="d-flex align-center justify-space-between" >
          <v-text-field v-if="showPassword == false"
          id="password"
          v-model="password"
          label="Contraseña"
          type="password"
          hide-details
          required
          style="padding-right: 1em;"
          ></v-text-field>
          <v-text-field v-else
          id="password"
          v-model="password"
          label="Contraseña"
          type="text"
          hide-details
          required
          style="padding-right: 1em;"
          ></v-text-field>
          <v-btn  @click="controlShowPassword"  icon >
            <v-icon v-if="showPassword == false">mdi-eye</v-icon>
            <v-icon v-else>mdi-eye-off</v-icon>
          </v-btn>
        </v-col>

        <br>

        <v-btn
 
          block
          color="wihite"
          size="large"
          type="submit"
          id="loginButton"
          variant="elevated"
          v-if="petitionSent == false"
        >
          <p style="color: teal;">  Iniciar sesión</p>
        </v-btn>
          <v-btn
  
          block
          color="wihite"
          size="large"
          id="loginButtonLoading"
          variant="elevated"
          v-if="petitionSent == true"
        >
            <v-progress-circular
            indeterminate
            color="teal"
          ></v-progress-circular>
        </v-btn>
      </v-form>
        
      <br>

      <v-alert v-if="!loggedIn" type="warning" closable class="my-custom-alert">
        Nombre de usuario o contraseña incorrectos
      </v-alert>

      <v-alert v-if="serverError" type="error" closable class="my-custom-alert">
        Ha ocurrido un error en el servidor
      </v-alert>

      <v-alert v-if="requiredField" type="warning" closable class="my-custom-alert">
        Faltan campos obligatorios
      </v-alert>


      </v-card>
    </v-container>  

  </v-main>

  <Footer></Footer>
  
</v-app>

</template>





