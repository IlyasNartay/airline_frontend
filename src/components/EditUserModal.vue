<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">
      <h3 class="text-lg font-semibold mb-2">Редактировать пользователя</h3>
      <input v-model="user.username" placeholder="Username" class="w-full border rounded px-3 py-2 focus:ring-2" />
      <input v-model="user.email" placeholder="Email" class="w-full border rounded px-3 py-2 focus:ring-2" />
      <div class="flex justify-end space-x-2 pt-2">
        <button @click="save" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Сохранить</button>
        <button @click="close" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
});

const emit = defineEmits(['close', 'save']);

const save = () => {
  emit('save');
};

const close = () => {
  emit('close');
};
</script>
