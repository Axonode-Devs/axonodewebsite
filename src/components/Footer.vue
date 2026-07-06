<template>
  <footer class="glass-footer">

    <div class="footer-left">
      <img src="/titlenavbar.png" alt="Axonode Logo">
      <span class="copyright">&copy; 2026</span>
    </div>
    
    <p class="slogan">For the network you deserve</p>

    <div class="footer-right">
      <a href="/privacy" class="footer-link">Privacy Policy</a>
      <a href="/terms" class="footer-link">Terms of Service</a>
      <a href="/conduct" class="footer-link">Code of Conduct</a>
      <a href="https://instagram.com/axonode_org" target="_blank" class="footer-link instagram-link">Instagram</a>
    </div>
  </footer>
</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');
@import url('https://fonts.cdnfonts.com/css/poppins');

.glass-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  position: relative;
  z-index: 10;
  
  background: #111111;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.footer-left img{
  width: 200px;
  height: auto;
}

.brand {
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
}

.copyright {
  color: var(--text-color2);
}

.slogan {
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-color2);
  font-weight: 500;
  white-space: nowrap;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-link {
  text-decoration: none;
  color: var(--text-color2);
  font-weight: 500;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: var(--text-color);
  transform: translateY(-1px); 
}

.instagram-link:hover {
  color: #fe78b2 !important; 
}

@media (max-width: 768px) {
  .glass-footer {
    flex-direction: column;
    gap: 16px;
    padding: 32px 20px;
    text-align: center;
  }
  
  .slogan {
    position: static;
    transform: none;
  }
  
  .footer-left {
    flex-direction: column;
    gap: 4px;
  }
  
  .footer-right {
    gap: 16px;
  }
}
</style>