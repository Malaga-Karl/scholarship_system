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

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex'}}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Scholarships
          </Typography>
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
        {/* <Divider /> */}
        <Typography variant='body1' mb={2}>Welcome,</Typography>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>Juan Dela Cruz</Typography>
        <Typography variant='body1'>2021-00000</Typography>
        <Typography variant='body1'>BS Computer Science</Typography>
        <Button variant='contained' endIcon={<CreateOutlinedIcon/>} sx={{backgroundColor:"rgb(191, 155, 48)", width:"70%", margin:"30px auto"}}>Update profile</Button>
        <Divider sx={{backgroundColor:"rgba(255,255,255,0.6)", width:"85%", margin:"0 auto"}}/>
   
        <List>
          {['Dashboard', 'Scholarship', 'Announcements', 'Contact RGO'].map((text) => (
            <ListItem key={text}>
              <ListItemButton >{text}</ListItemButton>
            </ListItem>))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
       <Typography variant='h1'>There are currently no available scholarship offers 😞</Typography>
       <Typography variant='body1' mt={5}>Please come back later or contact the RGO Admin for more information</Typography>
      </Box>
    </Box>
  );
}