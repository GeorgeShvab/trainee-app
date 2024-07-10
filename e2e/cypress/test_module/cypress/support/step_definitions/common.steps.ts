/// <reference types="Cypress" />

import { Then, When, Given } from "@badeball/cypress-cucumber-preprocessor";
import { UserRole } from "..";

Given("I authenticate to the system under role {word}", (role: UserRole) => {
  cy.loginWithRole(role);
});

When("I should see validation error message {string}", (message: string) => {
  cy.get("body").should("contain", message);
});

Then("I should receive a snackbar with message {string}", (message: string) => {
  cy.getById("snackbar").should("contain", message);
});
