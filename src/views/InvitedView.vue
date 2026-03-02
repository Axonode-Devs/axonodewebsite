<template>
  <div class="invited-container">
    <div class="content-wrapper">
      <!-- Main Header -->
      <div class="header-section">
        <div class="badge">✦ Personal Invitation</div>
        <h1 class="main-title">
          {{ userName }}, you've been
          <span class="gradient-text">invited</span>
          to <span class="gradient-text">Axonode</span>
        </h1>
        <p class="subtitle">
          This isn't a mass invite someone on our team specifically chose
          <strong>You</strong> for this.
        </p>
      </div>
      <!-- Description Section -->
      <div class="description-section">
        <h2>Why {{ userName }}?</h2>
        <div class="description-content">
          <p>
            Someone on our team came across your profile and didn't just scroll
            past, they stopped, took notice, and decided
            <strong>{{ userName }}</strong> was worth reaching out to directly.
            That doesn't happen often.
          </p>
          <p>
            When you complete your profile, your application will be marked
            <strong>"invited"</strong> in our system. That means no waiting in
            the queue, no being one of thousands you'll be reviewed as someone
            who was hand-picked, because you were.
          </p>
          <p>
            {{ userName }}, this is your moment. Don't let someone else's
            confidence in you go to waste.
          </p>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-section">
        <button
          @click="goToApply"
          class="btn btn-primary"
          :disabled="!isValid || loading"
        >
          {{ loading ? "Checking..." : `Claim Your Spot, ${userName}` }}
        </button>

        <router-link to="/" class="btn btn-secondary">
          Learn More About Axonode
        </router-link>
      </div>

      <p v-if="!isValid && !loading" class="error-message">
        This invitation link is invalid or has expired.
      </p>
    </div>

    <!-- Decorative Elements -->
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    <div class="decoration decoration-3"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { admin } from "../libs/AxonConnector";

const router = useRouter();
const route = useRoute();

const inviteToken = ref(null);
const isValid = ref(false);
const userName = ref("You"); // Default name
const loading = ref(true);

onMounted(async () => {
  // 1. Get token from URL: /invited?invite=xyz...
  inviteToken.value = route.query.invite;

  if (inviteToken.value) {
    try {
      admin
        .checkInvite(inviteToken.value)
        .then((data) => {
          if (data.valid) {
            userName.value = data.for;
            isValid.value = true;
          } else {
            isValid.value = false;
          }
          loading.value = false;
        })
        .catch(() => {
          isValid.value = false;
          loading.value = false;
        });
    } catch (err) {
      isValid.value = false;
    }
  }
  if (!isValid.value){
    router.push('/');
  }
  loading.value = false;
});

const goToApply = () => {
  // 3. Pass the token to the application form
  router.push({
    path: "/join",
    query: { invite: inviteToken.value },
  });
};
</script>

<style scoped>
.invited-container {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.content-wrapper {
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out;
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

.subtitle strong {
  color: #78dee7;
  font-weight: 600;
}

/* Benefits Section */
.benefits-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(120, 222, 231, 0.3);
  border-radius: 15px;
  padding: 30px 25px;
  text-align: center;
  transition: all 0.3s ease;
}

.benefit-card:hover {
  background: rgba(120, 222, 231, 0.1);
  border-color: rgba(120, 222, 231, 0.6);
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(120, 222, 231, 0.15);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  display: inline-block;
}

.benefit-card h3 {
  font-size: 1.3rem;
  color: #e2e8f0;
  margin-bottom: 10px;
  font-weight: 600;
}

.benefit-card p {
  color: #b0bec5;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

/* Description Section */
.description-section {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(120, 222, 231, 0.2);
  border-radius: 15px;
  padding: 40px;
  margin-bottom: 50px;
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

.description-content p:last-child {
  margin-bottom: 0;
}

.description-content strong {
  color: #78dee7;
}

/* CTA Buttons */
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
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  letter-spacing: 0.5px;
}

.btn-primary {
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  color: #0f0f1e;
  box-shadow: 0 10px 30px rgba(120, 222, 231, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 50px rgba(120, 222, 231, 0.5);
}

.btn-secondary {
  background: transparent;
  color: #78dee7;
  border: 2px solid #78dee7;
}

.btn-secondary:hover {
  background: rgba(120, 222, 231, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 15px 50px rgba(120, 222, 231, 0.3);
}

/* Decorative Elements */
.decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
}

.decoration-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #78dee7, #fe78b2);
  top: -100px;
  left: -100px;
}

.decoration-2 {
  width: 300px;
  height: 300px;
  background: #78dee7;
  bottom: 50px;
  right: -50px;
}

.decoration-3 {
  width: 250px;
  height: 250px;
  background: #fe78b2;
  top: 50%;
  right: 5%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.05rem;
  }
  .benefits-section {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  .benefit-card {
    padding: 20px 15px;
  }
  .benefit-icon {
    font-size: 2rem;
  }
  .description-section {
    padding: 25px;
  }
  .description-content p {
    font-size: 1rem;
  }
  .btn {
    padding: 12px 30px;
    font-size: 0.95rem;
  }
  .cta-section {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .invited-container {
    padding: 20px;
  }
  .main-title {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 0.95rem;
  }
  .header-section {
    margin-bottom: 40px;
  }
  .benefits-section {
    margin-bottom: 40px;
  }
  .benefit-card {
    padding: 15px 10px;
  }
  .benefit-icon {
    font-size: 1.8rem;
  }
  .benefit-card h3 {
    font-size: 1.1rem;
  }
  .benefit-card p {
    font-size: 0.9rem;
  }
  .description-section {
    padding: 20px;
    margin-bottom: 30px;
  }
  .description-section h2 {
    font-size: 1.5rem;
  }
}
</style>
