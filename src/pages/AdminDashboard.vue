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
    <!-- Кнопка "Добавить пользователя" -->
<div class="mb-4 text-right">
  <ActionButton @click="showAddModal = true" class="bg-green-500 hover:bg-green-600">
    Добавить пользователя
  </ActionButton>
</div>

<!-- Модальное окно для добавления пользователя -->
<div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4">Новый пользователь</h2>

    <div class="space-y-3">
      <input v-model="newUser.username" type="text" placeholder="Username" class="w-full border rounded px-3 py-2" />
      <input v-model="newUser.email" type="email" placeholder="Email" class="w-full border rounded px-3 py-2" />
      <input v-model="newUser.password" type="password" placeholder="Пароль" class="w-full border rounded px-3 py-2" />
      <input v-model="newUser.password2" type="password" placeholder="Повторите пароль" class="w-full border rounded px-3 py-2" />
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <button @click="showAddModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Отмена</button>
      <button @click="handleAddUser" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Добавить</button>
    </div>
  </div>
</div>
    <!-- Модальное окно для редактирования -->
    <EditUserModal v-if="showEditModal" :user="editUserData" @close="showEditModal = false" @save="updateUser" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { adminGet, addUserApi, deleteUserApi, updateUserApi } from '../api.js';
import ActionButton from "../components/ActionButton.vue";
import EditUserModal from "../components/EditUserModal.vue";
const showAddModal = ref(false);
const newUser = ref({
  username: '',
  email: '',
  password: '',
  password2: ''
});


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

const handleAddUser = async () => {
  try {
    await addUser(
      newUser.value.username,
      newUser.value.email,
      newUser.value.password,
      newUser.value.password2
    );

    newUser.value = { username: '', email: '', password: '', password2: '' };
    showAddModal.value = false;

    const response = await adminGet();
    usersWithBookings.value = response.data;

  } catch (error) {
    console.error('Ошибка при добавлении пользователя', error);
  }
};

const addUser = async (username, email, password, password2) => {
  try {
    const newUser = { username, email, password, password2 };
    await addUserApi(newUser);
  } catch (error) {
    console.error('Ошибка при добавлении пользователя', error);
    throw error;
  }
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
