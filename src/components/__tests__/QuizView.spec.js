import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuizView from '@/views/QuizView.vue'
import StartOptions from '@/components/StartOptions.vue'
import Quiz from '@/components/Quiz.vue'
import { nextTick } from 'vue'

describe('QuizView', () => {
  describe('initialize', () => {
    it('fetches the questions from localeStorage or jsonData', async () => {
      //since ''questions'' doesn't exists outside Initialized(),
      //i will be checking selectedQuestions.length to make sure it has values
      //since it required questions to also have values to get there.
      const wrapper = mount(QuizView)
      await nextTick()
      expect(wrapper.vm.selectedQuestions.length).toBeGreaterThan(0)
    })
    it('renders StartOptionsComponent', () => {
      const wrapper = mount(QuizView)
      const startOptions = wrapper.findComponent(StartOptions)
      expect(startOptions).toBeDefined()
    })
  })
	// Danny a dit que c'est correct que ce test passe pas
  describe('handleCategoryChanged', () => {
    it('changes selectedCategory when category-changed is emitted from the StartOptions Component', async () => {
      const wrapper = mount(QuizView)
      expect(wrapper.vm.selectedCategory).toBe('')
      const startOptions = wrapper.findComponent({ name: 'StartOptions' })
      const Leaderboards = wrapper.findComponent({ name: 'Leaderboards' })
      const startOptionsSelectInput = startOptions.findAll('select')[0]
      await startOptionsSelectInput.setValue('Literature')
      await wrapper.vm.$nextTick()
      expect(startOptions.emitted('category-changed')[0]).toBeTruthy()
      const title = Leaderboards.find('h4')
      expect(title.text()).toContain('Literature')
    })
  })
  describe('handleAnswerSelected', () => {
    it("adds the selected answer to the player's answers", async () => {
      const wrapper = mount(QuizView)
      const choice = 'An answer'

      wrapper.vm.quizStarted = true
      await wrapper.vm.$nextTick()

      wrapper.findComponent(Quiz).vm.$emit('answer-selected', choice)
      await wrapper.vm.$nextTick()

      const userAnswers = wrapper.vm.userAnswers
      expect(userAnswers[userAnswers.length - 1]).toBe(choice)
    })
  })
})
