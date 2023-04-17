/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main page', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('.main-header img');
  });

  it('should render the title', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.get('h1').should('have.length', 1).contains('React Tasks');
  });
});