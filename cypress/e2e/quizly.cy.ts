describe("Quizzly", () => {
  it("start a new quiz", () => {
    cy.visit("http://localhost:4173");
    cy.get(".start-button").click();
    cy.url().should("eq", "http://localhost:4173/quiz");
    cy.get(".question-input").should("have.value", "What is the capital of France?");
  });

  it.only("Delete a question", () => {
    cy.visit("http://localhost:4173");
    cy.contains("Quizzy");
    cy.get(".edit-questions-button").click();
    const firstQuestion = ":nth-child(1) > .question-content > .question-input";
    cy.get(firstQuestion).should("have.value", "What is the capital of France?");
    cy.get(":nth-child(1) > .delete-button").click();
    cy.get(firstQuestion).should("not.have.value", "What is the capital of France?");
  });
});
