<template>
  <Navbar />
  <section class="application-section">
    <div class="background-mesh"></div>

    <div class="container">
      <div class="layout-grid">
        <div class="form-wrapper">
          <div v-if="isSubmitted" class="success-state">
            <div class="success-icon">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h2 class="title">Application <span class="gradient-text">Received!</span></h2>
            <p>Thank you for applying to Axonode. Our team will review your profile and reach out via email or Discord soon.</p>
            <button @click="router.push('/')" class="submit-btn mt-input">Back to Home</button>
          </div>

          <template v-else>
            <div class="form-header">
              <Transition name="fade-slide">
                <div v-if="inviteToken" class="invited-badge">
                  ✦ Personal Invitation
                </div>
              </Transition>
              <h2 class="title">Join the <span class="gradient-text">Team</span></h2>
              <div class="stepper">
                <div v-for="step in 3" :key="step" :class="['step', { active: currentStep >= step }]">
                  <span class="step-number">{{ step }}</span>
                </div>
              </div>
            </div>

            <form @submit.prevent="handleNextStep" class="axonode-form">
              
              <div v-if="currentStep === 1" class="step-content">
                <h3 class="section-title"><i class="fa-regular fa-id-card"></i> Personal Information</h3>
                <div class="form-row">
                  <div class="form-group">
                    <label for="fullname"><i class="fa-solid fa-user"></i> Full Name <span class="req">*</span></label>
                    <input type="text" id="fullname" v-model="form.fullname" placeholder="John Doe" required />
                  </div>
                  <div class="form-group">
                    <label for="email"><i class="fa-solid fa-envelope"></i> Email Address <span class="req">*</span></label>
                    <input type="email" id="email" v-model="form.email" placeholder="john@axonode.com" required />
                  </div>
                </div>
                <div class="form-row single-col">
                  <label for="contact"><i class="fa-solid fa-phone"></i> Primary Contact</label>
                  <div class="form-group-row">
                  <input type="text" id="contact" v-model="form.contact_value" placeholder="username#0000" style="flex: 1;" />
                  <select v-model="form.contact_type" style="flex: 0 0 35%;">
                    <option value="" disabled>Contact Platform</option>
                    <option value="discord">Discord</option>
                    <option value="phone">Phone</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 2" class="step-content">
                <h3 class="section-title"><i class="fa-solid fa-laptop-code"></i> Your Profile</h3>
                <div class="form-group">
                  <label>Primary Area of Interest <span class="req">*</span></label>
                  <div class="grid-options">
                    <label v-for="area in interestAreas" :key="area.id" 
                      class="option-card" :class="{ active: form.main_interest === area.id }">
                      <input type="radio" :value="area.id" v-model="form.main_interest" />
                      <span>{{ area.label }}</span>
                    </label>
                  </div>
                </div>

                <Transition name="fade-slide">
                  <div v-if="selectedInterest?.sub?.length" class="form-group mt-input">
                    <label>Sub-Interests (Select all that apply) <span class="req">*</span></label>
                    <div class="grid-options">
                      <label v-for="sub in selectedInterest.sub" :key="sub.id" 
                        class="option-card" :class="{ active: form.sub_interest.includes(sub.id) }">
                        <input type="checkbox" :value="sub.id" v-model="form.sub_interest" />
                        <span>{{ sub.label }}</span>
                      </label>
                    </div>
                  </div>
                </Transition>

                <div class="form-row two-col mt-input">
                  <div class="form-group">
                    <label>English Proficiency</label>
                    <select v-model="form.english_level" required>
                      <option value="" disabled>Select Level</option>
                      <option value="B1-B2">Intermediate</option>
                      <option value="C1-C2">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Experience Level</label>
                    <select v-model="form.experience_level" required>
                      <option value="newbie">Beginner</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid-Level</option>
                      <option value="senior">Senior</option>
                    </select>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 3" class="step-content">
                <h3 class="section-title"><i class="fa-solid fa-rocket"></i> Final Details</h3>
                <div class="form-group">
                  <label>Weekly Availability (Hours)</label>
                  <input type="number" v-model="form.availability" placeholder="10" min="1" max="100" required />
                </div>
                <div class="form-group">
                  <label for="reason">What motivates you to join our team? <span class="req">*</span></label>
                  <textarea id="reason" v-model="form.reason" rows="5" placeholder="Tell us about your passion..." required></textarea>
                </div>
              </div>

              <div class="form-footer">
                <button v-if="currentStep > 1" type="button" @click="currentStep--" class="back-btn">Back</button>
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span>{{ currentStep === 3 ? (isSubmitting ? 'Sending...' : 'Submit Application') : 'Next Step' }}</span>
                  <i v-if="!isSubmitting" class="fa-solid" :class="currentStep === 3 ? 'fa-paper-plane' : 'fa-arrow-right'"></i>
                </button>
              </div>
            </form>
          </template>
        </div>

        <div class="sidebar">
          <Infocard />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Infocard from "../components/InfoCard.vue";
