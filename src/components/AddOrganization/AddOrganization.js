import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddOrganization extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const org = {
      name: e.target["name"].value,
      zip_code: e.target["zip_code"].value,
      description: e.target["description"].value,
      type: e.target["type"].value,
      address: e.target["address"].value,
      website: e.target["website"].value,
      phone_number: e.target["phone_number"].value,
    };

    fetch(`${config.API_ENDPOINT}/organizations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(org),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((org) => {
        this.context.addTopic(org);
        this.props.history.push(`/organizations`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <ErrorBoundary>
        <h1>Add an Organization</h1>
        <form onSubmit={this.handleSubmit} action="#">
          <fieldset>
            <div>
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" name="name" />
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
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <textarea type="text" name="description" />
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
              <label htmlFor="address">Address</label>
            </div>
            <div>
              <input type="text" name="address" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="website">Website</label>
            </div>
            <div>
              <input type="text" name="website" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div>
              <input type="tel" name="phone_number" />
            </div>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </ErrorBoundary>
    );
  }
}
