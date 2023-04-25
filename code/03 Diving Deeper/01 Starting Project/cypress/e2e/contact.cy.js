/// <reference types="Cypress" />

describe('Contact Page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5173/about');
    });

    it('should send a message clicking the button', () => {
        cy.get('[data-cy="contact-input-message"]').type('Hello');
        cy.get('[data-cy="contact-input-name"]').type('Marcela');
        cy.get('[data-cy="contact-input-email"]').type('marcelapereirads@gmail.com');
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn').contains('Send Message').should('not.have.attr', 'disabled');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...').should('have.attr', 'disabled');
    });

    it('should send a message typing enter enter', () => {
        cy.get('[data-cy="contact-input-message"]').type('Hello');
        cy.get('[data-cy="contact-input-name"]').type('Marcela');
        cy.get('[data-cy="contact-input-email"]').type('marcelapereirads@gmail.com{enter}');
        cy.get('[data-cy="contact-btn-submit"]').contains('Sending...').should('have.attr', 'disabled');
    });

    it('should validate the form', () => {
        cy.get('[data-cy="contact-btn-submit"]').click().should('not.contain', 'Sending...');
        cy.get('[data-cy="contact-input-message"]').blur().parent().then((el) => {
            expect(el.attr('class')).to.contains('invalid');
        });
    });
});