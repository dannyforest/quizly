import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import EditQuestionsView from '@/views/EditQuestionsView.vue';

describe('EditQuestionsView.vue', () => {
  it('addQuestion resets newQuestion', async () => {
    const wrapper = shallowMount(EditQuestionsView);
    wrapper.vm.addQuestion();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.newQuestion).toEqual({ text: '', choices: ['', ''], answer: '' });
  });
});

describe('EditQuestionsView.vue', () => {
    it('addChoice increases newQuestion.choices.length', async () => {
      const wrapper = shallowMount(EditQuestionsView);
      wrapper.vm.addChoice();
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.newQuestion.choices.length).toBe(3);
      expect(wrapper.vm.newQuestion.choices[2]).toBe('');
    });
  });
  