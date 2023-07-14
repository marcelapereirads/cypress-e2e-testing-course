/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });

  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });

  it('should add a new takeaway', () => {
    cy.intercept('POST', '/takeaways/new*', {}).as('createTakeaway');
    cy.login().as('login');

    cy.get('[data-cy="add-takeaway"]').click();
    cy.get('[data-cy="title"]').as('takeawayTitle').click();
    cy.get('@takeawayTitle').type('takeaway title');
    cy.get('[data-cy="body"]').type('takeaway body');
    cy.get('[data-cy="create-takeaway"]').click();
    cy.wait('@createTakeaway').its('request.body').should('match', /takeaway\+title.*takeaway\+body/);
  });
});