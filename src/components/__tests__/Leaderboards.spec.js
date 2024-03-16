import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Leaderboard from "@/components/Leaderboards.vue";

describe("Leaderboard.vue", () => {
  it("displays a message when there are no high scores", () => {
    const wrapper = mount(Leaderboard, {
      props: {
        selectedCategory: "Test Category",
      },
    });

    expect(wrapper.find("p").text()).toBe("No high scores available for this category yet.");
    expect(wrapper.find("ul").exists()).toBe(false);
  });

  it("displays a message when there is high scores", async () => {
    // Set up initial localStorage state
    const highScores = {
      category1: [
        { username: "Alice", score: 100 },
        { username: "Bob", score: 90 },
      ],
    };
    localStorage.setItem("highScores", JSON.stringify(highScores));

    const wrapper = mount(Leaderboard, {
      props: {
        selectedCategory: "category1",
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.find("ul").exists()).toBe(true);
  });
});
