<template>
  <div class="home-container">
    <Navbar />
    <HeroSection />
    <div class="orb-section">
      <WhatWeDo />
      <DenemeBackground/>
      <!--<AboutUs />-->
      <!--<StartSection />-->
      <!--<HDivider top-margin="2px" />-->
      <ContactSection />
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script setup>
import WhatWeDo from '../components/WhatWeDo.vue';
import AboutUs from '../components/AboutUs.vue';
import HeroSection from '../components/HeroSection.vue';
import Navbar from '../components/Navbar.vue';
import HDivider from '../components/HDivider.vue'
import StartSection from '../components/StartSection.vue';
import ContactSection from '../components/ContactSection.vue';
import Footer from '../components/Footer.vue'
import DenemeBackground from '../components/DenemeBg.vue'
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


.orb-section {
  position: relative;
}

.shared-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}

.orb-teal {
  width: 600px;
  height: 600px;
  background: #78dee7;
  top: 5%;
  left: -180px;
  animation: driftA 16s ease-in-out infinite alternate;
}

.orb-pink {
  width: 500px;
  height: 500px;
  background: #fe78b2;
  bottom: 8%;
  right: -140px;
  animation: driftB 20s ease-in-out infinite alternate-reverse;
}

@keyframes driftA {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(40px, 30px) scale(1.08); }
}

@keyframes driftB {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-30px, -25px) scale(1.06); }
}
</style>