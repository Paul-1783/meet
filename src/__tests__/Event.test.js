import Event from "../components/Event";
import { render } from "@testing-library/react";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event />);
  });

  test("renders event location", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event summary", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders created", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders details button with the title(show details)", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByRole("button")).toBeInTheDocument();
  });

  test("by default, event's detail section should be hidden", async () => {
    const allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
    const detailList =
      EventComponent.container.firstChild.querySelector(".details");
    expect(detailList).not.toBeInTheDocument();
  });

  test("show the details section when the user clicks on the 'show details' button", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const showDetailButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailButton);
    const eventDetails =
      EventComponent.container.firstChild.querySelector(".details");
    expect(eventDetails).toBeInTheDocument();
  });

  test("hides the detail section when the user clicks on the 'hide details' button", async () => {
    const allEvents = await getEvents();
    EventComponent.rerender(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const showDetailButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailButton);
    const eventDetails =
      EventComponent.container.firstChild.querySelector(".details");
    expect(eventDetails).toBeInTheDocument();
    await user.click(showDetailButton);
    expect(eventDetails).not.toBeInTheDocument();
  });
});
