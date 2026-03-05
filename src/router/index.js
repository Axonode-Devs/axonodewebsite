import { createRouter, createWebHistory } from 'vue-router'
import { admin } from '../libs/AxonConnector'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import NotFound from '../views/NotFound.vue'
import SetPassword from '../views/SetPassword.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/groups',
    name: 'Groups',
    component: HomeView
  },
  {
    path: '/support',
    name: 'Support',
    component: HomeView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/join',
    name: 'ApplicationForm',
    component: () => import('../views/ApplicationForm.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/set-password',
    name: "SetPSW",
    component: SetPassword
  },
  {
    path: '/invited',
    name: "Invited",
    component: () => import('../views/InvitedView.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (admin.currentUser) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router
