import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showAndHideEvents.feature");

defineFeature(feature, (test) => {
  let AppComponent;
  let AppDOM;
  let EventListDOM;
  let EventListItems;
  let buttonItem;
  let user;

  beforeEach(() => {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
    EventListDOM = AppDOM.querySelector("#event-list");
    user = userEvent.setup();
  });

  test("An event element is collapsed by default.", ({ given, when, then }) => {
    given("the App has been rendered", () => {
      expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });

    when("all elements have been loaded", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("the user shouldn‘t see the event details", async () => {
      await waitFor(() => {
        const EventDetailItems = EventListDOM.querySelector(".details");
        expect(EventDetailItems).not.toBeInTheDocument(); //not sure
      });
    });
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    given("the event hasn‘t been clicked yet", async () => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const buttonItem = EventListItems[0].querySelector(".details-btn");
        expect(buttonItem.textContent).toBe("Show Details");
      });
    });
    when("the user selects the event", async () => {
      const user = userEvent.setup();
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        buttonItem = EventListItems[0].querySelector(".details-btn");

        expect(
          EventListItems[0].querySelector(".details")
        ).not.toBeInTheDocument();

        user.click(buttonItem, () => {
          expect(
            EventListItems[0].querySelector(".details")
          ).toBeInTheDocument();
        });
      });
    });
    then(
      "the user should see the details of the respective event",
      async () => {
        await waitFor(() => {
          EventListItems = within(EventListDOM).queryAllByRole("listitem");
          buttonItem = EventListItems[0].querySelector(".details-btn");
          // user.click(buttonItem);

          expect(
            EventListItems[0].querySelector(".details") //shouldn't this fail?
          ).toBeInTheDocument();
        });
      }
    );
  });

  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    given("the event has already been selected by the user", async () => {
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole("listitem");
        buttonItem = EventListItems[0].querySelector(".details-btn");
        user.click(buttonItem);

        expect(EventListItems[0].querySelector(".details")).toBeInTheDocument();
      });
    });
    when("the user clicks the hide button", async () => {
      await user.click(buttonItem);
    });
    then("the events collapses", () => {
      expect(
        EventListItems[0].querySelector(".details")
      ).not.toBeInTheDocument();
    });
  });
});
