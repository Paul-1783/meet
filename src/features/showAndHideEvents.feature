Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given the App has been rendered
        When all elements have been loaded
        Then the user shouldn‘t see the event details
    Scenario: User can expand an event to see details.
        Given the event hasn‘t been clicked yet
        When the user selects the event
        Then the user should see the details of the respective event
    Scenario: User can collapse an event to hide details.
        Given the event has already been selected by the user
        When the user clicks the hide button
        Then the events collapses