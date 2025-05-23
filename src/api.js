import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

/* ----------------------------- АВТОРИЗАЦИЯ ----------------------------- */

export const registerUser = async (data) => {
  const res = await apiClient.post('register/', data)
  return res.data
}

export const loginUser = async (data) => {
  const res = await apiClient.post('api-token-auth/', data)
  localStorage.setItem('token', res.data.token)
  const isAdmin = await apiClient.get('admin/userInfo')
  localStorage.setItem('is_admin', isAdmin.data.users.is_staff)
  return res.data
}
export const logOut = async () => {
  const res = await apiClient.post('logout')
  return res.data
}

/* --------------------------- ПОЛУЧЕНИЕ ДАННЫХ -------------------------- */

export const fetchIndex = async () => {
  const res = await apiClient.get('/')
  const data = res.data

 if (res.data?.promo_code) {
    localStorage.setItem('promo_code', res.data.promo_code);
  }
  return data
}

export const fetchFlightDetails = async (flightId) => {
  const res = await apiClient.get(`flight/${flightId}/`)
  return res.data
}

export const fetchAirportDetails = async (airportCode) => {
  const res = await apiClient.get(`airport/${airportCode}/`)
  return res.data
}

export const fetchUserProfile = async () => {
  const res = await apiClient.get('/profile/')
  return res.data
}


/* ----------------------------- БРОНИРОВАНИЕ ---------------------------- */

export const bookFlight = async (email, name, flightId) => {
  const res = await apiClient.post('flight/bookings/', {
    flight_id: flightId,
    name: name,
    email: email
  })
  return res.data
}
export const manageBooking = async (bookingCode) => {
  const res = await apiClient.post('manage-booking/', { booking_code: bookingCode })
  return res.data
}

export const adminGet = async () =>{
const res = await apiClient .get('/admin/users/');
return res.data
}

export const updateUserApi = async (user) => {
  return apiClient.put(`/admin/users/${user.id}/`, user);
};

export const deleteUserApi = async (id) => {
  return apiClient.delete(`/admin/users/${id}/`);
};

export async function addUserApi(userData) {
  let id = 1
  return await apiClient.post(`/admin/addusers`, userData)
}