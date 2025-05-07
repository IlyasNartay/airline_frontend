<template>
  <nav class="bg-white shadow p-4 flex justify-between">
    <RouterLink to="/" class="text-xl font-bold text-blue-600">AirBooking </RouterLink>
    <div class="space-x-4">
      <RouterLink v-if="!token" to="/login" class="text-blue-500">Вход</RouterLink>
      <RouterLink v-if="!token" to="/register" class="text-blue-500">Регистрация</RouterLink>
      <RouterLink v-if="token" to="/manage-booking" class="text-blue-500">Мои брони</RouterLink>
      <button v-if="token" @click="logout" class="text-red-500">Выйти</button>
        <RouterLink v-if="token" to="/profile">
        <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600">
          <span class="font-semibold">P</span>
        </div>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { logOut } from "../api.js";

const router = useRouter()
const token = computed(() => localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  logOut()
  window.location.href = '/'
}
</script>
