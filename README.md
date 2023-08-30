# meet app

A serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events. Users select a city and the upcoming events
in the chosen location will be shown as a list. Users have the possibility to request
further details on events they are interested in.

## Application of serverless functions in this project

The Backend of the application will be written as FaaS with Node/Express.
The cloud-service provider used to create these serverless functions is AWS Lambda.

The app uses the protected Google Calendar API and accesses it by OAuth2 token authorization. When a user provides his credentials to log into a Google account, the authorization server authenticates him and authorizes him to access the events via the app - by granting a token to the app. After that, by providing with every request the received token, the app will get in return the list of events from the API. The process of obtaining the access token from the authorization server will be implemented as a serverless function, furthermore called “Oauth consumer“.

This process in more detail:

    • the “OAuth consumer“ (implemented as “FaaS“) attempts to access the authorization server via consumer key and consumer secret
    • if the credentials are accepted, a consent screen to present to the user is requested
    • if the user logs in and grants consent, the “OAuth consumer“ receives an authorization code.
    • the “OAuth consumer“ requests (providing the authorization code) for the actual access token
    • having received the token, the serverless functions can carry out user requests to the Google API

## Project Features and Scenarios

```
 - Feature1.: As a user,
    I should be able to filter events by city
    So that I can see a list of events taking place in that city.

    Scenario 1 When user hasn’t searched for a specific city, show upcoming events from all cities.

    • Given user hasn’t searched for any city;
    • When the user opens the app;
    • Then the user should see a list of upcoming events.

    Scenario 2 User should see a list of suggestions when they search for a city.

    • Given the main page is open;
    • When user starts typing in the city textbox;
    • Then the user should receive a list of cities (suggestions) that match what they’ve typed.

    Scenario 3 User can select a city from the suggested list.

    • Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
    • When the user selects a city (e.g., “Berlin, Germany”) from the list;
    • Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.
```

```
- Feature 2.: As a user,
  I want details to be shown to me about an event which looks promising to me,
  but also to be hidden,
  so that I can see if if the respective event is interesting or not.

  Scenario 1. An event element is collapsed by default.
  • Given the app has not been used yet;
  • When the app gets started;
  • Then the user shouldn‘t see that event
  Scenario 2. User can expand an event to see details.
  • Given the event hasn‘t been clicked yet or already been closed before;
  • When the user selects the event;
  • Then the user should see the details of the respective event.
  Scenario 3. User can collapse an event to hide details.
  • Given the event has already been selected by the user;
  • When the user selects the event one time more;
  • Then the events collapses.
```

```
- Feature 3.: As a user,
		I want to be capable of personally limiting the number of events shown to me,
		so that I don‘t loose overview with all the possibilities.

    Scenario 1. When user hasn’t specified a number, 32 events are shown by default.
    • Given the user hasn‘t specified that number and 32 events are shown as a list.
    • When the user has entered a number;
    • Then the number of indicated events gets shown
	Scenario 2. User can change the number of events displayed.
    • Given a number has already been entered or 32 events have been displayed.
    • When the user enters a new number;
    • Then a changed number of events gets presented
```

```
Feature 4.: As a user,
		I want to be capable to use the app even when I‘m offline,
		simply because it‘s more comfortable for me.

    Scenario 1.  Show cached data when there’s no internet connection.
    • Given there is no connection the Internet;
    • When the user wants to use the app;
    • Then the events and event details based on the cache should be shown
	Scenario 2. Show error when user changes search settings (city, number of events).
    • Given no internet connection and a result of the previous search is cached
    • When the user enters new search settings
    • Then an error message will be displayed
```

```
Feature 5.: As a user,
		I want an app shortcut on my home screen,
		so that I don‘t have to look up the app each time I want to use it.

    Scenario 1. User can install the meet app as a shortcut on their device home screen.
    • Given the user hasn‘t installed meet app yet
    • When the user downloads and installs the app
    • Then the shortcut should be added to the home screen

```

```
Feature 6.: As a user,
		I want a chart displaying a visual presentation of all event details,
		so that I can make my decision which even to pick even quicker.

    Scenario 1. Show a chart with the number of upcoming events in each city.
    • Given the program has already collected a list of event entries and the user is on the landing page;
    • When the user selects the display chart option;
    • Then the chart gets displayed.
```
