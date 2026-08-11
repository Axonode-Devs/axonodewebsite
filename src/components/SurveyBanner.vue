<template>
  <div class="survey-banner-container">
    <div class="survey-banner" @click="goToSurvey">
      <div class="banner-text-content">
        <h1 class="title">{{ $t('survey.banner.title') }}</h1>
        <p class="subtitle">{{ $t('survey.banner.subtitle') }}</p>
      </div>
      <div class="banner-graphics-content">
        <div class="sunburst-bg"></div>
        <div class="floating-window">
          <div class="ui-block-top">
            <span class="dot pink-dot"></span>
          </div>
          <div class="ui-body">
            <div class="ui-left-col">
              <div class="ui-row">
                <div class="ui-line"></div>
                <span class="dot pink-dot"></span>
              </div>
              <div class="ui-row">
                <div class="ui-line short"></div>
                <span class="dot cyan-dot"></span>
              </div>
              <div class="ui-cyan-bar"></div>
              <div class="ui-row bottom-row">
                 <span class="dot purple-dot"></span>
              </div>
            </div>
            <div class="ui-right-col"></div>
          </div>
        </div>
        <font-awesome-icon icon="fa-solid fa-star" class="decoration star" />
        <font-awesome-icon icon="fa-solid fa-bolt" class="decoration lightning" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const goToSurvey = () =>{
    router.push('/survey')
}

</script>

<style scoped>
.survey-banner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #0a0a0a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.survey-banner {
  position: relative;
  width: 100%;
  max-width: 800px;
  /* FIX 1: Allow banner to expand if text needs space */
  min-height: 250px; 
  height: auto;
  background-color: #171717;
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

/* --- Left Text Section --- */
.banner-text-content {
  flex: 1 1 50%;
  /* FIX 2: Prevents text container from overflowing flexbox */
  min-width: 0; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 20px 30px 40px;
  z-index: 2;
}

.title {
  color: #df6098;
  /* FIX 3: Fluid font size that scales nicely based on container/viewport */
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
  line-height: 1.15;
  /* FIX 4: Safety valve for very long words */
  overflow-wrap: break-word;
}

.subtitle {
  color: #e5e5e5;
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
  /* FIX 5: Controls line-wrapping naturally without needing <br> */
  max-width: 280px; 
}

/* --- Right Graphics Section --- */
.banner-graphics-content {
  flex: 1 1 50%;
  /* FIX 6: Don't squish graphics when text grows */
  flex-shrink: 0; 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 220px;
}

/* Background & Floating UI elements remain unchanged */
.sunburst-bg {
  position: absolute;
  top: -50%;
  left: 0;
  width: 150%;
  height: 200%;
  background: repeating-conic-gradient(
    from 15deg,
    #cf4f90 0deg 15deg,
    transparent 15deg 30deg
  );
  transform: translateX(-10%);
  z-index: 0;
}

.floating-window {
  position: relative;
  width: 260px;
  height: 160px;
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  border-radius: 12px;
  border: 2px solid #333;
  box-shadow: -15px 15px 25px rgba(0, 0, 0, 0.6);
  transform: rotate(-6deg);
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  z-index: 1;
}

.ui-block-top {
  height: 30px;
  background-color: #333;
  border-radius: 6px;
  margin-bottom: 10px;
  position: relative;
}

.ui-block-top .dot {
  position: absolute;
  right: 10px;
  top: 10px;
}

.ui-body {
  display: flex;
  flex: 1;
  gap: 10px;
}

.ui-left-col {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

.ui-right-col {
  flex: 1;
  background-color: #333;
  border-radius: 6px;
}

.ui-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.ui-line {
  height: 10px;
  background-color: #333;
  border-radius: 6px;
  width: 80%;
}

.ui-line.short {
  width: 60%;
}

.ui-cyan-bar {
  height: 14px;
  background: linear-gradient(90deg, #6ae7e2, #b5fcfc);
  border-radius: 8px;
  margin-top: 5px;
  box-shadow: 0 0 10px rgba(106, 231, 226, 0.4);
}

.bottom-row {
  height: 10px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.pink-dot { background-color: #df6098; }
.cyan-dot { background-color: #6ae7e2; }
.purple-dot { background-color: #8c60df; }

.decoration {
  position: absolute;
  font-size: 30px;
  z-index: 2;
  filter: drop-shadow(0 5px 5px rgba(0,0,0,0.5));
}

.decoration.star {
  top: 15px;
  left: 20px;
  transform: rotate(-15deg);
}

.decoration.lightning {
  bottom: 15px;
  right: 15px;
  transform: rotate(15deg);
}

/* Responsive adjustments */
@media (max-width: 650px) {
  .survey-banner {
    flex-direction: column;
  }
  .banner-text-content {
    padding: 30px 20px 10px 20px;
    align-items: center;
    text-align: center;
  }
  .subtitle {
    max-width: 100%;
  }
  .banner-graphics-content {
    padding: 30px 0;
    width: 100%;
  }
  .sunburst-bg {
    left: -50%;
    width: 200%;
  }
}
</style>