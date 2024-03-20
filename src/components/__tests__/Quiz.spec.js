import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import QuizView from "@/views/QuizView.vue";
import Quiz from "@/components/Quiz.vue";

describe("Quiz.vue", () => {
  let wrapper;
  let quizComponent;

  beforeEach(async () => {
    wrapper = mount(QuizView);

    await wrapper.vm.startQuiz({
      selectedCategory: "Geography",
      selectedTimeLimit: 60,
      selectedNumQuestions: 5,
    });

    quizComponent = wrapper.findComponent(Quiz);
  });

  it("should render the Quiz component when quizStarted is true", () => {
    expect(quizComponent.exists()).toBe(true);
  });

  it("should emit 'answer-selected' event when an answer is selected", async () => {
    const choice = "Test Answer";
    await quizComponent.vm.selectAnswer(choice);
    expect(quizComponent.emitted("answer-selected")).toBeTruthy();
  });

  it("should emit 'quiz-completed' event when all questions are answered", async () => {
    for (let index = 0; index < 5; index++) {
      const choice = quizComponent.vm.currentQuestion.choices[0];
      await quizComponent.vm.selectAnswer(choice);
    }

    expect(quizComponent.emitted("quiz-completed")).toBeTruthy();
  });
});
