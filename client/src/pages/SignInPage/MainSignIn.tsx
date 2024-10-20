//Image Imports
import SignInBackground from '../../assets/signInImage.png';

//MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import { FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

export default function MainSignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return(
        <>
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
                    {/* <Typography variant='body1'>Email Address</Typography> */}
                    <TextField variant='outlined' label='Email Address' sx={{
                        marginBottom: '20px',
                        width: '100%',
                    }}/>
                    <Link href='partners' sx={{alignSelf:"flex-end", textDecoration:'none'}}>Forgot Password?</Link>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox/>} label='Keep me signed in'/>
                    </FormGroup>

                    <Box sx={{display:'flex', justifyContent:'end', width:'100%', gap:'30px'}}>
                        <Button variant='text' sx={{color:"black"}}>Back</Button>
                        <Button variant='contained' sx={{backgroundColor:"rgb(191, 155, 48)"}} onClick={()=>window.location.href="studentview"}>Next</Button>
                    </Box>
                </Box>
            </Box>  
        </>
    )
}