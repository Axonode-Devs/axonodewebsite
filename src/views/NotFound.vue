<template>
  <div class="not-found-container">
    <div class="bg-glow"></div>
    
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Page Not Found</h2>
      <p class="error-desc">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <a href="/" class="home-btn">
        <i class="fa-solid fa-arrow-left"></i>
        <span>Back to Homepage</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.error-code {
  font-family: 'Inter', sans-serif;
}

.error-desc {
  font-family: 'Helvetica', sans-serif;
}

.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;

  border-radius: 50%;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

.content {
  position: relative;
  z-index: 10;
  padding: 0 20px;
}

.error-code {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  background: linear-gradient(135deg, #78dee7 0%, #95b0eb 50%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.9;
}

.error-title {
  font-size: 2rem;
  color: #111827;
  margin: 10px 0 20px 0;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.error-desc {
  color: #4B5563;
  max-width: 400px;
  margin: 0 auto 40px auto;
  line-height: 1.6;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background-color: #111;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.home-btn:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}

@media (max-width: 600px) {
  .error-code { font-size: 6rem; }
  .error-title { font-size: 1.5rem; }
}
</style>