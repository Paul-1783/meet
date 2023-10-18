import { useState } from "react";

const NumberOfEvents = () => {
  let [queryValue, setQueryValue] = useState(32);
  const handleNumberChanged = (event) => {
    let changedValue = event.target.value;
    if (changedValue < 32 || isNaN(changedValue) || changedValue > 64) {
      setQueryValue(32);
    }
    setQueryValue(Number(changedValue));
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        value={queryValue}
        className="max-events"
        placeholder="Enter max number of indicated events"
        onChange={handleNumberChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
