import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList.js";
import NumberOfEvents from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { extractLocations, getEvents } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "./meet-app-192.png";
import MeetTitle from "./components/heading-view/heading-view.jsx";
import CityEventsChart from "./components/CityEventsChart.js";
import EventGenresChart from "./components/EventGenresChart.js";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert(
        "Warning: You're offline, the loaded list of events is taken from the browser cache."
      );
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <MeetTitle />
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <img
            src={logo}
            alt="meet-app-logo"
            width="70"
            height="55"
            className="logo"
          />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="alerts-container">
              {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
              {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
              {warningAlert.length ? (
                <WarningAlert text={warningAlert} />
              ) : null}
            </div>
            <CitySearch
              allLocations={allLocations}
              setCurrentCity={setCurrentCity}
              setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents
              setCurrentNOE={setCurrentNOE}
              setErrorAlert={setErrorAlert}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="charts-container">
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;
