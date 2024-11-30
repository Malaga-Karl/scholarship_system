import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';

import { Dispatch, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export type StudentActiveType = 'dashboard'|'announcements'|'contact'

type SideNavbarProps = {
    active: StudentActiveType,
    setActive: Dispatch<React.SetStateAction<StudentActiveType>>;
}

type TabType = {
    path: StudentActiveType
    page: string
    active: ReactElement
    inactive: ReactElement
}



export default function SideNavbar({active, setActive}: SideNavbarProps){

    const navigate = useNavigate()

    const handleNavigation = (path: StudentActiveType) => {
        setActive(path)
        navigate(path)
    }

    const navTabs: TabType[] = [
        {
            page:"Dashboard", 
            path:"dashboard", 
            active:<SchoolIcon/>, 
            inactive:<SchoolOutlinedIcon/>
        },
        {
            page:"Announcements", 
            path:"announcements", 
            active:<CampaignIcon/>, 
            inactive:<CampaignOutlinedIcon/>},
        {
            page:"Contact", 
            path:"contact", 
            active:<PermContactCalendarIcon/>, 
            inactive:<PermContactCalendarOutlinedIcon/>},
    ];

    console.log(active)
    return(
        <List>
          {navTabs.map((nav) => (
            <ListItem key={nav.page} className={active === nav.path ? "drawer--active" : ""}>
              <ListItemButton onClick={() => {handleNavigation(nav.path)}}>
                <ListItemIcon sx={{color:"white"}}>
                  {active === nav.path ? nav.active : nav.inactive}
                </ListItemIcon>
                <ListItemText primary={nav.page}/>     
              </ListItemButton>
            </ListItem>))} 
        </List>
    )
}