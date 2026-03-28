import { createRouter, createWebHistory } from 'vue-router'
import { admin } from '../libs/AxonConnector'
import HomeView       from '../views/HomeView.vue'
import AboutView      from '../views/AboutView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import NotFound       from '../views/NotFound.vue'
import SetPassword    from '../views/SetPassword.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/join',
    name: 'ApplicationForm',
    component: () => import('../views/ApplicationForm.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/credentials',        // ← matches activation_link in utils.py
    name: 'SetPassword',
    component: SetPassword,
  },
  {
    path: '/invited',
    name: 'Invited',
    component: () => import('../views/InvitedView.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !admin.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router