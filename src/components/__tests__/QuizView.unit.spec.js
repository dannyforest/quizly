import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage } from "./localStorageMock";
import QuizView from "@/views/QuizView.vue";

describe("QuizView.vue", () => {
  let wrapper;
  let localStorageMock;

  const questionsSample = [
    {
      text: "What is the capital of France?",
      choices: ["Paris", "Berlin", "Rome", "Madrid"],
      answer: "Paris",
      category: "Geography",
    },
    {
      text: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      answer: "4",
      category: "Mathematics",
    },
    {
      text: "What is the largest planet in our Solar System?",
      choices: ["Earth", "Jupiter", "Mars", "Neptune"],
      answer: "Jupiter",
      category: "Astronomy",
    },
  ];

  beforeEach(() => {
    wrapper = shallowMount(QuizView);
    localStorageMock = mockLocalStorage();
    global.localStorage = localStorageMock;
  });

  describe("handleCategoryChanged", () => {
    it("changes the category", async () => {
      const newCategory = "Biology";
      await wrapper.vm.handleCategoryChanged(newCategory);
      expect(wrapper.vm.selectedCategory).toBe("Biology");
    });
  });

  describe("startQuiz", () => {
    const options = {
      username: "John",
      selectedCategory: "Art",
      selectedTimeLimit: "60",
      selectedNumQuestions: "5",
    };

    it("gets the options properly", async () => {
      await wrapper.vm.startQuiz(options);
      expect(wrapper.vm.username).toBe("John");
      expect(wrapper.vm.selectedCategory).toBe("Art");
      expect(wrapper.vm.selectedTimeLimit).toBe(60);
      expect(wrapper.vm.selectedNumQuestions).toBe(5);
    });

    it("starts the quizz", async () => {
      await wrapper.vm.startQuiz(options);
      expect(wrapper.vm.quizStarted).toBeTruthy();
    });
  });

  describe("prepareQuiz", () => {
    it("gets the questions from the localStorage", async () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(questionsSample));
      wrapper.vm.selectedCategory = "Astronomy";
      await wrapper.vm.prepareQuiz();
      expect(wrapper.vm.selectedQuestions.length).toBe(1);
      expect(wrapper.vm.selectedQuestions[0].category).toBe("Astronomy");
    });

    it("prepares the quiz properly", async () => {
      wrapper.vm.currentQuestionIndex = 10;
      wrapper.vm.score = 10;
      await wrapper.vm.prepareQuiz();
      expect(wrapper.vm.currentQuestionIndex).toBe(0);
      expect(wrapper.vm.score).toBe(0);
    });
  });

  describe("handleAnswerSelected", () => {
    beforeEach(() => {
      wrapper.vm.currentQuestionIndex = 0;
      wrapper.vm.selectedQuestions = questionsSample;
    });

    it("increments the score after a good answer", async () => {
      await wrapper.vm.handleAnswerSelected("Paris");
      expect(wrapper.vm.score).toBe(1);
    });

    it("doesn't increment the score after a bad answer", async () => {
      await wrapper.vm.handleAnswerSelected("Berlin");
      expect(wrapper.vm.score).toBe(0);
    });

    it("goes to the next question after receiving an answer", async () => {
      await wrapper.vm.handleAnswerSelected("Berlin");
      expect(wrapper.vm.currentQuestionIndex).toBe(1);
    });

    it("shows results after the last question is answered", async () => {
      wrapper.vm.currentQuestionIndex = 2;
      await wrapper.vm.handleAnswerSelected("Jupiter");
      expect(wrapper.vm.showResults).toBeTruthy();
    });
  });
});
