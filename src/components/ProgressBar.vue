<template>
  <span class="progress-label">{{ progressLabel }}</span>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progressBarWidth }">
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  currentQuestionIndex: Number,
  totalQuestions: Number
});

const progressBarWidth = computed(() => {
  return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100 + '%';
});

const progressLabel = computed(() => {
  return `Question ${props.currentQuestionIndex + 1} of ${props.totalQuestions}`;
});
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
}

.progress-bar {
  height: 20px;
  background-color: #4caf50;
  border-radius: 8px;
  transition: width 0.3s ease;
}

.progress-label {
  font-weight: bold;
}
</style>
