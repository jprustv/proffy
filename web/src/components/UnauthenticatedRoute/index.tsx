import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

const UnauthenticatedRoute : React.FC<RouteProps> = (props) => {
  const isAuthenticated = false
  return (
    <Route {...props}>
      {!isAuthenticated ? (
        props.children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
}

export default UnauthenticatedRoute
