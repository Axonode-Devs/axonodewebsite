<template>
    <Navbar />
    <section class="survey-section">
        <div class="container">
            <img class="survey-img" :src="surveyImage">
        </div>
        
        <div class="questions-container">
            <!-- PAGE 1 -->
            <div v-show="currentPage === 1">
                <InputQuestion 
                    v-model:answer="email"
                    :placeholder="$t('survey.mail')"
                />
                <div class="divider-container">
                    <HDivider />
                </div>
                <SliderQuestion 
                    v-model="q1"
                    :question="$t('survey.q1')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q2"
                    :question="$t('survey.q2')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q3"
                    :question="$t('survey.q3')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q4"
                    :question="$t('survey.q4')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q5"
                    :question="$t('survey.q5')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
            </div>

            <!-- PAGE 2 -->
            <div v-show="currentPage === 2">
                <SliderQuestion 
                    v-model="q6"
                    :question="$t('survey.q6')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q7"
                    :question="$t('survey.q7')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q8"
                    :question="$t('survey.q8')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q9"
                    :question="$t('survey.q9')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q10"
                    :question="$t('survey.q10')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
            </div>

            <!-- PAGE 3 -->
            <div v-show="currentPage === 3">
                <SliderQuestion 
                    v-model="q11"
                    :question="$t('survey.q11')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q12"
                    :question="$t('survey.q12')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q13"
                    :question="$t('survey.q13')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q14"
                    :question="$t('survey.q14')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
                <SliderQuestion 
                    v-model="q15"
                    :question="$t('survey.q15')"
                    :leftLabel="$t('survey.a')"
                    :rightLabel="$t('survey.b')"
                />
            </div>
        </div>
        <div class="button-container">
            <button class="back-button" @click="handleBack" v-if="currentPage > 1">
                {{ $t('survey.button-back') }}
            </button>
            <button class="submit-button" @click="handleNext">
                {{ currentPage === 3 ? $t('survey.button-send') : $t('survey.button-keep') }}
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import HDivider from "../components/HDivider.vue";
import Navbar from "../components/Navbar.vue";
import SliderQuestion from "../components/SliderQuestion.vue";
import InputQuestion from "../components/InputQuestion.vue";

const { locale } = useI18n();

const surveyImage = computed(() => {
  return locale.value === 'tr' ? '/letsfindouttr.png' : '/letsfindout.png';
});

const currentPage = ref(1);

const email = ref('');
const q1 = ref(3);
const q2 = ref(3);
const q3 = ref(3);
const q4 = ref(3);
const q5 = ref(3);
const q6 = ref(3);
const q7 = ref(3);
const q8 = ref(3);
const q9 = ref(3);
const q10 = ref(3);
const q11 = ref(3);
const q12 = ref(3);
const q13 = ref(3);
const q14 = ref(3);
const q15 = ref(3);

const handleNext = () => {
    if (currentPage.value < 3) {
        currentPage.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.log('Gonderildi:', {
            email: email.value,
            cevaplar: [
                q1.value, q2.value, q3.value, q4.value, q5.value,
                q6.value, q7.value, q8.value, q9.value, q10.value,
                q11.value, q12.value, q13.value, q14.value, q15.value
            ]
        });
    }
}


const handleBack = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<style scoped>
    .survey-section{
        height: 100%;
        padding-top: 6.2rem;
        padding-bottom: 4rem;
    }
    .container{
        max-width: 1213px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button-container{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .submit-button{
        width: 100%;
        max-width: 120px;
        padding: 12px 24px;
        background: #fe78b0;
        color: var(--text-color);
        font-size: 1rem;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
        border: 1px solid transparent;
        border-radius: 9999px;
        transition: .25s ease;
        cursor: pointer;
    }
    .back-button{
        width: 100%;
        max-width: 120px;
        padding: 12px 24px;
        background: transparent;
        color: #a59ce6;
        font-size: 1rem;
        font-weight: 400;
        font-family: "Poppins", sans-serif;
        border: 1px solid #a59ce6;
        border-radius: 9999px;
        transition: .25s ease;
        cursor: pointer;
    }
    .back-button:hover {
        background: rgba(254, 120, 176, 0.1);
    }
    .survey-img{
        width: 100%;
        background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    }
    .divider-container{
        width: 40%;
        justify-content: center;
        margin: 0 auto;
        display: flex;
    }
    .questions-container {
        padding: 0 1rem;
    }
</style>
