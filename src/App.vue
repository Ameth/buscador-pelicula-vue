<script setup>
import { ref, toRef, watchEffect, watch } from 'vue'
import debounce from 'just-debounce-it'

import Movies from './components/Movies.vue'
import { useMovies } from './hooks/useMovies'

const search = ref('')
const error = ref(null)
const isFirstInput = ref(true)
const sort = ref(false)

const { movies, loading, getMovies } = useMovies({ search: search.value, sort: sort.value })

watch(search, (search) => {

  if (isFirstInput) {
    isFirstInput.value = search === ''
    error.value = null

  }

  if (search === '') {
    error.value = 'No se puede buscar una película vacía'
  }

  if (search.match(/^\d+$/)) {
    error.value = 'No se puede buscar una película con un número'
  }

  if (search.length < 3) {
    error.value = 'La búsqueda debe tener al menos 3 caracteres'
  }
  // console.log("Search tiene: ", search)
})

const handleSubmit = (event) => {
  event.preventDefault()
  getMovies({ search: search.value })
}

const handleSort = () => {
  sort.value = !sort.value
}

const debouncedGetMovies = debounce(() => {
  // console.log('search', search.value)
  getMovies({ search: search.value })
}, 300)

const handleChange = (event) => {
  const newSearch = event.target.value
  search.value = newSearch
  // console.log(newSearch)
  debouncedGetMovies()

}

</script>

<template>
  <div class="page">
    <header>
      <h1>Buscador de peliculas</h1>
      <form @submit="handleSubmit">
        <input :style="{
          border: '1px solid transparent',
          borderColor: error ? 'red' : 'transparent'
        }" type="text" placeholder="Avengers, Star Wars, The Matrix..." v-model="search" @input="handleChange" />
        <button type="submit">Buscar</button>
        <input type='checkbox' @change="handleSort" :checked="sort" /> Ordenar por nombre
      </form>
      <p style="color: red;"> {{ error }} </p>
    </header>

    <main>
      <p v-if="loading">Cargando...</p>
      <Movies v-else :movies="movies" />
    </main>
  </div>

</template>
