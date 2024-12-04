// src/authConfig.js

export const msalConfig = {
    auth: {
      clientId: 'ba5e21da-bbaf-4227-878e-8927e6e41ccb',  // Replace with your Azure AD App client ID
      authority: 'https://login.microsoftonline.com/c83f55a7-7fe8-4934-b759-09926430aef0',  // Replace with your Azure AD Tenant ID
      redirectUri: 'http://localhost:5173', // Set the redirect URI for your app
      //change the redirectUri with your base host, localhost:5173 or others hostingsitehost:69420
    },
    cache: {
      cacheLocation: 'sessionStorage', // Store tokens in session storage
      storeAuthStateInCookie: true, // Set to true for IE11 or Edge support
    },
  };
  
  export const loginRequest = {
    scopes: ['User.Read', 'Mail.Read'] // Specify the necessary permissions/scopes here
  };
  