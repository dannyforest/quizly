import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import StartOptions from '../StartOptions.vue'

describe('StartOptions', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(StartOptions)
  })
  describe('selectedNumQuestions', () => {
    it('initially has  a value of 5', () => {
      expect(wrapper.vm.selectedNumQuestions).toBe('5')
    })
  })
  describe('emitStartQuiz', () => {
    it('emits start-quiz with thruthy mocked values', async () => {
      wrapper.vm.username = 'Boop'
      wrapper.vm.selectedCategory = 'Geography'
      const btn = wrapper.find('.start-button')
      await btn.trigger('click')
      expect(wrapper.emitted('start-quiz')).toBeTruthy()
    })
  })
  describe('selectedCategory watcher', () => {
    it('emits category-changed when selectedCategory is changed', async () => {
      const select = wrapper.find('select.input-field')
      await select.setValue('Mathematics')
      await select.trigger('change')

      expect(wrapper.emitted('category-changed')).toBeTruthy()
    })
  })
})
