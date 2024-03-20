import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import QuizView from '@/views/QuizView.vue'
import StartOptions from '@/components/StartOptions.vue'
import Quiz from '@/components/Quiz.vue'
import Timer from '@/components/Timer.vue'
import EditQuestionsView from '@/views/EditQuestionsView.vue'
import Leaderboards from '@/components/Leaderboards.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { nextTick } from 'vue'

const routes = [
  { path: '/', name: 'Quiz', component: QuizView },
  { path: '/edit', name: 'Edit', component: EditQuestionsView }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('QuizView', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(QuizView, {
      global: {
        plugins: [router]
      }
    })
  })
  describe('initialize', () => {
    it('fetches the questions from localeStorage or jsonData', async () => {
      //since ''questions'' doesn't exists outside Initialized(),
      //i will be checking selectedQuestions.length to make sure it has values
      //since it required questions to also have values to get there.
      await nextTick()
      expect(wrapper.vm.selectedQuestions.length).toBeGreaterThan(0)
    })
    it('renders Timer component', async () => {
      wrapper.vm.quizStarted = true
      await wrapper.vm.$nextTick()

      expect(wrapper.findComponent(Timer).exists()).toBe(true)
    })
    it('renders the Quiz component', async () => {
      // Find the StartOptions component
      const startOptions = wrapper.findComponent({ name: 'StartOptions' })
      // Find input elements -> user name, category selection, duration, and number of questions
      const nameInput = startOptions.find('input')
      const categorySelect = startOptions.findAll('select')[0]

      // Simulate user inputs
      await nameInput.setValue('Jojo')
      await categorySelect.setValue('Geography')

      // Simulate clicking the start button
      startOptions.find('.start-button').trigger('click')

      // Wait for Vue to process changes
      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent(Quiz).exists()).toBe(true)
    })
  })
  it('renders the ProgressBar component', async () => {
    // Find the StartOptions component
    const startOptions = wrapper.findComponent({ name: 'StartOptions' })
    // Find input elements -> user name, category selection, duration, and number of questions
    const nameInput = startOptions.find('input')
    const categorySelect = startOptions.findAll('select')[0]

    // Simulate user inputs
    await nameInput.setValue('Jojo')
    await categorySelect.setValue('Geography')

    // Simulate clicking the start button
    startOptions.find('.start-button').trigger('click')

    // Wait for Vue to process changes
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(ProgressBar).exists()).toBe(true)
  })
  it('renders StartOptionsComponent', () => {
    const wrapper = mount(QuizView)
    const startOptions = wrapper.findComponent(StartOptions)
    expect(startOptions).toBeDefined()
  })
  describe('renders Leaderboards (exists)', () => {
    it('renders the Leaderboards component', () => {
      expect(wrapper.findComponent(Leaderboards).exists()).toBe(true)
    })
  })
  describe('handleCategoryChanged', () => {
    it('changes selectedCategory when category-changed is emitted from the StartOptions Component', async () => {
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
      await router.isReady()
      await wrapper.find('.edit-questions-button').trigger('click')
      await flushPromises()

      expect(router.currentRoute.value.path).toBe('/edit')
    })
  })
  it('displays the selected category in the Leaderboards component', async () => {
    // Find the StartOptions component
    const startOptions = wrapper.findComponent({ name: 'StartOptions' })
    const categorySelect = startOptions.findAll('select')[0]
    await categorySelect.setValue('Geography')

    await wrapper.vm.$nextTick()
    const LeaderboardComponent = wrapper.findComponent({ name: 'Leaderboards' })
    expect(LeaderboardComponent.props('selectedCategory')).toBe('Geography')
  })

  describe('renders Leaderboards (exists)', () => {
    it('renders the Leaderboards component', () => {
      expect(wrapper.findComponent(Leaderboards).exists()).toBe(true)
    })
  })
  describe('Timer', () => {
    it('sends the right duration to the Timer component', async () => {
      // Find the StartOptions component
      const startOptions = wrapper.findComponent({ name: 'StartOptions' })
      // Find input elements -> user name, category selection, duration, and number of questions
      const nameInput = startOptions.find('input')
      const categorySelect = startOptions.findAll('select')[0]

      // Simulate user inputs
      await nameInput.setValue('Jojo')
      await categorySelect.setValue('Geography')

      // Simulate clicking the start button
      startOptions.find('.start-button').trigger('click')

      // Wait for Vue to process changes
      await wrapper.vm.$nextTick()

      // Check that Timer component receives correct duration prop
      const timerComponent = wrapper.findComponent({ name: 'Timer' })
      expect(timerComponent.props('duration')).toBe(60)
    })
  })

  describe('Results', () => {
    it('renders Results component exists after completing a quiz', async () => {
      // Find the StartOptions component
      const startOptions = wrapper.findComponent({ name: 'StartOptions' })
      // Find input elements -> user name, category selection, duration, and number of questions
      const nameInput = startOptions.find('input')
      const categorySelect = startOptions.findAll('select')[0]

      // Simulate user inputs
      await nameInput.setValue('Jojo')
      await categorySelect.setValue('Geography')

      // Simulate clicking the start button
      startOptions.find('.start-button').trigger('click')

      // Wait for Vue to process changes
      await wrapper.vm.$nextTick()

      // Simulate completing the quiz by selecting answers for each question
      const quizComponent = wrapper.findComponent(Quiz)
      for (let i = 0; i < 5; i++) {
        await quizComponent.vm.selectAnswer([0])
      }

      // Wait for Vue to process changes
      await wrapper.vm.$nextTick()

      // Check that the Results component exists
      const resultsComponent = wrapper.findComponent({ name: 'Results' })
      expect(resultsComponent.exists()).toBe(true)
    })
  })
})
