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
import { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

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

export type AdminActiveType = 'foundations'|'scholarships'|'announcements'|'applicants'|'indivscholarships'

export default function AdminTemplate() {
  
  const [active, setActive] = useState<AdminActiveType>('foundations')
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const { instance } = useMsal();
  
  //user info fetching
  useEffect(() => {
    const call = () => {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        console.log(storedUser);
        setUserInfo(JSON.parse(storedUser));
      }
    };
    call();
  }, []);

  
  //logout logic
  const handleLogout = async (): Promise<void> => {
    try {
      await instance.logoutPopup(); // Logs out and clears session
      localStorage.removeItem('userInfo'); // Clear user info from localStorage
      navigate('/signin'); // Navigate back to the login page or home
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
        }} 
        src={userInfo?.profilePictureUrl} 
        alt={`${userInfo?.displayName}'s Profile`} />

        <Typography variant='body1' mb={2}>
          Welcome,
          <br/></Typography>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>
          RGO ADMIN
        </Typography>
        <Typography variant='body1'>
          {userInfo?.mail}
        </Typography>
        <Typography variant='body1'>
          {userInfo?.mobilePhone}
        </Typography>
        {/*Removed 'cause there is no profile <Button variant='contained' endIcon={<CreateOutlinedIcon/>} sx={{backgroundColor:"rgb(191, 155, 48)", width:"70%", margin:"30px auto"}}>Update profile</Button>*/}
        <Divider sx={{backgroundColor:"rgba(255,255,255,0.6)", width:"85%", margin:"0 auto"}}/>
   
        <AdminNavbar active={active} setActive={setActive}/>

        <Divider sx={{backgroundColor: 'white'}}/>
        <Button variant='contained' sx={{width:"80%", margin:"auto auto 10px auto", backgroundColor:"rgb(183,28,28)"}} onClick={handleLogout}>Log Out</Button>
      </Drawer>
      <Box sx={{width:`calc(100vw - ${drawerWidth}px)`, flexGrow:"2"}}>
        <Outlet/>
      </Box>
    </Box>
  );
}