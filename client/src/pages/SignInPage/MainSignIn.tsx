import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMsal } from '@azure/msal-react';
import { msalConfig, loginRequest } from '../../authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../../axiosConfig';
import SignInBackground from '../../assets/signInImage.png';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

export default function MainSignIn(): JSX.Element {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate(); // React Router navigate hook
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null); // Consider creating a specific UserInfo type
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (accounts.length > 0) {
      fetchUserProfile();
    }
  }, [accounts]);

  // Handle Microsoft login
  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      // Perform login
      const loginResponse = await instance.loginPopup(loginRequest);
      const accessToken = loginResponse.accessToken;

      // Fetch and store user info
      await fetchUserProfile(accessToken);
      // Navigate to the next page
      setError('')
      navigate('/studentview');
    } catch (error: any) {
      setError('Login failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

 // Fetch the user profile information from Microsoft Graph API
  const fetchUserProfile = async (accessToken?: string): Promise<void> => {
    try {
      if (!accessToken) {
        // Get token if not provided
        const tokenResponse = await instance.acquireTokenSilent(loginRequest);
        accessToken = tokenResponse.accessToken;
      }

      // Fetch user profile
      const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const user = graphResponse.data;

      // Fetch user profile picture
      const photoResponse = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob', // Ensure we receive the binary data
      });

      // Create a URL for the profile picture
      const profilePictureUrl = URL.createObjectURL(photoResponse.data);

      // Combine user info with profile picture URL
      const userWithPhoto = { ...user, profilePictureUrl };

      // Store user info in state and localStorage
      setUserInfo(userWithPhoto);
      localStorage.setItem('userInfo', JSON.stringify(userWithPhoto));

      try{
        const current_email = user.mail;
        const first_name = user.givenName;
        const last_name = user.surname;
        await axios.post('/user/add', { email: current_email, first_name: first_name, last_name: last_name });
      }
      catch(err:any){
        alert(err);
        setError('Error in adding user to the database: ' + (err.message || 'Unknown error'));
      }
    } catch (err: any) {
      setError('Error fetching user profile: ' + (err.message || 'Unknown error'));
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundImage: `url(${SignInBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          left: '23vw',
          alignItems: 'start',
          backgroundColor: 'rgba(255,255,255)',
          padding: '50px',
          width: '30vw',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        }}
      >
        <Box display={'flex'} flexDirection={'row'}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            Sign In :
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: '20px',
            }}
          >
            {' '}
            Using your Teams account
          </Typography>
        </Box>

        {/* Microsoft Login Button */}
        <Button
          variant="contained"
          sx={{ backgroundColor: 'rgb(0, 120, 215)' }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign in with Microsoft'}
        </Button>

        {/* Error Display */}
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
