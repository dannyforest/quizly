import { mount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';



describe('Timer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Timer, {
      props: {
        duration: 30, // 30 secondes
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the timer with initial time', () => {
    expect(wrapper.text()).toContain('Time left: 0:30');
  });

  it('decrements the time every second', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:30');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:29');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:28');
  });

  it('stops the timer when component is unmounted', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:30');

    wrapper.unmount();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(wrapper.text()).toContain('Time left: 0:30'); // Timer should stop
  });

  it('stops the timer when calling stop method', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('Time left: 0:30');

    wrapper.vm.stop();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(wrapper.text()).toContain('Time left: 0:30'); // Timer should stop
  });
});