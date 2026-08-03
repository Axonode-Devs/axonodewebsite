<template>
    <div class="slider-question-container">
        <div class="text-container">
            <h3 class="question-text">{{ question }}</h3>
        </div>
        
        <div class="slider-wrapper">
            <span class="label left-label">{{ leftLabel }}</span>
            <div class="slider-container">
                <!-- Swapped to use v-model="sliderValue" -->
                <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1" 
                    v-model="sliderValue"
                    class="custom-slider"
                >
            </div>
            <span class="label right-label">{{ rightLabel }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    question: {
        type: String,
        required: true
    },
    leftLabel: {
        type: String,
        required: true
    },
    rightLabel: {
        type: String,
        required: true
    },
    modelValue: {
        type: Number,
        default: 12 // Default to 12 points (which equals slider position 3)
    },
    inverted: {
        type: Boolean,
        default: false // New prop to handle inversion
    }
});

const emit = defineEmits(['update:modelValue']);

// Writable computed property to handle the conversion math automatically
const sliderValue = computed({
    get() {
        // Convert the points (4-20) back to a slider position (1-5) for the UI
        if (props.inverted) {
            return 6 - (props.modelValue / 4);
        }
        return props.modelValue / 4;
    },
    set(val) {
        // Convert the new slider position (1-5) into points (4-20) for the Parent
        const numericVal = Number(val);
        const points = props.inverted ? (6 - numericVal) * 4 : numericVal * 4;
        
        emit('update:modelValue', points);
    }
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
    font-family: 'Poppins', sans-serif;
    margin-bottom: 5rem;
}
.question-text {
    font-size: 1.25rem;
    font-weight: 300;
    margin: 0;
    text-align: center;
    font-family: 'Poppins', sans-serif;
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
    font-family: 'Poppins', sans-serif;
}
.left-label {
    text-align: right;
    font-family: 'Poppins', sans-serif;
}
.right-label {
    text-align: left;
    font-family: 'Poppins', sans-serif;
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
</style>