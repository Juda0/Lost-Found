describe('My First Test', () => {
  it('Finds the content "search"', () => {
    cy.visit('/')

    // should be on a new URL which includes '/login'
    cy.get('[data-cy="login"]').click()
    cy.url().should('include', '/login')

    // Get login input fields and type into it
    cy.get('[data-cy="email"]').type('fake@email.com')
    cy.get('[data-cy="password"]').type('fakepassword')

    // Verify fields have been typed into
    cy.get('[data-cy="email"]').should('have.value', 'fake@email.com')
    cy.get('[data-cy="password"]').should('have.value', 'fakepassword')
  })
})