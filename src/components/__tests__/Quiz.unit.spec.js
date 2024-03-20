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
    it('should return true when current index equals questions.length - 1', () => {
      const wrapper = mount(Quiz, {
        props: {
          questions,
          currentQuestionIndex: 1
        }
      })
      expect(wrapper.vm.isLastQuestion).toBe(true)
    })
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
  it('selectAnswer emits answer-selected', async () => {
    const wrapper = mount(Quiz, {
      props: { questions: questions, currentQuestionIndex: 0 }
    })
    const answer = 'Sample Answer'
    wrapper.vm.selectAnswer(answer)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('answer-selected')[0]).toEqual([answer])
  })
  describe('currentQuestion', () => {
    it('returns the current corresponding question with mocked question array and index', () => {
      const wrapper = mount(Quiz, {
        props: {
          questions,
          currentQuestionIndex: 0
        }
      })

      expect(wrapper.vm.currentQuestion).toStrictEqual({
        text: 'What is the capital of France?',
        choices: ['Paris', 'Berlin', 'Rome', 'Madrid'],
        answer: 'Paris',
        category: 'Geography'
      })
    })
  })
})
