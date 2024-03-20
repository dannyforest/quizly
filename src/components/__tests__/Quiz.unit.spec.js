import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import Quiz from "@/components/Quiz.vue";

describe("Quiz.vue", () => {
  let wrapper = null;

  const questions = [
    { text: "Question 1", choices: ["A", "B", "C"] },
    { text: "Question 2", choices: ["X", "Y", "Z"] },
    { text: "Question 3", choices: ["1", "2", "3"] },
  ];

  beforeEach(() => {
    wrapper = shallowMount(Quiz, {
      props: {
        questions,
        currentQuestionIndex: 0,
      },
    });
  });

  it("currentQuestion computed property works correctly", async () => {
    expect(wrapper.vm.currentQuestion).toEqual(questions[0]);
    wrapper.setProps({ currentQuestionIndex: 1 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentQuestion).toEqual(questions[1]);
  });

  it("isLastQuestion computed property works correctly", async () => {
    expect(wrapper.vm.isLastQuestion).toBeFalsy();
    wrapper.setProps({ currentQuestionIndex: 2 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isLastQuestion).toBeTruthy();
  });
});
