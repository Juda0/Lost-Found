describe('The Login Page', () => {
  let currentUser; // Declare currentUser in the outer scope



  beforeEach(() => {
      // Basic data that gets seeded:
    currentUser = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'password'
  };
  
      // Reset all data in the DB to a known state 
      cy.request({
        method: 'GET',
        url: 'http://localhost:4000/database/reset',
        baseurl: 'http://localhost:4000', // Corrected the base URL format
      });
  
      // Seed a user and post in the DB that we can control from our tests
      cy.request({
        method: 'POST',
        url: 'http://localhost:4000/user/register',
        body: {
          username: currentUser.username,
          email: currentUser.email,
          password: currentUser.password
        },
      });
  
      // Start at homepage
      cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('CreatePost', function() {
    // Destructuring assignment of the currentUser object
    const { email, password } = currentUser;
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="email"]').clear().type(email);
    cy.get('[data-cy="password"]').clear().type(password);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="logo"] > button').click();
    cy.get('[data-cy="postTitle"]').clear('R');
    cy.get('[data-cy="postTitle"]').type('RandomPost');
    cy.get('[data-cy="postDescription"]').click();
    cy.get('[data-cy="postDescription"]').type('This is the description');
    cy.get('[data-cy="fetchLocationButton"]').click();
    cy.get('.form_input-with-icon__q\\+9Y2 > input').click();
    cy.wait(1000);
    cy.get('.leaflet-marker-icon').click();
    cy.get('.rti--input').clear('BN');
    cy.get('.rti--input').type('NiceTag{enter}');
    cy.get('[data-cy="createPost"]').click();
    /* ==== End Cypress Studio ==== */
  });
});

