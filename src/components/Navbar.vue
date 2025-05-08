<template>
  <nav class="bg-white shadow p-4 flex justify-between">
    <RouterLink to="/" class="text-xl font-bold text-[#a48656] hover:text-[#cea262]">AirBooking </RouterLink>
    <div class="space-x-4">
      <RouterLink v-if="!token" to="/login" class="text-[#a48656] hover:text-[#cea262]">Вход</RouterLink>
      <RouterLink v-if="!token" to="/register" class="text-[#a48656] hover:text-[#cea262]">Регистрация</RouterLink>
      <RouterLink v-if="token" to="/manage-booking" class="text-[#a48656] hover:text-[#cea262]">Мои брони</RouterLink>
              <RouterLink v-if="token" to="/profile" class="text-[#a48656] hover:text-[#cea262]">Личный кабинет</RouterLink>
      <button v-if="token" @click="logout" class="text-red-500">Выйти</button>
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
