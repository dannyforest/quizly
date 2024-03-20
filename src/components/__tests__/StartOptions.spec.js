import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StartOptionsComponent from '@/components/StartOptions.vue'
import questionsData from '@/data/questions.json'

describe('StartOptions', () => {
  describe('initialise', () => {
    it('lists the right categories', async () => {
      // Extract categories
      const categories = Array.from(new Set(questionsData.map((question) => question.category)))

      // Mount the component with categories
      const wrapper = mount(StartOptionsComponent, {
        props: { categories }
      })

      // Find options in the category selector
      const options = wrapper.findAll('select.input-field')[0].findAll('option')

      // Ensure the number of options matches the number of categories plus one for "Select a category"
      expect(options.length).toBe(categories.length + 1)

      // Check that each category is listed
      categories.forEach((category, index) => {
        expect(options.at(index + 1).text()).toBe(category)
      })
    })
  })
})
