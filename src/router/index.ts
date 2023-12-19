import { createRouter, createWebHistory } from 'vue-router'
import QuizView from "@/views/QuizView.vue";
import EditQuestions from "@/views/EditQuestionsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Quiz',
      component: QuizView
    },
    {
      path: '/edit',
      name: 'Edit',
      component: EditQuestions
    }
  ]
})

export default router
