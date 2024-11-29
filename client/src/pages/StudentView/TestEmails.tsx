import { useState, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import axios from 'axios';
import { loginRequest } from '../../authConfig'; // Import your MSAL login request
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material'; // Import CircularProgress


export default function StudentViewContact() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { instance } = useMsal(); // Get MSAL instance
  const isAuthenticated = useIsAuthenticated(); // Check if the user is authenticated

  const fetchAccessToken = async (): Promise<string> => {
    if (accessToken) return accessToken; // Use cached token if available

    if (!isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    try {
      const tokenResponse = await instance.acquireTokenSilent(loginRequest);
      const newAccessToken = tokenResponse.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (err: any) {
      throw new Error('Error acquiring access token: ' + (err.message || 'Unknown error'));
    }
  };

  const fetchEmails = async (): Promise<void> => {
    try {
      setLoading(true); // Set loading to true when starting to fetch
      if (!instance) {
        throw new Error('MSAL instance is not available.');
      }

      const token = await fetchAccessToken();
      const emailResponse = await axios.get('https://graph.microsoft.com/v1.0/me/messages?$top=100', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmails(emailResponse.data.value);
    } catch (err: any) {
      setEmails([]); // Reset emails in case of error
    } finally {
      setLoading(false); // Set loading to false once the process is complete
    }
  };

  useEffect(() => {
    if (instance && isAuthenticated) {
      fetchEmails(); // Only call fetchEmails when MSAL instance is ready and user is authenticated
    }
  }, [instance, isAuthenticated]); // This will run when `instance` is ready and user is authenticated

  return (
    <Box>
      <Typography variant="h6">Emails</Typography>
      
      {loading ? ( // Show loading indicator when fetching emails
        <CircularProgress />
      ) : (
        <>
          {emails.length === 0 && !loading && ( // Show a message when no emails are fetched
            <Typography>No emails found</Typography>
          )}
          {emails.map((email: any) => (
            <Paper key={email.id}>
              <Typography>{email.subject}</Typography>
            </Paper>
          ))}
        </>
      )}

      {/* You can optionally add a button to re-fetch emails */}
      {!loading && !emails.length && <Button onClick={fetchEmails}>Fetch Emails</Button>}
    </Box>
  );
}
