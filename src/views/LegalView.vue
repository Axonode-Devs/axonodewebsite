<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import Navbar from '../components/Navbar.vue'; // Keep consistency

const route = useRoute();
const legalContent = ref('');
const loading = ref(true);

const loadMarkdown = async () => {
  loading.value = true;
  try {
    const fileName = route.meta.fileName; 
    const response = await fetch(`/${fileName}.md`);
    if (!response.ok) throw new Error('Document not found');
    const rawText = await response.text();
    legalContent.value = marked.parse(rawText);
  } catch (err) {
    legalContent.value = '<h1>Protocol Error</h1><p>The requested data could not be retrieved from the Axonode archives.</p>';
  } finally {
    loading.value = false;
  }
};

watch(() => route.path, loadMarkdown);
onMounted(loadMarkdown);
</script>

<template>
  <div class="legal-wrapper">
    <Navbar />
    

    <div class="content-container">
      <transition name="fade" mode="out-in">
        <div v-if="loading" class="loader">Accessing Axonode Protocols...</div>
        <div v-else v-html="legalContent" class="markdown-body"></div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Main Wrapper */
.legal-wrapper {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden; /* Contains the orbs */
}

/* Background Orbs - Reuse your home page logic */
.orb-bg {
  position: fixed; /* Keep them visible while scrolling */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.shared-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12; /* Slightly lower opacity so text remains readable */
}

.orb-teal {
  width: 500px;
  height: 500px;
  background: var(--accent-color);
  top: -100px;
  left: -150px;
}

.orb-pink {
  width: 400px;
  height: 400px;
  background: var(--accent-secondary);
  bottom: 10%;
  right: -100px;
}

/* Content Area */
.content-container {
  position: relative;
  z-index: 1; /* Above the orbs */
  max-width: 900px;
  margin: 0 auto;
  padding: 120px 24px 80px; /* Space for Navbar */
}

/* Markdown Styling using your CSS Variables */
.markdown-body :deep(h1) {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  /* Clean solid color from your root styles */
  color: var(--accent-color);
  border-left: 2px solid var(--accent-secondary);
  padding-left: 20px;
}   

.markdown-body :deep(h2) {
  color: var(--accent-color);
  margin-top: 2.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

.markdown-body :deep(p), .markdown-body :deep(li) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.9;
}

.markdown-body :deep(strong) {
  color: var(--accent-secondary);
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-family: monospace;
  letter-spacing: 2px;
  color: var(--accent-color);
}
</style>