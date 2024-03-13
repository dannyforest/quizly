import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import Leaderboards from '../Leaderboards.vue'
import EditQuestionsView from '@/views/EditQuestionsView.vue'
import QuizView from '@/views/QuizView.vue'

describe('LocalStorage', () => {
  let wrapper
  const mockHighScores = {
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
  }

  const mockQuestions = [
    {
      text: 'What is the capital of France?',
      choices: ['Paris', 'Berlin', 'Rome', 'Madrid'],
      answer: 'Paris',
      category: 'Geography'
    },
    {
      text: 'What is 2 + 2?',
      choices: ['3', '4', '5', '6'],
      answer: '4',
      category: 'Mathematics'
    },
    {
      text: 'What is the largest planet in our Solar System?',
      choices: ['Earth', 'Jupiter', 'Mars', 'Neptune'],
      answer: 'Jupiter',
      category: 'Astronomy'
    }
  ]

  beforeEach(() => {
    localStorage.setItem('highScores', JSON.stringify(mockHighScores))
    localStorage.setItem('questions', JSON.stringify(mockQuestions))
  })

  describe('Leaderboards.vue', () => {
    it('reads local storage', () => {
      wrapper = mount(Leaderboards)

      expect(wrapper.vm.highScores).toStrictEqual(mockHighScores) // #3
    })
  })

  describe('EditQuestionsView.vue', () => {
    it('reads local storage', () => {
      wrapper = mount(EditQuestionsView)

      expect(wrapper.vm.questions).toStrictEqual(mockQuestions) // #4
    })
  })
  
  describe('QuizView.vue', () => {
    it('reads local storage', () => {
      wrapper = mount(QuizView)

      expect(wrapper.vm.highScores).toStrictEqual(mockHighScores) // #5
    })

    it('writes to local storage', async () => {
      wrapper = mount(QuizView)
      
      wrapper.vm.highScores = mockHighScores;

      await wrapper.vm.updateHighScore();

      expect(JSON.parse(localStorage.getItem('highScores'))).toStrictEqual(mockHighScores) // #6
    })
  })
})
