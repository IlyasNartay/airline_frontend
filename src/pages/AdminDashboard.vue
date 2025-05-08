<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-center">Админ Панель</h1>

    <!-- Загрузка -->
    <div v-if="loading" class="text-center text-gray-600">Загрузка...</div>

    <!-- Таблица пользователей -->
    <div v-else>
      <table class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Username</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Действия</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="entry in usersWithBookings" :key="entry.user.id">
            <tr class="border-t hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-semibold">{{ entry.user.username }}</td>
              <td class="px-6 py-4">{{ entry.user.email }}</td>
              <td class="px-6 py-4 space-x-2">
                <ActionButton @click="editUser(entry.user)" class="bg-blue-500 hover:bg-blue-600">Редактировать</ActionButton>
                <ActionButton @click="deleteUser(entry.user.id)" class="bg-red-500 hover:bg-red-600">Удалить</ActionButton>
              </td>
            </tr>
            <tr v-if="entry.bookings && entry.bookings.length > 0" class="bg-gray-50">
              <td colspan="3" class="px-6 py-2 text-sm text-gray-700">
                <strong>Бронирования:</strong>
                <ul class="list-disc list-inside">
                  <li v-for="booking in entry.bookings" :key="booking.id">
                    Код: {{ booking.booking_code }} — Рейс ID: {{ booking.flight.id }}
                  </li>
                </ul>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Модальное окно для редактирования -->
    <EditUserModal v-if="showEditModal" :user="editUserData" @close="showEditModal = false" @save="updateUser" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { adminGet, deleteUserApi, updateUserApi } from '../api.js';
import ActionButton from "../components/ActionButton.vue";
import EditUserModal from "../components/EditUserModal.vue";


const usersWithBookings = ref([]);
const loading = ref(true);
const showEditModal = ref(false);
const editUserData = ref({
  id: null,
  username: '',
  email: '',
});

onMounted(async () => {
  try {
    const response = await adminGet();
    usersWithBookings.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных пользователей', error);
  } finally {
    loading.value = false;
  }
});

const editUser = (user) => {
  editUserData.value = { id: user.id, username: user.username, email: user.email };
  showEditModal.value = true;
};

const updateUser = async () => {
  try {
    await updateUserApi(editUserData.value);
    const index = usersWithBookings.value.findIndex(entry => entry.user.id === editUserData.value.id);
    if (index !== -1) {
      usersWithBookings.value[index].user.username = editUserData.value.username;
      usersWithBookings.value[index].user.email = editUserData.value.email;
    }
    showEditModal.value = false;
  } catch (error) {
    console.error('Ошибка при обновлении пользователя', error);
  }
};

const deleteUser = async (id) => {
  try {
    await deleteUserApi(id);
    usersWithBookings.value = usersWithBookings.value.filter(entry => entry.user.id !== id);
  } catch (error) {
    console.error('Ошибка при удалении пользователя', error);
  }
};
</script>
