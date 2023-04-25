/// <reference types="Cypress" />

describe('Page navigation', () => {
    it('should navigate between pages', () => {
        cy.visit('http://127.0.0.1:5173/');
        cy.get('[data-cy="header-about-link"]').click();
        cy.location('pathname').should('equal', '/about');
        cy.get('[data-cy="header-home-link"]').click();
        cy.location('pathname').should('equal', '/');
        cy.go('back');
        cy.location('pathname').should('equal', '/about');
        cy.go('forward');
        cy.location('pathname').should('equal', '/');
    });
});