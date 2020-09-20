import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

export default function EventComponent(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/event/${props.id}`}>
        <h3>Title: {props.title}</h3>
      </NavLink>
      <p>Zip Code: {props.zip_code}</p>
      <p>Type: {props.type}</p>
      <p>Description: {props.description}</p>
      <p>Animal (optional): {props.animal_id}</p>
      <p>Organization (optional): {props.org_id}</p>
      <p>Date Published: {props.date_published}</p>
    </ErrorBoundary>
  );
}
