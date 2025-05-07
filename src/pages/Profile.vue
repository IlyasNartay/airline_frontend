<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="flex items-center space-x-4 mb-6">
      <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold">
        {{ userInitial }}
      </div>
      <div>
        <h2 class="text-xl font-semibold">{{ user.username }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Мои брони:</h3>
      <ul class="space-y-2">
        <li
            v-for="booking in bookings"
            :key="booking.id"
            class="p-4 border rounded-md shadow-sm"
        >
          <p><strong>Рейс:</strong> {{ booking.flight }}</p>
          <p><strong>Дата:</strong> {{ booking.date }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {fetchProfile} from "../api.js";

const user = ref({})
const bookings = ref([])

onMounted(async () => {
    const res = fetchProfile()
    user.value = res.user
    bookings.value = res.bookings
})
</script>
