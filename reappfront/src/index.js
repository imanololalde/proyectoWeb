import React from "react";
import ReactDOM from "react-dom";
import {App} from './App';
import {Auth0Provider} from '@auth0/auth0-react';

ReactDOM.render(
    <Auth0Provider domain = "dev-7zpxbcld.us.auth0.com" clientId="twv3WwGre70Nk5uC8eqZIYmcaKYY7VLT" redirectUri={window.location.origin}> 
        
        <App/> 
    </Auth0Provider> 
    , document.getElementById('root')
    );