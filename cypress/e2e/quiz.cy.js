describe('Quiz', () => {
  const numberOfQuestion = '5'
  it('plays through the quiz', () => {
    cy.visit('http://localhost:5174')
    cy.get('input').type('boop')
    cy.get('select:eq(0)').select('Literature')
    cy.get('select:eq(2)').select(numberOfQuestion)
    cy.get('.start-button').click()
    for (let i = 0; i < +numberOfQuestion; i++) {
      cy.get('.choice-button:eq(0)').should('exist')
      cy.get('button:eq(0)').click()
      cy.wait(300)
    }
    cy.get('.restart-button').should('exist')
    cy.get('.restart-button').click()
  })
})
