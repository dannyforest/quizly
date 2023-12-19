<template>
  <div class="quiz" v-if="currentQuestion">
    <h2>{{ currentQuestion.text }}</h2>
    <div class="choices">
      <button
          v-for="(choice, index) in shuffledChoices"
          :key="index"
          class="choice-button"
          @click="selectAnswer(choice)"
      >
        {{ choice }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  questions: Array,
  currentQuestionIndex: Number
});

const emits = defineEmits(['answer-selected', 'quiz-completed']);

const currentQuestion = computed(() => props.questions[props.currentQuestionIndex]);
const isLastQuestion = computed(() => props.currentQuestionIndex === props.questions.length - 1);

const shuffledChoices = computed(() => {
  const choices = [...currentQuestion.value.choices];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
});

const selectAnswer = (choice) => {
  emits('answer-selected', choice);
  if (isLastQuestion.value) {
    emits('quiz-completed');
  }
};

</script>

<style scoped>
.choices {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.choice-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.choice-button:hover {
  background-color: #45a049;
}

.choice-button:active {
  transform: scale(0.98); /* Slightly shrink the button when clicked */
}
</style>
