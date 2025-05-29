<template>
  <div class="min-h-full">
    <div class="bg-gray-800 pb-32">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div
          class="relative flex h-16 items-center justify-between lg:border-b lg:border-gray-400/25"
        >
          <div class="flex items-center px-2 lg:px-0">
            <div class="shrink-0">
              <div class="text-white text-xl font-medium">Ria Weather App</div>
            </div>
          </div>
          <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <!-- Search bar -->
            <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <input
                type="search"
                name="search"
                aria-label="Search"
                class="col-start-1 row-start-1 block w-full rounded-md bg-gray-700 py-1.5 pr-3 pl-10 text-base text-white outline-hidden placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6"
                placeholder="Search"
              />
              <MagnifyingGlassIcon
                class="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div class="hidden lg:ml-4 lg:block"></div>
        </div>
      </div>
      <header class="py-8">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <!-- City navbar -->
          <div>
            <div class="flex flex-row sm:hidden">
              <div class="flex-1 grid grid-cols-1 pr-4">
                <select
                  aria-label="Select a tab"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  @change="citySelected($event.target.selectedIndex)"
                >
                  <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
                    {{ tab.name }}
                  </option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                  aria-hidden="true"
                />
              </div>
              <button
                class="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                @click="
                  fetchWeather(
                    tabs.find((tab) => tab.current)!.lat,
                    tabs.find((tab) => tab.current)!.lon
                  )
                "
              >
                <ArrowPathIcon class="inline-block h-5 w-5 mr-1 -mt-1" aria-hidden="true" />
                Refresh
              </button>
            </div>
            <div class="hidden sm:flex sm:items-center sm:justify-between">
              <nav class="flex space-x-4" aria-label="Tabs">
                <button
                  v-for="(tab, index) in tabs"
                  :key="tab.name"
                  @click="citySelected(index)"
                  type="button"
                  :class="[
                    tab.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer'
                  ]"
                  :aria-current="tab.current ? 'page' : undefined"
                >
                  {{ tab.name }}
                </button>
              </nav>
              <button
                class="bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                @click="
                  fetchWeather(
                    tabs.find((tab) => tab.current)!.lat,
                    tabs.find((tab) => tab.current)!.lon
                  )
                "
              >
                <ArrowPathIcon class="inline-block h-5 w-5 mr-1 -mt-1" aria-hidden="true" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <!-- "Next Hours" Box -->
      <div class="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div class="flex flex-col rounded-lg bg-white shadow-sm overflow-hidden">
          <div
            class="flex h-14 px-5 sm:px-6 text-xl leading-14 font-medium text-gray-950 border-b-1 border-gray-200"
          >
            Next Hours
          </div>
          <div class="h-64 px-5 py-6 sm:px-6">
            <div class="overflow-x-auto w-full">
              <!-- <div v-if="loading" class="text-gray-500">Loading...</div> -->
              <!-- <div v-if="error" class="text-red-500">{{ error }}</div> -->
              <div v-if="!loading" class="flex w-full">
                <ul class="flex min-w-max space-x-2">
                  <li
                    v-for="hour in 12"
                    :key="hour"
                    class="flex flex-col min-w-32 mx-1 my-auto py-6 text-center bg-gray-100 rounded-lg"
                  >
                    <div class="font-medium text-2xl text-gray-900">67°F</div>
                    <div class="font-medium text-slate-500">0%</div>
                    <img
                      src="https://openweathermap.org/img/wn/01d@2x.png"
                      alt="Weather Icon"
                      class="w-16 h-16 mx-auto"
                    />
                    <div class="font-medium text-lg text-gray-900">3:00PM</div>
                    <!-- {{ hour.weather[0].description }} - {{ hour.temp }}°C -->
                    <!-- {{ new Date(hour.dt * 1000).toLocaleTimeString() }}: {{ hour.temp }}°C -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- "Next 5 Days" Box -->
      <div class="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div class="flex flex-col rounded-lg bg-white shadow-sm overflow-hidden">
          <div
            class="flex h-14 px-5 sm:px-6 text-xl leading-14 font-medium text-gray-950 border-b-1 border-gray-200"
          >
            Next 5 Days
          </div>
          <div class="h-64">
            <div class="overflow-auto h-full">
              <!-- <div v-if="loading" class="text-gray-500">Loading...</div> -->
              <!-- <div v-if="error" class="text-red-500">{{ error }}</div> -->
              <div v-if="!loading" class="flex w-full h-full">
                <ul class="flex flex-1 flex-col divide-y divide-gray-200 h-full">
                  <li v-for="hour in 5" :key="hour" class="flex flex-1 py-6 text-center">
                    <div class="flex mx-auto">
                      <img
                        src="https://openweathermap.org/img/wn/01d@2x.png"
                        alt="Weather Icon"
                        class="w-16 h-16"
                      />
                      <div class="flex flex-col my-auto mx-2 mr-6">
                        <div class="font-medium text-xl text-gray-900">Thu, May 29</div>
                        <div class="text-gray-500">Clear throughout the day.</div>
                      </div>
                      <div class="font-medium text-xl text-gray-900 my-auto mr-2">67°</div>
                      <div class="font-medium text-xl text-gray-900 my-auto">53°</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowPathIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useWeather } from '../composables/weatherAPI.js'

const { weatherData, loading, error, fetchWeather } = useWeather()

const tabs = ref([
  { name: 'Rio de Janeiro', lat: '-22.9068', lon: '-43.1729', current: true },
  { name: 'Beijing', lat: '39.9042', lon: '116.4074', current: false },
  { name: 'Los Angeles', lat: '34.0522', lon: '-118.2437', current: false }
])

const citySelected = (index: number) => {
  tabs.value.forEach((tab, i) => {
    tab.current = i === index
  })
  fetchWeather(tabs.value[index].lat, tabs.value[index].lon)
  console.log(`Selected city: ${tabs.value[index].name}`)
}
</script>
