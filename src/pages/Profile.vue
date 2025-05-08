<template>
  <div class=" bg-gradient-to-br from-[#ffffff] via-[#f8f9fd] to-[#eef1f7] text-gray-800 p-8 max-w-5xl mx-auto m-6">
    <h1 class="text-4xl font-bold mb-10 text-gray-900">Профиль пользователя</h1>

    <div v-if="loading" class="text-indigo-500 text-lg animate-pulse">
      Загрузка...
    </div>

    <div v-else>
      <!-- User Info -->
      <div class="bg-white rounded-xl p-6 mb-10 shadow-md border border-gray-200 transition hover:shadow-lg">
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Информация</h2>
        <div class="space-y-3">
          <p><span class="text-gray-500">Имя:</span> {{ user.username }}</p>
          <p><span class="text-gray-500">Email:</span> {{ user.email }}</p>
        </div>
      </div>

      <!-- Bookings -->
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-200 transition hover:shadow-lg">
        <h2 class="text-2xl font-semibold text-fuchsia-600 mb-4">Мои бронирования</h2>

        <div v-if="bookings.length === 0" class="text-gray-400 italic">
          Бронирований пока нет.
        </div>

        <ul v-else class="divide-y divide-gray-100">
          <li
            v-for="booking in bookings"
            :key="booking.booking_code"
            class="py-4 hover:bg-gray-50 rounded-lg px-2 transition"
          >
            <div class="text-indigo-700 font-medium">Код: {{ booking.booking_code }}</div>
            <div class="text-gray-600 text-sm">
              Рейс: {{ booking.flight.origin }} → {{ booking.flight.destination }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchUserProfile } from '../api'

const loading = ref(true)
const user = ref({})
const bookings = ref([])

onMounted(async () => {
  try {
    const data = await fetchUserProfile()
    user.value = data.user
    bookings.value = data.bookings
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}
</style>
