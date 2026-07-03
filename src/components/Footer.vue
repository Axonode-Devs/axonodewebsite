<template>
  <footer class="glass-footer">

    <div class="footer-left">
      <span class="brand">Axonode Organization</span>
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
.glass-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  position: relative;
  z-index: 10;
  
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
}

/* Dark mode glass override */
html.dark .glass-footer {
  background: rgba(30, 30, 30, 0.4);
  border-top-color: rgba(255, 255, 255, 0.1);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand {
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.01em;
}
html.dark .brand { color: #f1f5f9; }

.copyright {
  color: #6B7280;
}
html.dark .copyright { color: #9ca3af; }

.slogan {
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #6B7280;
  font-weight: 500;
  white-space: nowrap;
}
html.dark .slogan { color: #9ca3af; }

.footer-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-link {
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  transition: all 0.2s ease;
}
html.dark .footer-link { color: #cbd5e1; }

.footer-link:hover {
  color: #111827;
  transform: translateY(-1px); 
}
html.dark .footer-link:hover { color: #fff; }

.instagram-link:hover {
  color: #fe78b2 !important; 
}
html.dark .instagram-link:hover {
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