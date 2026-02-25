<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import { admin, auth } from '../libs/AxonConnector';

const apps = ref([]);
const loading = ref(true);
const activeTab = ref('pending'); 
const selectedApp = ref(null);
const showRoleSelection = ref(false);
const router = useRouter();

// --- HELPERS ---
const getInitials = (name) => {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??';
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' }).format(date);
};

const formatExperience = (val) => {
  const map = { newbie: 'Beginner', junior: 'Junior', mid: 'Mid', senior: 'Senior' };
  return map[val] || val;
};

// --- DATA FETCHING ---
const fetchApps = async () => {
  loading.value = true;
  try {
    const data = await admin.listApplications();
    console.log("Fetched applications:", data);
    apps.value = data.items 
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

// --- ACTIONS ---
const updateStatus = async (id, newStatus, team = null) => {
  try {
    if (newStatus === 'approved') {
      await admin.approve(id, { team: team });
    } else {
      await admin.reject(id);
    }
    await fetchApps();
    closeDetail();
  } catch (error) {
    alert("Hata: " + (error.msg || "İşlem başarısız."));
  }
};

const openDetail = (app) => { 
  selectedApp.value = app; 
  showRoleSelection.value = false;
};
const closeDetail = () => { selectedApp.value = null; };

const logout = () => { auth.signOut(); router.push('/login'); };

// --- COMPUTED ---
const pendingApps = computed(() => apps.value.filter(a => a.status === 'pending'));
const historyApps = computed(() => apps.value.filter(a => a.status !== 'pending'));
const filteredApps = computed(() => activeTab.value === 'pending' ? pendingApps.value : historyApps.value);

onMounted(fetchApps);
</script>

<template>
  <Navbar />
  <div class="admin-page">
    <div class="background-mesh"></div>
    <div class="content-wrapper">
      
      <div class="tabs">
        <button :class="['tab-btn', { active: activeTab === 'pending' }]" @click="activeTab = 'pending'">
          Bekleyenler <span v-if="pendingApps.length" class="count-badge">{{ pendingApps.length }}</span>
        </button>
        <button :class="['tab-btn', { active: activeTab === 'history' }]" @click="activeTab = 'history'">Geçmiş</button>
      </div>

      <div v-if="!loading" class="apps-grid">
        <div v-for="app in filteredApps" :key="app.id" class="app-card" @click="openDetail(app)">
          <div class="card-header-top">
            <div class="avatar-placeholder">{{ getInitials(app.fullname) }}</div>
            <span :class="['status-badge', app.status]">{{ app.status }}</span>
          </div>
          <h3 class="applicant-name">{{ app.fullname }}</h3>
          
          <div class="tags">
            <span class="tag main">{{ app.main_interest }}</span>
            <span v-if="app.sub_interest?.length" class="tag more">+{{ app.sub_interest.length }}</span>
          </div>

          <div class="card-footer">
            <span class="date">{{ formatDate(app.created_at) }}</span>
            <span class="click-hint">Detay →</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedApp" class="modal-overlay" @click.self="closeDetail">
      <div class="modal-container">
        <div class="modal-card">
          <div class="modal-body">
            <h2>{{ selectedApp.fullname }}</h2>
            <p>{{ selectedApp.email }}</p>

            <div class="info-grid">
              <div class="info-item">
                <label>Deneyim</label>
                <p>{{ formatExperience(selectedApp.experience_level) }}</p>
              </div>
              <div class="info-item">
                <label>İngilizce</label>
                <p>{{ selectedApp.english_level || '-' }}</p>
              </div>
            </div>

            <div class="detail-section mt-4">
              <label>İlgi Alanları</label>
              <div class="tags large">
                <span class="tag main-interest">{{ selectedApp.main_interest }}</span>
                <span v-for="sub in selectedApp.sub_interest" :key="sub" class="tag">{{ sub }}</span>
              </div>
            </div>

            <div class="detail-section highlight-box">
              <label>Neden Katılmak İstiyor:</label>
              <p>{{ selectedApp.reason || "Belirtilmemiş" }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'pending'" class="modal-overlay-actions">
           <template v-if="!showRoleSelection">
              <button @click="updateStatus(selectedApp.id, 'rejected')" class="btn btn-rejected">Reddet</button>
              <button @click="updateStatus(selectedApp.id, 'approved')" class="btn btn-approved">Onayla</button>
           </template>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
:root {
  --color-1: #78dee7;
  --color-2: #95b0eb;
  --color-3: #bb85df;
  --bg-color: #f9fafb;
  --card-bg: rgba(255, 255, 255, 0.8);
  --text-main: #111827;
  --text-muted: #6b7280;
  --success-color: #27c93f;
  --danger-color: #ff5f56;
}

html.dark :root {
  --bg-color: #0f1115;
  --card-bg: rgba(30, 30, 35, 0.6);
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
}

.admin-page {
  position: relative;
  min-height: 100vh;
  background-color: var(--bg-color);
  padding: 40px;
  font-family: "Inter", sans-serif;
  color: var(--text-main);
  overflow-x: hidden;
  padding-top: 8rem;
}

.background-mesh {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(
      circle at top right,
      rgba(187, 133, 223, 0.15),
      transparent 60%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(120, 222, 231, 0.1),
      transparent 60%
    );
  pointer-events: none;
  z-index: 0;
}

html.dark .background-mesh {
  background:
    radial-gradient(at 0% 0%, rgba(187, 133, 223, 0.2) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(120, 222, 231, 0.2) 0px, transparent 50%);
  filter: blur(80px);
}

.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
.headline {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
}
.gradient-text {
  background: linear-gradient(90deg, #95b0eb 0%, #fe78b0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtext {
  color: var(--text-muted);
  margin-top: 5px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);
  padding-bottom: 10px;
}
.tab-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.tab-btn:hover {
  color: var(--text-main);
  background: rgba(0, 0, 0, 0.03);
}
.tab-btn.active {
  color: var(--text-main);
  background: rgba(120, 222, 231, 0.1);
  color: #78dee7;
}
.count-badge {
  background: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
.app-card {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: rgba(149, 176, 235, 0.5);
}

.card-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.avatar-placeholder {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #78dee7, #95b0eb);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
}
.applicant-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 4px 0;
}
.applicant-email {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.tag {
  background: rgba(149, 176, 235, 0.15);
  color: #95b0eb;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}
.tag.more {
  background: transparent;
  border: 1px solid rgba(150, 150, 150, 0.3);
  color: var(--text-muted);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-top: 1px solid rgba(150, 150, 150, 0.1);
  padding-top: 12px;
}
.click-hint {
  color: #95b0eb;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.2s;
}
.app-card:hover .click-hint {
  opacity: 1;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
.status-badge.pending {
  background: rgba(255, 189, 46, 0.15);
  color: #ffbd2e;
}
.status-badge.approved {
  background: rgba(39, 201, 63, 0.15);
  color: var(--success-color);
}
.status-badge.rejected {
  background: rgba(255, 95, 86, 0.15);
  color: var(--danger-color);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 700px;
  width: 100%;
}
.modal-card {
  background: #fff;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.3s ease-out;
}
html.dark .modal-card {
  background: #1e1e24;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  background: rgba(0, 0, 0, 0.03);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.traffic-lights {
  position: absolute;
  left: 16px;
  display: flex;
  gap: 8px;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}
.dot.red {
  background: #ce4545;
}
.dot.yellow {
  background: #ffbd2e;
}
.dot.green {
  background: #46c559;
}
.modal-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.modal-body {
  padding: 30px;
}

.applicant-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(150, 150, 150, 0.1);
}
.applicant-header h2 {
  margin: 0;
  font-size: 1.8rem;
}
.email-large {
  color: var(--text-muted);
  margin: 5px 0 0 0;
}
.social-links {
  display: flex;
  gap: 10px;
}
.social-btn {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
  font-size: 0.9rem;
}
.social-btn.gh {
  background: #24292e;
  color: white;
}
.social-btn.dc {
  background: #5865f2;
  color: white;
}
.social-btn:hover {
  transform: translateY(-2px);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
.info-item label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}
.info-item p {
  margin: 0;
  font-weight: 500;
  font-size: 0.95rem;
}

.mt-4 {
  margin-top: 24px;
}
.detail-section label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
}
.detail-section p {
  margin: 0;
  line-height: 1.6;
}

.highlight-box {
  background: rgba(120, 222, 231, 0.1);
  border-left: 4px solid #78dee7;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin-top: 20px;
}

.modal-overlay-actions {
  display: flex;
  gap: 15px;
  width: 100%;
  animation: modalPop 0.3s ease-out 0.1s backwards;
}
.modal-overlay-actions .btn {
  flex: 1;
  justify-content: center;
  padding: 14px;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.3);
}

.history-actions-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid rgba(150, 150, 150, 0.1);
  padding-top: 20px;
}
.status-changer {
  display: flex;
  align-items: center;
  gap: 12px;
}
.status-label strong {
  text-transform: uppercase;
  margin-left: 5px;
}
.status-label strong.approved {
  color: var(--success-color);
}
.status-label strong.rejected {
  color: var(--danger-color);
}
.team-badge {
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.btn {
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-approved {
  background: var(--success-color);
  color: white;
}
.btn-approved:hover {
  background: #20a332;
}
.btn-rejected {
  background: var(--danger-color);
  color: white;
}
.btn-rejected:hover {
  background: #d63e36;
}

.btn-sm-success {
  background: rgba(39, 201, 63, 0.1);
  color: var(--success-color);
  padding: 8px 16px;
  font-size: 0.9rem;
}
.btn-sm-success:hover {
  background: rgba(39, 201, 63, 0.2);
}
.btn-sm-danger {
  background: rgba(255, 95, 86, 0.1);
  color: var(--danger-color);
  padding: 8px 16px;
  font-size: 0.9rem;
}
.btn-sm-danger:hover {
  background: rgba(255, 95, 86, 0.2);
}

.btn-delete-text {
  background: transparent;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 8px;
}
.btn-delete-text:hover {
  color: var(--danger-color);
  background: rgba(255, 95, 86, 0.05);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(150, 150, 150, 0.3);
  color: var(--text-main);
}
.btn-secondary:hover {
  border-color: #95b0eb;
  background: var(--bg-color);
}

/* YENİ EKLENEN STİLLER */
.role-selection-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  animation: modalPop 0.2s ease-out;
}
.role-select-title {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 600;
  margin: 0;
}
.role-buttons {
  display: flex;
  gap: 15px;
  width: 100%;
}
.btn-role {
  flex: 1;
  justify-content: center;
  padding: 12px;
  color: white;
  font-size: 1rem;
}
.btn-role.core {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.btn-role.education {
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
}
.btn-cancel-selection {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .applicant-header {
    flex-direction: column;
    gap: 15px;
  }
  .modal-overlay-actions {
    flex-direction: column;
  }
  .history-actions-wrapper {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
