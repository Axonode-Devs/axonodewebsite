<template>
    <div id="app">
    <Navbar />
    <HeroSection />
    <TeamMarquee />
    <About />
    <!--<Founders />-->
    
    <!--<ContactSection />-->
  </div>
</template>

<script setup>
import About from '../components/About.vue';
import HeroSection from '../components/HeroSection.vue';
import Navbar from '../components/Navbar.vue';
import TeamMarquee from '../components/TeamMarquee.vue';
import Founders from '../components/Founders.vue'
import ProjectsSection from '../components/ProjectsSection.vue';
import InfoSection from '../components/InfoSection.vue';
import ContactSection from '../components/ContactSection.vue';

</script>

<style scoped>
  .canvas-container {
  width: 100%;
  height: 100vh;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>