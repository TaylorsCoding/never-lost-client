import React, { Component } from "react";
import "./EventPage.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import Post from "../Post/Post";
import config from "../../config";

export default class EventPage extends Component {
  state = {
    postVer: true,
  };
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  handleSubmit(e, event_id) {
    e.preventDefault();

    if (e.target["content"].value.length === 0) {
      this.setState({ postVer: false });
      return;
    }

    const post = {
      content: e.target["content"].value,
      event_id: parseInt(event_id),
    };

    fetch(`${config.API_ENDPOINT}/posts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((post) => {
        this.context.addPost(post);
        this.props.history.push(`/event/${event_id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  }
  render() {
    const {
      localEvents = [],
      localPosts = [],
      localOrganizations = [],
      localAnimals = [],
    } = this.context;
    const { event_id } = this.props.match.params;
    const event = localEvents.find((event) => event.id === parseInt(event_id));
    const posts = localPosts.filter(
      (post) => post.event_id === parseInt(event_id)
    );
    const org = localOrganizations.find(
      (org) => org.id === parseInt(event.org_id)
    );
    const animal = localAnimals.find(
      (animal) => animal.id === parseInt(event.animal_id)
    );
    return (
      <ErrorBoundary>
        <div className="main-content">
          <div>
            <h1>Event: {event ? event.title : null}</h1>
            <p>{org ? `Has to do with the ${org.name} organization.` : null}</p>
            <p>
              {animal
                ? `Has to do with ${animal.name}, the ${animal.breed} ${animal.species}.`
                : null}
            </p>
            <p>Type: {event ? event.type : null}</p>
            {event ? (
              <>
                <p>Description</p>
                <p className="description">
                  {event ? event.description : null}
                </p>
              </>
            ) : null}

            <p>Date Published: {event ? event.date_published : null}</p>
          </div>
          <div className="posts">
            <h2>Posts</h2>
            {posts.map((post) => (
              <Post
                className="ind-post"
                key={post.id}
                content={post.content}
                event_id={post.event_id}
                date_published={post.date_published}
              />
            ))}
          </div>
          <div>
            <form
              className="post-form"
              onSubmit={(e) =>
                this.handleSubmit(e, this.props.match.params.event_id)
              }
            >
              <div>
                <label for="content">New Post</label>
              </div>
              <div>
                <label>
                  {this.state.postVer ? null : "You must enter some text."}
                </label>
                <textarea name="content" />
              </div>
              <div>
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
