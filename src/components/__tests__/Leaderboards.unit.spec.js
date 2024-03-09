import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Leaderboards from '@/components/Leaderboards.vue'

describe('Leaderboards.vue', () => {
  it('show when there is no category selected', () => {
    const wrapper = mount(Leaderboards)

    expect(wrapper.text()).toContain('Leaderboards') // #1
    expect(wrapper.text()).toContain('Select a category to view the leaderboard.') // #2
  })
  it('show when there is no high score in the category selected', () => {
    const wrapper = mount(Leaderboards, {
      props: {
        selectedCategory: 'Geography'
      }
    })
    expect(wrapper.text()).toContain('No high scores available for this category yet.') // #3
    expect(wrapper.text()).toContain(`Category: Geography`) // #4
  })
  it('show when there is a score in the localStorage', async () => {
    const mockHighScores = JSON.stringify({
      Geography: [
        {
          username: 'carlie Doe',
          score: 50
        },
        {
          username: 'Julienne la pofine',
          score: 49
        },
        {
          username: 'Simone ;) ;)',
          score: 69
        }
      ]
    })
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(mockHighScores)
    })
    const wrapper = mount(Leaderboards, {
      props: {
        selectedCategory: 'Geography'
      }
    })
    await wrapper.vm.$nextTick() //waiting for a thick tick so that loadHighScores() is called
    expect(wrapper.text()).toContain(`carlie Doe: 50`) // #5
    expect(wrapper.text()).includes(`Simone ;) ;): 69`) // #5.1
  })
})
