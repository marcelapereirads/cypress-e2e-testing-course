/// <reference types="Cypress" />

describe('Page navigation', () => {
    it('should navigate between pages', () => {
        cy.visit('/');
        cy.getByCyId('header-about-link').click();
        cy.location('pathname').should('equal', '/about');
        cy.getByCyId('header-home-link').click();
        cy.location('pathname').should('equal', '/');
        cy.go('back');
        cy.location('pathname').should('equal', '/about');
        cy.go('forward');
        cy.location('pathname').should('equal', '/');
    });
});