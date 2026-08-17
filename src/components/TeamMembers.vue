<template>
  <div class="team-container">
    <div class="team-label">
      <h2 class="middle-title">
        <span class="founders-text">{{ $t('team.label.founders') }}</span>& {{ $t('team.label.team_members') }}
      </h2>
    </div>

    <div class="team-content">
      <div
        v-for="(member, index) in teamMembers"
        :key="index"
        class="team-card"
        @click="openModal(member)"
        :style="{
          '--member-color': member.color,
          'animation-delay': `${index * 0.15}s`
        }"
      >
        <div class="avatar-wrapper">
          <img
            :src="member.avatarUrl || `https://github.com/${member.username}.png`"
            :alt="member.name"
            class="avatar"
            loading="lazy"
            width="32"
            height="32"
          />
        </div>
        <div class="info">
          <h4 class="name">{{ member.name }}</h4>
          <span class="role" :style="{ color: member.color }">{{ $t(member.role) }}</span>
        </div>
      </div>
    </div>
  </div>

  <Transition name="modal">
    <div v-if="selectedMember" class="modal-overlay" @click.self="closeModal">
      <div
        ref="modalCardRef"
        class="modal-card"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="'member-name-' + selectedMember.username"
        :aria-describedby="'member-bio-' + selectedMember.username"
        :style="{ '--member-color': selectedMember.color }"
        tabindex="-1"
      >
        <button class="modal-close" @click="closeModal" aria-label="Close">✕</button>

        <div class="modal-id-header">
          <div class="modal-avatar-wrap">
            <img
              :src="selectedMember.avatarUrl || `https://github.com/${selectedMember.username}.png`"
              :alt="selectedMember.name"
              class="modal-avatar"
              width="90"
              height="90"
            />
          </div>
          <div class="modal-id-text">
            <h3 :id="'member-name-' + selectedMember.username" class="modal-name">
              {{ selectedMember.name }}
            </h3>
            <span class="modal-role">{{ $t(selectedMember.role) }}</span>
          </div>
        </div>

        <div class="modal-divider" aria-hidden="true"></div>

        <!-- DETAILS -->
        <div class="modal-body">
          <p :id="'member-bio-' + selectedMember.username" class="modal-bio">
            {{ $t(selectedMember.bio_key) }}
          </p>

          <div class="links-list">
            <a
              v-for="(link, idx) in selectedMember.links"
              :key="idx"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link-item"
            >
              <span class="link-label">{{ link.label }}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h10v10M7 17L17 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const selectedMember = ref(null);
const modalCardRef = ref(null);
let lastFocusedEl = null;

const baseTeam = [
  {
    name: 'Yaser Durubi',
    role: 'team.roles.head_productions',
    username: 'kaiross12',
    color: '#a59ce6',
    bio_key: 'team.bios.yaser_durubi',
    links: [
      { label: 'GitHub', url: 'https://github.com/kaiross12' },
      { label: 'Discord', url: 'https://discord.com/users/832944025216352287' },
      { label: 'Instagram', url: 'https://www.instagram.com/yaserr_d/' },
    ]
  },
  {
    name: 'Bersis Sevimli',
    role: 'team.roles.head_executive',
    username: 'bersisse',
    color: '#78dee7',
    bio_key: 'team.bios.bersis_sevimli',
    links: [
      { label: 'GitHub', url: 'https://github.com/bersisse' },
      { label: 'LinkedIn', url: '#' },
    ]
  },
  {
    name: 'Kaan Uygun',
    role: 'team.roles.head_pr',
    username: 'Kaan610',
    color: '#fe78b0',
    bio_key: 'team.bios.kaan_uygun',
    links: []
  },
];

const teamMembers = ref([...baseTeam]);

const openModal = (member) => {
  lastFocusedEl = document.activeElement;
  selectedMember.value = member;
  document.body.style.overflow = 'hidden';
  nextTick(() => {
    modalCardRef.value?.focus();
  });
};

const closeModal = () => {
  selectedMember.value = null;
  document.body.style.overflow = '';
  lastFocusedEl?.focus?.();
};

const FOCUSABLE = 'a[href], button:not([disabled])';

