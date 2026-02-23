<template>
  <div class="video-container">
    <video 
      autoplay 
      muted 
      loop 
      playsinline 
      class="background-video"
    >
      <source src="../assets/code.webm" type="video/webm">
    
      <source src="../assets/code.mov" type='video/quicktime; codecs="hvc1"'>
      
      <source src="../assets/code.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script setup>

</script>

<style scoped>
.video-container {
  width: 130%;
  aspect-ratio: 16/9;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: -5%;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

</style>