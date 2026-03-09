<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">

      <a href="#" @click.prevent="goToHome" class="logo">
        <img src="/titlenavbar.png" alt="Axonode" class="logo-image" />
      </a>

      <ul class="nav-links desktop-links">
        <li v-for="item in menuItems" :key="item.label">
          <a :href="item.target" class="nav-item" @click.prevent="handleNavClick(item)">
            {{ t(item.i18nKey) }}
          </a>
        </li>
      </ul>

      <div class="nav-actions desktop-actions">
        <button v-if="isLoggedIn"class="btn-text" @click="handleLoginClick">
          Dashboard
        </button>
        <LangSwitcher />
        <button class="btn-gradient" @click="goToApply">{{ t('navbar.joinUs') }}</button>
        <ThemeSwitcher />
      </div>

      <div class="mobile-right">
        <LangSwitcher />
        <ThemeSwitcher />
        <button class="mobile-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
        </button>
      </div>

    </div>

    <div class="mobile-drawer" :class="{ 'drawer-open': isMenuOpen }">
      <ul class="mobile-nav-links">
        <li v-for="item in menuItems" :key="item.label">
          <a
            :href="item.target"
            class="nav-item"
            @click.prevent="handleNavClick(item); closeMenu()"
          >{{ t(item.i18nKey) }}</a>
        </li>
      </ul>
      <div class="mobile-nav-actions">
        <button v-if="isLoggedIn" class="btn-text mobile-btn" @click="handleLoginClick(); closeMenu()">
          Dashboard
        </button>
        <button class="btn-gradient mobile-btn" @click="goToApply(); closeMenu()">
          {{ t('navbar.joinUs') }}
        </button>
      </div>
    </div>

    <div class="drawer-backdrop" :class="{ 'backdrop-visible': isMenuOpen }" @click="closeMenu"></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
import LangSwitcher from '../components/LangSwitcher.vue';
import { useRouter, useRoute } from 'vue-router';
import { admin } from '../libs/AxonConnector';

const { t } = useI18n();
const router = useRouter();
const route  = useRoute();

type NavItem =
  | { label: string; i18nKey: string; scrollTo: string; target: string }
  | { label: string; i18nKey: string; route: string;    target: string }

const menuItems: NavItem[] = [
  { label: 'Home',    i18nKey: 'navbar.home',    scrollTo: 'hero',     target: '#hero'    },
  { label: 'About',   i18nKey: 'navbar.about',   scrollTo: 'about',    target: '#about'   },
  { label: 'Groups',  i18nKey: 'navbar.groups',  scrollTo: 'whatwedo', target: '#groups'  },
  { label: 'Support', i18nKey: 'navbar.support', scrollTo: 'contact',  target: '#support' },
];

const NAV_OFFSET = 90;

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) { console.warn(`[Navbar] No element found with id="${id}"`); return; }
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
};

const scrollAfterNavigation = (id: string) => {
  let attempts = 0;
  const tryScroll = () => {
    attempts++;
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (attempts < 20) {
      setTimeout(tryScroll, 100);
    }
  };
  nextTick(() => setTimeout(tryScroll, 50));
};

const handleNavClick = async (item: NavItem) => {
  if ('scrollTo' in item) {
    if (route.path !== '/') {
      await router.push('/');
      scrollAfterNavigation(item.scrollTo);
    } else {
      scrollToSection(item.scrollTo);
    }
  } else {
    router.push(item.route);
  }
};

const isScrolled = ref(false);
const isLoggedIn = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value; };
const closeMenu  = () => { isMenuOpen.value = false; };
const handleScroll = () => { isScrolled.value = window.scrollY > 20; };

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  isLoggedIn.value = !admin.tokenExpired;
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const handleLoginClick = () => router.push(isLoggedIn.value ? '/admin' : '/login');
const goToApply        = () => router.push('/join');

