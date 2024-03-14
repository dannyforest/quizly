import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import QuizView from "@/views/QuizView.vue";

describe("initial state", () => {
  it("has 2 buttons", () => {
    const wrapper = mount(QuizView);
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(2);
  });
  it("shows the Quizzy Peak title", () => {
    const wrapper = mount(QuizView);
    const title = wrapper.findAll("h1")[0];
    expect(title.text()).toEqual("Quizzy Peak");
  });
});
