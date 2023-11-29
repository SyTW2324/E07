describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')

    // hace click en boton de login
    cy.get('.v-btn').eq(0).click()
    cy.get('#username').type('imh22')
    cy.get('#password').type('isma200A')
    cy.get('#loginButton').click()

  })
})