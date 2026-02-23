<template>
  <Navbar />
  <section class="application-section">
    
    <div class="background-mesh"></div>

    <div class="container">
      
      <div class="layout-grid">

        <div class="form-wrapper">
          <div class="form-header">
            <h2 class="title">Join the <span class="gradient-text">Core</span></h2>
            <p class="subtitle">
              Become a part of the Axonode ecosystem. Let's build the future together.
            </p>
          </div>

          <form @submit.prevent="submitForm" class="axonode-form">
            
            <h3 class="section-title"><i class="fa-regular fa-id-card"></i> Personal Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="fullname">Full Name <span class="req">*</span></label>
                <input type="text" id="fullname" v-model="form.fullname" placeholder="John Doe" required />
              </div>

              <div class="form-group">
                <label for="email">Email Address <span class="req">*</span></label>
                <input type="email" id="email" v-model="form.email" placeholder="john@example.com" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="discord"><i class="fa-brands fa-discord"></i> Discord Handle</label>
                <input type="text" id="discord" v-model="form.discord" placeholder="username#0000 or username" />
              </div>

              <div class="form-group">
                <label for="github"><i class="fa-brands fa-github"></i> GitHub Profile</label>
                <input type="url" id="github" v-model="form.github" placeholder="https://github.com/username" />
              </div>
            </div>

            <h3 class="section-title"><i class="fa-solid fa-laptop-code"></i> Technical Profile</h3>
            
            <div class="form-group">
              <label>Primary Area of Interest <span class="req">*</span></label>
              <div class="grid-options">
                <label 
                  v-for="area in interestAreas" 
                  :key="area.id" 
                  class="option-card"
                  :class="{ active: form.interest.includes(area.id) }" 
                >
                  <input 
                    type="checkbox" 
                    :value="area.id" 
                    v-model="form.interest" 
                  />
                  <span>{{ area.label }}</span>
                </label>
              </div>
              
              <transition name="fade-slide">
                <input 
                  v-if="form.interest.includes('other')"
                  type="text" 
                  v-model="form.otherInterest" 
                  class="mt-input"
                  placeholder="Please specify your area..." 
                  required
                />
              </transition>
            </div>

            <div class="form-row three-col">
              <div class="form-group">
                <label>Operating System</label>
                <select v-model="form.os">
                  <option value="" disabled>Select OS</option>
                  <option value="mac">macOS</option>
                  <option value="windows">Windows</option>
                  <option value="linux">Linux</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label>English Proficiency</label>
                <select v-model="form.englishLevel" required>
                  <option value="" disabled>Select Level</option>
                  <option value="A1-A2">Beginner (A1-A2)</option>
                  <option value="B1-B2">Intermediate (B1-B2)</option>
                  <option value="C1-C2">Advanced (C1-C2)</option>
                  <option value="native">Native</option>
                </select>
              </div>

              <div class="form-group">
                <label>Coding Experience</label>
                <select v-model="form.experienceLevel" required>
                  <option value="" disabled>Select Experience</option>
                  <option value="newbie">Complete Beginner</option>
                  <option value="junior">Junior (1-2 Years)</option>
                  <option value="mid">Mid-Level (3-5 Years)</option>
                  <option value="senior">Senior (5+ Years)</option>
                </select>
              </div>
            </div>

            <h3 class="section-title"><i class="fa-solid fa-graduation-cap"></i> Education & Availability</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>Education Level</label>
                <select v-model="form.education">
                  <option value="highschool">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="self">Self Taught</option>
                </select>
                
                <label class="checkbox-container">
                  <input type="checkbox" v-model="form.isStudent">
                  <span class="checkmark"></span>
                  <span class="checkbox-label">I am currently a student / Continuing education</span>
                </label>
              </div>

              <div class="form-group">
                <label>Weekly Availability (Hours)</label>
                <input type="number" v-model="form.availability" placeholder="e.g. 10" min="1" max="100" />
                <p class="input-hint">How much time can you dedicate to community projects?</p>
              </div>
            </div>

            <h3 class="section-title"><i class="fa-solid fa-rocket"></i> Motivation</h3>
            
            <div class="form-group">
              <label for="reason">Why should we choose you? <span class="req">*</span></label>
              <textarea 
                id="reason" 
                v-model="form.reason" 
                rows="5" 
                placeholder="Tell us about your passion, what you want to learn, or what you can contribute to Axonode..."
                required
              ></textarea>
            </div>

            <div class="form-footer">
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">Submit Application</span>
                <span v-else>Processing...</span>
                <i v-if="!isSubmitting" class="fa-solid fa-paper-plane"></i>
              </button>
            </div>

          </form>
        </div>

        <div class="sidebar">
          <Infocard />
        </div>

      </div> </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import Infocard from '../components/Infocard.vue'
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const router = useRouter();
const isSubmitting = ref(false);

