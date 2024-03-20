import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultsComponent from '@/components/Results.vue'

describe('Results', () => {
  describe('Restart', () => {
    it('emits restart when the button is clicked', async () => {
      // Mounts Results Component with props
      const wrapper = mount(ResultsComponent, {
        props: {
          // Mock score
          score: 3,
          questions: [
            // Mock questions array
            { text: 'Question 1', answer: 'Answer 1' },
            { text: 'Question 2', answer: 'Answer 2' },
            { text: 'Question 3', answer: 'Answer 3' }
          ],
          // Mock user answers
          userAnswers: ['Answer 1', 'Wrong Answer', 'Answer 3']
        }
      })

      // Trigger click event on button
      await wrapper.find('.restart-button').trigger('click')

      // Checks if the restart event was emitted 
      expect(wrapper.emitted()).toHaveProperty('restart') 
      // Checks if the restart event was emitted once
      expect(wrapper.emitted('restart')).toHaveLength(1)
    })
  })
})
