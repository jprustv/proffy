import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const UnauthenticatedRoute : React.FC<RouteProps> = (props) => {

  const { signed } = useContext(AuthContext)

  return (
    <Route {...props}>
      {!signed ? (
        props.children
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
}

export default UnauthenticatedRoute
