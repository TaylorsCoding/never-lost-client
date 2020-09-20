import React, { Component } from "react";
import "./AddTopic.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddTopic extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const topic = {
      title: e.target["title"].value,
      zip_code: e.target["zip_code"].value,
      event_id: e.target["event_id"].value,
    };

    fetch(`${config.API_ENDPOINT}/topics`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topic),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((topic) => {
        this.context.addTopic(topic);
        this.props.history.push(`/chat`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { localEvents = [] } = this.context;
    return (
      <div className="chat-content">
        <ErrorBoundary>
          <h1>Add a Topic</h1>
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="title">Title</label>
              </div>
              <div>
                <input type="text" name="title" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="zip_code">Zip Code</label>
              </div>
              <div>
                <input type="text" name="zip_code" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="event_id">Is this topic about an event?</label>
              </div>
              <div>
                <select name="event_id">
                  <option>...</option>
                  {localEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.zip_code}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </ErrorBoundary>
      </div>
    );
  }
}
