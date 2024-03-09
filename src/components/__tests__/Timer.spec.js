import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Timer from '@/components/Timer.vue'

vi.useFakeTimers();

describe.only('Timer.vue', () => {
    let wrapper;
    let timer;
    beforeEach(() => {
        wrapper = mount(Timer, {props: {duration: 10}});
        timer = wrapper.find('.timer').text();
    });

  describe('intial state', () => {
    it('displays the right amount of timeLeft', () => {       
        expect(timer).toContain(10); // #24
    });
  });
  it('counts down', async () => {
    vi.advanceTimersByTime(10000);
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:00'); // #25
  })
});