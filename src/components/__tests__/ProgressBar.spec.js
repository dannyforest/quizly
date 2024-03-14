import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('computes progressLabel correctly', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        currentQuestionIndex: 1,
        totalQuestions: 4
      }
    })

    expect(wrapper.vm.progressLabel).toEqual('Question 2 of 4')
  })

  it('computes progressBarWidth correctly', () => {
    const wrapper = mount(ProgressBar, {
      props: {
        currentQuestionIndex: 2,
        totalQuestions: 5
      }
    })

    expect(wrapper.vm.progressBarWidth).toEqual('60%')
  })
})
