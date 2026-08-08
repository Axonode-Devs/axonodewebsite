<template>
  <div class="general-question">
    <label class="question-label" :for="fieldId">{{ question }}</label>

    <input
      v-if="type === 'text'"
      :id="fieldId"
      type="text"
      class="text-input"
      :value="modelValue"
      @input="handleTextInput"
      @blur="emit('touched')"
      :placeholder="placeholder"
    />

    <div v-else-if="type === 'single'" class="option-list">
      <label
        v-for="option in options"
        :key="option"
        class="option-row"
        :class="{ 'option-row--selected': modelValue === option }"
      >
        <input
          type="radio"
          :name="fieldId"
          :value="option"
          :checked="modelValue === option"
          @change="handleSingleSelect(option)"
        />
        <span>{{ option }}</span>
      </label>
    </div>

    <div v-else-if="type === 'multi'" class="option-list">
      <label
        v-for="option in options"
        :key="option"
        class="option-row"
        :class="{ 'option-row--selected': selectedList.includes(option) }"
      >
        <input
          type="checkbox"
          :value="option"
          :checked="selectedList.includes(option)"
          @change="handleMultiToggle(option)"
        />
        <span>{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  question: string;
  type: "text" | "single" | "multi";
  modelValue: string | string[];
  options?: string[];
  placeholder?: string;
  fieldId: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void;
  (e: "touched"): void;
}>();

const selectedList = computed<string[]>(() =>
  Array.isArray(props.modelValue) ? props.modelValue : [],
);

const handleTextInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};

const handleSingleSelect = (option: string) => {
  emit("update:modelValue", option);
  emit("touched");
};

const handleMultiToggle = (option: string) => {
  const current = selectedList.value;
  const next = current.includes(option)
    ? current.filter((o) => o !== option)
    : [...current, option];
  emit("update:modelValue", next);
  emit("touched");
};
</script>

<style scoped>
.general-question {
  text-align: left;
  margin-bottom: 2rem;
}

.question-label {
  display: block;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
  color: #e2e8f0;
}

.text-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #e2e8f0;
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.text-input:focus {
  outline: none;
  border-color: #a59ce6;
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.option-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.92rem;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.option-row:hover {
  background: rgba(255, 255, 255, 0.06);
}

.option-row--selected {
  border-color: #a59ce6;
  background: rgba(165, 156, 230, 0.1);
}

.option-row input[type="radio"],
.option-row input[type="checkbox"] {
  accent-color: #a59ce6;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
</style>