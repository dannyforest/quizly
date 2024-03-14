import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Quiz from "@/components/Quiz.vue";

describe("selectAnswer", () => {
  it("emits quiz-completed when isLastQuestion is true", () => {
    const wrapper = mount(Quiz, {
      props: {
        questions: [
          {
            text: "What is the largest planet in our Solar System?",
            choices: ["Earth", "Jupiter", "Mars", "Neptune"],
            answer: "Jupiter",
            category: "Astronomy"
          }
        ],
        currentQuestionIndex: 0
      }
    });
    const button = wrapper.findAll("button")[0];
    button.trigger("click");

    expect(wrapper.emitted("quiz-completed")).toBeTruthy();
  });
});
