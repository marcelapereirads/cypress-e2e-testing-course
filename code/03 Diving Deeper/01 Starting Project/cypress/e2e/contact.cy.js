/// <reference types="Cypress" />

describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("should send a message clicking the button", () => {
    cy.fillContactForm();
    cy.getByCyId('contact-btn-submit')
      .as("submitBtn")
      .contains("Send Message")
      .should("not.have.attr", "disabled");
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...").should("have.attr", "disabled");
  });

  it("should send a message typing enter enter", () => {
    cy.fillContactForm();
    cy.getByCyId('contact-input-email').type("{enter}");
    cy.getByCyId('contact-btn-submit')
      .contains("Sending...")
      .should("have.attr", "disabled");
  });

  it("should validate the form", () => {
    cy.getByCyId('contact-btn-submit').as("submitContactBtn").click();
    cy.get("@submitContactBtn").should("contain", "Send Message");
    cy.get("@submitContactBtn").should("not.contain", "Sending...");

    cy.getByCyId('contact-input-message').as("contactTextArea").blur();
    // Need to use have.attr with class to get the class and make the match with regular expression
    cy.get("@contactTextArea")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.getByCyId('contact-input-name').as("contactName").focus().blur();
    cy.get("@contactName")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.getByCyId('contact-input-email').as("contactEmail").focus().blur();
    cy.get("@contactEmail")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
  });
});
