/// <reference types='Cypress' />

describe('Auth', () => {
   beforeEach(() => {
    cy.task('seedDatabase');
   });

   it('should signup', () => {
    cy.visit('/signup');

    cy.get('[data-cy="auth-email"]').as('email').click(); // This line is need to avoid a bug of the project :/
    cy.get('@email').type('marcela@test.com');
    cy.get('[data-cy="auth-password"]').type('passwd');
    cy.get('[data-cy="auth-submit"]').click();

    cy.location('pathname').should('equal', '/takeaways');
    cy.getCookie('__session').its('value').should('not.be.empty');
   });

   it('should login', () => {
    cy.login();
   });

   it('should logout', () => {
    cy.login();

    cy.get('[data-cy="logout"]').click();
    cy.location('pathname').should('equal', '/');
    cy.getCookie('__session').its('value').should('be.empty');
   });
});