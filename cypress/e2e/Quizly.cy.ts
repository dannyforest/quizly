describe('Quizzy Peak', () => {
    it('should allow entering a name', () => {
      cy.visit('https://develop.d35khdacc8zaaq.amplifyapp.com/')
      cy.get('input.input-field').type('John Wick')
      cy.get('input.input-field').should('have.value', 'John Wick')
    })

    it('should allow selecting a category', () => {
        cy.visit('https://develop.d35khdacc8zaaq.amplifyapp.com/')
        cy.get('select.input-field').first().select('History');
        cy.get('select.input-field').first().should('have.value', 'History');
    })

    it('should allow selecting the quiz duration', () => {
        cy.visit('https://develop.d35khdacc8zaaq.amplifyapp.com/')
        cy.get('#startOptions > :nth-child(3)').select('1 minute')
        cy.get('#startOptions > :nth-child(3)').should('have.value', '60')
    })

    it('should allow selecting the number of questions', () => {
        cy.visit('https://develop.d35khdacc8zaaq.amplifyapp.com/')
        cy.get('#startOptions > :nth-child(4)').select('5 questions')
        cy.get('#startOptions > :nth-child(4)').should('have.value', '5')
    })

    it('should start the quiz', () => {
        cy.visit('https://develop.d35khdacc8zaaq.amplifyapp.com/')
        cy.get('input.input-field').type('John Wick')
        cy.get('input.input-field').should('have.value', 'John Wick')
        cy.get('select.input-field').first().select('Geography');
        cy.get('select.input-field').first().should('have.value', 'Geography');
        cy.get('#startOptions > :nth-child(3)').select('5 minutes')
        cy.get('#startOptions > :nth-child(3)').should('have.value', '300')
        cy.get('#startOptions > :nth-child(4)').select('10 questions')
        cy.get('#startOptions > :nth-child(4)').should('have.value', '10')
        cy.get('.start-button').click()
        cy.get('.timer').should('be.visible')
    })

  })
