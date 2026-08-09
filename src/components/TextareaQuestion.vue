<template>
    <div class="textarea-question-container">
        <h3 class="question-text">{{ question }}</h3>
        <div class="textarea-wrapper">
            <div class="textarea-container">
                <textarea
                    :value="answer"
                    :placeholder="placeholder"
                    @input="emit('update:answer', $event.target.value)"
                ></textarea>
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
.textarea-question-container {
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

.textarea-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.textarea-container {
    width: 100%;
    max-width: 530px;
    margin: 0 auto;
    justify-content: center;
    display: flex;
}

.textarea-container textarea {
    width: 100%;
    min-height: 100px;
    padding: 14px 24px;
    background: #1a1a1a;
    color: #fff;
    font-size: 1rem;
    font-family: "Poppins", sans-serif;
    border: 1px solid transparent;
    border-radius: 12px;
    outline: none;
    resize: vertical;
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

.textarea-container textarea:focus {
    background-image:
        linear-gradient(#1a1a1a, #1a1a1a),
        linear-gradient(90deg,
            #9beaff,
            #9d8dff,
            #ff8fc8);

    box-shadow: 0 0 12px rgba(173, 125, 255, .2);
}

.textarea-container textarea::placeholder {
    color: #494949;
    font-weight: 400;
    font-size: 1rem;
}

@media (max-width: 480px) {
    .textarea-question-container {
        padding: 0.5rem 0;
    }

    .question-text {
        font-size: 0.95rem;
    }

    .textarea-container textarea {
        padding: 12px 18px;
        font-size: 0.9rem;
        min-height: 80px;
    }
}
</style>
