Feature: | Movie Search Functionality |

  Background: Movies page initial
    Given I am on the movies search page

  Scenario: Display initial state before search
    When I have not entered any search query
    Then I should see a movie search fallback displaying "Looking for a movie? Type movie name and hit Enter!"

  Scenario: Display no results message
    When I enter a non-existent movie name "NonExistentMovie" into the search input
    And I click the search button
    Then I should see a movie search fallback displaying "We couldn’t find any movies for your search."

  Scenario: Display error message when search fails
    Given I have bad internet connection that results in error
    When I enter "Movie" into the search input
    And I click the search button
    Then I should see a movie search fallback displaying "Unexpected error occured!"

  Scenario: Clear search input after typing
    When I enter "Movie" into the search input
    And I clear the search input
    Then I should see an empty search input

  Scenario: Display loading state during search
    When I enter "Shrek" into the search input
    And I click the search button
    Then I should see a loading state

  Scenario: Perform a successfull movie search
    When I enter "Shrek" into the search input
    And I click the search button
    Then The request should be sent with "Shrek" query
    And I should see 3 movie cards
    And The search counter should display the number of results found
