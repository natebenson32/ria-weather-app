import { ref } from 'vue'

const API_KEY = '9170e0e85794088df319259526c55afd'

export function useWeather() {
  const weatherData = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchWeather = async (lat, lon) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=metric&appid=${API_KEY}`
      )
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      weatherData.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { weatherData, fetchWeather, loading, error }
}
