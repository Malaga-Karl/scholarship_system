// MUI Imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link'

// Image Imports
import plmLogo from '../assets/plmLogo.svg';

export default function Navbar({active}:{active:'home'|'announcements'|'partners'}){

    type NavTabs = {
        page:string,
        path:string,
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
                    <img src={plmLogo} style={{padding:"10px"}}/>
                    <Box sx={{width:"40vw", display:"flex", justifyContent:"space-around"}}>    
                        {navTabs.map((tab, index) =><Link underline="none" href={"/"+tab.path} key={index} className={active === tab.path ? "nav--active" : ""} sx={{fontWeight:"bold"}} color={active === tab.path ? "error" : ""}>{tab.page} </Link>)}
                        <Button variant="contained" sx={{backgroundColor:"rgb(191, 155, 48)"}}>Sign In</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}