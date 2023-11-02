import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleNumberChanged = (event) => {
    let changedValue = event.target.value;
    let errorText;
    if (isNaN(changedValue) || changedValue <= 0) {
      errorText =
        "The value you entered can't be processed: It's either not a number or smaller than 0.";
    } else if (changedValue > 64) {
      setCurrentNOE(Number(32));
      errorText = "";
    } else {
      setCurrentNOE(Number(changedValue));
      errorText = "";
    }
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-event s-input">Number of Events: </label>
      <input
        type="text"
        defaultValue={32}
        className="max-events"
        placeholder="Enter max number of indicated events"
        onChange={handleNumberChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
