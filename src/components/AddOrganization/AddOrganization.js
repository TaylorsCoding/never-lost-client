import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddOrganization extends Component {
  state = {
    nameVer: true,
    zcVer: true,
    descVer: true,
    typeVer: true,
  };

  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    let errCount = 0;

    if (e.target["name"].value.length === 0) {
      this.setState({ titleVer: false });
      errCount++;
    }
    if (e.target["zip_code"].value.length === 0) {
      this.setState({ zcVer: false });
      errCount++;
    }
    if (e.target["type"].value.length === 0) {
      this.setState({ typeVer: false });
      errCount++;
    }
    if (e.target["description"].value.length === 0) {
      this.setState({ descVer: false });
      errCount++;
    }

    if (errCount > 0) {
      return;
    }

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
              <label htmlFor="name">
                Name{this.state.nameVer ? null : ": You must add a name."}
              </label>
            </div>
            <div>
              <input type="text" name="name" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="zip_code">
                Zip Code{this.state.zcVer ? null : ": You must add a zip code."}
              </label>
            </div>
            <div>
              <input type="text" name="zip_code" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="description">
                Description
                {this.state.descVer ? null : ": You must add a description."}
              </label>
            </div>
            <div>
              <textarea type="text" name="description" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="type">
                Type{this.state.typeVer ? null : ": You must add a type."}
              </label>
            </div>
            <div>
              <input type="text" name="type" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="address">Address - Enter if Known</label>
            </div>
            <div>
              <input type="text" name="address" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="website">Website - Enter if Known</label>
            </div>
            <div>
              <input type="text" name="website" />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <label htmlFor="phone_number">
                Phone Number - Enter if Known
              </label>
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
