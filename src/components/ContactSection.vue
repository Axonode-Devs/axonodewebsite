<template>
  <section class="contact-section" id="contact">
    <div class="background-mesh"></div>
    
    <div class="container">
      <div class="contact-wrapper">
        <div class="contact-info">
          <h2 class="title">{{ $t('contact.header.title') }}<br><span class="gradient-text">{{ $t('contact.header.gradient') }}</span></h2>
          <p class="description">
            {{ $t('contact.header.description') }}
          </p>
          
          <div class="contact-links">
            <a href="mailto:info@axonode.org" class="link-item">
              <div class="icon-box"><i class="fa-regular fa-envelope"></i></div>
              <span>info@axonode.org</span>
            </a>
          </div>
        </div>

        <div class="contact-form-container">
          <div v-if="isSubmitted" class="success-state">
            <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
            <h3>{{ $t('contact.success.sent') }}</h3>
            <p>{{ $t('contact.success.thanks') }}</p>
            <button class="btn btn-primary" @click="resetForm">{{ $t('contact.success.another') }}</button>
          </div>

          <form v-else class="glass-form" @submit.prevent="onSubmit" novalidate>
            <div class="form-group">
              <label for="name">{{ $t('contact.buttons.name') }}</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="John Doe"
                class="form-input"
                :class="{ 'input-error': errors.name }"
              />
              <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="john@example.com"
                class="form-input"
                :class="{ 'input-error': errors.email }"
              />
              <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">{{ $t('contact.buttons.message') }}</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                placeholder="Tell us about your project..."
                class="form-input"
                :class="{ 'input-error': errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
            </div>

            
            <div v-if="apiError" class="api-error">
              <i class="fa-solid fa-triangle-exclamation"></i> {{ apiError }}
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span>{{ isSubmitting ? $t('contact.buttons.sending') : $t('contact.buttons.send') }}</span>
              <span v-if="!isSubmitting" class="arrow"><i class="fa-solid fa-paper-plane"></i></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ApiError } from '../libs/AxonConnector/error';
import { public_ } from '../libs/AxonConnector'; // ← correct module

const form = reactive({ name: '', email: '', message: '' });
const errors = reactive({ name: '', email: '', message: '' });
const isSubmitting = ref(false);
const isSubmitted  = ref(false);
const apiError     = ref('');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(): boolean {
  errors.name    = form.name.trim()    ? '' : 'Name is required.';
  errors.email   = !form.email.trim()  ? 'Email is required.'
                 : !EMAIL_RE.test(form.email) ? 'Please enter a valid email.'
                 : '';
  errors.message = form.message.trim() ? '' : 'Message is required.';
  return !errors.name && !errors.email && !errors.message;
}

