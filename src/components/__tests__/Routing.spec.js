import { mount } from '@vue/test-utils'
import { describe, beforeEach, it, expect } from 'vitest'
import QuizView from '@/views/QuizView.vue'
import EditQuestions from '@/views/EditQuestionsView.vue'
import App from '@/App.vue'
import router from '@/router'

describe.only('Router', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
  })

  const checkComponentOnPush = async (route, component) => {
    await router.push(route)
    await router.isReady()

    expect(wrapper.findComponent(component).exists()).toBe(true)
  }

  it('renders Quiz route', async () => await checkComponentOnPush('/', QuizView)) // #1 integ
  it('renders Edit route', async () => await checkComponentOnPush('/edit', EditQuestions)) // #2 integ
})
