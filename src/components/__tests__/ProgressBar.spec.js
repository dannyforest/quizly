import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressBar from '@/components/ProgressBar.vue';

describe('ProgressBar Component Integration Tests', () => {
  // Test the initial state of the progress bar
  it('shows correct initial progress', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        currentQuestionIndex: 0,
        totalQuestions: 5
      }
    });

    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 20%');
    expect(wrapper.find('.progress-label').text()).toContain('Question 1 of 5');
  });

  // Test progress update after answering a question
  it('updates progress correctly after answering a question', async () => {
    const wrapper = mount(ProgressBar, {
      props: {
        currentQuestionIndex: 1,
        totalQuestions: 5
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 40%');
    expect(wrapper.find('.progress-label').text()).toContain('Question 2 of 5');
  });

  // Test the completion state of the progress bar
  it('shows completion state correctly', async () => {
    const wrapper = mount(ProgressBar, {
      props: {
        currentQuestionIndex: 4,
        totalQuestions: 5
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 100%');
    expect(wrapper.find('.progress-label').text()).toContain('Question 5 of 5');
  });
});
