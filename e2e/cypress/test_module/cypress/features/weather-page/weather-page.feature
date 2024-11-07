Feature: | Weather page |
  Verify that the weather search feature works correctly

  Background: User is on the Weather page
    Given I am on the weather page

  Scenario: Search for a city's weather
    When I enter "Kyiv" into the search input
    And I submit the search
    Then I should see the weather information for "Kyiv"

  Scenario: Display error when weather data cannot be retrieved
    Given My network connection is bad
    When I search for a city's weather
    Then I should see an error message

  Scenario: Display message when search input is empty
    When I clear the search input
    Then I should see a prompt message asking me to type a search query

  Scenario: Perform search using the Enter key
    When I enter "Lviv" into the search input
    And I press Enter
    Then I should see the weather information for "Lviv"
