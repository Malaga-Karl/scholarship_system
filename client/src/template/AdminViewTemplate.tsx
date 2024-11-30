import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AlvinKalbo from '../assets/albinkalbo.jpg';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';


import logoPLM from '../assets/footerLogos/plm_iconlogo.png';
import { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 300;

function CustomDrawerNav(){
    return (
        <>
            <Box sx={{display:"flex", justifyContent:"space-between", padding:"20px"}}>
                <IconButton>
                    <SettingsOutlinedIcon sx={{color:"white"}}/>
                </IconButton>
                <IconButton>
                    <NotificationsNoneOutlinedIcon sx={{color:"white"}}/>
                </IconButton>
            </Box>
        </>
    )
}

export type AdminActiveType = 'foundations'|'scholarships'|'announcements'|'applicants'

export default function AdminTemplate() {
  
  const [active, setActive] = useState<AdminActiveType>('foundations')
  
  return (
    <Box sx={{ display: 'flex'}}>
    {/* <Box> */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor:"white" }}
      >
        <Toolbar>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <img src={logoPLM} alt="plmlogo" width={60} />
            <Typography variant='h4' ml={3} sx={{color:"black", fontWeight:"bold"}}>PLM Scholarship System</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"rgb(32,84,189)",
            color:"white",
          },
          
        }}
        variant="permanent"
        anchor="left"
      >
        <CustomDrawerNav/>
        <Avatar sx={{
            width: 100,
            height: 100,
            margin:"0 auto",
            marginBottom: "30px"
        }} src={AlvinKalbo}/>

        <Typography variant='body1' mb={2}>Welcome,</Typography>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>Juan Dela Cruz</Typography>
        <Typography variant='body1'>2021-00000</Typography>
        <Typography variant='body1'>BS Computer Science</Typography>
        <Button variant='contained' endIcon={<CreateOutlinedIcon/>} sx={{backgroundColor:"rgb(191, 155, 48)", width:"70%", margin:"30px auto"}}>Update profile</Button>
        <Divider sx={{backgroundColor:"rgba(255,255,255,0.6)", width:"85%", margin:"0 auto"}}/>
   
        <AdminNavbar active={active} setActive={setActive}/>

        <Divider sx={{backgroundColor: 'white'}}/>
        <Button variant='contained' sx={{width:"80%", margin:"auto auto 10px auto", backgroundColor:"rgb(183,28,28)"}}>Log Out</Button>
      </Drawer>
      <Box sx={{width:`calc(100vw - ${drawerWidth}px)`, flexGrow:"2"}}>
        <Outlet/>
      </Box>
    </Box>
  );
}