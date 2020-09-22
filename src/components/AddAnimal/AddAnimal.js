import React, { Component } from "react";
import "../../index.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

export default class AddAnimal extends Component {
  state = {
    nameVer: true,
    speciesVer: true,
    zcVer: true,
    lostVer: true,
    colorVer: true,
    genderVer: true,
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

    if (e.target["in_shelter"].value === "...") {
      e.target["in_shelter"].value = 0;
    }

    if (e.target["name"].value.length === 0) {
      this.setState({ nameVer: false });
      errCount++;
    }
    if (e.target["species"].value.length === 0) {
      this.setState({ speciesVer: false });
      errCount++;
    }
    if (e.target["color"].value.length === 0) {
      this.setState({ colorVer: false });
      errCount++;
    }
    if (e.target["gender"].value.length === 0) {
      this.setState({ genderVer: false });
      errCount++;
    }
    if (e.target["zip_code"].value.length === 0) {
      this.setState({ zcVer: false });
      errCount++;
    }
    if (e.target["in_distress"].value.length === 0) {
      this.setState({ disVer: false });
      errCount++;
    }

    if (errCount > 0) {
      return;
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
        <div className="main-content">
          <h1>Add an Animal!</h1>
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="name">
                  Name {this.state.nameVer ? null : ": You must add a name."}
                </label>
              </div>
              <div>
                <input type="text" name="name" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="species">
                  Species
                  {this.state.speciesVer ? null : ": You must add a species."}
                </label>
              </div>
              <div>
                <input type="text" name="species" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="breed">Breed</label>
                If you don't know the breed, you don't have to enter one.
              </div>
              <div>
                <input type="text" name="breed" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="color">
                  Color{this.state.colorVer ? null : ": You must add a color."}
                </label>
              </div>
              <div>
                <input type="text" name="color" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="age">Age</label>
                If you don't know the age, don't worry about it.
              </div>
              <div>
                <input type="number" name="age" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="gender">
                  Gender
                  {this.state.genderVer
                    ? null
                    : ": You must indicate a gender."}
                </label>
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
                <label htmlFor="description">
                  Add a description if you want.
                </label>
              </div>
              <div>
                <textarea name="description" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="zip_code">
                  Zip Code{" "}
                  {this.state.zcVer ? null : ": You must add a zip code."}
                </label>
              </div>
              <div>
                <input type="text" name="zip_code" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="is_lost">
                  Is this animal lost?
                  {this.state.lostVer
                    ? null
                    : " You must indicate if it is lost."}
                </label>
              </div>
              <div>
                <input type="checkbox" name="is_lost" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="in_shelter">Is this animal in a shelter?</label>
              </div>
              <div> If it is, choose from a shelter below. </div>
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
