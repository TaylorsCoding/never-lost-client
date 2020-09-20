import React, { Component } from "react";
import "../../index.css";
import "./AddAnimal.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddAnimal extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    if (e.target["in_shelter"].value === "...") {
      e.target["in_shelter"].value = 0;
    }

    const animal = {
      name: e.target["name"].value,
      species: e.target["species"].value,
      breed: e.target["breed"].value,
      color: e.target["color"].value,
      age: e.target["age"].value,
      gender: e.target["gender"].value,
      description: e.target["description"].value,
      zip_code: e.target["zip_code"].value,
      is_lost: e.target["is_lost"].checked,
      in_shelter: parseInt(e.target["in_shelter"].value),
    };

    fetch(`${config.API_ENDPOINT}/animals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(animal),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((animal) => {
        this.context.addAnimal(animal);
        this.props.history.push(`/animals`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { localOrganizations = [] } = this.context;
    return (
      <ErrorBoundary>
        <div className="animal-content">
          <h1>Add an Animal!</h1>
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
                <label htmlFor="species">Species</label>
              </div>
              <div>
                <input type="text" name="species" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="breed">Breed</label>
              </div>
              <div>
                <input type="text" name="breed" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="color">Color</label>
              </div>
              <div>
                <input type="text" name="color" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="age">Age</label>
              </div>
              <div>
                <input type="number" name="age" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="gender">Gender</label>
              </div>
              <div>
                Male
                <input type="radio" name="gender" value="Male" />
              </div>
              <div>
                Female
                <input type="radio" name="gender" value="Female" />
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
                <label htmlFor="zip_code">Zip Code</label>
              </div>
              <div>
                <input type="text" name="zip_code" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="is_lost">Is this animal lost?</label>
              </div>
              <div>
                <input type="checkbox" name="is_lost" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="in_shelter">Is this animal in a shelter?</label>
              </div>
              <div>If it is, choose a shelter below.</div>
              <select name="in_shelter">
                <option>...</option>
                {localOrganizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name} - {organization.zip_code}
                  </option>
                ))}
              </select>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      </ErrorBoundary>
    );
  }
}
