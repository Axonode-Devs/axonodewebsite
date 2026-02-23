<template>
  <div class="mobile-backdrop" v-if="isVisible"></div>

  <div class="info-box-wrapper" v-if="isVisible">
    
    <button class="mobile-close-btn" @click="closePopup">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="info-content">
      <div class="header">
        <i class="fa-regular fa-lightbulb icon-glow"></i>
        <h3>Good To Know</h3>
      </div>
      
      <p class="intro-text">
        A little warning before you proceed with your application:
      </p>

      <ul class="info-list">
        <li>
          <div class="icon-box"><i class="fa-solid fa-book"></i></div>
          <div class="text">
            <strong>Education Team</strong>
            <span>Before you proceed with your application, we’d like to inform you about our Education Team. It is designed for beginners in group projects or software development, where participants learn core fundamentals and best practices before moving on to the Devs Team.</span>
          </div>
        </li>
        <li>
          <div class="icon-box"><i class="fa-solid fa-question"></i></div>
          <div class="text">
            <strong>What I Need To Know</strong>
            <span>Education Team invites are based to the reviews of your application form. So keep in mind that there is a possibility of being invited to the Education Team instead of the Devs Team directly.</span>
          </div>
        </li>
        <li>
          <div class="icon-box"><i class="fa-solid fa-envelope-circle-check"></i></div>
          <div class="text">
            <strong>Invitations</strong>
            <span>We will let you know when your application has reviewed via your email address so please check your inbox regularly.</span>
          </div>
        </li>
      </ul>

      <div class="mini-footer">
        <span>Good Luck! 🚀</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(true);

const closePopup = () => {
  isVisible.value = false;
};

onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      isVisible.value = true;
    }
  });
});
</script>

<style scoped>
.info-box-wrapper {
  position: relative;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 2px;
  height: fit-content;
  position: sticky;
  top: 100px;
  animation: shake 1.5s 1;
  z-index: 50;
}

.mobile-close-btn {
  display: none;
}

.mobile-backdrop {
  display: none;
}

@media (max-width: 768px) {
  .info-box-wrapper {
    position: fixed; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    z-index: 1000;
    animation: popup-enter 0.5s ease forwards;
  }

  @keyframes shake {
  }

  .mobile-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 999;
  }

  .mobile-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 32px;
    height: 32px;
    background: #3a3a3a;
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
}

@keyframes popup-enter {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.info-box-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px; 
  background: linear-gradient(135deg, #78dee7, #95b0eb, #bb85df);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 1;
}

.info-content {
  background: rgba(15, 17, 21, 0.95);
  border-radius: 14px;
  padding: 24px;
  position: relative;
  z-index: 2;
}

html:not(.dark) .info-content {
  background: rgba(255, 255, 255, 0.95);
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(150, 150, 150, 0.1);
  padding-bottom: 15px;
}

.header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #78dee7 0%, #95b0eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.icon-glow {
  font-size: 1.2rem;
  color: #FFBD2E;
  filter: drop-shadow(0 0 10px rgba(255, 189, 46, 0.5));
  animation: shake 1.5s 4;
}

@keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
}

.intro-text {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 24px;
  line-height: 1.5;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-list li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.icon-box {
  min-width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(149, 176, 235, 0.1);
  color: #95b0eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border: 1px solid rgba(149, 176, 235, 0.2);
}

.text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.text strong {
  font-size: 0.95rem;
  color: var(--text-color);
}

.text span {
  font-size: 0.8rem;
  color: #9CA3AF;
  line-height: 1.4;
}

.mini-footer {
  margin-top: 25px;
  text-align: center;
  font-weight: 600;
  color: #bb85df;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}
</style>