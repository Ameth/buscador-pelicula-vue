import { ref, computed } from 'vue'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort = false }) {
  const movies = ref([])
  const loading = ref(false)
  const error = ref(null)
  const previousSearch = ref(search)

  const getMovies = async ({ search }) => {
    if (search === previousSearch.value) return

    try {
      loading.value = true
      error.value = null
      previousSearch.value = search
      const newMovies = await searchMovies({ search })
      movies.value = newMovies
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  console.log('sort es:', sort)

  const sortedMovies = () => {
    return sort
      ? [...movies.value].sort((a, b) => a.title.localeCompare(b.title))
      : movies.value
  }

  return { movies, getMovies, loading }
}
