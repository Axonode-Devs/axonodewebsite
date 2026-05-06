<template>
  <Navbar />
  <div class="admin-page">
    <div class="background-mesh"></div>
    
    <div class="content-wrapper">
      <!-- Action Error Alert -->
      <Transition name="fade">
        <div v-if="actionError" class="api-error">
          <i class="fa-solid fa-triangle-exclamation"></i> 
          <span>{{ actionError }}</span>
          <button @click="actionError = ''" class="close-error">×</button>
        </div>
      </Transition>

      <div class="tabs">
        <button
          :class="['tab-btn', { active: activeTab === 'pending' }]"
          @click="activeTab = 'pending'"
        >
          Bekleyenler
          <span v-if="pendingCount > 0" class="count-badge">{{ pendingCount }}</span>
        </button>
        <button
          :class="['tab-btn', { active: activeTab === 'history' }]"
          @click="activeTab = 'history'"
        >
          Geçmiş
        </button>

        <button class="btn-end" @click="showInviteModal = true">
          <i class="fa-solid fa-plus"></i> Davet Oluştur
        </button>
      </div>

      <!-- Apps Grid -->
      <div v-if="loading && apps.length === 0" class="loader-container">
        <div class="spinner"></div>
      </div>

      <div v-else class="apps-grid">
        <div v-if="apps.length === 0" class="empty-state">
          <p class="empty-message">
            {{ activeTab === "pending" ? "Bekleyen başvuru bulunamadı." : "Geçmiş başvuru bulunamadı." }}
          </p>
        </div>

        <div
          v-for="app in apps"
          :key="app.id"
          class="app-card"
          @click="openDetail(app)"
        >
          <div class="card-header-top">
            <div class="avatar-placeholder">
              {{ getInitials(app.fullname) }}
            </div>
            <span :class="['status-badge', app.status]">{{ formatStatus(app.status) }}</span>
          </div>
          <h3 class="applicant-name">{{ app.fullname }}</h3>

          <div class="tags">
            <span class="tag main">{{ app.profile?.main_interest }}</span>
            <span v-if="app.profile?.sub_interest?.length" class="tag more">
              +{{ app.profile.sub_interest.length }}
            </span>
          </div>

          <div class="card-footer">
            <span class="date">{{ formatDate(app.created_at) }}</span>
            <span class="click-hint">Detay →</span>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="load-more-wrapper">
        <button @click="loadMore" :disabled="loading" class="btn btn-secondary">
          {{ loading ? 'Yükleniyor...' : 'Daha Fazla Yükle' }}
        </button>
      </div>
    </div>

    <!-- Application Detail Modal -->
    <div v-if="selectedApp" class="modal-overlay" @click.self="closeDetail">
      <div class="modal-container">
        <div class="modal-card">
          <div class="modal-body">
            <h2>{{ selectedApp.fullname }}</h2>
            <p class="applicant-email">{{ selectedApp.email }}</p>

            <div class="info-grid">
              <div class="info-item">
                <label>Deneyim</label>
                <p>{{ formatExperience(selectedApp.profile?.experience_level) }}</p>
              </div>
              <div class="info-item">
                <label>İngilizce</label>
                <p>{{ selectedApp.profile?.english_level || "-" }}</p>
              </div>
            </div>

            <div class="detail-section mt-4">
              <label>İlgi Alanları</label>
              <div class="tags large">
                <span class="tag main-interest">{{ selectedApp.profile?.main_interest }}</span>
                <i v-if="selectedApp.profile?.sub_interest?.length" class="fa-solid fa-arrow-right"></i>
                <span
                  v-for="sub in selectedApp.profile?.sub_interest"
                  :key="sub"
                  class="tag"
                >{{ sub }}</span>
              </div>
            </div>

            <div class="detail-section highlight-box">
              <label>Neden Katılmak İstiyor:</label>
              <p>{{ selectedApp.reason || "Belirtilmemiş" }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedApp.status === 'pending'" class="modal-overlay-actions">
          <button @click="updateStatus(selectedApp.id, 'rejected')" class="btn btn-rejected">Reddet</button>
          <button @click="updateStatus(selectedApp.id, 'approved')" class="btn btn-approved">Onayla</button>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div v-if="showInviteModal" class="modal-overlay" @click.self="closeInviteModal">
      <div class="modal-container">
        <div class="modal-card">
          <div class="modal-body">
            <h2>Davet Oluştur</h2>
            <p class="modal-subtitle">Sistem dışı yeni bir davetiye oluşturun</p>

            <div v-if="!inviteSuccess" class="invite-form">
              <div class="form-group">
                <label for="invite-name">Ad/Not</label>
                <input
                  id="invite-name"
                  v-model="inviteName"
                  type="text"
                  placeholder="Örn: Özel Partner"
                  class="form-input"
                  @keyup.enter="generateInvite"
                />
              </div>
            </div>

            <div v-else class="invite-success">
              <div class="success-content">
                <p class="success-message">Davetiye başarıyla oluşturuldu!</p>
                <div class="invite-link-container">
                  <input type="text" :value="inviteSuccess.invite_link" readonly class="invite-link-input" />
                  <button @click="copyInviteLink" :class="['btn-copy', { copied: copySuccess }]">
                    {{ copySuccess ? "✓" : "Kopyala" }}
                  </button>
                </div>
                <button @click="inviteSuccess = null" class="btn-new-invite-text">
                  + Yeni Davet Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-overlay-actions">
          <template v-if="!inviteSuccess">
            <button @click="showInviteModal = false" class="btn btn-secondary">İptal</button>
            <button @click="generateInvite" class="btn btn-approved" :disabled="inviteLoading">
              {{ inviteLoading ? "Oluşturuluyor..." : "Oluştur" }}
            </button>
          </template>
          <button v-else @click="closeInviteModal" class="btn btn-approved">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { admin, ApiError } from "../libs/AxonConnector";

// State
const apps = ref([]);
const loading = ref(false);
const activeTab = ref("pending"); // 'pending' or 'history'
const selectedApp = ref(null);
const actionError = ref("");

// Invite State
const showInviteModal = ref(false);
const inviteName = ref("");
const inviteLoading = ref(false);
const inviteSuccess = ref(null);
const copySuccess = ref(false);

// Pagination
const page = ref(1);
const perPage = ref(12);
const total = ref(0);
const hasMore = computed(() => apps.value.length < total.value);

const router = useRouter();

// ── Watchers ─────────────────────────────────────────────────────────────────

// Automatically re-fetch when tab changes
watch(activeTab, () => {
  fetchApps(true);
});

// ── Methods ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name ? name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) : "??";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(new Date(dateStr));
};

