import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

export default function Animal(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/animals/${props.id}`}>
        <h3>Name: {props.name}</h3>
      </NavLink>
      <p>Species: {props.species}</p>
      <p>Breed: {props.breed}</p>
      <p>Color: {props.color}</p>
      <p>Age: {props.age}</p>
      <p>Gender: {props.gender}</p>
      <p>Description: {props.description}</p>
      <p>Zip Code:{props.zip_code}</p>
      <p>Is this animal lost? {props.is_lost}</p>
    </ErrorBoundary>
  );
}
