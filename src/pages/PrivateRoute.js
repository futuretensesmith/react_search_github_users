import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// Dashboard is a child of PrivateRoute. we're collecting rest of props values
//  grabbing all the props set up on private route and spreading them out 
// placing them on route we are returning:/
// if isUser is true. display the dashboard. if not Redirect to login.
const PrivateRoute = ({ children, ...rest }) => {
  // login in was buggy because I forgot to invoke the useAuth0() function
  // had it written as useAuth0 !!!
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to='/login'> </Redirect>;
      }}
    ></Route>);
};
export default PrivateRoute;
