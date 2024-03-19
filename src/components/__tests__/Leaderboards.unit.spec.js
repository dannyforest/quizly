import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';

describe('Leaderboards.vue', () => {
    let wrapper;

    beforeEach(() => {
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'highScores') {
                return JSON.stringify({
                    Math: [{ username: 'Alice', score: 5 }]
                });
            }
        });
    
        wrapper = mount(Leaderboards, {
            props: {
                selectedCategory: ''
            }
        });
    });
    

    it('displays a message to select a category when none is selected', () => {
        expect(wrapper.text()).toContain('Select a category to view the leaderboard.');
    });

    it('shows the category and high scores when selected', async () => {
        await wrapper.setProps({ selectedCategory: 'Math' });
        await wrapper.vm.$nextTick(); 
        expect(wrapper.text()).toContain('Category: Math');
        expect(wrapper.text()).toContain('Alice: 5');
    });
    

    it('displays a message when there are no high scores for the selected category', async () => {
        await wrapper.setProps({ selectedCategory: 'Science', highScores: { Science: [] } });
        expect(wrapper.text()).toContain('Category: Science');
        expect(wrapper.text()).toContain('No high scores available for this category yet.');
    });
});
