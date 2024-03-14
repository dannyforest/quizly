import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import EditQuestionsView from '@/views/EditQuestionsView.vue'

describe('EditQuestionsView.vue', () => {
	let wrapper
	beforeEach(() => {
		wrapper = mount(EditQuestionsView)
	})
  it('addQuestion resets newQuestion', async () => {
    wrapper.vm.addQuestion()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.newQuestion).toEqual({ text: '', choices: ['', ''], answer: '' })
  })
  it('addChoice increases newQuestion.choices.length', async () => {
    wrapper.vm.addChoice()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.newQuestion.choices.length).toBe(3)
    expect(wrapper.vm.newQuestion.choices[2]).toBe('')
  })
  describe('Add Question', () => {
    it('saves the newQuestion in the question array when Add Question button is clicked', async () => {
      // Define new question added
      const newQuestionDetails = {
        text: 'New Sample Question',
        choices: ['Choice 1', 'Choice 2'],
        answer: 'Choice 1',
        category: 'Sample Category'
      }
      // Set new question in component state
      wrapper.vm.newQuestion = { ...newQuestionDetails }
      // Wait for Vue to process the state change
      await wrapper.vm.$nextTick()
      // Trigger a click on the "Add Question" button.
      await wrapper.find('.add-question-button').trigger('click')
      // Check that the questions component array contains the new question
      expect(wrapper.vm.questions).toContainEqual(expect.objectContaining(newQuestionDetails))
    })
  })
})