const goToHome = () => {
  if (route.path === '/') {
    scrollToSection('hero');
  } else {
    router.push('/').then(() => scrollAfterNavigation('hero'));
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 1000;
  padding: 15px 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
  pointer-events: none;
}

.nav-container {
  max-width: 1500px;
  width: calc(100% - 60px);
  margin: 0 auto;
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

.navbar.scrolled { padding: 10px 0; }
.navbar.scrolled .nav-container {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

html.dark .nav-container {
  background: rgba(29, 29, 29, 0.4);
  border-color: rgba(255, 255, 255, 0.05);
}
html.dark .navbar.scrolled .nav-container {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.logo { display: flex; align-items: center; gap: 12px; text-decoration: none; pointer-events: auto; }
.logo-image { height: 30px; width: auto; object-fit: contain; display: block; }

.nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }

.nav-item {
  text-decoration: none;
  padding: 8px;
  color: #4B5563;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  position: relative;
  cursor: pointer;
}
.nav-item:hover { color: #111827; }
.nav-item::after {
  content: '';
  position: absolute;
  width: 0; height: 2px;
  bottom: -4px; left: 0;
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  transition: width 0.3s ease;
}
.nav-item:hover::after { width: 100%; }
html.dark .nav-item       { color: #d1d5db; }
html.dark .nav-item:hover { color: #fff; }

.nav-actions { display: flex; align-items: center; gap: 16px; }

.btn-text {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;
}
.btn-text:hover { color: #f3f4f6; }

html:not(.dark) .btn-text { color: #4B5563; }
html:not(.dark) .btn-text:hover { color: #111827; }

@keyframes sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

.btn-gradient {
  position: relative;
  overflow: hidden;
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 9999px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  background: linear-gradient(0deg, #2b2b2b 0%, #353535 100%);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(254, 120, 178, 0.3);
}

.btn-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  animation: sweep 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(254, 120, 178, 0.5);
  background: linear-gradient(0deg, #2b2b2b 0%, #353535 100%);
}

html.dark .btn-gradient {
  color: white;
  background: linear-gradient(0deg, #2b2b2b 0%, #353535 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .btn-gradient:hover {
  background: linear-gradient(0deg, #e8639c 0%, #5ac0c9 100%);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.mobile-right { display: none; align-items: center; gap: 10px; pointer-events: auto; }

.mobile-toggle {
  background: none; border: none;
  font-size: 1.4rem; cursor: pointer;
  color: #111; padding: 4px;
  display: flex; align-items: center; justify-content: center;
  pointer-events: auto;
}
html.dark .mobile-toggle { color: #f9fafb; }

.mobile-drawer {
  display: none;
  position: fixed;
  top: 0; right: -100%;
  width: min(320px, 80vw);
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 90px 32px 40px;
  flex-direction: column;
  gap: 0;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
  z-index: 999;
  pointer-events: auto;
}
html.dark .mobile-drawer { background: rgba(17, 24, 39, 0.98); }
.mobile-drawer.drawer-open { right: 0; }

.mobile-nav-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.mobile-nav-links .nav-item { font-size: 1.15rem; display: block; padding: 12px 8px; border-bottom: 1px solid rgba(0,0,0,0.06); }
html.dark .mobile-nav-links .nav-item { border-bottom-color: rgba(255,255,255,0.06); }

.mobile-nav-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }
.btn-text.mobile-btn,
.btn-gradient.mobile-btn { width: 100%; text-align: center; margin-bottom: 8px; }

.drawer-backdrop {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 998; opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}
.drawer-backdrop.backdrop-visible { opacity: 1; pointer-events: auto; }

@media (max-width: 960px) {
  .desktop-links, .desktop-actions { display: none; }
  .mobile-right    { display: flex; }
  .mobile-drawer   { display: flex; }
  .drawer-backdrop { display: block; }
  .nav-container { padding: 10px 20px; width: calc(100% - 32px); }
}
</style>