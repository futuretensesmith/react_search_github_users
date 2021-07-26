import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  //  Router is basically a nav bar.  Components gets rendered between <Route></Route> component 
  //     you can call the path whatever you want. it's the component that is important 
  //     use exact={true} so that the home page renders only if it is the exact path. If you don't Dashboard 
  //     will show up for each page. Wrap your Routes in the Switch so that the error Route with  path='*' 
  //     doesn't catch your existing Routes 

  // ****** If deployed to Netlify you must have a _redirects file in the public folder
  // ****** with this code-->    /index.html   200
  return (<AuthWrapper>
    <Router>
      <Switch>
        <PrivateRoute path='/' exact={true}>
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  </AuthWrapper>
  );
}

export default App;
