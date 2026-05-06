import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../libs/AxonConnector'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import SetPassword from '../views/SetPassword.vue'
import LegalView from '../views/LegalView.vue';

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
    path: '/credentials',       
    name: 'SetPassword',
    component: SetPassword,
  },
  {
    path: '/invited',
    name: 'Invited',
    component: () => import('../views/InvitedView.vue'),
  },
  {
    path: '/teams/:teamId',
    name: 'TeamView',
    component: () => import('../views/TeamView.vue'),
  },
  {
    path: '/teams',
    name: 'TeamsView',
    component: () => import('../views/TeamsView.vue'),
  },
  {
    path: '/teams/frc0000',
    name: 'VoltX',
    component: () => import('../components/voltx/Home.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/terms',
    component: LegalView,
    meta: { fileName: 'terms' } // Matches public/terms.md
  },
  {
    path: '/conduct',
    component: LegalView,
    meta: { fileName: 'conduct' } // Matches public/conduct.md
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _from, next) => {
 const requiresAuth = to.meta.requiresAuth;
  const isEnteringAdmin = to.path.startsWith('/admin');

  if (requiresAuth && !auth.isSignedIn) {
    return next('/login');
  }

  if (isEnteringAdmin && !auth.isAdmin) {
    return next('/'); 
  }

  next();
})

export default router