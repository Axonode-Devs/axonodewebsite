<template>
  <Navbar />
  <div class="admin-page">
    <!-- Sophisticated background -->
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>

    <div class="content-wrapper">
      <!-- Error Toast -->
      <Transition name="slide-fade">
        <div v-if="actionError" class="inline-error">
          <div class="error-content">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>{{ actionError }}</span>
          </div>
          <button @click="actionError = ''" class="error-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </Transition>

      <header class="page-header">
        <div class="header-titles">
          <h1>Başvuru Yönetimi</h1>
          <p>Topluluğa katılmak isteyen adayları inceleyin ve yönetin.</p>
        </div>
        <button
          class="btn-primary create-invite"
          @click="showInviteModal = true"
        >
          <i class="fa-solid fa-plus"></i>
          <span>Davet Oluştur</span>
        </button>
      </header>

      <div class="dashboard-controls">
        <nav class="tab-pipeline">
          <button
            :class="['pipeline-item', { active: activeTab === 'pending' }]"
            @click="activeTab = 'pending'"
          >
            Bekleyenler
            <span v-if="pendingCount > 0" class="count-pill">{{
              pendingCount
            }}</span>
          </button>
          <button
            :class="['pipeline-item', { active: activeTab === 'history' }]"
            @click="activeTab = 'history'"
          >
            Geçmiş Kayıtlar
          </button>
        </nav>
      </div>

      <!-- State Management -->
      <div v-if="loading && apps.length === 0" class="state-container">
        <div class="shimmer-loader"></div>
      </div>

      <div v-else-if="apps.length === 0" class="state-container empty">
        <div class="empty-icon">📂</div>
        <h3>Burada henüz bir şey yok</h3>
        <p>
          {{
            activeTab === "pending"
              ? "Tüm başvurular güncel!"
              : "Henüz bir geçmiş bulunmuyor."
          }}
        </p>
      </div>

      <div v-else class="apps-grid">
        <div
          v-for="app in apps"
          :key="app.id"
          class="glass-card app-card"
          @click="openDetail(app)"
        >
          <div class="card-top">
            <div class="user-info">
              <div class="avatar-ring">
                {{ getInitials(app.fullname) }}
              </div>
              <div class="user-meta">
                <h3 class="name">{{ app.fullname }}</h3>
                <span class="email">{{ app.email }}</span>
              </div>
            </div>
            <span :class="['status-dot', app.status]">{{
              formatStatus(app.status)
            }}</span>
          </div>

          <div class="card-mid">
            <div class="interest-cloud">
              <span class="interest-tag main">{{
                app.profile?.main_interest
              }}</span>
              <span
                v-if="app.profile?.sub_interest?.length"
                class="interest-tag sub"
              >
                +{{ app.profile.sub_interest.length }}
              </span>
            </div>
          </div>

          <div class="card-bottom">
            <span class="timestamp"
              ><i class="fa-regular fa-clock"></i>
              {{ formatDate(app.created_at) }}</span
            >
            <span class="view-action"
              >İncele <i class="fa-solid fa-chevron-right"></i
            ></span>
          </div>
        </div>
      </div>

      <div v-if="hasMore" class="load-more-section">
        <button @click="loadMore" :disabled="loading" class="btn-load-more">
          {{ loading ? "Yükleniyor..." : "Daha Fazla Göster" }}
        </button>
      </div>
    </div>

    <!-- Modals remain for logic, but we'll style them via CSS below -->
  </div>
</template>

<style scoped>
.admin-page {
  /* Using your global variables */
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow-x: hidden;
  transition:
    background-color 0.3s,
    color 0.3s;
}

/* --- Dynamic Background Orbs --- */
.bg-glow-1,
.bg-glow-2 {
  position: fixed;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.12;
  pointer-events: none;
}
.bg-glow-1 {
  top: -5%;
  left: -5%;
  background: var(--accent-color);
}
.bg-glow-2 {
  bottom: -5%;
  right: -5%;
  background: var(--accent-secondary);
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Header Section --- */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}
.header-titles h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
}
.header-titles p {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1.1rem;
}

/* --- Styled Primary Button --- */
.btn-primary {
  background-color: var(--accent-color);
  color: #000; /* Contrast against the bright accent */
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
}

/* --- Tabs / Pipeline --- */
.dashboard-controls {
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color);
}
.tab-pipeline {
  display: flex;
  gap: 2rem;
}
.pipeline-item {
  background: none;
  border: none;
  color: var(--text-color);
  opacity: 0.6;
  padding: 1rem 0;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}
.pipeline-item.active {
  opacity: 1;
  color: var(--accent-color);
}
.pipeline-item.active::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-color);
  border-radius: 3px 3px 0 0;
}
.count-pill {
  background: var(--hover-bg);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  margin-left: 8px;
  border: 1px solid var(--border-color);
}

/* --- Modern Glass Cards --- */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.app-card {
  background: var(--hover-bg); /* Subtle lift from background */
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}
.app-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
}

.avatar-ring {
  width: 44px;
  height: 44px;
  background: linear-gradient(
    135deg,
    var(--accent-color),
    var(--accent-secondary)
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 800;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}
.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.user-meta .name {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}
.user-meta .email {
  font-size: 0.85rem;
  opacity: 0.6;
}

/* Status Badges using your theme colors */
.status-dot {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.status-dot.pending {
  color: #eab308;
  background: rgba(234, 179, 8, 0.1);
}
.status-dot.approved {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.interest-tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
.interest-tag.main {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.card-bottom {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timestamp {
  font-size: 0.8rem;
  opacity: 0.5;
}
.view-action {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color);
}

/* --- Error Toast --- */
.inline-error {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* Use your theme's error color with low opacity for the background */
  background: rgba(255, 107, 107, 0.1); 
  border: 1px solid var(--error-color);
  color: var(--error-color);
  
  padding: 1rem 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem; /* Give the header some breathing room */
  backdrop-filter: blur(5px);
}

.error-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.error-close {
  background: none;
  border: none;
  color: var(--error-color);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.error-close:hover {
  opacity: 0.7;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.shimmer-loader {
  height: 200px;
  width: 100%;
  background: linear-gradient(
    90deg,
    var(--hover-bg) 25%,
    var(--border-color) 50%,
    var(--hover-bg) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 20px;
}
@keyframes loading {
  to {
    background-position: -200% 0;
  }
}
</style>

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
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "??";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
  }).format(new Date(dateStr));
};

const formatStatus = (s: string) =>
  ({
    pending: "Beklemede",
    approved: "Onaylandı",
    rejected: "Reddedildi",
    invited: "Davet Edildi",
  })[s] ?? s;

const formatExperience = (v: string) =>
  ({
    newbie: "Beginner",
    junior: "Junior",
    mid: "Mid",
    senior: "Senior",
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
    const statusFilter =
      activeTab.value === "pending" ? "pending,invited" : "approved,rejected";

    const response = await admin.listApplications({
      page: page.value,
      per_page: perPage.value,
      status: statusFilter,
    });

    const newApps = response.data ?? [];
    apps.value = reset ? newApps : [...apps.value, ...newApps];
    total.value = response.meta?.total ?? 0;
  } catch (err: any) {
    if (err instanceof ApiError && err.status === 401) return;
    actionError.value =
      err instanceof ApiError ? err.message : "Veriler yüklenemedi.";
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
    actionError.value =
      err instanceof ApiError ? err.message : "İşlem başarısız.";
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
    actionError.value =
      err instanceof ApiError ? err.message : "Davet oluşturulamadı.";
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
const pendingCount = computed(
  () => apps.value.filter((a) => a.status === "pending").length,
);

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
