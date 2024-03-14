describe('Quiz', () => {
  const numberOfQuestion = '5'
  it('plays through the quiz', () => {
    cy.visit('http://localhost:4173')
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
describe('Leaderboard Category View', () => {
  beforeEach(() => {
    // Mock highScores data
    const highScores = {
      Geography: [
        { username: 'Alice', score: 8 },
        { username: 'Bob', score: 7 }
      ],
      // Empty array for no score
      Mathematics: []
    }

    // Visit and before page load, initialize localStorage with mock highScores data
    cy.visit('http://localhost:4173/', {
      onBeforeLoad(window) {
        window.localStorage.setItem('highScores', JSON.stringify(highScores))
      }
    })
  })

  it('displays high scores for a selected category with scores', () => {
    // Select first select element on the page and choose Geography category
    cy.get('select').first().select('Geography')

    // Check if header for selected category is visible
    cy.contains('h4', 'Category: Geography').should('be.visible')

    // Check if there 2 li displayed
    cy.get('li').should('have.length', 2)

    // Check if scores for Alice and Bob are visible
    cy.contains('li', 'Alice: 8').should('be.visible')
    cy.contains('li', 'Bob: 7').should('be.visible')
  })

  it('shows a message if no high scores are available for the selected category', () => {
    // Select first select element on the page and choose Mathematics category
    cy.get('select').first().select('Mathematics')

    // Check if error message is visible
    cy.contains('p', 'No high scores available for this category yet.').should('be.visible')
  })
})

