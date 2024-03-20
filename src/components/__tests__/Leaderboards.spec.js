import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import Leaderboards from '@/components/Leaderboards.vue';


describe('Tests d/intégration pour Leaderboards.vue', () => {
  let wrapper;

  beforeEach(() => {
    // Montez le composant avec une catégorie sélectionnée
    wrapper = mount(Leaderboards, {
      props: {
        selectedCategory: 'math'
      }
    });
  });

  afterEach(() => {
    // Démontez le composant après chaque test
    wrapper.unmount();
  });

  it('affiche le tableau des scores pour la catégorie sélectionnée', () => {
    // Vérifiez que le composant affiche les scores pour la catégorie 'math'
    expect(wrapper.html()).toContain('Category: math');
  });

  it('affiche un message si aucun score n/est disponible pour la catégorie sélectionnée', () => {
    // Changez la catégorie sélectionnée pour une catégorie sans scores
    wrapper.setProps({ selectedCategory: 'history' });

    // Vérifiez que le composant affiche un message approprié
    expect(wrapper.html()).toContain('No high scores available for this category yet.');
  });

  it('affiche un message si aucune catégorie n/est sélectionnée', async () => {
    // Changez la catégorie sélectionnée pour une catégorie vide
    wrapper.setProps({ selectedCategory: '' });
    await wrapper.vm.$nextTick()
    const htmlPTag = wrapper.find('p')
    // Vérifiez que le composant affiche un message approprié
    expect(htmlPTag.text()).toContain('Select a category to view the leaderboard.');
  });
});