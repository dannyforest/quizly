import { describe, it, expect, beforeEach, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import EditQuestionsView from "@/views/EditQuestionsView.vue";

describe("EditQuestionsView", () => {
  let wrapper;
  let initialQuestionsLength;

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
    wrapper = shallowMount(EditQuestionsView);
    wrapper.vm.questions = [...questionsSample];
    initialQuestionsLength = wrapper.vm.questions.length;
  });

  it("ajoute une nouvelle question et efface les champs d'ajout", async () => {
    await wrapper.find(".add-question-button").trigger("click");
    expect(wrapper.vm.questions.length).toBe(initialQuestionsLength + 1);
    expect(wrapper.vm.newQuestion.text).toBe("");
    expect(wrapper.vm.newQuestion.choices.length).toBe(2);
    expect(wrapper.vm.newQuestion.choices[0]).toBe("");
    expect(wrapper.vm.newQuestion.choices[1]).toBe("");
    expect(wrapper.vm.newQuestion.answer).toBe("");
  });

  it("ajoute un nouveau choix à la question", async () => {
    wrapper.vm.newQuestion.choices = ["Choice 1", "Choice 2"];
    await wrapper.vm.addChoice();
    expect(wrapper.vm.newQuestion.choices.length).toBe(3);
    expect(wrapper.vm.newQuestion.choices[2]).toBe("");
  });

  it("supprime une question", async () => {
    global.confirm = vi.fn(() => true);
    await wrapper.findAll(".delete-button")[0].trigger("click");
    expect(wrapper.vm.questions.length).toBe(initialQuestionsLength - 1);
  });
});
