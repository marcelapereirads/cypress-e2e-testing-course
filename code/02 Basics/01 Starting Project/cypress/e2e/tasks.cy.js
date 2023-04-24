/// <reference types="Cypress" />

describe("Tasks management", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/");
  });

  it("should open the modal and closing it by clicking on the backdrop", () => {
    cy.contains("Add Task").click();
    cy.get(".modal").should('exist');
    /* Force true is necessary here since the click will dispatch on the center
    * of the backdrop. In future lessons, a new approach will be implemented. */
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should('not.exist');
    cy.get(".modal").should('not.exist');
  });

  it("should open the modal and closing it by clicking on the cancel button", () => {
    cy.contains("Add Task").click();
    cy.get(".modal").should('exist');
    cy.contains("Cancel").click();
    cy.get(".modal").should('not.exist');
  });

  it('should show an error if the texts are empty', () => {
    cy.contains("Add Task").click();
    cy.get('.actions').contains('Add Task').click();
    cy.get('.error-message').should('exist');
    cy.get(".modal").should('exist');
  });

  it('should create a task', () => {
    cy.contains("Add Task").click();
    cy.get('#title').type('First task');
    cy.get('#summary').type('Some description');
    cy.get('.actions').contains('Add Task').click();
    cy.get(".backdrop").should('not.exist');
    cy.get(".modal").should('not.exist');
    cy.get('.task-list .task').should('have.length', 1);
    cy.get('.task-list .task h2').contains('First task');
    cy.get('.task-list .task p').contains('Some description');
  });

  it('should filter the tasks based on priority', () => {
    cy.contains("Add Task").click();
    cy.get('#title').type('First task');
    cy.get('#summary').type('Some description');
    cy.get('#category').select('important');
    cy.get('.actions').contains('Add Task').click();
    cy.get('.task-list .task').should('have.length', 1);
    cy.get('#filter').select('moderate');
    cy.get('.task-list .task').should('have.length', 0);
    cy.get('#filter').select('important');
    cy.get('.task-list .task').should('have.length', 1);
    cy.get('#filter').select('all');
    cy.get('.task-list .task').should('have.length', 1);
  });

  it('should add multiple tasks', () => {
    cy.contains("Add Task").click();
    cy.get('#title').type('Task 1');
    cy.get('#summary').type('First task');
    cy.get('.actions').contains('Add Task').click();
    cy.get('.task-list .task').should('have.length', 1);

    cy.contains("Add Task").click();
    cy.get('#title').type('Task 2');
    cy.get('#summary').type('Second task');
    cy.get('.actions').contains('Add Task').click();
    cy.get('.task-list .task').should('have.length', 2);
    cy.get('.task-list .task').eq(0).should('contain', 'First task');
    cy.get('.task-list .task').eq(1).should('contain', 'Second task');
  });
});
