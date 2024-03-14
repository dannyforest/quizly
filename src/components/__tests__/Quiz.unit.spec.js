import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Quiz from '@/components/Quiz.vue'

describe('Quiz', () => {
  let questions
  beforeEach(() => {
    questions = [
      {
        text: 'What is the capital of France?',
        choices: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        answer: 'Paris',
        category: 'Geography'
      },
      {
        text: 'What is 2 + 2?',
        choices: ['3', '4', '5', '6'],
        answer: '4',
        category: 'Mathematics'
      }
    ]
  })
  describe('isLastQuestion', () => {
    it('returns false when current index doesnt equal questions.length -1', () => {
      const wrapper = mount(Quiz, {
        props: {
          questions,
          currentQuestionIndex: 0
        }
      })
      const lastQuestion = wrapper.vm.isLastQuestion
      expect(lastQuestion).not.toBeTruthy()
    })
  })
  describe('selectAnswer', () => {
    it('emits quiz-completed when isLastQuestion is true', () => {
      const wrapper = mount(Quiz, {
        props: {
          questions: questions,
          currentQuestionIndex: 1
        }
      })
      const button = wrapper.findAll('button')[0]
      button.trigger('click')

      expect(wrapper.emitted('quiz-completed')).toBeTruthy()
    })
  })
})
