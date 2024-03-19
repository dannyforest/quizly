import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Results from '@/components/Results.vue';

describe('Results.vue', () => {
  let wrapper;
  const mockQuestions = [
    { text: 'Question 1?', answer: 'Answer 1' },
    { text: 'Question 2?', answer: 'Answer 2' }
  ];
  const mockUserAnswers = ['Answer 1', 'Wrong Answer'];

  beforeEach(() => {
    wrapper = mount(Results, {
      props: {
        score: 1,
        questions: mockQuestions,
        userAnswers: mockUserAnswers
      }
    });
  });

  it('renders the correct score', () => {
    expect(wrapper.find('p').text()).toContain('Your score: 1/2');
  });

  it('lists all the questions with the user answers and correct indication', () => {
    const listItems = wrapper.findAll('li');
    expect(listItems).toHaveLength(mockQuestions.length);

    // Verify first question is correctly answered
    expect(listItems[0].text()).toContain('Q1: Question 1?');
    expect(listItems[0].text()).toContain('Your answer: Answer 1 ✅');

    // Verify second question is incorrectly answered
    expect(listItems[1].text()).toContain('Q2: Question 2?');
    expect(listItems[1].text()).toContain('Your answer: Wrong Answer ❌ (Correct answer: Answer 2)');
  });

  it('emits the "restart" event when the restart button is clicked', async () => {
    await wrapper.find('.restart-button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('restart');
  });
});
