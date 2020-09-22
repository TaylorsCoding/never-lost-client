import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

export default function Organization(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/organizations/${props.id}`}>
        <h1>Name: {props.name}</h1>
      </NavLink>
      <p>Type: {props.type}</p>
      <p>Description: {props.description}</p>
      <p>Address: {props.address}</p>
      <p>Website: {props.website}</p>
      <p>Phone Number: {props.phone_number}</p>
    </ErrorBoundary>
  );
}
