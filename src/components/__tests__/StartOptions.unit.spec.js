import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import StartOptions from '../StartOptions.vue';

describe('StartOptions', () => {
  it('renders correctly', async () => {
    const categories = ['Category1', 'Category2', 'Category3'];
    const wrapper = shallowMount(StartOptions, {
      props: { categories }
    });

    // Vérifie que les éléments sont rendus correctement
    expect(wrapper.find('.input-field').exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('.start-button').exists()).toBe(true);
    expect(wrapper.find('.edit-questions-button').exists()).toBe(true);
  });

  it('emits start-quiz event when Start Quiz button is clicked', async () => {
    const categories = ['Category1', 'Category2', 'Category3'];
    const wrapper = shallowMount(StartOptions, {
      props: { categories }
    });

    // Simule le remplissage des champs et le clic sur le bouton Start Quiz
    wrapper.find('.input-field').setValue('John Doe');
    wrapper.find('select').setValue('Category1');
    wrapper.find('.start-button').trigger('click');

    // Attend la prochaine mise à jour du DOM
    await wrapper.vm.$nextTick();

    // Vérifie que l'événement start-quiz a été émis avec les bonnes valeurs
    expect(wrapper.emitted('start-quiz')).toBeTruthy();
    expect(wrapper.emitted('start-quiz')[0]).toEqual([{
      username: 'John Doe',
      selectedCategory: 'Category1',
      selectedTimeLimit: '60',
      selectedNumQuestions: '5'
    }]);
  });
});