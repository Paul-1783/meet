import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents / > component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test("has an element with role 'textbox'", () => {
    const NumberOfEventsBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(NumberOfEventsBox).toBeInTheDocument;
    expect(NumberOfEventsBox).toHaveClass("max-events");
  });

  test("indicated default value of number of shown events is 32", () => {
    const NumberOfEventsBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(Number(NumberOfEventsBox.value)).toBe(32);
  });

  test("always changes textbox value when user makes an entry", async () => {
    const NumberOfEventsBox = NumberOfEventsComponent.queryByRole("textbox");
    const user = userEvent.setup();
    await user.type(NumberOfEventsBox, "{backspace}{backspace}40");
    expect(Number(NumberOfEventsBox.value)).toBe(40);
  });
});
