import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
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
})
