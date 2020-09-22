import React, { Component } from "react";
import "./Animals.css";
import "../../index.css";

import Animal from "../Animal/Animal";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";

export default class Animals extends Component {
  static contextType = ApiContext;

  render() {
    const { globalAnimals = [] } = this.context;

    return (
      <div className="animal-content">
        <ErrorBoundary>
          <div className="animals-main">
            <h1>Animals</h1>
            <NavLink to="/create-animal" className="add-button">
              <button>Add an Animal!</button>
            </NavLink>
            {globalAnimals.map((animal) => (
              <Animal
                id={animal.id}
                key={animal.id}
                name={animal.name}
                species={animal.species}
                breed={animal.breed}
                color={animal.color}
                age={animal.age}
                gender={animal.gender}
                description={animal.description}
                zip_code={animal.zip_code}
                is_lost={animal.is_lost ? "Yes" : "No"}
                in_shelter={animal.in_shelter ? "Yes" : "No"}
              />
            ))}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
