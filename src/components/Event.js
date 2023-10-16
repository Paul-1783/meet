import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li>
      <h3>{event ? event.summary : null}</h3>
      <p>{event ? event.location : null}</p>
      <p>{event ? event.created : null}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails ? (
        <div className="details">
          <h4>Event Details</h4>
          <p>Description: {event ? event.description : null}</p>
          <p>Event status: {event ? event.status : null}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
