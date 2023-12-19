<template>
  <div class="edit-container">
    <button @click="goBack" class="back-button">Back</button>

    <h2 class="edit-title">Edit Questions</h2>

    <div class="add-question-container">
      <h3>Add New Question</h3>
      <input v-model="newQuestion.text" placeholder="New Question text" class="question-input" />
      <select v-model="newQuestion.category" class="category-dropdown">
        <option disabled value="">Select a category</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <div v-for="(choice, index) in newQuestion.choices" :key="index" class="choice-input">
        <input v-model="newQuestion.choices[index]" placeholder="Choice" />
      </div>
      <button @click="addChoice" class="add-choice-button">Add Choice</button>
      <input v-model="newQuestion.answer" placeholder="Correct Answer" class="answer-input" />
      <button @click="addQuestion" class="add-question-button">Add Question</button>
    </div>

    <div class="questions-container">
      <div v-for="(question, index) in questions" :key="index" class="question-block">
        <div class="question-content">
          <span>Question:</span>
          <input v-model="question.text" placeholder="Question text" class="question-input" size="93" />
        </div>
        <select v-model="question.category" class="category-dropdown">
          <option disabled value="">Select a category</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <div class="choices-container">
          <span>Answers:</span>
          <div v-for="(choice, idx) in question.choices" :key="idx" class="choice-input">
            <input v-model="question.choices[idx]" placeholder="Choice" />
          </div>
        </div>
        <div class="answer-content">
          <span>Correct Answer:</span>
          <input v-model="question.answer" placeholder="Answer" class="answer-input" />
        </div>
        <button @click="deleteQuestion(index)" class="delete-button">Delete</button>
      </div>
    </div>
    <button @click="saveQuestions" class="save-button">Save Questions</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import questionsData from '../data/questions.json';

const router = useRouter();
const questions = ref([]);
const categories = ref([]);

const newQuestion = ref({
  text: '',
  choices: ['', ''],
  answer: '',
  category: ''
});

onMounted(() => {
  // Load questions from localStorage or fallback to questions.json
  const storedQuestions = localStorage.getItem('questions');
  questions.value = storedQuestions ? JSON.parse(storedQuestions) : questionsData;

  // Extract categories from questions
  const categorySet = new Set();
  questions.value.forEach(question => {
    if (question.category) {
      categorySet.add(question.category);
    }
  });
  categories.value = Array.from(categorySet);
});

const goBack = () => {
  router.push('/');
};

const addQuestion = () => {
  questions.value.push({ ...newQuestion.value });
  newQuestion.value = { text: '', choices: ['', ''], answer: '' }; // Reset new question fields
  saveQuestions();
};

const addChoice = () => {
  newQuestion.value.choices.push('');
};

const saveQuestions = () => {
  localStorage.setItem('questions', JSON.stringify(questions.value));
  alert('Questions saved!');
};

const deleteQuestion = (index) => {
  if (confirm('Are you sure you want to delete this question?')) {
    questions.value.splice(index, 1);
  }
};
</script>

<style scoped>
.edit-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.edit-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.questions-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.question-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f8f8;
}

.question-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.choices-container {
  display: flex;
  gap: 10px;
}

.choice-input input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.answer-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.save-button:hover {
  background-color: #45a049;
}

.delete-button {
  margin-left: 10px;
  padding: 6px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff3333;
}

.question-content, .answer-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-question-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f8f8;
}

.add-question-button, .add-choice-button {
  margin-bottom: 10px;
  padding: 6px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-question-button {
  margin-top: 10px;
}

.add-question-button:hover, .add-choice-button:hover {
  background-color: #45a049;
}

.category-dropdown {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}
.back-button {
  margin-bottom: 20px;
  padding: 8px 15px;
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #bbb;
}
</style>