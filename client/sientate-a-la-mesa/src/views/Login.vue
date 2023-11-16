

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
        
        
      >
        <v-text-field

          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field

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
    

    <v-container style="padding-top: 4em; text-align: center;">
      
      <router-link to="password-recovery" >
      <p >Olvidaste la contraseña?</p>
      </router-link>
    </v-container>  
    




  </v-main>

  <Footer></Footer>
  
</v-app>

</template>


<script setup lang="ts"> 

  



 
</script>





