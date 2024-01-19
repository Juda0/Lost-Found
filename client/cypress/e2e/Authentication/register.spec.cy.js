describe('User registration', () => {
  let currentUser; // Declare currentUser in the outer scope

  
  
  beforeEach(() => {
    // Reset all data in the DB to a known state 
    cy.request({
      method: 'GET',
      url: 'http://localhost:4000/database/reset',
      baseurl: 'http://localhost:4000', // Corrected the base URL format
    });  

     // Basic user data:
    currentUser = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password'
  };
    // Start at homepage
    cy.visit('/')
  });

  it('Creates a user after filling in form and submitting', function () {
    // Destructuring assignment of the currentUser object
    const { username, email, password } = currentUser;

    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="register"]').click();
    cy.get('[data-cy="username"]').clear('');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="registerConfirm"]').click();
  });


  it('Checks for error message upon duplicate email entry', function () {
    // Destructuring assignment of the currentUser object
    const { username, email, password } = currentUser;

    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="register"]').click();
    cy.get('[data-cy="username"]').clear('');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="registerConfirm"]').click();

    // Second register attempt with same email
    cy.get('[data-cy="register"]').click();
    cy.get('[data-cy="username"]').clear('');
    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="email"]').clear();
    cy.get('[data-cy="email"]').type(email);
    cy.get('[data-cy="password"]').clear();
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="registerConfirm"]').click();

    cy.get('[data-cy="errorMessage"]').should('be.visible').contains('Register failed. Please try again later.');
  });
});
