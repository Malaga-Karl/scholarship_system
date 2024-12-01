// MUI Imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

// Image Imports
import plmLogo from '../assets/plmLogo.svg';
import Colors from '../colors';

type ActiveType = 'home'|'announcements'|'partners' | 'signin'

type NavbarProps = {
    active: ActiveType,
    setActive: Dispatch<React.SetStateAction<ActiveType>>;
}

export default function Navbar({active, setActive}: NavbarProps){

    const navigate = useNavigate()

    const handleNavigation = (path: ActiveType) => {
        setActive(path)
        navigate(path)
    }

    type NavTabs = {
        page:string,
        path:ActiveType,
    }
    const navTabs:NavTabs[]= [
        {page:"Home", path:"home"},
        {page:"Announcements", path:"announcements"},
        {page:"Partnered Foundations", path:"partners"},
    ]
    return(
        <>
            <AppBar elevation={1} position="sticky" sx={{
                width:"100vw",
                overflow:"hidden",
            }}>
                <Toolbar variant="regular" sx={{backgroundColor:"white", justifyContent:"space-between"}}>
                    <img src={plmLogo} style={{padding:"10px", marginLeft:"5%"}}/>
                    <Box sx={{width:"40vw", display:"flex", justifyContent:"space-around", marginRight:"5%"}}>    
                        {navTabs.map((tab, index) => <Button color={active === tab.path ? "error": "inherit"} sx={{fontWeight:"bold", color: active === tab.path ? "error.main" : "black"}} variant='text' key={index} onClick={() => handleNavigation(tab.path)}>{tab.page} </Button>)}
                        {/* conditional render */}
                        {active !== 'signin' && (
                            <Button 
                                variant="contained" 
                                sx={{backgroundColor:Colors.gold}} 
                                onClick={()=>handleNavigation('signin')}
                            >
                                Sign In
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}