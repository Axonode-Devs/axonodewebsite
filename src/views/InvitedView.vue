<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import { admin, auth } from '../libs/AxonConnector';

const apps = ref([]);
const loading = ref(true);
const activeTab = ref('pending');
const selectedApp = ref(null);
const showInviteModal = ref(false);
const inviteName = ref('');
const inviteLoading = ref(false);
const inviteSuccess = ref(null);
const copySuccess = ref(false);
const router = useRouter();

// --- HELPERS ---
const getInitials = (name) =>
  name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(new Date(dateStr));
};

const formatStatus = (status) => ({
  pending: 'Beklemede',
  approved: 'Onaylandı',
  rejected: 'Reddedildi',
  invited: 'Davet Edildi ✦',
}[status] ?? status);

const formatExperience = (val) =>
  ({ newbie: 'Beginner', junior: 'Junior', mid: 'Mid', senior: 'Senior' }[val] ?? val);

// --- DATA FETCHING ---
const fetchApps = async () => {
  if (admin.isTokenExpired) {
    alert('Session expired. Please log in again.');
    router.push('/login');
    return;
  }
  loading.value = true;
  try {
    const data = await admin.listApplications();
    apps.value = data.items;
  } catch (error) {
    console.error('Fetch error:', error);
  } finally {
    loading.value = false;
  }
};

// --- ACTIONS ---
const updateStatus = async (id, newStatus) => {
  try {
    if (newStatus === 'approved') await admin.approveApplication(id);
    else await admin.rejectApplication(id);
    await fetchApps();
    closeDetail();
  } catch (error) {
    alert('Hata: ' + (error.msg || 'İşlem başarısız.'));
  }
};

const openDetail = (app) => { selectedApp.value = app; };
const closeDetail = () => { selectedApp.value = null; };

const generateInvite = async () => {
  if (!inviteName.value.trim()) {
    alert('Lütfen bir ad girin.');
    return;
  }
  inviteLoading.value = true;
  try {
    inviteSuccess.value = await admin.createInvite(inviteName.value);
    inviteName.value = '';
  } catch (error) {
    alert('Hata: ' + (error.msg || 'Davet oluşturulamadı.'));
  } finally {
    inviteLoading.value = false;
  }
};

const copyInviteLink = async () => {
  if (!inviteSuccess.value?.invite_link) return;
  try {
    await navigator.clipboard.writeText(inviteSuccess.value.invite_link);
    copySuccess.value = true;
    setTimeout(() => { copySuccess.value = false; }, 2000);
  } catch {
    alert('Bağlantı kopyalanamadı.');
  }
};

const closeInviteModal = () => {
  showInviteModal.value = false;
  inviteSuccess.value = null;
  inviteName.value = '';
};

// --- COMPUTED ---
const pendingApps = computed(() => apps.value.filter(a => a.status === 'pending' || a.status === 'invited'));
const historyApps = computed(() => apps.value.filter(a => a.status !== 'pending' && a.status !== 'invited'));
const filteredApps = computed(() => activeTab.value === 'pending' ? pendingApps.value : historyApps.value);

onMounted(fetchApps);
</script>

