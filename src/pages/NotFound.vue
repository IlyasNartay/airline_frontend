<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50">
    <div class="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
      <h1 class="text-4xl font-semibold text-blue-900 mb-2">404</h1>
      <p class="text-lg text-gray-700 mb-4">Упс! Страница не найдена</p>
      <p class="text-sm text-gray-500 mb-6">
        Похоже, вы сбились с маршрута. Попробуйте начать с главной страницы.
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-[#a48656] hover:bg-[#cea262] text-white rounded-full font-semibold transition duration-300"
      >
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>
<script>

</script>