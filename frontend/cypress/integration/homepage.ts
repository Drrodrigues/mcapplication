/// <reference types="cypress" />

describe('Home Page', ()=> {
    beforeEach(() => {
          cy.visit("");
    });

    it('should show 2 consumers on the main page', function() {
        cy.intercept("GET", "**/consumers", {
            fixture: "consumers.json",
          }).as("fetchConsumers");
        cy.get('[name="consumerSpace"]').should('not.have.text',"No consumers found");
        cy.get('[data-cy-consumer=1]').should('be.visible');
        cy.get('[data-cy-consumer=0]').should('be.visible');
    });

    it('should show no consumers on main page', function() {
        cy.intercept("GET", "**/consumers", {
            fixture: "noConsumers.json",
          }).as("fetchConsumers");
        cy.get('[name="consumerSpace"]').should('have.text',"No consumers found");
      
    });

});