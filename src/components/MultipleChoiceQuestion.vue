<template>
  <div class="mcq-container">
    <h3 class="question-text">{{ question }}</h3>
    <div class="options-container">
      <label 
        v-for="(opt, index) in options" 
        :key="index" 
        class="option-label"
      >
        <input 
          type="radio" 
          :value="opt.value" 
          :name="name"
          :checked="modelValue === opt.value"
          @change="$emit('update:modelValue', opt.value)"
          class="hidden-radio"
        />
        <div class="custom-radio" :style="{ borderColor: colors[index % colors.length] }">
          <div 
            class="inner-circle" 
            :style="{ backgroundColor: colors[index % colors.length] }"
            :class="{ active: modelValue === opt.value }"
          ></div>
        </div>
        <span class="option-text">{{ opt.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true 
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    required: true 
  }
});

const emit = defineEmits(['update:modelValue']);

const colors = ['#7ad5e4', '#b29de4', '#f68cae', '#f4d06f', '#9bdeac']; 
</script>

<style scoped>
.mcq-container {
  width: 100%;
  max-width: 700px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  color: #e2e8f0;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 5rem;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1rem;
}

.options-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  
}

.hidden-radio {
  display: none;
}

.custom-radio {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: all 0.2s ease;
}

.inner-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.inner-circle.active {
  opacity: 1;
  transform: scale(1);
}

.option-text {
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-color2);
}

@media (max-width: 480px) {
  .mcq-container {
    margin: 1.5rem auto;
    margin-bottom: 2.5rem;
  }

  .question-text {
    font-size: 1.1rem;
  }

  .options-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .option-text {
    font-size: 0.9rem;
  }
}
</style>
