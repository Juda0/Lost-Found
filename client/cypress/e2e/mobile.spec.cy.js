describe('Reponsive tests', () => {
    beforeEach(() => {
        cy.viewport('iphone-7')
        cy.visit('/')
    })

    it('Hamburger menu links', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();

        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();

        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();

        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();
        cy.get('[data-cy="posts"]').click();

        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();

        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="find"]').click();
        
        cy.get('[data-cy="hamburger"]').check().then(() => {
            cy.wait(500);
        });
        cy.get('[data-cy="login"]').click();
        /* ==== End Cypress Studio ==== */
    })
})