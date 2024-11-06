Feature: | Weather Search |
    Verify that the weather search feature works correctly

    Background: Weather page context
        Given The user is on the weather page

    Scenario: Search for a city's weather
        When The user enters "Kyiv" into the search input
        And The user submits the search
        Then The weather information for "Kyiv" should be displayed

    Scenario: Display error when weather data cannot be retrieved
        Given The user's connection is bad
        When The user searches for a city's weather
        Then An error message should be displayed

    Scenario: Display message when search input is empty
        When The user clears the search input
        Then A prompt message should be displayed asking the user to type a search query

    Scenario: Perform search using Enter key
        When The user enters "Lviv" into the search input
        And The user presses Enter
        Then The weather information for "Lviv" should be displayed
