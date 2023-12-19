<template>
  <div class="timer">
    Time left: {{ minutes }}:{{ secondsFormatted }}
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, defineExpose } from 'vue';

const props = defineProps({
  duration: Number // Duration in seconds
});

const timeLeft = ref(props.duration);
const intervalId = ref(null);

const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => timeLeft.value % 60);
const secondsFormatted = computed(() => seconds.value.toString().padStart(2, '0'));

onMounted(() => {
  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(intervalId.value);
      // Emit an event to notify that the time is up
      emit('time-up');
    }
  }, 1000);
});

onUnmounted(() => {
  stop();
});

const stop = () => {
  clearInterval(intervalId.value);
}

// Expose the stop method
defineExpose({ stop });

</script>

<style scoped>
.timer {
  /* Timer styling */
}
</style>
