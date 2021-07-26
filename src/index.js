import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
// Domain --> dev-qg400v4i.us.auth0.com
// Client ID --> ZddUxpOIOjAHqQPKxpXtfpFpGFBcDW7d

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qg400v4i.us.auth0.com"
      clientId="ZddUxpOIOjAHqQPKxpXtfpFpGFBcDW7d"
      redirectUri={window.location.origin}
      // add cacheLocation allows for user to stay logged in if they navigate to 
      // a 404 page accidently
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
