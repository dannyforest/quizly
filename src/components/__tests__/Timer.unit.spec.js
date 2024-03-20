import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
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
  it('secondsFormatted formats seconds correctly', () => {
    const wrapper = mount(Timer, {
      props: { duration: 125 }
    })
    expect(wrapper.vm.secondsFormatted).toBe('05')
  })

  it('stop stops the timer', async () => {
    const wrapper = mount(Timer, {
      props: { duration: 60 }
    })

    await wrapper.vm.$nextTick()

    const clearIntervalMock = vi.fn()

    global.clearInterval = clearIntervalMock

    wrapper.vm.stop()

    expect(clearIntervalMock).toHaveBeenCalledTimes(1)
  })
  describe('timeLeft', () => {
		const duration = 300;
    beforeEach(() => {
      vi.useFakeTimers()
    })
    it('should decrease timeLeft over time', async () => {
      const wrapper = mount(Timer, {
        props: {
          duration
        }
      })
      
			vi.advanceTimersByTime(1000)

      expect(wrapper.vm.timeLeft).toBe(duration - 1)
      vi.restoreAllMocks()
    })
  })

  describe('Time-up', () => {
    // vi.useFakeTimers() to mock timer
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('emits time-up when timeLeft == 0', async () => {
      // Mount with duration
      const wrapper = mount(Timer, {
        props: {
          duration: 1
        }
      })

      // Timer 1000ms (1 second)
      vi.runAllTimers()

      // Checks if the time-up event was emitted
      expect(wrapper.emitted()).toHaveProperty('time-up')
      // Checks if the time-up event was emitted once
      expect(wrapper.emitted('time-up')).toHaveLength(1)

      // Clear timer
      vi.restoreAllMocks()
    })
  })
})
