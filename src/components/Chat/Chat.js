import React, { Component } from "react";
import "./Chat.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import Topic from "../Topic/Topic";
import { NavLink } from "react-router-dom";

export default class Chat extends Component {
  static contextType = ApiContext;

  render() {
    const { globalTopics = [] } = this.context;
    return (
      <div className="chat-content">
        <ErrorBoundary>
          <h1>Chat</h1>
          <NavLink to="/create-topic" className="add-button">
            <button>Create a New Topic!</button>
          </NavLink>
          {globalTopics.length > 0
            ? globalTopics.map((topic) => (
                <Topic
                  id={topic.id}
                  key={topic.id}
                  title={topic.title}
                  zip_code={topic.zip_code}
                  event_id={topic.event_id}
                  date_published={topic.date_published}
                  date_last_post={topic.date_time_of_last_post}
                />
              ))
            : null}
        </ErrorBoundary>
      </div>
    );
  }
}
