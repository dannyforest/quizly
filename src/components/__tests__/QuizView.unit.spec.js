import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import QuizView from '@/views/QuizView.vue'

describe('initial state', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(QuizView)
  })
  it('has 2 buttons', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
  })
  it('shows the Quizzy Peak title', () => {
    const title = wrapper.findAll('h1')[0]
    expect(title.text()).toEqual('Quizzy Peak')
  })
  it('selectedTimeLimit initially returns 60', () => {
    expect(wrapper.vm.selectedTimeLimit).toBe('60')
  })
	it("should initially set the value of selectedNumQuestions to 5", () => {
		expect(wrapper.vm.selectedNumQuestions).toBe("5");
	})
  it('initial state should indicate that the quiz has not started', () => {
    // Check if the quizStarted is false, indicating the quiz hasn't started
    expect(wrapper.vm.quizStarted).toBe(false)
  })
  it('should correctly initialize the selected questions based on the predefined number', async () => {
    // Expected number of selected questions
    const selectedNumQuestions = 5

    // Check if the length of the selectedQuestions array matches the expected number
    expect(wrapper.vm.selectedQuestions.length).toBe(selectedNumQuestions)
  })
})
