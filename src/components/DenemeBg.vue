<template>
  <section class="hero">
    
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  min-height: 100vh;

  background-image: url("/denemebackground.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    to bottom,
    #141414 0%,
    rgba(20, 20, 20, 0.4) 10%,
    transparent 25%,
    transparent 75%,
    rgba(20, 20, 20, 0.4) 90%,
    #141414 100%
  );

  pointer-events: none;
}
</style>