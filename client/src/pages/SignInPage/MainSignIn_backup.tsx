import React, { useState } from 'react';
// Image and MUI Imports
import SignInBackground from '../../assets/signInImage.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import { FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, CircularProgress } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import axios from '../../axiosConfig';

export default function MainSignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', server: '' });
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate form inputs
    const validateInputs = () => {
        let emailError = '';
        let passwordError = '';

        if (!email || !emailRegex.test(email)) {
            emailError = 'Please enter a valid email address.';
        }
        
        if (!password || password.length < 4) {
            passwordError = 'Password must be at least 4 characters long.';
        }

        setErrors({ ...errors, email: emailError, password: passwordError });
        return !emailError && !passwordError;
    };

    // Handle form submission with Axios and error handling
    const handleSubmit = async () => {
        console.log({email:email, pass:password});
        setErrors({ ...errors, server: '' });

        if (validateInputs()) {
            setLoading(true);
            try {
                const response = await axios.post('/user/login', { email, password });
                
                //needs to store the user informations (response.data.user{})

                if (response.data.user) {
                    //localStorage.setItem('authToken', response.data.token); //idk what this is for yet
                    localStorage.setItem('userInfo', JSON.stringify(response.data.user));

                    setEmail('');
                    setPassword('');
                    //console.log(JSON.parse(JSON.stringify(response.data.user)))
                    window.location.href = "studentview";
                }
            } catch (error) {
                // Check if error is an AxiosError and handle accordingly
                if (axios.isAxiosError(error) && error.response) {
                    const serverError = error.response.data?.message || 'An error occurred during login. Please try again.';
                    setErrors({ ...errors, server: serverError });
                } else {
                    setErrors({ ...errors, server: 'An unexpected error occurred.' });
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundImage: `url(${SignInBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                left: '23vw',
                alignItems: 'start',
                backgroundColor: 'rgba(255,255,255)',
                padding: '50px',
                width: '30vw',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)'
            }}>
                <Typography variant='h5' sx={{
                    marginBottom: '20px',
                    fontWeight: 'bold',
                }}>Sign In</Typography>

                {/* Email Field */}
                <TextField
                    variant='outlined'
                    label='Email Address'
                    sx={{ marginBottom: '20px', width: '100%' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                {/* Forgot Password Link */}
                <Link href='#' sx={{ alignSelf: "flex-end", textDecoration: 'none' }}>Forgot Password?</Link>

                {/* Password Field */}
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        
                        label="Password"
                    />
                    {errors.password && (
                        <Typography variant="body2" color="error" sx={{ textAlign:"left", mt: 1 }}>
                            {errors.password}
                        </Typography>
                    )}
                </FormControl>

                {/* Server Error Display */}
                {errors.server && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                        {errors.server}
                    </Typography>
                )}

                {/* Keep Me Signed In Checkbox */}
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label='Keep me signed in' />
                </FormGroup>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', gap: '30px' }}>
                    <Button variant='text' sx={{ color: "black" }}>Back</Button>
                    <Button
                        variant='contained'
                        sx={{ backgroundColor: "rgb(191, 155, 48)" }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

