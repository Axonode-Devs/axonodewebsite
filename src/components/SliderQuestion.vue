<template>
  <div class="slider-question-container">
    <div class="text-container">
      <h3 class="question-text">{{ question }}</h3>
    </div>

    <div class="slider-wrapper">
      <span class="label left-label">{{ leftLabel }}</span>
      <div class="slider-container">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          v-model="sliderValue"
          @change="emit('touched')"
          :class="['custom-slider', { 'is-touched': touched }]"
        />
      </div>
      <span class="label right-label">{{ rightLabel }}</span>
    </div>
  </div>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  leftLabel: {
    type: String,
    required: true,
  },
  rightLabel: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 12, 
  },
  inverted: {
    type: Boolean,
    default: false, 
  },
  touched: { type: Boolean, default: false },

});

const emit = defineEmits(["update:modelValue", "touched"]);


const sliderValue = computed({
  get() {
    if (props.inverted) {
      return 6 - props.modelValue / 4;
    }
    return props.modelValue / 4;
  },
  set(val) {
    const numericVal = Number(val);
    const points = props.inverted ? (6 - numericVal) * 4 : numericVal * 4;

    emit("update:modelValue", points);
    emit("touched");
  },
});

onMounted(() => {
    const points = calculatePoints(props.modelValue.value);
    emit('update:modelValue', { value: props.modelValue.value, points });
});
</script>

<style scoped>
.slider-question-container {
  width: 100%;
  max-width: 700px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: #e2e8f0;
  font-family: "Poppins", sans-serif;
  margin-bottom: 5rem;
}
.question-text {
  font-size: 1.25rem;
  font-weight: 300;
  margin: 0;
  text-align: center;
  font-family: "Poppins", sans-serif;
}
.slider-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.8rem;
}
.label {
  font-size: 1rem;
  font-weight: 200;
  white-space: nowrap;
  min-width: 60px;
  font-family: "Poppins", sans-serif;
}
.left-label {
  text-align: right;
  font-family: "Poppins", sans-serif;
}
.right-label {
  text-align: left;
  font-family: "Poppins", sans-serif;
}
.slider-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.custom-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #7ad5e4 0%, #b29de4 50%, #f68cae 100%);
  border-radius: 4px;
  outline: none;
  margin: 0;
  cursor: pointer;
}
.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e2e8f0;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.custom-slider::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e2e8f0;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.custom-slider.is-touched::-webkit-slider-thumb {
  box-shadow: 0 0 12px 3px rgba(96, 165, 250, 0.75); /* blue glow */
  transition: box-shadow 0.25s ease;
}
.custom-slider.is-touched::-moz-range-thumb {
  box-shadow: 0 0 12px 3px rgba(96, 165, 250, 0.75);
  transition: box-shadow 0.25s ease;
}
@media (max-width: 480px) {
  .custom-slider::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }
  .custom-slider::-moz-range-thumb {
    width: 28px;
    height: 28px;
  }
  .custom-slider {
    height: 6px; /* slightly thicker track, easier to see/hit */
  }
  .label {
    font-size: 0.85rem;
    min-width: 44px; /* shrink from 60px so labels don't crowd the slider on narrow screens */
  }
}
</style>
