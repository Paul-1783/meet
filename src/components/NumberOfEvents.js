import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const handleNumberChanged = (event) => {
    let changedValue = event.target.value;
    if (changedValue < 32 || isNaN(changedValue) || changedValue > 64) {
      setCurrentNOE(Number(32));
    }
    setCurrentNOE(Number(changedValue));
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
