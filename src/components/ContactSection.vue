<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="contact-content">
        <p class="eyebrow">{{ $t('contact.header.eyebrow') }}</p>
        <h2 class="title">
          {{ $t('contact.header.title') }}
          <span class="gradient-text">{{ $t('contact.header.gradient') }}</span>
        </h2>
        <p class="description">
          {{ $t('contact.header.description') }}
        </p>

        <div class="contact-links">
          <a href="mailto:contact@contact.axonode.org" class="link-item">
            <div class="icon-box"><i class="fa-regular fa-envelope"></i></div>
            <span>contact@contact.axonode.org</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.contact-section {
  position: relative;
  padding: 60px 20px 80px;
  
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.background-mesh {
  position: absolute;
  inset: 0;
  filter: blur(80px);
  pointer-events: none;
}

.container {
  width: 100%;
  max-width: 760px;
  position: relative;
  z-index: 10;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #78dee7;
}

.title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #f9fafb;
  line-height: 1.15;
  margin: 0 0 12px;
}

.gradient-text {
  display: block;
  background: linear-gradient(90deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1rem;
  color: #cbd5e1;
  line-height: 1.7;
  margin: 0 0 24px;
  max-width: 600px;
}

.contact-links {
  display: flex;
  justify-content: center;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-radius: 999px;
  text-decoration: none;
  color: #f9fafb;
  font-weight: 600;
  background: rgba(120, 222, 231, 0.12);
  border: 1px solid rgba(120, 222, 231, 0.25);
  transition: all 0.2s ease;
}

.link-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px -12px rgba(254, 120, 176, 0.32);
}

.icon-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .contact-section { padding: 48px 16px 64px; }
  .title { font-size: 1.8rem; }
  .description { font-size: 0.95rem; }
}

@media (max-width: 480px) {
  .contact-section { padding: 40px 12px 56px; }
  .title { font-size: 1.5rem; }
  .description { font-size: 0.9rem; }
  .link-item { width: 100%; justify-content: center; }
}
</style>