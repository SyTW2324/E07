<template>
  <v-app>
    <Barnav></Barnav>
    <v-main>
      <v-container>
        <!-- carrousel pictures -->
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel cycle height="400" hide-delimiters>
              <v-carousel-item
                v-for="(item,i) in pictures"
                :key="i"
                :src="item"
              ></v-carousel-item>
            </v-carousel>
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
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { baseUrl } from '../env/env-variables';
import { ref } from 'vue';

let userName = ref("");
let restaurantName = ref("");
let email = ref("");
let phoneNumber = ref("");
let restaurantAddress = ref("");
let timeTable = ref("");
let category = ref("");
let selectedDays = ref("");
let startingHour = ref("");
let finishingHour = ref("");
let profilePhoto = ref("");
let pictures = ref<string[]>([]);
let hours = ref("");

async function getRestaurant() {
  const authStore = useAuthStore();
  console.log("dentro de getUser");
  if (authStore.user) {
  if (authStore.isExpired() === true) {
      const userToken = authStore.getToken();
      const response = await axios.get(`${baseUrl}restaurants/?token=${userToken}&userName=${authStore.user.username}`)
      console.log("response:", response);

      if (response.data.code === 0) {
        userName.value = response.data.message.userName;
        restaurantName.value = response.data.message.restaurantName;
        email.value = response.data.message.email;
        phoneNumber.value = response.data.message.phoneNumber;
        restaurantAddress.value = response.data.message.restaurantAddress;
        timeTable.value = response.data.message.timeTable;
        category.value = response.data.message.category;

        selectedDays.value = response.data.message.timeTable[0].selectedDays;
        startingHour.value = response.data.message.timeTable[0].startingHour;
        finishingHour.value = response.data.message.timeTable[0].finishingHour;
        hours.value = startingHour.value + " - " + finishingHour.value;
        

        if (authStore.getProfilePhoto() === " " || authStore.getProfilePhoto() === null || authStore.getProfilePhoto() === "undefined") {
          profilePhoto.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        } else {
          // Reducir tamaño de la imagen
          profilePhoto.value = authStore.getProfilePhoto() as string;
        }

        // pictures
        if(authStore.getPictures() === null) {
          console.log('no hay pictures')
          pictures.value = [];
          pictures.value[0] = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
          pictures.value[1] = "https://previews.123rf.com/images/shushanto/shushanto2209/shushanto220900703/191842443-imagen-de-fondo-de-la-ilustraci%C3%B3n-del-arte-conceptual-de-la-destrucci%C3%B3n-de-los-planetas.jpg"
        } else {
          console.log('hay pictures')
          pictures.value = authStore.getPictures() as string[];
          console.log('post get')
        }

      } else {
        authStore.logout();
      }

  } else {
    authStore.logout();
  }
  } else {
    authStore.logout();
  }

}

getRestaurant();
</script>
