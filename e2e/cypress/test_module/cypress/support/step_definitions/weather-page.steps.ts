/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given("The user is on the weather page", () => {
  cy.intercept("GET", "**/data/2.5/weather*").as("weatherRequest");
  cy.visit("/weather");
});

When("The user enters {string} into the search input", (city: string) => {
  cy.getById("app-search-input").type(city);
});

When("The user submits the search", () => {
  cy.getById("app-search-input-submit").click();
  cy.wait("@weatherRequest");
});

When("The user presses Enter", () => {
  cy.getById("app-search-input").type("{enter}");
  cy.wait("@weatherRequest");
});

Then("The weather information for {string} should be displayed", () => {
  cy.get(".spa-weather-card__container").should("be.visible");
});

Given("The user's connection is bad", () => {
  cy.intercept("GET", "**/data/2.5/weather*", {
    statusCode: 500,
    body: { message: "Internal Server Error" }
  }).as("weatherRequestError");
  cy.visit("/weather");
});

When("The user searches for a city's weather", () => {
  cy.getById("app-search-input").type("Test City{enter}");
  cy.wait("@weatherRequestError");
});

Then("An error message should be displayed", () => {
  cy.getById("weather-error-message").should("be.visible");
});

When("The user clears the search input", () => {
  cy.get('[data-cy="app-search-input"]').type("Test City");
  cy.get('[data-cy="app-search-input-clear"]').click();
});

Then(
  "A prompt message should be displayed asking the user to type a search query",
  () => {
    cy.get(".spa-search-message").should(
      "contain",
      "Please type the input search"
    );
  }
);
