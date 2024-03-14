import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Leaderboards from '@/components/Leaderboards.vue'

describe('Leaderboards', () => {
  describe('highScores', () => {
    it('initially has a value of {}', () => {
      const wrapper = mount(Leaderboards)
      //had to change from toBe to toStrictEqual because it was
      //returning a serialize string equal to {} but not an actual empty object
      //and so i just did what the error message told me to lol
      expect(wrapper.vm.highScores).toStrictEqual({})
    })
  })
})