<template>
  <Navbar />

  <div class="admin-page">
    <div class="bg-mesh" aria-hidden="true"></div>

    <div class="content">
      <!-- Tabs -->
      <nav class="tabs">
        <button
          v-for="tab in [{ id: 'pending', label: 'Bekleyenler', count: pendingApps.length }, { id: 'history', label: 'Geçmiş' }]"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
          <span v-if="tab.count" class="count-badge">{{ tab.count }}</span>
        </button>

        <button class="btn-invite" @click="showInviteModal = true">
          <span>+</span> Davet Oluştur
        </button>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="loading-grid">
        <div v-for="i in 6" :key="i" class="skeleton-card"></div>
      </div>

      <!-- Grid -->
      <div v-else class="apps-grid">
        <p v-if="filteredApps.length === 0" class="empty-state">
          {{ activeTab === 'pending' ? 'Bekleyen başvuru yok.' : 'Geçmiş başvuru yok.' }}
        </p>

        <article
          v-for="app in filteredApps"
          :key="app.id"
          class="app-card"
          @click="openDetail(app)"
          tabindex="0"
          @keydown.enter="openDetail(app)"
        >
          <header class="card-top">
            <div class="avatar">{{ getInitials(app.fullname) }}</div>
            <span :class="['badge', app.status]">{{ formatStatus(app.status) }}</span>
          </header>

          <h3 class="card-name">{{ app.fullname }}</h3>

          <div class="tags">
            <span class="tag primary">{{ app.main_interest }}</span>
            <span v-if="app.sub_interest?.length" class="tag muted">+{{ app.sub_interest.length }}</span>
          </div>

          <footer class="card-footer">
            <time>{{ formatDate(app.created_at) }}</time>
            <span class="arrow">Detay →</span>
          </footer>
        </article>
      </div>
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedApp" class="overlay" @click.self="closeDetail" role="dialog" aria-modal="true">
          <div class="modal">
            <div class="modal-body">
              <div class="modal-head">
                <div>
                  <h2>{{ selectedApp.fullname }}</h2>
                  <p class="muted">{{ selectedApp.email }}</p>
                </div>
                <button class="close-btn" @click="closeDetail" aria-label="Kapat">✕</button>
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <label>Deneyim</label>
                  <p>{{ formatExperience(selectedApp.experience_level) }}</p>
                </div>
                <div class="info-item">
                  <label>İngilizce</label>
                  <p>{{ selectedApp.english_level || '—' }}</p>
                </div>
              </div>

              <div class="section">
                <label>İlgi Alanları</label>
                <div class="tags large">
                  <span class="tag primary">{{ selectedApp.main_interest }}</span>
                  <span v-for="sub in selectedApp.sub_interest" :key="sub" class="tag">{{ sub }}</span>
                </div>
              </div>

              <div class="section reason-box">
                <label>Neden Katılmak İstiyor</label>
                <p>{{ selectedApp.reason || 'Belirtilmemiş' }}</p>
              </div>
            </div>

            <div v-if="activeTab === 'pending'" class="modal-actions">
              <button class="btn danger" @click="updateStatus(selectedApp.id, 'rejected')">Reddet</button>
              <button class="btn success" @click="updateStatus(selectedApp.id, 'approved')">Onayla</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Invite Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showInviteModal" class="overlay" @click.self="closeInviteModal" role="dialog" aria-modal="true">
          <div class="modal">
            <div class="modal-body">
              <div class="modal-head">
                <div>
                  <h2>Davet Oluştur</h2>
                  <p class="muted">Yeni bir davetiye bağlantısı oluşturun</p>
                </div>
                <button class="close-btn" @click="closeInviteModal" aria-label="Kapat">✕</button>
              </div>

              <Transition name="fade" mode="out-in">
                <div v-if="!inviteSuccess" key="form" class="invite-form">
                  <label class="field-label" for="invite-name">Ad / Not</label>
                  <input
                    id="invite-name"
                    v-model="inviteName"
                    type="text"
                    placeholder="Örn: John Doe"
                    class="field-input"
                    @keyup.enter="generateInvite"
                  />
                </div>

                <div v-else key="success" class="invite-success">
                  <p class="success-msg">✓ Davetiye oluşturuldu!</p>
                  <div class="link-row">
                    <input type="text" :value="inviteSuccess.invite_link" readonly class="link-input" />
                    <button :class="['btn-copy', { copied: copySuccess }]" @click="copyInviteLink">
                      {{ copySuccess ? '✓' : 'Kopyala' }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <div class="modal-actions">
              <template v-if="!inviteSuccess">
                <button class="btn secondary" @click="closeInviteModal">İptal</button>
                <button class="btn success" :disabled="inviteLoading" @click="generateInvite">
                  {{ inviteLoading ? 'Oluşturuluyor…' : 'Oluştur' }}
                </button>
              </template>
              <template v-else>
                <button class="btn success" @click="closeInviteModal">Kapat</button>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── Tokens ────────────────────────────────────────────── */
:root {
  --c-cyan:    #78dee7;
  --c-blue:    #95b0eb;
  --c-purple:  #bb85df;
  --c-green:   #27c93f;
  --c-red:     #ff5f56;
  --c-yellow:  #ffbd2e;

  --bg:        #f9fafb;
  --surface:   rgba(255, 255, 255, 0.85);
  --border:    rgba(0, 0, 0, 0.07);
  --text:      #111827;
  --text-muted:#6b7280;

  --radius:    14px;
  --shadow-sm: 0 2px 10px rgba(0,0,0,0.06);
  --shadow-md: 0 12px 40px rgba(0,0,0,0.12);
}

html.dark {
  --bg:        #0f1115;
  --surface:   rgba(28, 28, 35, 0.85);
  --border:    rgba(255, 255, 255, 0.07);
  --text:      #f3f4f6;
  --text-muted:#9ca3af;
}

/* ── Page ──────────────────────────────────────────────── */
.admin-page {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  padding: 8rem 40px 60px;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  overflow-x: hidden;
}

.bg-mesh {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 85% 10%, rgba(187,133,223,.14), transparent 55%),
    radial-gradient(circle at 10% 90%, rgba(120,222,231,.10), transparent 55%);
  pointer-events: none;
  z-index: 0;
}
html.dark .bg-mesh { filter: blur(60px); }

.content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Tabs ──────────────────────────────────────────────── */
.tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 28px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tab-btn:hover { background: rgba(0,0,0,0.04); color: var(--text); }
.tab-btn.active { background: rgba(120,222,231,0.12); color: var(--c-cyan); }

