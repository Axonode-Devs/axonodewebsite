<template>
  <div class="invited-container">
    <div class="content-wrapper">
      <div class="header-section">
        <div class="badge">{{ $t('invited.badge') }}</div>
        <h1 class="main-title">
          {{ userName }}, {{ $t('invited.title') }}
          <span class="gradient-text">{{ $t('invited.title_highlight_invited') }}</span>
          {{ $t('invited.title_highlight_to') }} <span class="gradient-text">{{ $t('invited.title_brand') }}</span>
        </h1>
        <p class="subtitle" v-html="$t('invited.subtitle', { userName: `<strong>${userName}</strong>` })"></p>
      </div>

      <div class="description-section">
        <h2>{{ $t('invited.why_section.title', { userName }) }}</h2>
        <div class="description-content">
          <p v-html="$t('invited.why_section.paragraph_1', { userName: `<strong>${userName}</strong>` })"></p>
          <p v-html="$t('invited.why_section.paragraph_2', { invited: `<strong>${$t('invited.why_section.paragraph_2_invited')}</strong>` })"></p>
          <p v-html="$t('invited.why_section.paragraph_3', { userName: `<strong>${userName}</strong>` })"></p>
        </div>
      </div>

      <div class="cta-section">
        <button
          @click="goToApply"
          class="btn btn-primary"
          :disabled="!isValid || loading"
        >
          {{ loading ? $t('invited.cta.checking') : $t('invited.cta.claim', { userName }) }}
        </button>
        <router-link to="/" class="btn btn-secondary">
          {{ $t('invited.cta.learn_more') }}
        </router-link>
      </div>

      <p v-if="!isValid && !loading" class="error-message" role="alert">
        {{ $t('invited.error.invalid_invite') }}
      </p>
    </div>

    <div class="decoration decoration-1" aria-hidden="true"></div>
    <div class="decoration decoration-2" aria-hidden="true"></div>
    <div class="decoration decoration-3" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { public_ } from "../libs/AxonConnector";

const router = useRouter();
const route = useRoute();

const inviteToken = ref(null);
const isValid = ref(false);
const userName = ref("You");
const loading = ref(true);

onMounted(async () => {
  inviteToken.value = route.query.invite;

  if (!inviteToken.value) {
    loading.value = false;
    isValid.value = false;
    return;
  }

  try {
    // This now calls GET /api/invites/<token>/validity
    const inviteData = await public_.checkInvite(inviteToken.value);
    
    // If the request didn't throw an error, it's valid!
    // public.py returns: { id, note, expires_at }
    userName.value = inviteData.note || "You";
    isValid.value = true;
    
  } catch (err) {
    console.error("Invite check failed:", err);
    isValid.value = false;
    
    // Optional: Redirect back home if the link is dead
    // router.push({ name: 'Home', query: { error: 'invalid-invite' } });
  } finally {
    loading.value = false;
  }
});

const goToApply = () => {
  router.push({
    path: "/join",
    query: { invite: inviteToken.value },
  });
};
</script>

<style scoped>
.invited-container {
  min-height: 100dvh; /* dvh handles mobile browser chrome correctly vs 100vh */
  width: 100%;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
  contain: layout style;
}

.content-wrapper {
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Header ─────────────────────────────────────────────────────────────────── */

.header-section {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out both;
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  color: #0f0f1e;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 20px 0;
  line-height: 1.2;
  color: #e2e8f0;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #78dee7 0%, #fe78b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.subtitle {
  font-size: 1.25rem;
  color: #b0bec5;
  margin-top: 15px;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.subtitle :deep(strong) {
  color: #78dee7;
  font-weight: 600;
}

/* ─── Description ────────────────────────────────────────────────────────────── */

.description-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(120, 222, 231, 0.2);
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 50px;
}

@supports (backdrop-filter: blur(10px)) {
  .description-section {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

.description-section h2 {
  font-size: 2rem;
  color: #e2e8f0;
  margin-bottom: 25px;
  text-align: center;
}

.description-content {
  max-width: 600px;
  margin: 0 auto;
}

.description-content p {
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: center;
}

.description-content p:last-child { margin-bottom: 0; }

.description-content :deep(strong) { color: #78dee7; }

/* ─── CTA ────────────────────────────────────────────────────────────────────── */

.cta-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 15px 40px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Ensure minimum 48px touch target on mobile */
  min-height: 48px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-primary {
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  color: #0f0f1e;
  box-shadow: 0 10px 30px rgba(120, 222, 231, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #78dee7;
  border: 2px solid #78dee7;
}

/* Hover — pointer devices only, no accidental hover on touch */
@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 50px rgba(120, 222, 231, 0.5);
  }

  .btn-secondary:hover {
    background: rgba(120, 222, 231, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 15px 50px rgba(120, 222, 231, 0.3);
  }
}

/* ─── Error ──────────────────────────────────────────────────────────────────── */

.error-message {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #f87171;
}

/* ─── Decorations ────────────────────────────────────────────────────────────── */

.decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
  pointer-events: none;
}

.decoration-1 {
  width: 400px; height: 400px;
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  top: -100px; left: -100px;
}

.decoration-2 {
  width: 300px; height: 300px;
  background: #78dee7;
  bottom: 50px; right: -50px;
}

.decoration-3 {
  width: 250px; height: 250px;
  background: #fe78b2;
  top: 50%; right: 5%;
}

/* ─── Reduced motion ─────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .content-wrapper,
  .header-section {
    animation: none;
  }
}

/* ─── Tablet ─────────────────────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle { font-size: 1.05rem; }

  .description-section { padding: 25px; }

  .description-content p { font-size: 1rem; }

  .btn {
    padding: 14px 30px;
    font-size: 0.95rem;
  }

  .decoration-3 { display: none; }
}

/* ─── Mobile ─────────────────────────────────────────────────────────────────── */

@media (max-width: 480px) {
  .invited-container {
    padding: 48px 16px 64px;
  }

  .header-section {
    margin-bottom: 36px;
  }

  .main-title {
    font-size: 2rem;
    letter-spacing: -0.3px;
    line-height: 1.15;
  }

  .subtitle {
    font-size: 0.95rem;
    line-height: 1.65;
  }

  .description-section {
    padding: 20px 18px;
    margin-bottom: 30px;
    /* Kill expensive blur on low-end mobile */
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .description-section h2 {
    font-size: 1.4rem;
    margin-bottom: 18px;
  }

  .description-content p {
    font-size: 0.92rem;
    line-height: 1.75;
    /* Left-align on mobile — long centered paragraphs are hard to read */
    text-align: left;
  }

  .cta-section {
    flex-direction: column;
    gap: 12px;
    /* Stretch children so router-link <a> tags fill the width too */
    align-items: stretch;
  }

  .btn {
    width: 100%;
    padding: 12px 20px;
    font-size: 0.95rem;
    border-radius: 14px;
    /* <a> tags are inline by default — force block-level for full width */
    display: flex;
    box-sizing: border-box;
  }

  /* Decorations are invisible behind content on mobile — no need to composite them */
  .decoration { display: none; }
}
</style>