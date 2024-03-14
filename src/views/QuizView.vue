<template>
  <div id="quiz">
    <img src="/public/images/logo.png" alt="logo" width="64" />
    <h1>Quizzy Peak</h1>

    <StartOptionsComponent
      :categories="categories"
      v-if="!quizStarted"
      @start-quiz="startQuiz"
      @category-changed="handleCategoryChanged"
    />
    <Leaderboards :selectedCategory="selectedCategory" v-if="!quizStarted" />

    <div v-if="quizStarted">
      <Timer ref="timerRef" :duration="selectedTimeLimit" @time-up="endQuiz" />
      <!-- 300 seconds = 5 minutes -->
      <ProgressBar
        :currentQuestionIndex="currentQuestionIndex"
        :totalQuestions="selectedQuestions.length"
      />
      <Quiz
        :questions="selectedQuestions"
        :currentQuestionIndex="currentQuestionIndex"
        @answer-selected="handleAnswerSelected"
        @quiz-completed="handleQuizCompleted"
      />
      <Results
        v-if="showResults"
        :score="score"
        :questions="selectedQuestions"
        :userAnswers="userAnswers"
        @restart="resetQuiz"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Quiz from '../components/Quiz.vue'
import Results from '../components/Results.vue'
import ProgressBar from '../components/ProgressBar.vue'
import questionsData from '../data/questions.json'
import Timer from '../components/Timer.vue'
import Leaderboards from '../components/Leaderboards.vue'
import StartOptionsComponent from '../components/StartOptions.vue'

const currentQuestionIndex = ref(0)
const score = ref(0)
const showResults = ref(false)
const userAnswers = ref([])
const selectedQuestions = ref([])
const quizStarted = ref(false)
const selectedCategory = ref('')
const categories = ref([])
const timerRef = ref(null)
const selectedTimeLimit = ref('60') // Time limit in seconds
const selectedNumQuestions = ref('5') // Number of questions
const username = ref('')
const highScores = ref(JSON.parse(localStorage.getItem('highScores')) || {})

onMounted(() => initialize())

const initialize = () => {
  try {
    highScores.value = JSON.parse(localStorage.getItem('highScores')) || {}
  } catch (error) {
    console.error('Error loading high scores:', error)
    highScores.value = {}
  }
  const questions = JSON.parse(localStorage.getItem('questions')) || questionsData
  const categorySet = new Set()
  questions.forEach((question) => categorySet.add(question.category))
  categories.value = Array.from(categorySet)
  shuffleAndSelectQuestions()
}

const handleCategoryChanged = (newCategory) => {
  selectedCategory.value = newCategory
}

// Function to shuffle questions
const shuffleQuestions = (questions) => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }
  return questions
}

const startQuiz = (options) => {
  if (options.selectedCategory && options.selectedTimeLimit && options.selectedNumQuestions) {
    username.value = options.username
    selectedCategory.value = options.selectedCategory
    selectedTimeLimit.value = parseInt(options.selectedTimeLimit)
    selectedNumQuestions.value = parseInt(options.selectedNumQuestions)

    // Prepare the quiz with the selected options
    prepareQuiz()
    quizStarted.value = true
  } else {
    alert('Please select all options')
  }
}

const prepareQuiz = () => {
  // Filter questions based on selected category
  const questions = JSON.parse(localStorage.getItem('questions')) || questionsData
  const filteredQuestions = questions.filter(
    (question) => question.category === selectedCategory.value
  )

  // Shuffle filtered questions
  const shuffledQuestions = shuffleQuestions(filteredQuestions)

  // Select the specified number of questions
  selectedQuestions.value = shuffledQuestions.slice(0, selectedNumQuestions.value)

  // Reset the current question index and score
  currentQuestionIndex.value = 0
  score.value = 0
}

const resetQuiz = () => {
  currentQuestionIndex.value = 0
  userAnswers.value = []
  showResults.value = false
  quizStarted.value = false // Reset the quiz start state
  score.value = 0
  shuffleAndSelectQuestions()
}

const shuffleAndSelectQuestions = () => {
  const questions = JSON.parse(localStorage.getItem('questions')) || questionsData
  const shuffledQuestions = shuffleQuestions([...questions])
  selectedQuestions.value = shuffledQuestions.slice(0, 5)
}

const handleAnswerSelected = (selectedAnswer) => {
  userAnswers.value[currentQuestionIndex.value] = selectedAnswer

  const question = selectedQuestions.value[currentQuestionIndex.value]
  if (selectedAnswer === question.answer) {
    score.value++
  }
  if (currentQuestionIndex.value < selectedQuestions.value.length - 1) {
    currentQuestionIndex.value++
  } else {
    showResults.value = true
  }
}

const handleQuizCompleted = () => {
  if (timerRef.value) {
    timerRef.value.stop() // Assuming 'stop' is a method in your Timer component
  }
  showResults.value = true
  updateHighScore()
}

const updateHighScore = () => {
  const newScoreEntry = {
    username: username.value,
    score: score.value
  }

  if (!highScores.value[selectedCategory.value]) {
    // If no high scores for this category, initialize with the new score
    highScores.value[selectedCategory.value] = [newScoreEntry]
  } else {
    const existingEntryIndex = highScores.value[selectedCategory.value].findIndex(
      (entry) => entry.username === username.value
    )

    if (existingEntryIndex !== -1) {
      // If username already exists, update the score if it's higher
      if (highScores.value[selectedCategory.value][existingEntryIndex].score < score.value) {
        highScores.value[selectedCategory.value][existingEntryIndex].score = score.value
      }
    } else {
      // If username doesn't exist, add the new score
      highScores.value[selectedCategory.value].push(newScoreEntry)
    }
  }
  highScores.value[selectedCategory.value].sort((a, b) => b.score - a.score) // Sort scores in descending order

  try {
    localStorage.setItem('highScores', JSON.stringify(highScores.value))
  } catch (error) {
    console.error('Error updating high scores:', error)
  }
}

const endQuiz = () => {
  // Logic to end the quiz
  if (timerRef.value) {
    timerRef.value.stop() // Assuming 'stop' is a method in your Timer component
  }
  showResults.value = true
  currentQuestionIndex.value = selectedQuestions.value.length - 1
}
</script>

<style>
#quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>
