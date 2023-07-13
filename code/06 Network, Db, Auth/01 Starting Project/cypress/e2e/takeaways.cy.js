/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
    cy.visit('/');
  });

  it('should display a list of fetched takeaways', () => {
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
});