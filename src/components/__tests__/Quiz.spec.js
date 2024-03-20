import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Quiz from '@/components/Quiz.vue';

describe('Quiz.vue Integration Tests', () => {
  let wrapper;
  const questions = [
    { text: 'What is 2 + 2?', choices: ['3', '4', '5', '6'], answer: '4' },
    { text: 'What is the capital of France?', choices: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' }
  ];

  beforeEach(() => {
    wrapper = mount(Quiz, {
      props: {
        questions: questions,
        currentQuestionIndex: 0
      }
    });
  });

  it('renders the current question and its choices correctly', () => {
    const questionText = wrapper.find('h2').text();
    expect(questionText).toContain(questions[0].text);
    const choiceButtons = wrapper.findAll('.choice-button');
    expect(choiceButtons).toHaveLength(questions[0].choices.length);
  });

  it('emits an "answer-selected" event when a choice is selected', async () => {
    await wrapper.find('.choice-button').trigger('click');
    expect(wrapper.emitted()['answer-selected']).toBeTruthy();
  });

  it('emits a "quiz-completed" event when the last question is answered', async () => {
    await wrapper.setProps({ currentQuestionIndex: questions.length - 1 });
    await wrapper.findAll('.choice-button')[0].trigger('click');
    expect(wrapper.emitted()['quiz-completed']).toBeTruthy();
  });
});