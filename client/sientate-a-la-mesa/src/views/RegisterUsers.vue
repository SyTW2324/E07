
<template>

<v-app>
  <Barnav></Barnav>
  <v-main>
    <v-container  class="d-flex align-center justify-center" style="min-height: 10px">
      <h1>Registro de usuario</h1>
    </v-container>

    <v-container>

      <v-form>
        <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="Nombre"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Apellidos"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Telefono"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Nombre de usuario"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Contraseña"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="street"
              :rules="streetRules"
              label="Calle"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="4">
            <v-file-input
              v-model="file"
              :rules="fileRules"
              label="Foto de perfil"
              required
              accept="image/*"
              placeholder="Seleccione una imagen"
            ></v-file-input>
          </v-col>

        </v-row>
        </v-container>
      </v-form>

    </v-container>
    
  </v-main>

  <Footer></Footer>
  
</v-app>

</template>

<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'

</script>