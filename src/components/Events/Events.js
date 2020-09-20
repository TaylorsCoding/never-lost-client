import React, { Component } from "react";
import "./Events.css";

import ApiContext from "../../APIcontext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import EventComponent from "../EventComponent/EventComponent";
import { NavLink } from "react-router-dom";

export default class Events extends Component {
  static contextType = ApiContext;

  render() {
    const events = this.context.localEvents;
    return (
      <div className="main-content">
        <ErrorBoundary>
          <h1>Events</h1>
          <NavLink to="/create-event" className="add-button">
            <button>Create New Event</button>
          </NavLink>
          <ol>
            {events.map((event) => (
              <li key={event.id}>
                <EventComponent
                  id={event.id}
                  title={event.title}
                  type={event.type}
                  zip_code={event.zip_code}
                  description={event.description}
                  date_published={event.date_published}
                  animal_id={event.animal_id}
                  org_id={event.org_id}
                />
              </li>
            ))}
          </ol>
        </ErrorBoundary>
      </div>
    );
  }
}
