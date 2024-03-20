import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Leaderboards from '@/components/Leaderboards.vue'

describe('Leaderboards', () => {
  beforeEach(() => {
    const highscoreData = { Mathematics: [{ username: 'coco', score: 1 }] }
    localStorage.clear()
    localStorage.setItem('highScores', JSON.stringify(highscoreData))
  })
  it('sets the highScores values from localStorage', () => {
    const wrapper = mount(Leaderboards)
    expect(wrapper.vm.highScores).toStrictEqual({ Mathematics: [{ username: 'coco', score: 1 }] })
  })
})
