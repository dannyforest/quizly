import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import EditQuestionsView from '../../views/EditQuestionsView.vue'
import QuizView from '../../views/QuizView.vue'
import App from '@/App.vue'

describe('Routes', () => {
  describe('EditQuestionsView', () => {
    it('it redirects to QuizView (home page) when Back button is clicked', async () => {
      const router = createRouter({
        history: createWebHistory(),
        routes: [
          { path: '/edit', component: EditQuestionsView },
          { path: '/', component: QuizView }
        ]
      })
      const wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      })
      await router.push('/edit')
      await router.isReady()
      expect(window.location.pathname).toBe('/edit')
      expect(wrapper.findComponent(EditQuestionsView).exists()).toBeTruthy()
      //router push to simulate ''goBack'' being clicked
      await router.push('/')
      await router.isReady()
      expect(window.location.pathname).toBe('/')
      expect(wrapper.findComponent(QuizView).exists()).toBeTruthy()
    })
  })
})
