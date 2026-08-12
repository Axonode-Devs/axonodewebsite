<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  // Unique key to track viewed state in localStorage
  announcementId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "What's New in Our Community!",
  },
  description: {
    type: String,
    required: true,
  },
  ctaText: {
    type: String,
    default: 'Check It Out',
  },
  ctaLink: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  delay: {
    type: Number,
    default: 800,
  },
});

const isVisible = ref(false);

onMounted(() => {
  const storageKey = `seen_announcement_${props.announcementId}`;
  const hasSeen = localStorage.getItem(storageKey);

  if (!hasSeen) {
    setTimeout(() => {
      isVisible.value = true;
    }, props.delay);
  }
});

const dismiss = () => {
  const storageKey = `seen_announcement_${props.announcementId}`;
  localStorage.setItem(storageKey, 'true');
  isVisible.value = false;
};

const handleCTA = () => {
  dismiss();
  if (props.ctaLink.startsWith('http')) {
    window.open(props.ctaLink, '_blank');
  } else {
    window.location.href = props.ctaLink;
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="announcement">
      <div v-if="isVisible" class="announcement-backdrop" @click.self="dismiss">
        <div class="announcement-card" role="dialog" aria-modal="true">
          
          <!-- Close Button -->
          <button class="close-btn" @click="dismiss" aria-label="Close">&times;</button>

          <!-- Banner Image (Optional) -->
          <div v-if="imageUrl" class="card-image">
            <img :src="imageUrl" alt="Announcement banner" />
            <div class="image-overlay"></div>
          </div>

          <!-- Body Content -->
          <div class="card-content">
            <span class="badge">🎉 Community Update</span>
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>

            <div class="card-actions">
              <button class="btn-secondary" @click="dismiss">Maybe later</button>
              <button class="btn-primary" @click="handleCTA">{{ ctaText }}</button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.announcement-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: grid;
  place-items: center;
  z-index: 9999;
  padding: 16px;
  font-family: 'Poppins', system-ui, sans-serif;
}

.announcement-card {
  position: relative;
  background-color: var(--sc-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  background: var(--trd-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--hover-bg);
  border-color: var(--accent-secondary);
  color: var(--accent-secondary);
}

.card-image {
  position: relative;
}

.card-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

/* Smooth gradient overlay to transition image into the dark surface */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, var(--sc-color), transparent);
}

.card-content {
  padding: 24px;
}

.badge {
  display: inline-block;
  background: rgba(120, 222, 231, 0.12);
  color: var(--main1-color);
  border: 1px solid rgba(120, 222, 231, 0.3);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

h2 {
  font-family: 'Coolvetica', 'Poppins', sans-serif;
  letter-spacing: 0.5px;
  margin: 0 0 10px 0;
  font-size: 1.6rem;
  color: var(--text-color);
  line-height: 1.2;
}

p {
  color: var(--text-color2);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

button {
  padding: 0.65em 1.3em;
  border-radius: 8px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* Secondary Button (Cancel / Dismiss) */
.btn-secondary {
  background-color: var(--trd-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--hover-bg);
  color: var(--text-color);
  border-color: var(--text-color2);
}

/* Primary CTA Button (Glow + Gradient) */
.btn-primary {
  background: linear-gradient(135deg, var(--main1-color), var(--main2-color));
  color: #141414;
  border: 1px solid transparent;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(120, 222, 231, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(120, 222, 231, 0.4);
  border-color: transparent;
}

/* Modal Animations */
.announcement-enter-active,
.announcement-leave-active {
  transition: opacity 0.3s ease;
}

.announcement-enter-active .announcement-card,
.announcement-leave-active .announcement-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.announcement-enter-from,
.announcement-leave-to {
  opacity: 0;
}

.announcement-enter-from .announcement-card,
.announcement-leave-to .announcement-card {
  transform: scale(0.92) translateY(15px);
}
</style>