import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import QuizView from "@/views/QuizView.vue";
import StartOptionsComponent from "@/components/StartOptions.vue";
import Results from "@/components/Results.vue";
import Timer from "@/components/Timer.vue";

describe("QuizView", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(QuizView);
  });

  describe("StartOptions.vue", () => {
    let startOptionsComponent;

    beforeEach(() => {
      startOptionsComponent = mount(StartOptionsComponent, {
        props: {
          categories: ["Science", "Mathematics"],
        },
      });
    });

    it('emits "start-quiz" event with all options selected', async () => {
      await startOptionsComponent
        .find('.input-field[placeholder="Enter your name"]')
        .setValue("nadege");
      await startOptionsComponent.findAll(".input-field")[1].setValue("Mathematics");
      await startOptionsComponent.findAll(".input-field")[2].setValue("300");
      await startOptionsComponent.findAll(".input-field")[3].setValue("10");
      await startOptionsComponent.find(".start-button").trigger("click");

      expect(startOptionsComponent.emitted()["start-quiz"]).toBeTruthy();
      expect(startOptionsComponent.emitted()["start-quiz"][0]).toEqual([
        {
          username: "nadege",
          selectedCategory: "Mathematics",
          selectedTimeLimit: "300",
          selectedNumQuestions: "10",
        },
      ]);
    });

    it('does not emit "start-quiz" event when not all options are selected', async () => {
      await startOptionsComponent.find(".start-button").trigger("click");
      expect(startOptionsComponent.emitted()["start-quiz"]).toBeFalsy();
    });

    it('emits "category-changed" event when a category is selected', async () => {
      await startOptionsComponent.findAll(".input-field")[1].setValue("Science");
      expect(startOptionsComponent.emitted()["category-changed"]).toBeTruthy();
      expect(startOptionsComponent.emitted()["category-changed"][0]).toEqual(["Science"]);
    });
  });

  describe("Results.vue", () => {
    it("emits restart event on button click", async () => {
      const resultsComponent = mount(Results, {
        props: {
          score: 3,
          questions: [
            { text: "What is 2+2?", answer: "4" },
            { text: "Best programming language?", answer: "JavaScript" },
          ],
          userAnswers: ["4", "JavaScript"],
        },
      });
      await resultsComponent.find(".restart-button").trigger("click");
      expect(resultsComponent.emitted("restart")).toBeTruthy();
    });
  });

  describe("Timer.vue", () => {
    let timerComponent;

    const startQuiz = async () => {
      await wrapper.vm.startQuiz({
        selectedCategory: "Geography",
        selectedTimeLimit: "60",
        selectedNumQuestions: "5",
      });
      timerComponent = wrapper.findComponent(Timer);
    };

    beforeEach(() => {
      startQuiz();
    });

    it("mounts the Timer component when a quiz is started", async () => {
      expect(timerComponent).toBeDefined();
      expect(timerComponent.text()).toBe("Time left: 1:00");
    });

    it('Should emit "time-up" when the time is up', async () => {
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
