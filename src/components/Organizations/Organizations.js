import React, { Component } from "react";
import "./Organizations.css";

import Organization from "../Organization/Organization";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";

export default class Organizations extends Component {
  static contextType = ApiContext;

  render() {
    const { globalOrganizations = [] } = this.context;
    return (
      <div className="org-content">
        <ErrorBoundary>
          <h1>Organizations</h1>
          <NavLink to="/create-organization" className="add-button">
            <button>Create an Organization</button>
          </NavLink>
          {globalOrganizations.map((org) => (
            <Organization
              id={org.id}
              key={org.id}
              name={org.name}
              zip_code={org.zip_code}
              description={org.description}
              type={org.type}
              address={org.address}
              website={org.website}
              phone_number={org.phone_number}
            />
          ))}
        </ErrorBoundary>
      </div>
    );
  }
}
