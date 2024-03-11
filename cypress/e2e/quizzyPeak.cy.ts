beforeEach(()=>{
  cy.visit('/')
})
describe('Quiz', () => {
    it('completes a quiz', () => {
      cy.get('input.input-field').type('Michel')
      cy.get('#startOptions > :nth-child(2)').select('Geography')
      cy.get('.start-button').click()
      cy.get('.choices > :nth-child(1)').click()
      cy.get('.choices > :nth-child(1)').click()
      cy.get('.choices > :nth-child(1)').click()
      cy.get('.choices > :nth-child(1)').click()
      cy.get('.choices > :nth-child(1)').click()
      cy.get('.results').should('be.visible')
      cy.get('.restart-button').should('be.visible')
      cy.get('.restart-button').click()
      cy.get('li').should('be.visible') // #1
    })
  })

  describe('add/edit questions', () => {
    beforeEach(()=>{      
      cy.get('.edit-questions-button').click()
      cy.location('pathname').should('eq', '/edit') // #2
    })
    describe('Questions', () => {
      it('edits a question', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get(':nth-child(1) > .question-content > .question-input').clear()
        cy.get(':nth-child(1) > .question-content > .question-input').type('Is it, or is it not?')
        cy.get(':nth-child(1) > .category-dropdown').select('Literature')
        cy.get(':nth-child(1) > .choices-container > :nth-child(2) > input').clear()
        cy.get(':nth-child(1) > .choices-container > :nth-child(2) > input').type('Yesnt')
        cy.get(':nth-child(1) > .choices-container > :nth-child(3) > input').clear()
        cy.get(':nth-child(1) > .choices-container > :nth-child(3) > input').type('Nope')
        cy.get(':nth-child(1) > .choices-container > :nth-child(4) > input').clear()
        cy.get(':nth-child(1) > .choices-container > :nth-child(4) > input').type('Yessirski')
        cy.get(':nth-child(1) > .choices-container > :nth-child(5) > input').clear()
        cy.get(':nth-child(1) > .choices-container > :nth-child(5) > input').type('It is')
        cy.get(':nth-child(1) > .answer-content > .answer-input').clear()
        cy.get(':nth-child(1) > .answer-content > .answer-input').type('Yessirski')
        cy.get('.save-button').then(($button)=>{
          $button.click()
          expect(stub.getCall(0)).to.be.calledWith('Questions saved!')
          cy.get(':nth-child(1) > .question-content > .question-input').should('have.value', 'Is it, or is it not?') // #3
        })
      })
    })
  
    describe('Questions', () => {
      it('adds a question', () => {
        const stub = cy.stub()
        cy.on ('window:alert', stub)
        cy.get('.add-question-container > .question-input').clear()
        cy.get('.add-question-container > .question-input').type('What is GAFA?')
        cy.get('.add-question-container > .category-dropdown').select('Literature')
        cy.get('.add-question-container > :nth-child(4) > input').type('Google, Appeul, Facedebook et Amazonne')
        cy.get('.add-question-container > :nth-child(5) > input').type('Google, Apple, Facebook et Amazon')
        cy.get('.add-question-container > .answer-input').type('Google, Apple, Facebook et Amazon')
        cy.get('.add-question-button').then(($button)=>{
          $button.click()
          expect(stub.getCall(0)).to.be.calledWith('Questions saved!')
          cy.get(':nth-child(53)').should('be.visible') // #4
        })

      })
    })
    describe('Questions', () => {
      it('removes a question', () => {
        const stub = cy.stub()
        cy.on ('window:confirm', stub)
        cy.get(':nth-child(52) > .delete-button').then(($button)=>{
          $button.click()
          expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete this question?')
          cy.get('.questions-container').find('.delete-button').should('have.length', 51) // #5
        })  
      })
    })
  })
  