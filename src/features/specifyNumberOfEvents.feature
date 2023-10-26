Feature: Specify number of events
    Scenario: When user hasn’t specified a number, 32 events are shown by default.
        Given the user hasn't entered a number
        When the evenlist has been loaded
        Then 32 events get shown
    Scenario: User can change the number of events displayed.
        Given the eventlist has been loaded
        When the user enters a new number
        Then a changed number of events gets presented