.count-badge {
  background: var(--c-red);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 20px;
}

.btn-invite {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.btn-invite:hover {
  border-color: var(--c-blue);
  box-shadow: 0 0 0 3px rgba(149,176,235,0.15);
}

/* ── Grid ──────────────────────────────────────────────── */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 20px;
}

.empty-state {
  grid-column: 1/-1;
  text-align: center;
  color: var(--text-muted);
  padding: 80px 0;
  font-size: 1rem;
}

/* ── Skeleton ──────────────────────────────────────────── */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 20px;
}
.skeleton-card {
  height: 180px;
  border-radius: var(--radius);
  background: linear-gradient(90deg, var(--border) 25%, rgba(0,0,0,0.03) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Card ──────────────────────────────────────────────── */
.app-card {
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: var(--shadow-sm);
  outline: none;
}
.app-card:hover,
.app-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(149,176,235,0.4);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-cyan), var(--c-blue));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.card-name {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}
.tag {
  padding: 3px 9px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 500;
  background: rgba(149,176,235,0.12);
  color: var(--c-blue);
}
.tag.primary { background: rgba(120,222,231,0.12); color: var(--c-cyan); }
.tag.muted   { background: transparent; border: 1px solid var(--border); color: var(--text-muted); }

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  color: var(--text-muted);
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
.arrow {
  color: var(--c-blue);
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s;
}
.app-card:hover .arrow,
.app-card:focus-visible .arrow { opacity: 1; }

/* ── Status Badge ──────────────────────────────────────── */
.badge {
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.badge.pending  { background: rgba(255,189,46,0.14); color: var(--c-yellow); }
.badge.invited  { background: rgba(120,222,231,0.14); color: var(--c-cyan); }
.badge.approved { background: rgba(39,201,63,0.14);  color: var(--c-green); }
.badge.rejected { background: rgba(255,95,86,0.14);  color: var(--c-red); }

/* ── Modal / Overlay ───────────────────────────────────── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(6px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  background: var(--surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 18px;
  width: 100%;
  max-width: 560px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.modal-body { padding: 28px; }

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}
.modal-head h2 { margin: 0; font-size: 1.5rem; }
.modal-head .muted { color: var(--text-muted); margin: 4px 0 0; font-size: 0.9rem; }

.close-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}
.close-btn:hover { background: rgba(0,0,0,0.06); color: var(--text); }

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
.info-item label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.info-item p { margin: 0; font-weight: 500; }

.section { margin-top: 20px; }
.section label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.reason-box {
  background: rgba(120,222,231,0.08);
  border-left: 3px solid var(--c-cyan);
  padding: 14px 16px;
  border-radius: 0 8px 8px 0;
}
.reason-box p { margin: 0; line-height: 1.65; font-size: 0.95rem; }

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 16px 28px;
  border-top: 1px solid var(--border);
  background: rgba(0,0,0,0.02);
}
.modal-actions .btn { flex: 1; justify-content: center; }

/* ── Buttons ───────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 11px 20px;
  border-radius: 9px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
}
.btn:active { transform: scale(0.98); }
.btn:hover  { filter: brightness(1.08); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn.success   { background: var(--c-green); color: #fff; }
.btn.danger    { background: var(--c-red);   color: #fff; }
.btn.secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}
.btn.secondary:hover { border-color: var(--c-blue); }

/* ── Invite form ───────────────────────────────────────── */
.invite-form { margin-top: 4px; }
.field-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.field-input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  background: rgba(0,0,0,0.02);
  color: var(--text);
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field-input:focus {
  outline: none;
  border-color: var(--c-blue);
  box-shadow: 0 0 0 3px rgba(149,176,235,0.15);
}
html.dark .field-input { background: rgba(255,255,255,0.04); }

.invite-success { text-align: center; padding: 12px 0 4px; }
.success-msg {
  color: var(--c-green);
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 16px;
}
.link-row { display: flex; gap: 8px; }
.link-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid rgba(120,222,231,0.3);
  border-radius: 8px;
  background: rgba(120,222,231,0.06);
  color: var(--text);
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  min-width: 0;
}
.link-input:focus { outline: none; border-color: var(--c-cyan); }

.btn-copy {
  padding: 10px 16px;
  background: var(--c-cyan);
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
}
.btn-copy:hover:not(.copied) { background: #5bccd6; }
.btn-copy.copied { background: var(--c-green); color: #fff; }

/* ── Transitions ───────────────────────────────────────── */
.modal-enter-active,
.modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from,
.modal-leave-to { opacity: 0; transform: scale(0.97) translateY(8px); }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 640px) {
  .admin-page { padding: 7rem 18px 40px; }
  .info-grid  { grid-template-columns: 1fr; }
  .modal-actions { flex-direction: column; }
  .link-row   { flex-direction: column; }
}
</style>