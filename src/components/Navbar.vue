<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      
      <a href= "#" @click="goToHome" class="logo">
        <img src="../assets/logo.png" alt="Axonode logo" class="logo-image" />
        <span class="logo-text">Axonode</span>
      </a>

      <ul class="nav-links">
        <li v-for="item in menuItems" :key="item">
          <a :href="`#${slug(item)}`" class="nav-item" @click.prevent="scrollTo(`#${slug(item)}`)">{{ item }}</a>
        </li>
      </ul>

      <div class="nav-actions">
        <a href="https://github.com/Axonode-Devs" class="github-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
          <span class="github-text">Github</span>
        </a>

        <button class="btn-nav" @click="goToApply">
          Join Us
        </button>

        <ThemeSwitcher />

        <button class="mobile-toggle">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuItems = ['Homepage', 'About', 'Info', 'Projects', 'Contact'];
const isScrolled = ref(false);

const slug = (text) => {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
};

const scrollTo = (selector) => {
  const id = selector.startsWith('#') ? selector.slice(1) : selector;
  const el = document.getElementById(id) || document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const goToApply = () => {
  router.push('/form');
};

const goToHome = () => {
  router.push('/'); 
};
</script>

<style scoped>
:root {
  --color-1: #78dee7;
  --color-2: #95b0eb;
  --nav-bg: rgba(249, 250, 251, 0.8);
  --text-main: #111827;
  --text-muted: #4B5563;
}


.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 15px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  pointer-events: none; /* Let clicks pass through the full-width wrapper */
}

.nav-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: auto; /* Re-enable clicks for the content */
  
  /* Glass Effect */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.navbar.scrolled {
  padding: 10px 0;
}

.navbar.scrolled .nav-container {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  max-width: 1100px; /* Slight shrink effect on scroll */
}

html.dark .nav-container {
  background: rgba(29, 29, 29, 0.4);
  border-color: rgba(255, 255, 255, 0.05);
}

html.dark .navbar.scrolled .nav-container {
  background: rgba(17, 24, 39, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-image {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  position: relative;
}

.nav-item:hover {
  color: #111827;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.github-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: #111827;
  background: transparent;
  transition: background 0.15s ease, transform 0.12s ease, color 0.12s ease;
  font-weight: 600;
  font-size: 0.95rem;
  margin-right: 2rem;
}

html.dark .github-btn {
  color: #e2e8f0;
}

.github-btn i {
  font-size: 1.25rem;
  line-height: 1;
}

.github-text {
  display: inline-block;
}

.github-btn:hover {
  background: rgba(0,0,0,0.06);
  transform: translateY(-1px);
}

.btn-nav {
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: #111;
  color: white;
  transition: all 0.2s ease;
  margin-right: 2rem;
}

.btn-nav:hover {
  background-color: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #111;
}

html.dark .nav-links .nav-item {
  color: #fff;
}

@media (max-width: 960px) {
  .nav-links {
    display: none;
  }
  
  .login-link, .btn-nav {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }
  
  .nav-container {
    padding: 0 20px;
  }

  .github-btn {
  padding-right: 0rem;
 }

}

  
</style>