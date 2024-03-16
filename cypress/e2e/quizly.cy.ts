describe("Quizzly", () => {
  const name = "John";
  const numberOfQuestions = 5;

  const startQuiz = () => {
    cy.get("input.input-field").type(name);
    cy.get("#startOptions > :nth-child(2)").select("Geography");
    cy.get("#startOptions > :nth-child(4)").select(numberOfQuestions.toString());
    cy.get(".start-button").click();
  };

  beforeEach(() => {
    cy.visit("http://localhost:4173");
  });

  it("start a new quiz", () => {
    startQuiz();
    cy.get(".timer").should("exist");
  });

  it("does a quiz entirely and checks the score", () => {
    startQuiz();
    for (let i = 0; i < numberOfQuestions; i++) {
      cy.get(".choices > :nth-child(1)").click();
    }
    cy.get(".restart-button").should("exist");
    cy.get(".restart-button").click();
    cy.get(".timer").should("not.exist");
    cy.get("#quiz").should("contain", "Leaderboards");
    cy.get("#quiz").should("contain", name);
  });

  it("Delete a question", () => {
    cy.contains("Quizzy");
    cy.get(".edit-questions-button").click();
    const firstQuestion = ":nth-child(1) > .question-content > .question-input";
    cy.get(firstQuestion).should("have.value", "What is the capital of France?");
    cy.get(":nth-child(1) > .delete-button").click();
    cy.get(firstQuestion).should("not.have.value", "What is the capital of France?");
  });
});
