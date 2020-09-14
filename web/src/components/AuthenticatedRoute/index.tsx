import React, { useContext } from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const AuthenticatedRoute : React.FC<RouteProps> = (props) => {
  const { pathname, search } = useLocation();
  const { signed } = useContext(AuthContext)

  return (
    <Route {...props}>
      {signed ? (
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
