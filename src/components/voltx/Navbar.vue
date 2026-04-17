<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <img src="./assets/voltix-logo.png" alt="Voltix Logo" class="logo-img" @click="$router.push('/')"/>
        <span class="logo-text" @click="$router.push('/')">VoltX</span>
      </div>
      
      <div class="nav-links">
        <a href="/#home" class="nav-link">Home</a>
        <a href="/#about" class="nav-link">About Us</a>
        <a href="/#team" class="nav-link">Team</a>
        <a href="/#robots" class="nav-link">Robots</a>
        <a href="/#sponsors" class="nav-link">Sponsors</a>
      </div>
      
      <div class="nav-actions">
        <button class="btn btn-primary btn-sm">Contact Us</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4b5563;
  transition: color 0.2s ease;
}

.nav-link:hover{
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: #F1E234;
  text-decoration-thickness: 3px;
}

.nav-link:hover, .nav-link.active {
  color: #111827;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: #F1E234;
  text-decoration-thickness: 3px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-decoration: none;
  font-weight: 600;
}

.btn-sm {
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
}

.btn-primary {
  background: #111827;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .nav-links, .nav-actions {
    display: none;
  }
}
</style>
