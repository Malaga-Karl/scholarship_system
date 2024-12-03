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
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SideNavbar, { StudentActiveType } from '../components/StudentNavbar';

import logoPLM from '../assets/footerLogos/plm_iconlogo.png';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';


//add error for when being accessed directly

const drawerWidth = 300;

        {/*needs to get user credetials, will do later/////////////////////////////////////////////////////////////////////////////////*/}


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

// type StudentViewTemplateProps = {
//   active: 'dashboard' | 'scholarship' | 'announcements' | 'contact';
// };
// const storedData = localStorage.getItem('userInfo') ?? '';
// let userID:{ user_id:string, email:string } = {user_id:'', email:''};
// if (storedData) {
//   userID = JSON.parse(storedData);
//   console.log(userID);
// }
// const formatNumber = (num:number) => {
//   const numStr = num.toString(); // Convert to string if it's not already
//   const year = numStr.slice(0, 4); // First 4 digits
//   const rest = numStr.slice(4);    // Remaining digits
//   return `${year}-${rest}`;
// };



export default function  StudentViewTemplate() {
  const [active, setActive] = useState<StudentActiveType>('dashboard')
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const { instance } = useMsal();

  useEffect(() => {
    const call = () => {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        //console.log(storedUser);
        localStorage.setItem('localEmailActive', JSON.parse(storedUser).mail);
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
        {/* Thhe student information! */}
        <Avatar sx={{
            width: 100,
            height: 100,
            margin:"0 auto",
            marginBottom: "30px"
        }} 
          src={userInfo?.profilePictureUrl} 
          alt={`${userInfo?.displayName}'s Profile`} 
        />
        {/* needs to add a course and department */}
        <Typography variant='body1' mb={2}>Welcome,<br/></Typography>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>
          {userInfo?.displayName}
        </Typography>
        <Typography variant='body1'>
          {userInfo?.mail}
        </Typography>
        <Typography variant='body1'>
          {userInfo?.mobilePhone}
        </Typography>


        <Button variant='contained' endIcon={<CreateOutlinedIcon/>} sx={{backgroundColor:"rgb(191, 155, 48)", width:"70%", margin:"30px auto"}}>Update profile</Button>
        <Divider sx={{backgroundColor:"rgba(255,255,255,0.6)", width:"85%", margin:"0 auto"}}/>
   
        <SideNavbar active={active} setActive={setActive}/>

        <Divider sx={{backgroundColor: 'white'}}/>
        {/*Needs to have a logout logic, will do later/////////////////////////////////////////////////////////////////////////////////*/}
        <Button variant='contained' sx={{width:"80%", margin:"auto auto 10px auto", backgroundColor:"rgb(183,28,28)"}} 
        onClick={handleLogout}>Log Out</Button>
      </Drawer>
      <Box sx={{width:`calc(100vw - ${drawerWidth}px)`, flexGrow:"2"}}>
        <Outlet/>
      </Box>
    </Box>
  );
}