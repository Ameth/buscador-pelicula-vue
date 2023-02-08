<script setup>
import { ref } from 'vue'
const props = defineProps(['movies'])

// const { pelicula: Search } = ref(movies)

// console.log(props.movies);

</script>

<template>
  <p v-if="!props.movies || props.movies?.length === 0">No se encontraron películas para esta búsqueda</p>
  <ul v-else class="movies">
    <li class="movie" v-for="movie in props.movies">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.year }}</p>
      <img :src="movie.image" :alt="movie.title">
    </li>
  </ul>
</template>
