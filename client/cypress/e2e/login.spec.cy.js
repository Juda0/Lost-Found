describe('The Login Page', () => {
  let currentUser; // Declare currentUser in the outer scope

  beforeEach(() => {
    // Reset all data in the DB to a known state 
    cy.request({
      method: 'GET',
      url: '/database/reset',
      baseurl: 'http://localhost:4000/', // Corrected the base URL format
    });

    // Seed a user and post in the DB that we can control from our tests
    cy.request({
      method: 'GET',
      url: '/database/seed',
      baseurl: 'http://localhost:4000/',
    });

    // Basic data that gets seeded:
    currentUser = {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password'
    };

    //Start at homepage
    cy.visit('/')
  });

  it('sets auth cookie when logging in via form submission', function () {
    // Destructuring assignment of the currentUser object
    const { email, password } = currentUser;

    // should be on a new URL which includes '/login'
    cy.get('[data-cy="login"]').click()
    cy.url().should('include', '/login')

    // Get login input fields and type into it
    cy.get('[data-cy="email"]').type(email)
    cy.get('[data-cy="password"]').type(password)

    // Verify fields have been typed into
    cy.get('[data-cy="email"]').should('have.value', email )
    cy.get('[data-cy="password"]').should('have.value', password)

    cy.get('[data-cy="submit"]').click()
    
  });
});
