<template>
  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container v-if="allInfoIsLoaded == 0" class="d-flex align-center justify-center" style="padding-top: 15em; padding-bottom: 5em;">
        <v-progress-circular
        indeterminate
        size="150" 
        color="teal"></v-progress-circular> 
      </v-container>
      <v-container v-else-if="allInfoIsLoaded == 1">
        <v-container>
          <v-card  color="teal">
            
            <v-card-text class="">
             <h1 
              style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; 
              font-size: 180%; 
              margin-left: 5%;" 
              >Descubre y reserva el mejor sitio donde comer
            </h1>
            </v-card-text>
            <v-container style="height: 50%; width: 60%;"><v-img :src="imgPresentacion" > </v-img> </v-container>
            
          </v-card>
          <v-container style="padding-top: 3em; padding-bottom: 1em;" >
  
            <v-row>

              <v-col class="d-flex align-center justify-space-between" md="9">
                <v-text-field type="text" v-model="input" placeholder="Busca tu restaurante favorito..." >  <v-icon >mdi-magnify</v-icon> </v-text-field>
              </v-col>
              

              <v-col class="d-flex align-center justify-space-between" md="3">
                  <v-row>
                    <v-select
                    v-model="selectedCategory"
                    :items="categories"
                    label="Categoría"
                    multiple
                    chips
                    hint="Selecciona una o varias categorías"
                    style="padding-right: 1em;"
                    >
                    </v-select>
  
                    <v-btn @click="selectedCategory = []; input = '' " icon>
                      <v-icon>mdi-delete-circle</v-icon>
                    </v-btn>
                  </v-row>

              </v-col>


            </v-row>
  
          </v-container>
        </v-container>


        <v-container>
          <h2 style="margin-bottom: 3% ;">Nuestra seleción:</h2>
        <v-row>
          <v-col v-for="(restaurant, index) in paginatedRestaurants" :key="index" cols="12" md="4">
            <v-card>
              <v-card-title>{{ restaurant[0] }}</v-card-title>

              <v-card-text class="d-flex justify-space-between">
                <v-chip icon="mdi-blinds" @click="">Categoria: {{ restaurant[2] }}</v-chip>
              </v-card-text>
              <v-carousel cycle height="100%" hide-delimiters >
                    <v-carousel-item
                      v-for="(item,i) in restaurant[4]"
                      :key="i"
                      :src="item"
                      height="15em"
                      width="90em"
                    ></v-carousel-item>
                  </v-carousel>
              <v-btn
                block
                color="white"
                size="large"
                type="submit"
                variant="elevated"
                @click="$router.push(`/establecimientos/${restaurant[1]}`)"
              >
                <p style="color: teal;"> Más información</p>
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="input&&!filteredList().length">
          <v-col cols="12">
            <h4>Resultados no encontrados!</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" />
          </v-col>
        </v-row>
      </v-container>
      </v-container>
    </v-main>

    <Footer></Footer>
  </v-app>


</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue'
import Barnav from '../components/Barnav.vue'
import { ref, computed } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { baseUrl } from '../env/env-variables';
import imgPresentacion from '../img/restaurante.png';

let input = ref('');
let categories = ref(['asador', 'cafeteria', 'chino', 'comida rapida', 'español', 'hindu', 'italiano', 'japones', 'mexicano', 'pizzeria', 'vegetariano']);
let selectedCategory = ref < string[] > ([]);



const restaurants = ref < [string, string, string, string, string[]] []>();
const itemsPerPage = 3;
const currentPage = ref(1);



const allInfoIsLoaded = ref(0); // 0 = no, 1 = si, 2 = error

const paginatedRestaurants = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  if (input.value || selectedCategory.value.length > 0) {
    return filteredList().slice(startIndex, endIndex);
  }
  return restaurants.value?.slice(startIndex, endIndex);
})

const totalPages = computed(() => {
  currentPage.value = 1;
  if (input.value || selectedCategory.value.length > 0) {
    return Math.ceil(filteredList().length / itemsPerPage);
  } else if (input.value.length == 0 && restaurants.value) {
    return Math.ceil(restaurants.value?.length / itemsPerPage);
  }
  return 0;
});

const changePage = (page: number) => {
  currentPage.value = page
}


onMounted(async () => {
  // Realizar la solicitud a tu backend para obtener la lista de restaurantes
  try {
 
    const response = await axios.get(`${baseUrl}restaurants/info/?userName=all`);
    
    let names: [string, string, string, string, string[]] [] = [];
    for (let i = 0; i < response.data.length; i++) {
      let pictures: string[] = [];

      pictures = response.data[i].pictures.map((picture: string) => {
      const image = new Image();
      image.src = picture;
      return picture;
      });

      names.push([response.data[i].restaurantName, response.data[i].userName, response.data[i].category, response.data[i].description, pictures ]);
    }
    restaurants.value = names;
    allInfoIsLoaded.value = 1;
  } catch (error) {
    console.error('Error al obtener restaurantes', error);
  }
});

function filteredList() {
  if (!restaurants.value) {
    return [];
  }

  return restaurants.value?.filter((restaurant) =>
  restaurant[0].toLowerCase().includes(input.value.toLowerCase()) && (selectedCategory.value.length == 0 || selectedCategory.value.includes(restaurant[2].toLowerCase()))
  );
}

</script>
