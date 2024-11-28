// msalConfig.tsx

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './authConfig'; // Ensure msalConfig has your MSAL configuration

export const msalInstance = new PublicClientApplication(msalConfig);