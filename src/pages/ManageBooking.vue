<template>
  <div class="mt-20 px-4 pt-5 max-w-md mx-auto bg-white rounded-2xl shadow-xl">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-800">Управление бронированием</h1>

    <div class="mb-4">
      <label for="code" class="block text-sm font-medium text-gray-700">Код бронирования</label>
      <input
        v-model="code"
        type="text"
        id="code"
        class="mt-1 p-3 w-full border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
        placeholder="Введите код (например: Q47CRZ)"
      />
    </div>

    <button
      @click="manage"
      :disabled="loading || !code"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
    >
      {{ loading ? 'Поиск...' : 'Проверить' }}
    </button>

    <transition name="fade" mode="out-in">
      <div
        v-if="booking"
        class="mt-6 bg-blue-50 p-5 rounded-xl shadow-inner text-gray-800"
        key="details"
      >
        <h2 class="text-xl font-semibold mb-3 text-blue-800">Детали бронирования</h2>
        <p><strong>Код бронирования:</strong> {{ booking.booking_code }}</p>
        <p><strong>Дата создания:</strong> {{ formatDate(booking.created_at) }}</p>
        <p><strong>Пассажир:</strong> {{ booking.passenger.name }} ({{ booking.passenger.email }})</p>
        <p><strong>Рейс:</strong> {{ booking.flight.origin }} → {{ booking.flight.destination }}</p>
        <p><strong>Длительность:</strong> {{ booking.flight.duration }} минут</p>
        <p><strong>Осталось мест:</strong> {{ booking.flight.available_seats }} из {{ booking.flight.capacity }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { manageBooking } from '../api'

const code = ref('')
const booking = ref(null)
const loading = ref(false)

async function manage() {
  if (!code.value.trim()) return
  loading.value = true
  booking.value = null
  try {
    const data = await manageBooking(code.value.trim())
    booking.value = data
  } catch {
    alert('❌ Бронирование не найдено.')
  } finally {
    loading.value = false
  }
}

function formatDate(iso) {
  const date = new Date(iso)
  return date.toLocaleString('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
