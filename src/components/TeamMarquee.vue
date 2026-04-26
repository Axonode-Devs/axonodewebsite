<template>
  <div class="marquee-container">
    <div class="marquee-label">
      <span>{{ $t('team.label.founders') }}</span>& {{ $t('team.label.team_members') }}
    </div>

    <div
      class="marquee-content"
      @mouseenter="isMobile ? null : (pause = true)"
      @mouseleave="isMobile ? null : (pause = false)"
    >
      <div class="marquee-track" :class="{ paused: pause }">
        <div
          v-for="(member, index) in combinedTeam"
          :key="'A' + index"
          class="team-card"
          @click="openModal(member)"
        >
          <img
            :src="member.avatarUrl || `https://github.com/${member.username}.png`"
            :alt="member.name"
            class="avatar"
            loading="lazy"
            width="48"
            height="48"
          />
          <div class="info">
            <h4 class="name">{{ member.name }}</h4>
            <span class="role" :style="{ color: member.color }">{{ $t(member.role) }}</span>
          </div>
        </div>
      </div>

      <!-- Duplicate track for seamless loop -->
      <div class="marquee-track" :class="{ paused: pause }" aria-hidden="true">
        <div
          v-for="(member, index) in combinedTeam"
          :key="'B' + index"
          class="team-card"
          @click="openModal(member)"
        >
          <img
            :src="member.avatarUrl || `https://github.com/${member.username}.png`"
            :alt="member.name"
            class="avatar"
            loading="lazy"
            width="48"
            height="48"
          />
          <div class="info">
            <h4 class="name">{{ member.name }}</h4>
            <span class="role" :style="{ color: member.color }">{{ $t(member.role) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="selectedMember" class="modal-overlay" @click.self="closeModal">
        <div class="modal-card" role="dialog" :aria-label="selectedMember.name">
          <button class="modal-close" @click="closeModal" aria-label="Close">✕</button>

          <div class="modal-avatar-wrap">
            <img
              :src="selectedMember.avatarUrl || `https://github.com/${selectedMember.username}.png`"
              :alt="selectedMember.name"
              class="modal-avatar"
              width="90"
              height="90"
            />
            <div class="modal-avatar-ring" :style="{ borderColor: selectedMember.color }"></div>
          </div>

          <h3 class="modal-name">{{ selectedMember.name }}</h3>
          <span class="modal-role" :style="{ color: selectedMember.color }">{{ $t(selectedMember.role) }}</span>

          <a
            :href="`https://github.com/${selectedMember.username}`"
            target="_blank"
            rel="noopener noreferrer"
            class="modal-github-btn"
          >
            <svg height="18" viewBox="0 0 16 16" width="18" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
                .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {{ $t('team.accessibility.view_github') }}
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const pause = ref(false);
const selectedMember = ref(null);
const isMobile = ref(false);

const baseTeam = [
  { name: 'Yaser Durubi', role: 'team.roles.head_productions',   username: 'kaiross12', color: '#BEECF0' },
  { name: 'Bersis Sevimli',  role: 'team.roles.head_executive',   username: 'bersisse',  color: '#A59CE6' },
  { name: 'Kaan Uygun',   role: 'team.roles.head_pr', username: 'Kaan610',   color: '#fe78b2' },
];

const combinedTeam = ref([...baseTeam, ...baseTeam]);
const openModal  = (member) => { selectedMember.value = member; };
const closeModal = ()       => { selectedMember.value = null;   };
const onKeydown = (e) => { if (e.key === 'Escape') closeModal(); };
const MOBILE_BREAKPOINT = 768;

let resizeTimer = null;
const checkMobile = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  }, 100);
};


const fetchTeam = async () => {
  const fetched = await Promise.all(
    baseTeam.map(async (member) => {
      try {
        const res = await fetch(`https://api.github.com/users/${member.username}`);
        if (!res.ok) return member;
        const data = await res.json();
        return {
          ...member,
          avatarUrl: data.avatar_url || `https://github.com/${member.username}.png`,
        };
      } catch {
        return member;
      }
    })
  );
  combinedTeam.value = [...fetched, ...fetched];
};

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(() => {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  window.addEventListener('resize', checkMobile, { passive: true });
  window.addEventListener('keydown', onKeydown);
  fetchTeam();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
  window.removeEventListener('keydown', onKeydown);
  clearTimeout(resizeTimer);
});
</script>

