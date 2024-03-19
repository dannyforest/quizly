import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Quiz from '@/components/Quiz.vue';

describe('Quiz.vue', () => {
  let wrapper;

  const mockQuestions = [
    {
      text: 'Question 1',
      choices: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    },
  ];

  beforeEach(() => {
    wrapper = mount(Quiz, {
      props: {
        questions: mockQuestions,
        currentQuestionIndex: 0,
      },
    });
  });

  it('does not render quiz content if there is no current question', () => {
    const wrapper = mount(Quiz, {
      props: {
        questions: mockQuestions,
        currentQuestionIndex: -1,
      },
    });
    expect(wrapper.find('.quiz').exists()).toBeFalsy();
    expect(wrapper.find('.choice-button').exists()).toBeFalsy();
  });

  it('renders correctly with a question', () => {
    expect(wrapper.find('.quiz h2').text()).toContain('Question 1');
    expect(wrapper.findAll('.choice-button')).toHaveLength(4); 
  });

  it('emits "quiz-completed" if the last question is answered', async () => {
    const lastQuestionWrapper = mount(Quiz, {
      props: {
        questions: mockQuestions,
        currentQuestionIndex: mockQuestions.length - 1, 
      },
    });

    await lastQuestionWrapper.findAll('.choice-button')[0].trigger('click');
    expect(lastQuestionWrapper.emitted()).toHaveProperty('quiz-completed');
  });

  it('correctly identifies the last question', () => {
    const wrapper = mount(Quiz, {
      props: {
        questions: mockQuestions,
        currentQuestionIndex: mockQuestions.length - 1,
      },
    });
    expect(wrapper.vm.isLastQuestion).toBeTruthy();
  });
  
});
