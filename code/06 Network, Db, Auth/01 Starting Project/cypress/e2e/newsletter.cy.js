/// <reference types="Cypress" />

describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
        cy.visit('/');
    });

    it('should subscribe to the newsletter', () => {
        cy.get('[data-cy="newsletter-email"]').type('marcela@test.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.contains('Thanks for signing up');
    });
});