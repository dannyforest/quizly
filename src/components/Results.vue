<template>
  <div class="results">
    <h2>Your Quiz Results</h2>
    <p>Your score: {{ score }}/{{ questions.length }}</p>
    <ul>
      <li v-for="(question, index) in questions" :key="index">
        <strong>Q{{ index + 1 }}:</strong> {{ question.text }}
        <div>
          Your answer: {{ userAnswers[index] || "No answer" }}
          <span v-if="userAnswers[index] === question.answer">✅</span>
          <span v-else>❌ (Correct answer: {{ question.answer }})</span>
        </div>
      </li>
    </ul>
    <button @click="restartQuiz" class="restart-button">
      🔁 Restart Quiz
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  score: Number,
  questions: Array,
  userAnswers: Array
});

const emits = defineEmits(['restart']);

const restartQuiz = () => {
  emits('restart');
};
</script>

<style scoped>
.results ul {
  list-style: none;
  padding: 0;
}
.results li {
  margin-bottom: 15px;
}

.restart-button {
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.restart-button:hover {
  background-color: #d32f2f;
}
</style>
