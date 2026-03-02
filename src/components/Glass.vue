<script setup>
</script>

<template>
  <div class="scene-container">
    <div class="scene-wrapper">

      <div class="sharp-orb"></div>
      
      <div class="glass-card">
        <div class="content">
          <h3>Sol Taraf</h3>
          <p>Orb şimdi sol taraftan camın arkasına süzülüyor. Bulanıklık efekti dinamik olarak uyum sağladı.</p>
          <button>Devam Et</button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.scene-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #1a1c29, #0d0e12);
}

.scene-wrapper {
  position: relative;
  width: 380px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.sharp-orb {
  position: absolute;
  
  top: -20px;   
  left: -40px; 
  
  width: 150px;
  height: 150px;
  border-radius: 50%;
  
  background: linear-gradient(135deg, #ff9966, #ff5e62);
  
  z-index: 0;
  opacity: 0.85;
  box-shadow: 0 0 30px rgba(255, 94, 98, 0.4);
}

.glass-card {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 40px;
  border-radius: 24px;
  
  background: rgba(255, 255, 255, 0.03); 
  backdrop-filter: blur(18px); 
  -webkit-backdrop-filter: blur(18px);

  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5); 
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  box-shadow: 
    0 25px 45px rgba(0, 0, 0, 0.4),
    inset 1px 1px 0px rgba(255, 255, 255, 0.15);
}

.content {
  color: white;
  text-align: center; 
  position: relative;
  z-index: 2;
}

h3 { margin-top: 0; font-size: 1.5rem; letter-spacing: 0.5px; }
p { color: rgba(255,255,255,0.65); font-size: 0.95rem; line-height: 1.6; }

button {
  margin-top: 20px;
  padding: 12px 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

button:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
</style>