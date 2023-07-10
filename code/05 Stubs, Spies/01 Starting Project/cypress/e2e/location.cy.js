/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
    // visit yield the window object
    cy.visit('/').then((win) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserPosition')
        .callsFake((_cb) => {
          // setTimeout is needed to validate the button disabled
          setTimeout(() => {
            _cb({
              coords: {
                latitude: 15.53,
                longitude: 39.48
              }
            });
          }, 100);
        })
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').contains('Location fetched');
  });
});
