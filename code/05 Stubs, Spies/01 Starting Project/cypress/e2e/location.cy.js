/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    // need to include clock to use tick function to skip time
    cy.clock();

    // convert JSON in Javascript object
    cy.fixture('user-location.json').as('userLocation');

    // visit yield the window object
    cy.visit('/').then((win) => {
      cy.get('@userLocation').then((currentLocation) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
        .as('getUserPosition')
        .callsFake((_cb) => {
          // setTimeout is needed to validate the button disabled
          setTimeout(() => {
            _cb(currentLocation);
          }, 100);
        });
      });

      cy.stub(win.navigator.clipboard, 'writeText')
        .as('writeTextToClipboard')
        .resolves();

      cy.spy(win.localStorage, 'setItem').as('setLocalStorage');
      cy.spy(win.localStorage, 'getItem').as('getLocalStorage');
    });
  });

  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getUserPosition').should('have.been.called');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').contains('Location fetched');
  });

  it('should share the location URL', () => {
    cy.get('[data-cy="name-input"]').type('Marcela Silva');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@userLocation').then((currentLocation) => {
      const { latitude, longitude } = currentLocation.coords;
      const locationUrlRegex = new RegExp(`${latitude}.*${longitude}.*${encodeURI('Marcela Silva')}`);

      cy.get('@writeTextToClipboard')
        .should('have.been.calledWithMatch', locationUrlRegex);
      cy.get('@setLocalStorage').should('always.have.been.calledWithMatch', 'Marcela Silva', locationUrlRegex);
    });

    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getLocalStorage').should('have.been.called');
    cy.get('[data-cy="info-message"]').should('be.visible');

    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