const form = reactive({
  fullname: '',
  email: '',
  discord: '',
  github: '',
  portfolio: '',
  interest: [], 
  otherInterest: '',
  os: '',
  englishLevel: '',
  experienceLevel: '',
  education: 'bachelor',
  isStudent: false,
  availability: '',
  reason: ''
});

const interestAreas = [
  { id: 'frontend', label: 'Frontend Development' },
  { id: 'backend', label: 'Backend Development' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'uiux', label: 'UI/UX Design' },
  { id: 'devops', label: 'DevOps / Cloud' },
  { id: 'ai', label: 'AI / Data Science' },
  { id: 'other', label: 'Other' }
];

const submitForm = async () => {
  if (form.interest.length === 0) {
    alert('Please select at least one area of interest.');
    return;
  }

  isSubmitting.value = true;

  try {
    await addDoc(collection(db, "applications"), {
      ...form,
      createdAt: serverTimestamp(),
      status: 'pending'
    });
    alert('Application submitted successfully!');
    router.push('/'); 
    
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Something went wrong. Please try again.\nError: ' + error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.application-section {
  position: relative;
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 30px;
  align-items: start;
}

.background-mesh {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at top right, rgba(187, 133, 223, 0.15), transparent 60%),
              radial-gradient(circle at bottom left, rgba(120, 222, 231, 0.1), transparent 60%);
  pointer-events: none;
  z-index: 0;
}

html.dark .background-mesh {
  background: radial-gradient(at 0% 0%, rgba(187, 133, 223, 0.2) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(120, 222, 231, 0.2) 0px, transparent 50%);
  filter: blur(80px);
}

.hint {
  font-size: 0.8rem;
  font-weight: 400;
  color: #9CA3AF;
  margin-left: 5px;
}

.container {
  width: 100%;
  max-width: 1500px;
  padding: 0 10px;
  z-index: 1;
  margin-left: 15rem;
}

.sidebar {
  position: sticky;
  top: 120px; 
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 50px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.05);
}

html.dark .form-wrapper {
  background: rgba(20, 20, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.form-header {
  text-align: center;
  margin-bottom: 50px;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 10px;
}

.gradient-text {
  background: linear-gradient(135deg, #78dee7 0%, #95b0eb 50%, #bb85df 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #6B7280;
  font-size: 1.1rem;
}

html.dark .subtitle { color: #9CA3AF; }

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 30px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i { color: #95b0eb; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

.form-row.three-col {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.req { color: #fe78b2; }

input, select, textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.6);
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text-color);
  transition: all 0.2s;
  box-sizing: border-box;
}

html.dark input, 
html.dark select, 
html.dark textarea {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #95b0eb;
  background: var(--bg-color);
  box-shadow: 0 0 0 3px rgba(149, 176, 235, 0.15);
}

.mt-input { margin-top: 10px; }

.grid-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.option-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
  text-align: center;
  color: var(--text-color);
}

.option-card input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.option-card:hover {
  background: var(--hover-bg);
}

.option-card.active {
  background: rgba(120, 222, 231, 0.1);
  border-color: #78dee7;
  color: #78dee7;
  font-weight: 700;
}
html.dark .option-card.active {
  background: rgba(120, 222, 231, 0.15);
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #95b0eb;
  border-color: #95b0eb;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-color);
}

.input-hint {
  font-size: 0.75rem;
  color: #9CA3AF;
  margin-top: 4px;
  margin-left: 2px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #78dee7 0%, #95b0eb 50%, #bb85df 100%);
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .form-wrapper { padding: 30px 20px; }
  .form-row, .form-row.three-col { grid-template-columns: 1fr; gap: 16px; }
  .grid-options { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 992px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
  .container {
    margin-left: 0;
  }
}
</style>