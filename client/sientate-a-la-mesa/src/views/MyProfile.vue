
<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    <v-container class="d-flex align-center justify-center">
      <h1>Mi perfil</h1>
    </v-container>
    <v-container class="d-flex align-center justify-center">
      <v-row align-content="stretch" >
        <v-col>
          <div class="d-flex align-center justify-center">
            <v-avatar size="200" color="grey">
              <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
            </v-avatar>
          </div>
        </v-col>
        <v-col>
          <p>Nombre</p>
          <p>Apellidos</p>
          <p>Dirección</p>
          <p>Correo</p>
          <p>Nombre de usuario</p>
          <p>Telefono</p>
          <br>
          <v-btn color="teal">Editar</v-btn>
        </v-col>
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
    <br>
    <br>
    <v-container>
      <v-row>
        <v-col>
          <v-card max-width="344" elevation="16" color="teal" density="compact">
            <v-title>
              Buzón de notificaciones
            </v-title>
            <v-card-item>
              Notificación 1
            </v-card-item>
            <v-card-item>
              Notificación 2
            </v-card-item>
          </v-card>
        </v-col>
        <v-col >
          <v-card max-width="344" elevation="16" color="teal" density="compact">
            <v-title>
              Reservas anteriores
            </v-title>
            <v-card-item>
              Reserva 1
            </v-card-item>
            <v-card-item>
              Reserva 2
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
      
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>


<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
import axios  from 'axios';

async function getUser() {
  const requiredUserJSON = {
    username: "user1"

  }
  const response = await axios.get('http://10.6.129.207/api/users/', 
  {params: requiredUserJSON});
  console.log(response.data);
  
}

getUser();


</script>