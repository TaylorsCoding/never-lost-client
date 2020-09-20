import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddEvent extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    if (e.target["associatedAnimal"].value === "...")
      e.target["associatedAnimal"].value = null;
    if (e.target["associatedOrganization"].value === "...")
      e.target["associatedOrganization"].value = null;

    const event = {
      title: e.target["title"].value,
      zip_code: e.target["zip_code"].value,
      type: e.target["type"].value,
      description: e.target["description"].value,
      animal_id: parseInt(e.target["associatedAnimal"].value),
      org_id: parseInt(e.target["associatedOrganization"].value),
    };

    fetch(`${config.API_ENDPOINT}/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((event) => {
        this.context.addEvent(event);
        this.props.history.push(`/events`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { localOrganizations = [], localAnimals = [] } = this.context;
    return (
      <ErrorBoundary>
        <h1>Create an Event</h1>
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
              <label htmlFor="type">Type</label>
            </div>
            <div>
              <input type="text" name="type" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <input type="text" name="description" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="associatedAnimal">Associated Animal</label>
            </div>
            <div>
              <select name="associatedAnimal">
                <option>...</option>
                {localAnimals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} - {animal.zip_code}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="associatedOrganization">
                Associated Organization
              </label>
            </div>
            <div>
              <select name="associatedOrganization">
                <option>...</option>
                {localOrganizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name} - {organization.zip_code}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </ErrorBoundary>
    );
  }
}
