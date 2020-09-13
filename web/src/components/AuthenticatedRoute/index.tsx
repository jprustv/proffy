import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";

const AuthenticatedRoute : React.FC<RouteProps> = (props) => {
  const { pathname, search } = useLocation();
  const isAuthenticated = false
  console.log(props);
  return (
    <Route {...props}>
      {isAuthenticated ? (
        props.children
      ) : (
        <Redirect to={
          `/signin?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

export default AuthenticatedRoute
