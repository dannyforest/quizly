<template>
  <div>
    <h3>Leaderboards</h3>
    <div v-if="selectedCategory">
      <h4>Category: {{ selectedCategory }}</h4>
      <ul v-if="highScores[selectedCategory] && highScores[selectedCategory].length">
        <li v-for="(entry, index) in highScores[selectedCategory]" :key="index">
          {{ entry.username }}: {{ entry.score }}
        </li>
      </ul>
      <p v-else>No high scores available for this category yet.</p>
    </div>
    <p v-else>Select a category to view the leaderboard.</p>
  </div>
</template>


<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  selectedCategory: String
});

const highScores = ref({});

onMounted(() => loadHighScores());

const loadHighScores = () => highScores.value = JSON.parse(localStorage.getItem('highScores')) || {};

watch(() => props.selectedCategory, (newCategory) => {
  // Logic here if you need to react to category changes

});
</script>

<style scoped>
/* Add your styles here */
</style>
