import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import FlightDetail from './pages/FlightDetail.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import ManageBooking from './pages/ManageBooking.vue'
import AirportDetails from "./pages/AirportDetails.vue";
import BookingConfirmation from "./pages/BookingConfirmation.vue";
import BookingForm from "./pages/BookingForm.vue";
import Profile from "./pages/Profile.vue";
import NotFound from "./pages/NotFound.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/flight/:id', name: 'FlightDetail', component: FlightDetail },
  { path: '/manage-booking', name: 'ManageBooking', component: ManageBooking },
  { path: '/airport/:code', name: 'AirportDetails', component: AirportDetails, props: true },
  { path: '/booking-form/:id', name: 'BookingForm',component: BookingForm},
  { path: '/booking-confirmation/:code', component: BookingConfirmation, props: true},
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAdmin: true }, // Ограничение для админа
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Защита маршрута (если нужно)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  const protectedRoutes = ['/manage-booking']

  if (to.meta.requiresAdmin && (!token || !isAdmin)) {
    next('/login');
  } else if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
})

export default router
