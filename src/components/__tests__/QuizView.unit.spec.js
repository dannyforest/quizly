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
})
