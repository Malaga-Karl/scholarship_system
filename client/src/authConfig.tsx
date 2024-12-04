// src/authConfig.js

export const msalConfig = {
    auth: {
      clientId: 'ba5e21da-bbaf-4227-878e-8927e6e41ccb',  // Replace with your Azure AD App client ID
      authority: 'https://login.microsoftonline.com/c83f55a7-7fe8-4934-b759-09926430aef0',  // Replace with your Azure AD Tenant ID
      redirectUri: 'http://localhost', // Set the redirect URI for your app
    },
    cache: {
      cacheLocation: 'sessionStorage', // Store tokens in session storage
      storeAuthStateInCookie: true, // Set to true for IE11 or Edge support
    },
  };
  
  export const loginRequest = {
    scopes: ['User.Read', 'Mail.Read'] // Specify the necessary permissions/scopes here
  };
  