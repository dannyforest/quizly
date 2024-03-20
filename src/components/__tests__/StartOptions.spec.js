import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router'; // Import your actual routes configuration
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import StartOptions from '@/components/StartOptions.vue';
import Quiz from '@/components/Quiz.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('Parameter Transmission from StartOptions to Quiz using Vue Router', () => {
    beforeEach(async () => {
      router.push('/');
      await router.isReady(); // Make sure the router is ready before each test
    });
  
    it('navigates to Quiz and initializes with selections from StartOptions', async () => {
      const startOptionsWrapper = mount(StartOptions, {
        global: {
          plugins: [router] // Use the mocked router instance
        }
      });
  
      // Simulate user making selections
      // Note: You'll need to adjust this part based on how users make selections in your UI
      await startOptionsWrapper.find('select[name="selectedCategory"]').setValue('Math');
      await startOptionsWrapper.find('select[name="selectedTimeLimit"]').setValue('60');
      await startOptionsWrapper.find('select[name="selectedNumQuestions"]').setValue('5');
  
      // Simulate clicking the "Start Quiz" button, which should navigate to the Quiz component
      await startOptionsWrapper.find('.start-button').trigger('click');
      await flushPromises(); // Wait for all pending state changes and navigations to finish
  
      // At this point, the app should have navigated to the Quiz component
      // You can assert the current route to verify navigation
      expect(router.currentRoute.value.path).toBe('/quiz'); // Adjust the expected path as necessary
  
      // For verifying the initialization of Quiz with the selected options,
      // you would typically check the state of the Quiz component or the URL query/params.
      // This step depends on how the Quiz component receives its initialization parameters.
      // Example assertion if using route query:
      // expect(router.currentRoute.value.query).toEqual({ category: 'Math', timeLimit: '60', numQuestions: '5' });
  
      // If Quiz is directly using route params or state, you might need to directly inspect those or the Quiz component's props/state.
    });
  });
  