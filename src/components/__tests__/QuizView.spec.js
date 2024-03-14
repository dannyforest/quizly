import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuizView from "@/views/QuizView.vue";
import Timer from "@/components/Timer.vue";

describe("QuizView", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(QuizView);
  });

  describe("Timer sub-component", () => {
    it("mounts the Timer component when a quiz is started", async () => {
      await wrapper.vm.startQuiz({
        selectedCategory: "Geography",
        selectedTimeLimit: "60",
        selectedNumQuestions: "5",
      });

      const timerComponent = wrapper.findComponent(Timer);

      expect(timerComponent).toBeDefined();
      expect(timerComponent.text()).toBe("Time left: 1:00");
    });

    it('Should emit "time-up" when the time is up', async () => {
      await wrapper.vm.startQuiz({
        selectedCategory: "Geography",
        selectedTimeLimit: "02",
        selectedNumQuestions: "5",
      });

      const timerComponent = wrapper.findComponent(Timer);

      // Le timer initial est réglé à 2 secondes, le setTimeout est réglé à 3 secondes pour laisser le temps
      // au timer d'arriver à zéro.
      await new Promise((resolve) => setTimeout(resolve, 3000));

      expect(timerComponent.emitted("time-up")).toBeTruthy();
      // ATTENTION : ce test ne passe pas car l'emit dans le composant Timer n'est pas définit et donc
      // il ne se passe rien lorsque le timer arrive à zéro secondes.
    });
  });

  describe("updateHighScores", () => {
    it("updates the highscores in the localStorage", async () => {
      const highScores = {
        Geography: [
          {
            username: "John",
            score: 8,
          },
        ],
      };

      localStorage.setItem("highScores", JSON.stringify(highScores));

      wrapper.vm.selectedCategory = "Geography";
      wrapper.vm.username = "Bob";
      wrapper.vm.score = 10;

      await wrapper.vm.updateHighScore();

      expect(localStorage.getItem("highScores")).toBe(
        JSON.stringify({
          Geography: [
            {
              username: "Bob",
              score: 10,
            },
          ],
        }),
      );
    });
  });
});