<style scoped>
/* ─── Marquee container ──────────────────────────────────────────────────────── */

.marquee-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 30px 0;
  background-color: transparent;
  position: relative;
  z-index: 20;
  contain: layout style;
}

/* ─── Label ──────────────────────────────────────────────────────────────────── */

.marquee-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 30px;
  width: 100%;
}

.marquee-label span {
  margin-right: -10px;
  color: #111827;
  font-weight: 700;
}

.marquee-label::before,
.marquee-label::after {
  content: '';
  height: 1px;
  flex-grow: 1;
  background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent);
}

html.dark .marquee-label { color: rgba(255, 255, 255, 0.5); }
html.dark .marquee-label span { color: #ffffff; }
html.dark .marquee-label::before,
html.dark .marquee-label::after {
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}

/* ─── Scroll track ───────────────────────────────────────────────────────────── */

.marquee-content {
  display: flex;
  overflow: hidden;
  gap: 30px;
  padding: 60px 0;
  margin: -60px 0;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  pointer-events: none;
}

.marquee-track {
  display: flex;
  gap: 30px;
  animation: scroll 50s linear infinite;
  flex-shrink: 0;
  min-width: max-content;
  pointer-events: auto;
  will-change: transform;
}

.marquee-track.paused { animation-play-state: paused; }

@keyframes scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 30px)); }
}

/* ─── Team cards ─────────────────────────────────────────────────────────────── */

.team-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 24px 10px 10px;
  background: rgba(243, 244, 246, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
              background 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

html.dark .team-card {
  background: rgba(48, 48, 48, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .team-card:hover {
    background: #ffffff;
    border-color: rgba(254, 120, 178, 0.4);
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0 15px 35px rgba(254, 120, 178, 0.15);
    z-index: 10;
  }

  html.dark .team-card:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.02) translateY(-2px);
    z-index: 10;
  }

  .modal-github-btn:hover {
    background: #3a3f45;
    transform: translateY(-2px);
  }

  /* Modal close button hover */
  .modal-close:hover { background: rgba(0, 0, 0, 0.1); color: #111827; }
  html.dark .modal-close:hover { background: rgba(255, 255, 255, 0.15); color: #f3f4f6; }
}

/* ─── Reduced motion ─────────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
    will-change: auto;
  }

  .team-card,
  .modal-github-btn,
  .modal-close {
    transition: none !important;
  }
}

/* ─── Avatars ────────────────────────────────────────────────────────────────── */

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
  aspect-ratio: 1;
}

html.dark .avatar { background: #374151; }

.info { display: flex; flex-direction: column; }

.name {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  white-space: nowrap;
}

html.dark .name { color: #f1f5f9; }

.role {
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

/* ─── Responsive ─────────────────────────────────────────────────────────────── */

@media (max-width: 768px) {
  .marquee-content {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
}

@media (max-width: 640px) {
  .team-card {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}

/* ─── Modal overlay ──────────────────────────────────────────────────────────── */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 36px 32px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

html.dark .modal-card {
  background: #1f1f1f;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  color: #6b7280;
  transition: background 0.2s ease, color 0.2s ease;
  padding: 0;
}

html.dark .modal-close {
  background: rgba(255, 255, 255, 0.08);
  color: #9ca3af;
}

.modal-avatar-wrap {
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 8px;
}

.modal-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1;
}

.modal-avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2.5px solid;
  opacity: 0.6;
}

.modal-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 4px 0 0;
  color: #111827;
}

html.dark .modal-name { color: #f1f5f9; }

.modal-role {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.modal-github-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 22px;
  background: #24292e;
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.2s ease;
}

/* ─── Modal transition ───────────────────────────────────────────────────────── */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>