import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import QuizView from '@/views/QuizView.vue'
import StartOptions from '@/components/StartOptions.vue'
import Quiz from '@/components/Quiz.vue'
import Timer from '@/components/Timer.vue'
import EditQuestionsView from '@/views/EditQuestionsView.vue'
import { nextTick } from 'vue'

const routes = [
  { path: '/', name: 'Quiz', component: QuizView },
  { path: '/edit', name: 'Edit', component: EditQuestionsView }
]

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
    it('renders Timer component', async () => {
      const wrapper = mount(QuizView)

      wrapper.vm.quizStarted = true
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(Timer).exists()).toBe(true)
    })
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
describe('navigateToEditPage', () => {
  it('redirects to edit page when edit questions button is clicked', async () => {
    const router = createRouter({ history: createWebHistory(), routes })
    const wrapper = mount(StartOptions, { global: { plugins: [router] } })

    await router.isReady()
    await wrapper.find('.edit-questions-button').trigger('click')

    // Aguarda a navegação ser concluída
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/edit')
  })
})