import { submitApplication, admin } from "../libs/AxonConnector";

const router = useRouter();
const route = useRoute();

const currentStep = ref(1);
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const inviteToken = ref(null); // 3. Store the token

const form = reactive({
  fullname: "",
  email: "",
  contact_type: "phone",
  contact_value: "",
  english_level: "",
  experience_level: "junior",
  availability: "",
  reason: "",
  main_interest: "",
  sub_interest: [] as string[],
  invite_token: null as string | null,
});

const interestAreas = [
  {
    id: "technology",
    label: "Technology",
    sub: [
      { id: "frontend", label: "Frontend Development" },
      { id: "backend", label: "Backend Development" },
      { id: "ai", label: "AI / Machine Learning" },
      { id: "cybersecurity", label: "Cybersecurity" },
      { id: "gamedev", label: "Game Development" },
    ],
  },
  {
    id: "design",
    label: "Design",
    sub: [
      { id: "uiux", label: "UI/UX Design" },
      { id: "graphic", label: "Graphic Design" },
      { id: "3d", label: "3D Modeling" },
      { id: "motion", label: "Motion Design" },
    ],
  },
  {
    id: "business",
    label: "Business & Strategy",
    sub: [
      { id: "startup", label: "Startup Building" },
      { id: "marketing", label: "Marketing" },
      { id: "sales", label: "Sales" },
      { id: "product", label: "Product Management" },
    ],
  },
  {
    id: "creative",
    label: "Creative Arts",
    sub: [
      { id: "music", label: "Music Production" },
      { id: "writing", label: "Writing" },
      { id: "film", label: "Film & Video" },
      { id: "content", label: "Content Creation" },
    ],
  },
  {
    id: "other",
    label: "Other",
    sub: [],
  },
];

onMounted(async () => {
  const token = route.query.invite as string;
  
  if (token) {
    try {
      // Validate the token first
      const data = await admin.checkInvite(token);
      if (data.valid) {
        inviteToken.value = token;
        form.invite_token = token;
      } else {
        console.error("Invalid invite token");
        // Optionally router.push to just the form without the query param
      }
    } catch (error) {
      console.error("Error checking token", error);
    }
  }
});

const selectedInterest = computed(() => interestAreas.find((i) => i.id === form.main_interest));

watch(() => form.main_interest, () => { form.sub_interest = []; });

function handleNextStep() {
  if (currentStep.value < 3) {
    if (currentStep.value === 2 && !form.main_interest) {
      alert("Please select an area of interest");
      return;
    }
    currentStep.value++;
  } else {
    submitForm();
  }
};


const submitForm = async () => {
  if (!form.main_interest) {
    alert("Please select a main interest.");
    return;
  }

  if (selectedInterest.value?.sub?.length &&
  form.sub_interest.length === 0) {
    alert("Please select a sub-interest.");
    return;
  }

  isSubmitting.value = true;

  try {
    console.log("Submitting application with data:", JSON.stringify(form));
    await submitApplication(form);
    isSubmitted.value = true;
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Something went wrong. Please try again.\nError: " + error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Stepper Styles */
.stepper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.step {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: 0.5;
}
.step.active {
  background: linear-gradient(135deg, #78dee7, #95b0eb);
  color: white;
  opacity: 1;
  box-shadow: 0 0 15px rgba(149, 176, 235, 0.4);
}

/* Success Util */
.success-state {
  text-align: center;
  padding: 40px 0;
}
.success-icon {
  font-size: 4rem;
  color: #78dee7;
  margin-bottom: 20px;
}

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

.container {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto; 
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

.form-footer {
  display: flex;
  gap: 15px;
  margin-top: 30px;
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
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

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

.section-title i {
  color: #95b0eb;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}
.form-row.single-col {
  grid-template-columns: 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.form-group-row {
  display: flex;
  flex-direction: row;
  gap: 0px;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-color);
}

.req {
  color: #fe78b2;
}

input,
select,
textarea {
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

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #95b0eb;
  background: var(--bg-color);
  box-shadow: 0 0 0 3px rgba(149, 176, 235, 0.15);
}

.mt-input {
  margin-top: 10px;
}

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

.back-btn {
  padding: 16px 30px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
  font-weight: 600;
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
  transition:
    transform 0.2s,
    opacity 0.2s;
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
.invited-badge {
  display: inline-block;
  background: linear-gradient(135deg, #78dee7 0%, #bb85df 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(187, 133, 223, 0.3);
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
  .form-wrapper {
    padding: 30px 20px;
  }
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .grid-options {
    grid-template-columns: 1fr 1fr;
  }
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
