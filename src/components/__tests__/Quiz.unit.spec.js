import { mount } from '@vue/test-utils'
import { describe, it, expect} from 'vitest'
import Quiz from '@/components/Quiz.vue'

describe('Quiz.vue', () => {
  describe('Quiz in progress', () => {
    const wrapper = mount(Quiz, {
      props: {
        questions: [
          { text: 'Question 1', choices: ['A', 'B', 'C'], answer: 'A' },
          { text: 'Question 2', choices: ['D', 'E', 'F'], answer: 'D' }
        ],
        currentQuestionIndex: 1
      }
    })
    it('shows the correct question', () => {
      expect(wrapper.text()).toContain('Question 2') // #6
    })
    it('shows the correct list of choices', () => {
      expect(wrapper.findAll('button').length).toEqual(
        wrapper.props().questions[wrapper.props().currentQuestionIndex].choices.length
      ) // #7
    })
    it('shows the correct choice', () => {
      wrapper.vm.selectAnswer('D')
      expect(wrapper.text()).toContain('D')
      expect(wrapper.emitted()['answer-selected'][0]).toEqual(['D']) // #8
      expect(wrapper.emitted()['quiz-completed']).toBeTruthy() // #9
    })
  })
  describe('Quiz not completed', () => {
    const wrapper = mount(Quiz, {
      props: {
        questions: [
          { text: 'Question 1', choices: ['A', 'B', 'C'], answer: 'A' },
          { text: 'Question 2', choices: ['D', 'E', 'F'], answer: 'D' }
        ],
        currentQuestionIndex: 0
      }
    })
    it('quiz is not completed', () => {
      wrapper.vm.selectAnswer('A')
      expect(wrapper.emitted()['quiz-completed']).toBeFalsy() // #10
    })
  })
})
