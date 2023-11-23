
<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
//import { useAuthStore } from '../stores/useAuthStore';

// import { Form, Field } from 'vee-validate';
// import * as Yup from 'yup';

// import { useAuthStore } from '@/stores';

// const schema = Yup.object().shape({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required')
// });

let username: string = '';
let email: string = '';




// function loginOne() {
//     const authStore = useAuthStore();

//     return authStore.login(username, password)
//         .catch(error => console.log(error));
// }

</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main    >
   

    <v-container style="padding-top: 4em; text-align: center;">
      
      <h1 style="font-size: 3em; font-weight: bold; color: teal; border-bottom: 1px solid rgb(100, 100, 100);">Recuperación de contraseña</h1>
    
    </v-container>
    <v-container style="  display: flex; align-items: center;  justify-content: center; "  > 
      <img style=" max-width: 400px; max-height: 400px;" src="../img/icoWeb.png" alt="Logo"> 
    </v-container>

   <v-container >

      <v-card class="mx-auto px-6 py-8" max-width="400" style="padding: ;"    >
      <v-form
        
        @submit.prevent=""
      >
        <p>Introduce tus datos para la recuperación de tu contraseña</p>
        <br>
        <v-text-field
          name="username"
          v-model="username"
          class="mb-2"
          clearable
          label="User"
        ></v-text-field>

        <v-text-field
          v-model="email"
          name="email"
          clearable
          label="Email"
          placeholder="Enter your email"
        ></v-text-field>

        <br>

        <v-btn
 
          block
          color="wihite"
          size="large"
          type="submit"
          
          variant="elevated"
          
        >
          <p style="color: teal;"> Enviar</p>
        </v-btn>
      </v-form>
    
      
      </v-card>
    </v-container>  

  

  </v-main>

  <Footer></Footer>
  
</v-app>

</template>
