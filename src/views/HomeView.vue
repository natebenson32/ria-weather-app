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
          <!-- <h1 class="text-3xl font-bold tracking-tight text-white">Los Angeles, CA</h1> -->
          <!-- City navbar -->
          <div>
            <div class="grid grid-cols-1 sm:hidden">
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select
                aria-label="Select a tab"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
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
            <div class="hidden sm:block">
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
            </div>
          </div>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow-sm sm:px-6">
          <div class="h-72">Test Content</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
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
  // fetchWeather(tabs.value[index].lat, tabs.value[index].lon)
  // console.log(`Selected city: ${tabs.value[index].name}`)
}
</script>
