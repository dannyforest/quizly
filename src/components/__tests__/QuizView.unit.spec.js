import { mount} from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import QuizView from '@/views/QuizView.vue'

describe('Quiz.vue', () => {
    let wrapper;
    beforeEach(() => {
        // const wrapper = mount(Quiz)
        wrapper = mount(QuizView)
    })
    describe('testing the ui and the initial state', () => {
        it('renders the image correctly', async () => {
            expect(wrapper.find('img').exists()).toBe(true)
        })
        it('renders the title correctly', async () => {
            await wrapper.vm.$nextTick()

            expect(wrapper.find('h1').text()).toContain('Quizzy Peak')
        })

    })
})