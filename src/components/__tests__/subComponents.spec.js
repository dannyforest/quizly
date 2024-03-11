import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import QuizView from '@/views/QuizView.vue'
import StartOptions from '../StartOptions.vue'
import Leaderboards from '../Leaderboards.vue'
import Timer from '../Timer.vue'
import ProgressBar from '../ProgressBar.vue'
import Quiz from '../Quiz.vue'
import Results from '../Results.vue'

describe.only('QuizView', () => {
  let wrapper

  beforeEach(() => {})
  const categories = 'Select a category'
  it('verifies that startOptionsComponent exists', () => {
    wrapper = mount(QuizView, {
      props: {
        categories: categories
      }
    })
    const startOptionsComponent = wrapper.findComponent(StartOptions)
    expect(startOptionsComponent.text()).toContain(categories)
    expect(startOptionsComponent.exists()).toBeTruthy() // #7
  })
  it('verifies that Leaderboards exists', () => {
    wrapper = mount(QuizView, {
      props: {
        categories: categories
      },
      components: {
        Leaderboards
      }
    })
    const LeaderboardsComponent = wrapper.findComponent(Leaderboards)
    expect(LeaderboardsComponent.exists()).toBeTruthy() // #8
  })
  
  describe('testStarted', async () => {
    it('verifies that Timer exists', async () => {
      wrapper.vm.quizStarted = true
      await wrapper.vm.$nextTick()
      const TimerComponent = wrapper.findComponent(Timer)
      expect(TimerComponent.exists()).toBeTruthy() // #9
    })
    it('verifies thatProgressBar exists', () => {
      wrapper.vm.currentQuestionIndex = 0
      const ProgressBarComponent = wrapper.findComponent(ProgressBar)
      expect(ProgressBarComponent.exists()).toBeTruthy() // #10
    })
    it('verifies that Quiz exists', () => {
      const QuizComponent = wrapper.findComponent(Quiz)
      expect(QuizComponent.exists()).toBeTruthy() // #11
    })
    it('verifies that Results exists', async () => {
      wrapper.vm.quizStarted = true
      wrapper.vm.showResults = true
      await wrapper.vm.$nextTick()
      const ResultsComponent = wrapper.findComponent(Results)
      expect(ResultsComponent.exists()).toBeTruthy() // #12
    })
  })
})
