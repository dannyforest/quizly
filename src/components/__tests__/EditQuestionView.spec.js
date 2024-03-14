import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import EditQuestionsView from "@/views/EditQuestionsView.vue";
import QuizView from "@/views/QuizView.vue";
import router from "@/router";

describe("EditQuestionView", () => {
  let wrapper;
  let editQuestionsViewComponent;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    editQuestionsViewComponent = mount(EditQuestionsView);

    editQuestionsViewComponent.vm.newQuestion = {
      text: "What is 5 x 2?",
      choices: ["10", "15", "52", "50"],
      answer: "10",
      category: "Mathematics",
    };
  });

  describe("routing to QuizView", async () => {
    it("renders QuizView component on push('/')", async () => {
      await router.push("/");
      await editQuestionsViewComponent.vm.$nextTick();

      expect(wrapper.findComponent(QuizView).exists()).toBeTruthy();
    });
  });

  describe("addQuestion", () => {
    it("adds a new question and save it in localStorage", async () => {
      await editQuestionsViewComponent.vm.addQuestion();

      const questionsInLocalStorage = JSON.parse(localStorage.getItem("questions"));
      const lastEntry = questionsInLocalStorage[questionsInLocalStorage.length - 1];

      expect(lastEntry).toEqual({
        text: "What is 5 x 2?",
        choices: ["10", "15", "52", "50"],
        answer: "10",
        category: "Mathematics",
      });
    });

    it("sends an alert when a new question is added", async () => {
      const spy = vi.spyOn(window, "alert");
      await editQuestionsViewComponent.vm.addQuestion();
      expect(spy).toHaveBeenCalledWith("Questions saved!");
    });
  });

  describe("deleteQuestion", () => {
    let questionsLength;

    beforeEach(() => {
      questionsLength = editQuestionsViewComponent.vm.questions.length;
    });

    it("should delete the selected question when confirmed", async () => {
      globalThis.confirm = () => true;
      await editQuestionsViewComponent.vm.deleteQuestion(1);
      expect(editQuestionsViewComponent.vm.questions.length).toBe(questionsLength - 1);
    });

    it("should not delete the selected question when not confirmed", async () => {
      globalThis.confirm = () => false;
      await editQuestionsViewComponent.vm.deleteQuestion(1);
      expect(editQuestionsViewComponent.vm.questions.length).toBe(questionsLength);
    });
  });
});
