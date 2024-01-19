describe('The Login Page', () => {
  
  beforeEach(() => {
    // Start at homepage
    cy.visit('/')
  });

  it('Redirect due to user not being logged in', function () {
    cy.get('[data-cy="claims"]').click();
    cy.url().should('include', '/login'); // Check if redirect to login page
    cy.get('[data-cy="posts"]').click();
    cy.url().should('include', '/login'); // Check if redirect to login page
  });
});
