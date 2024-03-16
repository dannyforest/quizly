import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import ProgressBar from "@/components/ProgressBar.vue";

describe("ProgressBar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ProgressBar, {
      props: {
        currentQuestionIndex: 1,
        totalQuestions: 4,
      },
    });
  });

  it("computes progressLabel correctly", () => {
    expect(wrapper.vm.progressLabel).toEqual("Question 2 of 4");
  });

  it("computes progressBarWidth correctly", () => {
    expect(wrapper.vm.progressBarWidth).toEqual("50%");
  });
});
