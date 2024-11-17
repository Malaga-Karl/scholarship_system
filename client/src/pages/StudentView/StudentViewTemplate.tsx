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
import AlvinKalbo from '../../assets/albinkalbo.jpg';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';

import logoPLM from '../../assets/footerLogos/plm_iconlogo.png';

const drawerWidth = 300;

        {/*needs to get user credetials, will do later/////////////////////////////////////////////////////////////////////////////////*/}

const navTabs = [
    {page:"Dashboard", path:"dashboard", active:<SchoolIcon/>, inactive:<SchoolOutlinedIcon/>},
    {page:"Announcements", path:"announcements", active:<CampaignIcon/>, inactive:<CampaignOutlinedIcon/>},
    {page:"Contact", path:"contact", active:<PermContactCalendarIcon/>, inactive:<PermContactCalendarOutlinedIcon/>},
];



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

type StudentViewTemplateProps = {
  active: 'dashboard' | 'scholarship' | 'announcements' | 'contact';
  children: React.ReactNode;
};

export default function StudentViewTemplate({active, children}:StudentViewTemplateProps) {
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
   
        <List>
          {navTabs.map((nav) => (
            <ListItem key={nav.page} className={active === nav.path ? "drawer--active" : ""}>
              <ListItemButton href={"/studentview/"+nav.path}>
                   {nav.page}
                  </ListItemButton>
            </ListItem>))}
        </List>

        <Divider sx={{backgroundColor: 'white'}}/>
        {/*Needs to have a logout logic, will do later/////////////////////////////////////////////////////////////////////////////////*/}
        <Button variant='contained' sx={{width:"80%", margin:"auto auto 10px auto", backgroundColor:"rgb(183,28,28)"}} onClick={() => {window.location.href="../signin"}}>Log Out</Button>
      </Drawer>
      <Box sx={{width:`calc(100vw - ${drawerWidth}px)`, flexGrow:"2"}}>
        {children}
      </Box>
    </Box>
  );
}