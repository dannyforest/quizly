<template>
  <div id="startOptions">
    <input class="input-field" v-model="username" placeholder="Enter your name" />

    <!-- Category Selection -->
    <select class="input-field" v-model="selectedCategory">
      <option disabled value="">Select a category</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>

    <!-- Time Limit Selection -->
    <select class="input-field" v-model="selectedTimeLimit">
      <option disabled value="">Select time limit</option>
      <option value="60">1 minute</option>
      <option value="300">5 minutes</option>
      <option value="600">10 minutes</option>
      <option value="900">15 minutes</option>
    </select>

    <!-- Number of Questions Selection -->
    <select class="input-field" v-model="selectedNumQuestions">
      <option disabled value="">Select number of questions</option>
      <option value="5">5 questions</option>
      <option value="10">10 questions</option>
      <option value="15">15 questions</option>
    </select>

    <button class="start-button" @click="emitStartQuiz">Start Quiz</button>
    <button @click="navigateToEditPage" class="edit-questions-button">Edit Questions</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  categories: Array
});

const username = ref('');
const selectedCategory = ref('');
const selectedTimeLimit = ref('60');
const selectedNumQuestions = ref('5');

const emit = defineEmits(['start-quiz', 'category-changed']);

// Watch for changes in selectedCategory and emit an event
watch(selectedCategory, (newValue) => {
  emit('category-changed', newValue);
});

const emitStartQuiz = () => {
  if (selectedCategory.value && selectedTimeLimit.value && selectedNumQuestions.value && username.value) {
    emit('start-quiz', {
      username: username.value,
      selectedCategory: selectedCategory.value,
      selectedTimeLimit: selectedTimeLimit.value,
      selectedNumQuestions: selectedNumQuestions.value
    });
  } else {
    alert("Please fill in all the options");
  }
};

const router = useRouter();

const navigateToEditPage = () => {
  router.push('/edit');
};
</script>

<style scoped>
#startOptions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.input-field {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}

.start-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #45a049;
}

.edit-questions-button {
  padding: 8px 15px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-questions-button:hover {
  background-color: #45a049;
}
</style>