const formatStatus = (s: string) => ({
  pending: "Beklemede", approved: "Onaylandı", rejected: "Reddedildi", invited: "Davet Edildi"
})[s] ?? s;

const formatExperience = (v: string) => ({
  newbie: "Beginner", junior: "Junior", mid: "Mid", senior: "Senior"
})[v] ?? v;

const fetchApps = async (reset = true) => {
  if (loading.value) return;
  
  loading.value = true;
  actionError.value = "";
  if (reset) {
    page.value = 1;
    apps.value = [];
  }

  try {
    // Map UI tab to backend status filter
    const statusFilter = activeTab.value === 'pending' ? 'pending,invited' : 'approved,rejected';

    const response = await admin.listApplications({
      page: page.value,
      per_page: perPage.value,
      status: statusFilter
    });

    const newApps = response.data ?? [];
    apps.value = reset ? newApps : [...apps.value, ...newApps];
    total.value = response.meta?.total ?? 0;
  } catch (err: any) {
    if (err instanceof ApiError && err.status === 401) return;
    actionError.value = err instanceof ApiError ? err.message : "Veriler yüklenemedi.";
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  page.value++;
  fetchApps(false);
};

const updateStatus = async (id: number, status: string) => {
  actionError.value = "";
  try {
    if (status === "approved") await admin.approveApplication(id);
    else await admin.rejectApplication(id);
    
    // Refresh the current view
    await fetchApps(true);
    closeDetail();
  } catch (err: any) {
    actionError.value = err instanceof ApiError ? err.message : "İşlem başarısız.";
  }
};

const generateInvite = async () => {
  if (!inviteName.value.trim()) {
    actionError.value = "Lütfen bir not girin.";
    return;
  }
  inviteLoading.value = true;
  actionError.value = "";
  try {
    inviteSuccess.value = await admin.createInvite(inviteName.value.trim());
    inviteName.value = "";
  } catch (err: any) {
    actionError.value = err instanceof ApiError ? err.message : "Davet oluşturulamadı.";
  } finally {
    inviteLoading.value = false;
  }
};

const copyInviteLink = async () => {
  if (!inviteSuccess.value?.invite_link) return;
  try {
    await navigator.clipboard.writeText(inviteSuccess.value.invite_link);
    copySuccess.value = true;
    setTimeout(() => (copySuccess.value = false), 2000);
  } catch {
    actionError.value = "Bağlantı kopyalanamadı.";
  }
};

// Computed count for badge (Optional: only counts what is currently loaded)
const pendingCount = computed(() => apps.value.filter(a => a.status === 'pending').length);

const openDetail = (app: any) => (selectedApp.value = app);
const closeDetail = () => (selectedApp.value = null);
const closeInviteModal = () => {
  showInviteModal.value = false;
  inviteSuccess.value = null;
  actionError.value = "";
};

const handleSessionExpiry = () => router.push("/login");

onMounted(() => {
  fetchApps();
  window.addEventListener("axonode:session-expired", handleSessionExpiry);
});

onUnmounted(() => {
  window.removeEventListener("axonode:session-expired", handleSessionExpiry);
});
</script>

<style scoped>
/* ── Variables & Setup ──────────────────────────────────────────────────────── */
.admin-page {
  --accent-color: #78dee7;
  --danger-color: #ff5f56;
  --success-color: #27c93f;
  --text-muted: #9ca3af;
  position: relative;
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background-color: #0f1115;
  color: #f3f4f6;
  font-family: 'Inter', sans-serif;
}

.background-mesh {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(at 0% 0%, rgba(187, 133, 223, 0.1) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(120, 222, 231, 0.1) 0px, transparent 50%);
  filter: blur(80px);
  z-index: 0;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Error & Notifications ─────────────────────────────────────────────────── */
.api-error {
  background: rgba(255, 95, 86, 0.1);
  border: 1px solid rgba(255, 95, 86, 0.3);
  color: var(--danger-color);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.close-error {
  margin-left: auto;
  background: none; border: none; color: inherit;
  font-size: 1.5rem; cursor: pointer;
}

/* ── Tabs & Header ──────────────────────────────────────────────────────────── */
.tabs {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 1rem;
}

.tab-btn {
  background: none; border: none;
  padding: 0.6rem 1.2rem;
  color: var(--text-muted);
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center; gap: 8px;
}

.tab-btn.active {
  background: rgba(120, 222, 231, 0.1);
  color: var(--accent-color);
}

.count-badge {
  background: var(--danger-color);
  color: white; padding: 2px 6px; border-radius: 20px; font-size: 0.7rem;
}

.btn-end {
  margin-left: auto;
  background: var(--accent-color);
  color: #000; border: none;
  padding: 0.6rem 1.2rem; border-radius: 8px;
  font-weight: 700; cursor: pointer;
}

/* ── Grid & Cards ───────────────────────────────────────────────────────────── */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.app-card {
  background: rgba(30, 30, 35, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 1.5rem; border-radius: 16px;
  cursor: pointer; transition: 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  background: rgba(40, 40, 45, 0.8);
}

.avatar-placeholder {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), #95b0eb);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; color: #000;
}

.status-badge {
  font-size: 0.7rem; font-weight: 800; text-transform: uppercase;
  padding: 4px 10px; border-radius: 20px;
}

.status-badge.pending { background: rgba(255,189,46,0.1); color: #ffbd2e; }
.status-badge.approved { background: rgba(39,201,63,0.1); color: var(--success-color); }
.status-badge.rejected { background: rgba(255,95,86,0.1); color: var(--danger-color); }

.tag {
  background: rgba(255,255,255,0.05);
  padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;
}

/* ── Modals ─────────────────────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center; z-index: 100;
  padding: 2rem;
}

.modal-container { width: 100%; max-width: 550px; }

.modal-card {
  background: #1e1e24; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 2rem; margin-bottom: 1rem;
}

.info-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;
}

.highlight-box {
  background: rgba(120, 222, 231, 0.05);
  border-left: 4px solid var(--accent-color);
  padding: 1rem; border-radius: 4px;
}

.modal-overlay-actions { display: flex; gap: 1rem; }
.modal-overlay-actions .btn { flex: 1; padding: 1rem; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; }

.btn-approved { background: var(--success-color); color: #fff; }
.btn-rejected { background: var(--danger-color); color: #fff; }
.btn-secondary { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); }

/* ── Pagination ─────────────────────────────────────────────────────────────── */
.load-more-wrapper {
  display: flex; justify-content: center; margin-top: 3rem;
}

/* ── Transitions ────────────────────────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.loader-container { display: flex; justify-content: center; padding: 4rem; }
.spinner {
  width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.1);
  border-top-color: var(--accent-color); border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>