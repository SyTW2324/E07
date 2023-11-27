<script setup lang="ts">
import Barnav from '../components/Barnav.vue';
import Footer from '../components/Footer.vue'
</script>

<template>

<v-app>
  <Barnav></Barnav>
  <v-main>


    <v-container class="d-flex align-center justify-center" style="padding-top: 5em; padding-bottom: 5em;"> 
      <v-card
        class="mx-auto"
        width="1100"
        height="320"
        image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        theme="dark"
      > 
        <v-card-title>Nombre del establecimiento {{ }}</v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <v-container style="align-items: right: inherit;">
        <v-card :loading="loading" class="mx-auto my-12 " max-width="374" >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear
                  :active="isActive"
                  color="teal"
                  height="4"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-card-title>Disponibilidad: </v-card-title>

              <div class="px-4">
                <v-chip-group v-model="selection">
                  <!-- Utiliza v-for para iterar sobre el array de horas -->
                  <v-chip v-for="hour in availableHours" :key="hour">{{ hour }}</v-chip>
                </v-chip-group>
              </div>

              <v-card-actions>
                <v-btn color="teal" variant="text" @click="reserve">
                  Reservar
                </v-btn>
              </v-card-actions>
            </v-card>
      </v-container>
   
    </v-container>




  </v-main>







  

  <Footer></Footer>
  
</v-app>

</template>


<script lang="ts">
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      // Define un array con las horas disponibles
      availableHours: ["5:30PM", "7:30PM", "8:00PM", "9:00PM"],
      selection: [], // Puedes inicializar esto según tus necesidades
    }),

    methods: {
      reserve() {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>