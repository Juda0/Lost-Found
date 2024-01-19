describe('Reponsive tests', () => {
    let currentUser;

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

        cy.viewport('iphone-7')
        cy.visit('/')

    })

    it('Use hamburger menu links ', () => {

        // Logging in
        const { email, password } = currentUser;

        cy.get('[data-cy="hamburger"]').check();
        cy.get('[data-cy="login"]').click();
        cy.url().should('include', '/login');

        cy.get('[data-cy="email"]').type(email);
        cy.get('[data-cy="password"]').type(password);
        cy.get('[data-cy="submit"]').click();

        // Verify that the login was successful
        cy.url().should('include', '/posts');

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-cy="hamburger"]').check();
        cy.get('[data-cy="find"]').click();
        cy.url().should('include', '/find'); // Check if on the find page
        cy.get('[data-cy="hamburger"]').check();
        cy.get('[data-cy="claims"]').click();
        cy.url().should('include', '/claims'); // Check if on the claims page
        cy.get('[data-cy="hamburger"]').check();
        cy.get('[data-cy="posts"]').click();
        cy.url().should('include', '/posts'); // Check if on the posts page
        cy.get('[data-cy="hamburger"]').check();
        cy.url().should('include', '/'); // Check if on the home page
        cy.get('[data-cy="hamburger"]').check();
        cy.get('[data-cy="logo"]').click();
        cy.url().should('include', '/'); // Check if on the home page
        cy.get('[data-cy="logout"]').click();
        cy.url().should('include', '/'); // Check if on the login page
        /* ==== End Cypress Studio ==== */
    })
})