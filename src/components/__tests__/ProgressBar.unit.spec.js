import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progressbar from '@/components/ProgressBar.vue'

describe('Progressbar.vue', () => {
  it('computes progressLabel correctly', () => {
    const wrapper = mount(Progressbar, {
      props: {
        currentQuestionIndex: 1,
        totalQuestions: 4
      }
    })
    expect(wrapper.vm.progressLabel).toEqual('Question 2 of 4')
  })
  it('computes the progress bar width correctly', () => {
    const wrapper = mount(Progressbar, {
      props: {
        currentQuestionIndex: 2,
        totalQuestions: 5
      }
    })
    expect(wrapper.vm.progressBarWidth).toEqual('60%')
    //Also check that the progress bar is at 100% in the DOM not just the variable
    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 60%')
  })
  it('handles the progress at the start correctly', () => {
    const wrapper = mount(Progressbar, {
      props: {
        currentQuestionIndex: 0,
        totalQuestions: 10
      }
    })
    expect(wrapper.vm.progressBarWidth).toEqual('10%')
    //Also check that the progress bar is at 100% in the DOM not just the varaible
    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 10%')
    expect(wrapper.vm.progressLabel).toEqual('Question 1 of 10')
  })

  it('handles the progress at the end correctly', () => {
    const wrapper = mount(Progressbar, {
      props: {
        currentQuestionIndex: 9,
        totalQuestions: 10
      }
    })
    expect(wrapper.vm.progressBarWidth).toEqual('100%')
    //Also check that the progress bar is at 100% in the DOM not just the varaible
    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 100%')
    expect(wrapper.vm.progressLabel).toEqual('Question 10 of 10')
  })
})
