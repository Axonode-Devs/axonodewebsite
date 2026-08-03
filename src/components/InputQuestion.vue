<template>
    <div class="input-question-container">
        <h3 class="question-text">{{ question }}</h3>
        <div class="input-wrapper">
            <div class="input-container">
                <input 
                    type="text" 
                    :value="answer"
                    :placeholder="placeholder"
                    @input="emit('update:answer', $event.target.value)"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        question: String,
        answer: String,
        placeholder: String,
    })

    const emit = defineEmits(['update:answer'])
</script>

<style scoped>
.input-question-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    color: var(--text-color);
    font-family: 'Poppins', sans-serif;
}

.question-text {
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--text-color);
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
}

.input-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.input-container {
    width: 100%;
    max-width: 530px;
    margin: 0 auto;
    justify-content: center;
    display: flex;
}

.input-container input {
    width: 100%;
    padding: 14px 24px;
    background: #1a1a1a;
    color: #fff;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    border: 1px solid transparent;
    border-radius: 9999px;
    outline: none;
    background-image:
        linear-gradient(#1a1a1a, #1a1a1a),
        linear-gradient(90deg,
            #78dee7 0%,
            #a59ce6 50%,
            #fe78b0 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;

    transition: .25s ease;
}

.input-container input:focus {
    background-image:
        linear-gradient(#1a1a1a, #1a1a1a),
        linear-gradient(90deg,
            #9beaff,
            #9d8dff,
            #ff8fc8);

    box-shadow: 0 0 12px rgba(173, 125, 255, .2);
}

.input-container input::placeholder {
    color: #494949;
    font-weight: 400;
    font-size: 1rem;
}
</style>