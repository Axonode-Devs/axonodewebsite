<template>
  <section class="contact-section" id="contact">
    <div class="background-mesh"></div>
    
    <div class="container">
      <div class="contact-wrapper">
        <div class="contact-info">
          <h2 class="title">Let's Build <br><span class="gradient-text">Something Great</span></h2>
          <p class="description">
            Have an idea or want to join the Axonode core team? Drop us a line. We are always looking for new perspectives.
          </p>
          
          <div class="contact-links">
            <a href="#" class="link-item">
              <div class="icon-box"><i class="fa-regular fa-envelope"></i></div>
              <span>info@axonode.org</span>
            </a>
            <a href="/form" class="link-item">
              <div class="icon-box"><i class="fa-brands fa-discord"></i></div>
              <span>Join Discord</span>
            </a>
            <a href="https://github.com/Axonode-Devs" class="link-item">
              <div class="icon-box"><i class="fa-brands fa-github"></i></div>
              <span>Axonode Devs</span>
            </a>
          </div>
        </div>

        <div class="contact-form-container">
          <form class="glass-form" @submit.prevent>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" placeholder="John Doe" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" class="form-input">
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" rows="4" placeholder="Tell us about your project..." class="form-input"></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
              <span>Send Message</span>
              <span class="arrow"><i class="fa-solid fa-paper-plane"></i></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.contact-section {
  position: relative;
  padding: 100px 20px;
  background-color: #F9FAFB;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

html.dark .contact-section {
  background-color: #0c0c0c;
}

.background-mesh {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(at 100% 100%, rgba(149, 176, 235, 0.25) 0px, transparent 50%),
    radial-gradient(at 0% 0%, rgba(120, 222, 231, 0.15) 0px, transparent 50%);
  filter: blur(80px);
  pointer-events: none;
}

.container {
  max-width: 1100px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: center;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 20px;
}

html.dark .title {
  color: #f1f5f9;
}

.gradient-text {
  background: linear-gradient(90deg, #78dee7 0%, #95b0eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1.1rem;
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 400px;
}

html.dark .description {
  color: #9ca3af;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  transition: all 0.2s ease;
}

html.dark .link-item { color: #cbd5e1; }

.link-item:hover {
  color: #111827;
  transform: translateX(5px);
}

html.dark .link-item:hover { color: #fff; }

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  transition: all 0.2s ease;
}

html.dark .icon-box {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.link-item:hover .icon-box {
  background: #78dee7;
  color: white;
  border-color: transparent;
}

.glass-form {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
}

html.dark .glass-form {
  background: rgba(30, 30, 30, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

html.dark .form-group label { color: #d1d5db; }

.form-input {
  width: 100%;
  max-width: 450px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255, 255, 255, 0.6);
  color: #111827;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
}

html.dark .form-input {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
  color: #f3f4f6;
}

.form-input:focus {
  border-color: #95b0eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(149, 176, 235, 0.1);
}

html.dark .form-input:focus {
  background: rgba(0, 0, 0, 0.4);
}

textarea.form-input {
  resize: vertical;
  min-height: 120px;
  width: 450px;
}

.btn {
  width: 100%;
  padding: 16px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-primary {
  border: none;
  background-color: #111;
  color: white;
}

.btn-primary:hover {
  background-color: #333;
  transform: translateY(-2px);
}

html.dark .btn-primary {
  background-color: #fff;
  color: #111;
}

html.dark .btn-primary:hover {
  background-color: #e5e7eb;
}

@media (max-width: 850px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-info {
    text-align: center;
  }
  
  .description {
    margin: 0 auto 40px auto;
  }
  
  .contact-links {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .glass-form {
    padding: 25px;
  }
}
</style>