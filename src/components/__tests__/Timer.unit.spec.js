import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Timer from '../Timer.vue'

describe('Timer', () => {
  describe('minutes', () => {
    it('calculates the right amount of minutes', () => {
      const wrapper = mount(Timer)
      wrapper.vm.timeLeft = 120
      expect(wrapper.vm.minutes).toBe(2)
    })
  })
	describe('seconds', () => {
		it('calculates the right amount of seconds', () => {
			const wrapper = mount(Timer, {
				props: {
					duration: 500
				}
			})
			expect(wrapper.vm.seconds).toEqual(20)
		})
	})
})