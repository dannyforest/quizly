import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import StartOptions from '@/components/StartOptions.vue'
import questions from '@/data/questions.json'

describe('StartOptions.vue', () => {
  let wrapper
  let categories
  beforeEach(() => {
    const categorySet = new Set()
    questions.forEach((question) => {
      if (question.category) {
        categorySet.add(question.category)
      }
    })
    categories = Array.from(categorySet)

    wrapper = mount(StartOptions, {
      props: {
        categories: categories
      }
    })
  })

  describe('initial state', () => {
    it('verifies options and categories', () => {
      expect(wrapper.findAll('select')[0].findAll('option')[0].text()).toBe('Select a category') // #20
      expect(wrapper.findAll('select')[0].findAll('option').length).toEqual(
        wrapper.props('categories').length + 1
      ) // #21
    })
    describe('emitStartQuiz()', () => {
      it('verifies the else', async () => {
        // mocking the global alert
        window.alert = vi.fn()
        await wrapper.vm.emitStartQuiz()
        expect(window.alert).toHaveBeenCalledWith('Please fill in all the options') //#22
      })
      it('verifies the if', async () => {
        const selects = wrapper.findAll('select')
        wrapper.find('input').setValue('Charles')
        selects[0].setValue(wrapper.props('categories')[0])
        await wrapper.vm.$nextTick()
        wrapper.vm.emitStartQuiz()
        expect(wrapper.emitted()['start-quiz']).toBeTruthy() // #23
      })
    })
  })
})