async function onSubmit() {
  apiError.value = '';
  if (!validate()) return;

  isSubmitting.value = true;
  try {
    await public_.submitContact({       // ← correct method
      name:    form.name.trim(),
      email:   form.email.trim(),
      message: form.message.trim(),
    });
    isSubmitted.value = true;
  } catch (err) {
    // ApiError instances carry .message directly — no .response wrapper
    apiError.value = err instanceof ApiError
      ? err.message
      : 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}

function resetForm() {
  form.name = form.email = form.message = '';
  errors.name = errors.email = errors.message = '';
  apiError.value = '';
  isSubmitted.value = false;
}
</script>

<style scoped>
.contact-section {
  position: relative;
  padding: 40px 20px 60px; /* ↓ was: 10px 20px — top reduced, bottom kept comfortable */
  background-color: #F9FAFB;
  min-height: auto; /* ↓ was: 100vh — no longer forces full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

html.dark .contact-section { background-color: #0c0c0c; }

.background-mesh {
  position: absolute;
  bottom: 0; right: 0;
  width: 100%; height: 100%;  
  background-image:
    radial-gradient(at 100% 100%, rgba(149, 176, 235, 0.25) 0px, transparent 50%),
    radial-gradient(at 0% 0%,   rgba(120, 222, 231, 0.15) 0px, transparent 50%);
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
  gap: 48px; /* ↓ was: 60px */
  align-items: center;
}

.contact-info { min-width: 0; }

.title {
  font-size: 2.6rem; /* ↓ was: 3rem */
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin-bottom: 14px; /* ↓ was: 20px */
}
html.dark .title { color: #f1f5f9; }

.gradient-text {
  background: linear-gradient(90deg, #78dee7 0%, #95b0eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1rem; /* ↓ was: 1.1rem */
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 16px; /* ↓ was: 20px */
  max-width: 400px;
}

html.dark .description { color: #9ca3af; }

.contact-links { display: flex; flex-direction: column; gap: 16px; } /* ↓ was: 20px */

.link-item {
  display: flex;
  align-items: center;
  gap: 12px; /* ↓ was: 15px */
  text-decoration: none;
  color: #4B5563;
  font-weight: 500;
  transition: all 0.2s ease;
}
html.dark .link-item { color: #cbd5e1; }
.link-item:hover { color: #111827; transform: translateX(5px); }
html.dark .link-item:hover { color: #fff; }

.icon-box {
  width: 36px; height: 36px; /* ↓ was: 40px */
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: 1px solid rgba(0,0,0,0.05);
  display: flex; align-items: center; justify-content: center;
  color: #111827;
  transition: all 0.2s ease;
  flex-shrink: 0;
}
html.dark .icon-box {
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.1);
  color: #f1f5f9;
}
.link-item:hover .icon-box {
  background: #78dee7;
  color: white;
  border-color: transparent;
}

/* ── Success state ── */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 36px; /* ↓ was: 60px 40px */
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 20px; /* ↓ was: 24px */
  gap: 10px; /* ↓ was: 12px */
}
html.dark .success-state {
  background: rgba(30,30,30,0.4);
  border-color: rgba(255,255,255,0.1);
}
.success-icon { font-size: 3rem; color: #78dee7; } /* ↓ was: 3.5rem */
.success-state h3 { font-size: 1.4rem; font-weight: 700; color: var(--text-color); margin: 0; }
.success-state p  { color: #6B7280; margin: 0; }
html.dark .success-state p { color: #9ca3af; }

/* ── Glass form ── */
.glass-form {
  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.5);
  padding: 32px; /* ↓ was: 40px */
  border-radius: 20px; /* ↓ was: 24px */
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
}
html.dark .glass-form {
  background: rgba(30,30,30,0.4);
  border-color: rgba(255,255,255,0.1);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
}

.form-group { margin-bottom: 18px; } /* ↓ was: 25px */

.form-group label {
  display: block;
  font-size: 0.82rem; /* ↓ was: 0.9rem */
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px; /* ↓ was: 8px */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
html.dark .form-group label { color: #d1d5db; }

.form-input {
  width: 100%;
  padding: 11px 14px; /* ↓ was: 14px 16px */
  border-radius: 10px; /* ↓ was: 12px */
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.6);
  color: #111827;
  font-family: inherit;
  font-size: 0.95rem; /* ↓ was: 1rem */
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}
html.dark .form-input {
  background: rgba(0,0,0,0.2);
  border-color: rgba(255,255,255,0.1);
  color: #f3f4f6;
}
.form-input:focus {
  border-color: #95b0eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(149,176,235,0.1);
}
html.dark .form-input:focus {
  background: rgba(0,0,0,0.4);
  box-shadow: 0 0 0 4px rgba(149,176,235,0.2);
}
textarea.form-input { resize: vertical; min-height: 100px; } /* ↓ was: 120px */

.input-error {
  border-color: #fe78b2 !important;
  box-shadow: 0 0 0 3px rgba(254,120,178,0.15) !important;
}

.error-msg {
  display: block;
  margin-top: 5px;
  font-size: 0.8rem; /* ↓ was: 0.82rem */
  color: #fe78b2;
  font-weight: 500;
}

.api-error {
  margin-bottom: 14px; /* ↓ was: 16px */
  padding: 10px 14px; /* ↓ was: 12px 16px */
  border-radius: 8px; /* ↓ was: 10px */
  background: rgba(254,120,178,0.1);
  border: 1px solid rgba(254,120,178,0.3);
  color: #fe78b2;
  font-size: 0.88rem; /* ↓ was: 0.9rem */
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Button ── */
.btn {
  width: 100%;
  padding: 13px; /* ↓ was: 16px */
  font-size: 0.95rem; /* ↓ was: 1rem */
  font-weight: 600;
  border-radius: 10px; /* ↓ was: 12px */
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* ↓ was: 10px */
  border: none;
}
.btn-primary {
  background: linear-gradient(135deg, #78dee7, #95b0eb);
  color: #000;
  box-shadow: 0 10px 25px rgba(120,222,231,0.2);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(120,222,231,0.3);
}
.btn-primary:active { transform: translateY(0); }
.btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .contact-wrapper { grid-template-columns: 1fr 1fr; gap: 40px; }
  .title { font-size: 2.2rem; }
  .glass-form { padding: 28px; }
}

@media (max-width: 768px) {
  .contact-section { padding: 40px 20px; }
  .contact-wrapper { grid-template-columns: 1fr; gap: 32px; }
  .contact-info { text-align: center; }
  .title { font-size: 1.9rem; margin-bottom: 12px; }
  .description { font-size: 0.95rem; margin: 0 auto 24px auto; max-width: 100%; }
  .contact-links { flex-direction: column; align-items: center; gap: 14px; }
  .glass-form { padding: 26px 22px; }
  .form-group { margin-bottom: 16px; }
  .form-input { padding: 11px 13px; font-size: 16px; }
  textarea.form-input { min-height: 90px; }
  .btn { padding: 13px; font-size: 0.92rem; }
}

@media (max-width: 480px) {
  .contact-section { padding: 32px 16px; }
  .title { font-size: 1.5rem; line-height: 1.2; margin-bottom: 10px; }
  .description { font-size: 0.88rem; margin-bottom: 20px; }
  .glass-form { padding: 20px 14px; border-radius: 14px; }
  .form-input { padding: 10px 11px; border-radius: 8px; }
  textarea.form-input { min-height: 80px; }
  .btn { padding: 11px; font-size: 0.88rem; gap: 7px; }
  .arrow { display: none; }
}

@media (max-width: 360px) {
  .contact-section { padding: 24px 12px; }
  .title { font-size: 1.3rem; }
  .glass-form { padding: 16px 10px; }
  .btn { padding: 10px; font-size: 0.83rem; }
}

@supports (backdrop-filter: blur(20px)) {
  .glass-form { background: rgba(255,255,255,0.3); }
  html.dark .glass-form { background: rgba(30,30,30,0.3); }
}
</style>