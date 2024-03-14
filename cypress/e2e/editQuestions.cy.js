describe('EditQuestions', () => {
  it('creates a new question', () => {
    const question = 'Comment se prénomme le chat de Sabrina?'
    const category = 'Art'
    const answer = 'Salem'
    const choice1 = 'Garfield'
    const choice2 = 'Binx'
    const choice3 = 'Goose'

    cy.visit('http://localhost:4173')
    cy.get('button:eq(1)').click()
    const questionInput = cy.get('.question-input:eq(0)')
    questionInput.type(question)
    const categorySelect = cy.get('.category-dropdown:eq(0)')
    categorySelect.select(category)
    const addChoiceBtn = cy.get('.add-choice-button:eq(0)')
    for (let i = 0; i < 2; i++) {
      addChoiceBtn.click()
    }
    const choiceInput1 = cy.get('.choice-input:eq(0) > input')
    choiceInput1.type(answer)
    const choiceInput2 = cy.get('.choice-input:eq(1) > input')
    choiceInput2.type(choice1)
    const choiceInput3 = cy.get('.choice-input:eq(2) > input')
    choiceInput3.type(choice2)
    const choiceInput4 = cy.get('.choice-input:eq(3) > input')
    choiceInput4.type(choice3)
    const answerInput = cy.get('.answer-input:eq(0)')
    answerInput.type(answer)
    cy.get('.add-question-button:eq(0)').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Questions saved!')
    })
    questionInput.should('have.value', '')
    categorySelect.should('have.value', '')
    choiceInput1.should('have.value', '')
    choiceInput2.should('have.value', '')
    answerInput.should('have.value', '')
    cy.get('.question-block').then((divs) => {
      const index = divs.length - 1
      cy.get('.question-content > .question-input').eq(index).should('have.value', question)
      cy.get('.category-dropdown')
        .eq(index + 1)
        .should('have.value', category)
      cy.get('.answer-content > .answer-input').eq(index).should('have.value', answer)
    })
    cy.get('.choices-container > .choice-input > input').then((inputs) => {
      const index = inputs.length
      cy.get('.choices-container > .choice-input > input')
        .eq(index - 4)
        .should('have.value', answer)
      cy.get('.choices-container > .choice-input > input')
        .eq(index - 3)
        .should('have.value', choice1)
      cy.get('.choices-container > .choice-input > input')
        .eq(index - 2)
        .should('have.value', choice2)
      cy.get('.choices-container > .choice-input > input')
        .eq(index - 1)
        .should('have.value', choice3)
    })
  })
  it('allows a user to edit a question', () => {
    cy.visit('http://localhost:4173/edit')

    cy.get('.question-block')
      .first()
      .within(() => {
        cy.get('.question-input').clear().type('New question text')

        cy.get('.choice-input input').first().clear().type('New answer option')

        cy.get('.answer-input').clear().type('New correct answer')
      })
    cy.get('.save-button').click()
  })
})
