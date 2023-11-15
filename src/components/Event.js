import { useState } from "react";
import Button from "react-bootstrap/Button";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <li className="event">
      <h3>{event ? event.summary : null}</h3>
      <p>{event ? event.location : null}</p>
      <p>{event ? event.created : null}</p>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
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
