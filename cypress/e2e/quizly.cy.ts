describe("Quizzly", () => {
  const name = "John";
  const numberOfQuestions = 5;
  let stub;

  const startQuiz = () => {
    cy.get("input.input-field").type(name);
    cy.get("#startOptions > :nth-child(2)").select("Geography");
    cy.get("#startOptions > :nth-child(4)").select(numberOfQuestions.toString());
    cy.get(".start-button").click();
  };

  beforeEach(() => {
    cy.visit("http://localhost:4173");
    stub = cy.stub();
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

  it("successfully adds a new question", () => {
    cy.get(".edit-questions-button").click();
    cy.get(".question-input").first().type("New Test Question");
    cy.get(".category-dropdown").first().select("Mathematics");
    cy.get(".choice-input input").first().type("Choice 1");
    cy.get(".choice-input input").eq(1).type("Choice 2");
    cy.get(".answer-input").first().type("Correct Answer");
    cy.on("window:alert", stub);
    cy.get(".add-question-button")
      .click()
      .then(() => {
        expect(stub).to.be.calledWith("Questions saved!");
      });
    cy.get(".back-button").click();
    cy.get(".edit-questions-button").click();
    cy.get(".question-input").last().should("have.value", "New Test Question");
  });

  it("successfully modifies a question", () => {
    cy.get(".edit-questions-button").click();
    cy.get(":nth-child(1) > .question-content > .question-input")
      .clear()
      .type("Nouveau texte de la question");
    cy.get(":nth-child(1) > .category-dropdown").select("Mathematics");

    cy.get(":nth-child(1) > .choices-container > :nth-child(2) > input")
      .clear()
      .type("Nouveau choix 1");
    cy.get(":nth-child(1) > .answer-content > .answer-input")
      .clear()
      .type("Nouvelle réponse correcte");
    cy.on("window:alert", stub);
    cy.get(".save-button")
      .click()
      .then(() => {
        expect(stub).to.be.calledWith("Questions saved!");
      });
    cy.get(".back-button").click();
    cy.get(".edit-questions-button").click();
    cy.get(".question-block").first().as("firstQuestion");
    cy.get(":nth-child(1) > .question-content > .question-input").should(
      "have.value",
      "Nouveau texte de la question",
    );
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
