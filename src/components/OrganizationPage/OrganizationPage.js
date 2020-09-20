import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";

export default class OrganizationPage extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  render() {
    const { localAnimals = [], globalOrganizations = [] } = this.context;
    const { animal_id } = this.props.match.params;
    const animal = localAnimals.find(
      (animal) => animal.id === parseInt(animal_id)
    );
    const org = globalOrganizations.find(
      (org) => org.id === (animal ? parseInt(animal.in_shelter) : null)
    );
    return (
      <ErrorBoundary>
        <div className="main-content">
          <h1>{animal ? animal.name : null}</h1>
          <p>
            Species:{" "}
            <span className="light-text">{animal ? animal.species : null}</span>
          </p>
          <p>
            Breed:{" "}
            <span className="light-text">{animal ? animal.breed : null}</span>
          </p>
          <p>
            Color:{" "}
            <span className="light-text">{animal ? animal.color : null}</span>
          </p>
          <p>
            Age:{" "}
            <span className="light-text">{animal ? animal.age : null}</span>
          </p>
          <p>
            Gender:{" "}
            <span className="light-text">{animal ? animal.gender : null}</span>
          </p>
          {animal ? (
            <>
              <p>Description </p>
              <p>
                <span className="light-text">
                  {animal ? animal.description : null}
                </span>
              </p>
            </>
          ) : null}
          <p>
            Zip-Code:{" "}
            <span className="light-text">
              {animal ? animal.zip_code : null}
            </span>
          </p>
          <p>
            Is this animal lost?{" "}
            <span className="light-text">
              {animal ? (animal.is_lost ? "Yes" : "No") : null}
            </span>
          </p>
        </div>
      </ErrorBoundary>
    );
  }
}