const onKeydown = (e) => {
  if (!selectedMember.value) return;

  if (e.key === 'Escape') {
    closeModal();
    return;
  }

  if (e.key === 'Tab' && modalCardRef.value) {
    const focusables = modalCardRef.value.querySelectorAll(FOCUSABLE);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
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
  teamMembers.value = fetched;
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  fetchTeam();
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.team-container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 20px 0;
  background-color: transparent;
  position: relative;
  z-index: 2;
  contain: layout style;
}

.team-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-color2);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 10px;
  width: 100%;
  flex-wrap: wrap;
}

.team-label span {
  margin-right: 4px;
  color: var(--text-color);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.team-label span + .founders-text {
  margin-left: 8px;
}

.team-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
}


.team-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px 14px 12px;
  background: var(--sc-color);
  border: 1.2px solid var(--border-color);
  border-radius: 55px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  opacity: 0;
  transform: translateY(20px);
  animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.avatar-wrapper {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  border: 2px solid var(--trd-color);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--trd-color);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.info { display: flex; flex-direction: column; min-width: 0; }

.name {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  margin: 0 0 0px 0;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.role {
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
  font-family: 'Poppins', sans-serif;
}

@media (hover: hover) and (pointer: fine) {
  .team-card:hover {
    transform: translateY(-8px) scale(1.04);
    z-index: 10;
    border-color: var(--member-color);
    background: var(--trd-color);
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    transform: rotate(90deg) scale(1.1);
  }

  .link-item:hover {
    background: var(--trd-color);
    border-color: var(--member-color);
    color: var(--member-color);
  }
}

@media (hover: none) and (pointer: coarse) {
  .team-card:active {
    transform: scale(0.97);
    border-color: var(--member-color);
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-card {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  .avatar, .modal-close {
    transition: none !important;
  }
}

@media (max-width: 768px) {
  .team-container {
    padding: 36px 16px 0;
  }
  .team-label {
    font-size: 0.7rem;
    margin-bottom: 32px;
    gap: 12px;
  }
  .team-content {
    gap: 18px;
    padding: 12px;
  }
  .team-card {
    gap: 12px;
    padding: 10px 18px 10px 8px;
  }
  .avatar-wrapper {
    width: 46px;
    height: 46px;
  }
  .name { font-size: 0.95rem; font-weight: 700; }
  .role { font-size: 0.65rem; }

  .modal-card {
    padding: 24px 20px 28px;
    max-width: 92%;
  }
  .modal-id-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  .modal-name {
    font-size: 1.15rem;
  }
  .modal-bio {
    font-size: 0.9rem;
    line-height: 1.55;
  }
  .links-list {
    flex-direction: column;
  }
  .link-item {
    padding: 9px 12px;
    font-size: 0.8rem;
  }
  .middle-title {
    font-size: clamp(1.1rem, 4vw, 1.8rem);
  }
}

/* ============ MODAL ============ */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%);
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
  background: var(--sc-color);
  border-radius: 24px;
  padding: 32px 32px 36px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.3);
  max-height: 90dvh;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid var(--border-color);
}

.modal-card:focus {
  outline: none;
}

.modal-card:focus-visible {
  outline: 2px solid var(--member-color, var(--main3-color));
  outline-offset: 3px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--text-color2);
  transition: all 0.3s ease;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

.modal-close:focus-visible {
  outline: 2px solid var(--member-color, var(--main3-color));
  outline-offset: 2px;
}

/* Identity header: photo + name/role side by side, like the front of a badge */
.modal-id-header {
  display: flex;
  align-items: center;
  gap: 18px;
}

.modal-avatar-wrap {
  position: relative;
  width: 76px;
  height: 76px;
  flex-shrink: 0;
}

.modal-avatar {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  border: 2px solid var(--member-color, var(--trd-color));
}

.modal-id-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.modal-name {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: var(--text-color);
  letter-spacing: -0.01em;
  line-height: 1.15;
}

.modal-role {
  align-self: flex-start;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--member-color);
  background: color-mix(in srgb, var(--member-color) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--member-color) 35%, transparent);
  padding: 4px 8px;
  border-radius: 50px;
}

/* Divider reads like a perforation line on an ID card */
.modal-divider {
  height: 1px;
  margin: 24px 0 20px;
  background: repeating-linear-gradient(
    to right,
    var(--border-color) 0,
    var(--border-color) 6px,
    transparent 6px,
    transparent 12px
  );
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-color2);
  margin: 0;
  font-weight: 400;
}

.links-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-color2);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.link-item:focus-visible {
  outline: 2px solid var(--member-color, var(--main3-color));
  outline-offset: 2px;
}

.link-item svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    transform: none;
  }
}
</style>