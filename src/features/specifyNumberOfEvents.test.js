import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App.js";
import { userEvent } from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppComponent;
  let AppDOM;
  let NumberOfEventsDOM;
  let NumberOfEventsBox;
  let EventListDOM;

  beforeEach(() => {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
    NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    NumberOfEventsBox = within(NumberOfEventsDOM).queryByRole("textbox");
    EventListDOM = AppDOM.querySelector("#event-list");
  });
  test("When user hasn’t specified a number, 32 events are shown by default.", ({
    given,
    when,
    then,
  }) => {
    given("the user hasn't entered a number", () => {
      let NumberOfEventsBox = within(NumberOfEventsDOM).queryByRole("textbox");
      expect(NumberOfEventsBox.value).toBe("32");
    });
    when("the evenlist has been loaded", () => {}); // can I just leave out tests? when the feature text is as vague as here?
    then("32 events get shown", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });
  test("User can change the number of events displayed.", ({
    given,
    when,
    then,
  }) => {
    given("the eventlist has been loaded", () => {});
    when("the user enters a new number", () => {
      let user = userEvent.setup();
      user.type(NumberOfEventsBox, "{backspace}{backspace}10");
    });
    then("a changed number of events gets presented", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(10);
        expect(NumberOfEventsBox.value).toBe("10");
      });
    });
  });
});
