<template>
  <v-container>
    <v-row>
      <v-col v-for="(restaurant, index) in paginatedRestaurants" :key="index" cols="12" md="4">
        <v-card>
          <v-card-title>{{ restaurant }}</v-card-title>
          <v-card-subtitle>{{ restaurant }}</v-card-subtitle>
          <v-card-text>{{ restaurant }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination v-model="currentPage" :length="totalPages" @input="changePage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      restaurants: ["pepe", "juan", "mario", "tus" ,"amigos", "guapos"],  // Tu lista de restaurantes
      itemsPerPage: 3,
      currentPage: 1,
    };
  },
  computed: {
    paginatedRestaurants() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.restaurants.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.restaurants.length / this.itemsPerPage);
    },
  },
  methods: {
    changePage(page: number) {
      this.currentPage = page;
    },
  },
};
</script>
