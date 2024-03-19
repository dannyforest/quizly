import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Timer from '../Timer.vue';

// Définition des tests
describe('Timer', () => {
  it('renders correctly with initial time', async () => {
    const duration = 60; // 1 minute
    const wrapper = shallowMount(Timer, {
      props: { duration }
    });

    // Vérifie que les éléments sont rendus correctement
    expect(wrapper.find('.timer').exists()).toBe(true);
    expect(wrapper.text()).toContain('Time left:');
  });

  it('updates time correctly after 1 second', async () => {
    const duration = 5; // 5 secondes
    const wrapper = shallowMount(Timer, {
      props: { duration }
    });

    // Attends 1 seconde
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérifie que le temps restant a été mis à jour
    expect(wrapper.text()).toContain('Time left: 0:04');
  });

//   it('emits "time-up" event when timer reaches 0', async () => {
//     const duration = 1; // 1 seconde
//     const wrapper = shallowMount(Timer, {
//       props: { duration }
//     });

//     // Attends que le timer atteigne 0
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Vérifie que l'événement "time-up" a été émis
//     expect(wrapper.emitted('time-up')).toBeFalsy();
//   });

  it('stops the timer when stop method is called', async () => {
    const duration = 10; // 10 secondes
    const wrapper = shallowMount(Timer, {
      props: { duration }
    });

    // Attend un peu
    await new Promise(resolve => setTimeout(resolve, 500));

    // Arrête le timer
    wrapper.vm.stop();

    // Retient le temps restant actuel
    const timeLeftBeforeStop = wrapper.vm.timeLeft;

    // Attend un peu plus
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérifie que le temps restant n'a pas changé
    expect(wrapper.vm.timeLeft).toBe(timeLeftBeforeStop);
  });
});