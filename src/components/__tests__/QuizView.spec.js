import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import QuizView from "@/views/QuizView.vue";
import StartOptions from "@/components/StartOptions.vue";
import Quiz from "@/components/Quiz.vue";

describe("QuizView", () => {
  it("renders StartOptionsComponent", () => {
    const wrapper = mount(QuizView);
    const startOptions = wrapper.findComponent(StartOptions);
    expect(startOptions).toBeDefined();
  });
  it("adds the selected answer to the player's answers", async () => {
    const wrapper = mount(QuizView);
    const choice = "An answer";

		wrapper.vm.quizStarted = true;
    await wrapper.vm.$nextTick();

		wrapper.findComponent(Quiz).vm.$emit('answer-selected', choice);
    await wrapper.vm.$nextTick();

    const userAnswers = wrapper.vm.userAnswers;
    expect(userAnswers[userAnswers.length - 1]).toBe(choice);
  });
});
