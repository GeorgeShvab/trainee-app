/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";

Given("I am on the weather page", () => {
  cy.intercept(httpMethod.get, "**/data/2.5/weather*").as("weatherRequest");
  cy.visit("/weather");
});

When("I enter {string} into the search input", (city: string) => {
  cy.getById("app-search-input").type(city);
});

When("I submit the search", () => {
  cy.getById("app-search-input-submit").click();
  cy.wait("@weatherRequest");
});

When("I press Enter", () => {
  cy.getById("app-search-input").type("{enter}");
  cy.wait("@weatherRequest");
});

Then("I should see the weather information for {string}", () => {
  cy.get(".spa-weather-card__container").should("be.visible");
});

Given("My network connection is bad", () => {
  cy.intercept(httpMethod.get, "**/data/2.5/weather*", {
    statusCode: 500,
    body: { message: "Internal Server Error" }
  }).as("weatherRequestError");
  cy.visit("/weather");
});

When("I search for a city's weather", () => {
  cy.getById("app-search-input").type("Test City{enter}");
  cy.wait("@weatherRequestError");
});

Then("I should see an error message", () => {
  cy.getById("weather-error-message").should("be.visible");
});

When("I clear the search input", () => {
  cy.getById("app-search-input").type("Test City");
  cy.getById("app-search-input-clear").click();
});

Then("I should see a prompt message asking me to type a search query", () => {
  cy.get(".spa-search-message").should(
    "contain",
    "Please type the input search"
  );
});
