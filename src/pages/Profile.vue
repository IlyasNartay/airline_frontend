<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Профиль пользователя</h1>

    <div v-if="loading" class="text-gray-600">Загрузка...</div>
    <div v-else>
      <div class="mb-6">
        <p><strong>Имя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <h2 class="text-xl font-semibold mb-2">Мои бронирования</h2>
      <div v-if="bookings.length === 0" class="text-gray-500">Бронирований нет.</div>
      <ul>
        <li
          v-for="booking in bookings"
          :key="booking.booking_code"
          class="border-b py-2"
        >
          <p><strong>Код бронирования:</strong> {{ booking.booking_code }}</p>
          <p><strong>Рейс:</strong> {{ booking.flight.origin }} → {{ booking.flight.destination }}</p>
          <p><strong>Дата:</strong> {{ booking.flight.departure_time }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {fetchUserProfile} from '../api'

const loading = ref(true)
const user = ref({})
const bookings = ref([])

onMounted(async () => {
  const data = await fetchUserProfile()
  user.value = data.user
  bookings.value = data.bookings
  loading.value = false
})
</script>
