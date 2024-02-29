import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Results from '@/components/Results.vue'

describe.only('Results.vue', () => {
  describe('Results', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(Results, {
        props: {
          score: 42,
          questions: ['hello', 'world?'],
          userAnswers: ['hello', 'world?']
        }
      })
    })
  describe('Initial state', ()=>{
    it('shows the first title(h2)',()=>{
      expect(wrapper.find('h2').text()).toBe('Your Quiz Results') // #11
      expect(wrapper.find('button').text()).toBe('🔁 Restart Quiz') // #12
      expect(wrapper.findAll('li').length).toEqual(wrapper.props('questions').length) // #13
    })
    
  }) 

  })
})
