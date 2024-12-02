import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { httpMethod } from "@cypress-e2e/fixtures/global-data";

Given("I am on the movies search page", () => {
  cy.visitWithLanguage("/movies");
  cy.intercept(httpMethod.get, /search\/movie/, {
    fixture: "success-movie-search-response-1-page",
    delay: 100
  }).as("movieSearchRequest");
});

Given("I have bad internet connection that results in error", () => {
  cy.intercept(httpMethod.get, /search\/movie/, {
    statusCode: 500,
    body: { error: "Internal Server Error" }
  }).as("movieSearchRequest");
});

When("I have not entered any search query", () => {
  cy.getById("app-search-input").should("have.value", "");
});

Then(
  "I should see a movie search fallback displaying {string}",
  (message: string) => {
    cy.getById("movies-search-fallback").contains(message);
  }
);

When(
  "I enter a non-existent movie name {string} into the search input",
  (value: string) => {
    cy.intercept(httpMethod.get, /search\/movie/, {
      fixture: "empty-movie-search-response"
    }).as("movieSearchRequest");
    cy.getById("app-search-input").type(value);
  }
);

When("I click the search button", () => {
  cy.getById("app-search-input-submit").click();
});

Then("I should see an empty search input", () => {
  cy.getById("app-search-input").should("have.value", "");
});

Then("The search counter should display the number of results found", () => {
  cy.getById("movies-results-counter").contains(
    "Found 29 movies matching your search"
  );
});

Then("I should see {int} movie cards", (cardsLength: number) => {
  cy.getById("movie-card").should("have.length", cardsLength);
});

Then("I should see a loading state", () => {
  cy.getById("movie-card-skeleton").should("have.length", 10);
});

Then(
  "The request should be sent with {string} query",
  (expectedQuery: string) => {
    cy.wait("@movieSearchRequest")
      .its("request.url")
      .then((url) => {
        const searchParams = new URLSearchParams(new URL(url).search);
        const query = searchParams.get("query");

        expect(query).to.equal(expectedQuery);
      });
  }
);

Then("The request should be sent with {int} page", (expectedPage: number) => {
  cy.wait("@movieSearchRequestPage" + expectedPage)
    .its("request.url")
    .then((url) => {
      const searchParams = new URLSearchParams(new URL(url).search);
      const page = Number(searchParams.get("page"));

      expect(page).to.equal(expectedPage);
    });
});

Then("I should be on {int} page", (page: number) => {
  cy.get(`[aria-label="page ${page}"]`).should("have.class", "Mui-selected");
});

When("I navigate to {int} page", (page: number) => {
  cy.intercept(
    httpMethod.get,
    new RegExp(`search/movie.*[?&]page=${page}\\b`),
    {
      fixture: "success-movie-search-response-2-page",
      delay: 100
    }
  ).as("movieSearchRequestPage" + page);
  cy.get(`[aria-label="Go to page ${page}"]`).click();
});

When("I navigate to previous page from {int} page", (page: number) => {
  const nextPage = page + 1;

  cy.intercept(
    httpMethod.get,
    new RegExp(`search/movie.*[?&]page=${nextPage}\\b`),
    {
      fixture: "success-movie-search-response-2-page",
      delay: 100
    }
  ).as("movieSearchRequestPage" + nextPage);
  cy.get(`[aria-label="Go to previous page"]`).click();
});

When("I navigate to next page from {int} page", (page: number) => {
  const nextPage = page + 1;

  cy.intercept(
    httpMethod.get,
    new RegExp(`search/movie.*[?&]page=${nextPage}\\b`),
    {
      fixture: "success-movie-search-response-2-page",
      delay: 100
    }
  ).as("movieSearchRequestPage" + nextPage);
  cy.get(`[aria-label="Go to next page"]`).click();
});
