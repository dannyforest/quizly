import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Results from '@/components/Results.vue'

describe('Results.vue', () => {
  let wrapper
  describe('Results', () => {
    beforeEach(() => {
      wrapper = mount(Results, {
        props: {
          score: 42,
          questions: [
            { text: 'Question 1', choices: ['A', 'B', 'C'], answer: 'A' },
            { text: 'Question 2', choices: ['D', 'E', 'F'], answer: 'D' }
          ],
          userAnswers: ['A', 'world?']
        }
      })
    })
    describe('Initial state', () => {
      it('shows the first title(h2)', () => {
        const findAllLi = wrapper.findAll('li')
        expect(wrapper.find('h2').text()).toBe('Your Quiz Results') // #11
        expect(wrapper.find('button').text()).toBe('🔁 Restart Quiz') // #12
        expect(findAllLi.length).toEqual(wrapper.props('questions').length) // #13
        expect(findAllLi[0].find('div').text()).toContain('Your answer: ') // #14 DANNY DIT QUE : "C'EST PAS BON.. TRAVAIL DE MARDE"
      })
      describe('Answers', () => {
        it('verifies that the span v-if works', () => {
          const correctDiv = wrapper.findAll('li')[0].find('div')
          const wrongDiv = wrapper.findAll('li')[1].find('div')
          const correctAnswer = wrapper.props('userAnswers')[0]
          const wrongAnswer = wrapper.props('userAnswers')[1]

          expect(correctDiv.text()).toContain(correctAnswer) // #15
          expect(correctDiv.find('span').text()).toContain('✅') // #16
          expect(wrongDiv.text()).toContain(wrongAnswer) // #17
          expect(wrongDiv.find('span').text()).toContain('❌') // #18
        })
        it('sends the correct emit', () => {
          wrapper.vm.restartQuiz()
          expect(wrapper.emitted()['restart']).toBeTruthy() // #19
        })
      })
    })
  })
})
