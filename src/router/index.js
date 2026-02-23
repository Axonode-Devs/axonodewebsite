import { createRouter, createWebHistory } from 'vue-router'
// Sadece onAuthStateChanged'i buradan alıyoruz
import { onAuthStateChanged } from 'firebase/auth' 

// ÖNEMLİ DÜZELTME: Firebase ayar dosyasını ve auth nesnesini import et
// (Dosya yolunun '../firebase' olduğundan emin ol, src/firebase.js ise doğrudur)
import { auth } from '../firebase'

import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/form',
        name: 'ApplicationForm',
        component: () => import('../views/ApplicationForm.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/admin',
        name: 'AdminDashboard',
        component: () => import('../views/AdminDashboard.vue'),
        meta: { requiresAuth: true }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// --- GÜVENLİK KONTROLLERİ ---

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // DÜZELTME: getAuth() yerine import ettiğimiz 'auth' değişkenini kullanıyoruz
    const removeListener = onAuthStateChanged(
      auth, 
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router