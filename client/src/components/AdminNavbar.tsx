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
import Person2Icon from '@mui/icons-material/Person2';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';

import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';

import { Dispatch, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export type AdminActiveType = 'foundations'|'scholarships'|'announcements'|'applicants'|'indivscholarships'|'allemails'
type AdminNavbarProps = {
    active: AdminActiveType,
    setActive: Dispatch<React.SetStateAction<AdminActiveType>>;
}

type TabType = {
    path: AdminActiveType
    page: string
    active: ReactElement
    inactive: ReactElement
}



export default function AdminNavbar({active, setActive}: AdminNavbarProps){

    const navigate = useNavigate()

    const handleNavigation = (path: AdminActiveType) => {
        setActive(path)
        navigate(path)
    }

    const navTabs: TabType[] = [
    {
        page:"Partnered Foundations", 
        path:"foundations", 
        active:<SchoolIcon/>, 
        inactive:<SchoolOutlinedIcon/>
    },
    {
        page:"Scholarships", 
        path:"scholarships", 
        active:<CampaignIcon/>, 
        inactive:<CampaignOutlinedIcon/>
    },
    {
        page:"IndivScholarships", 
        path:"indivscholarships", 
        active:<Person2Icon/>, 
        inactive:<Person3OutlinedIcon/>
    },
    {
        page:"Announcements", 
        path:"announcements", 
        active:<PermContactCalendarIcon/>, 
        inactive:<PermContactCalendarOutlinedIcon/>
    },
    {
        page:"Applicants", 
        path:"applicants", 
        active:<PermContactCalendarIcon/>, 
        inactive:<PermContactCalendarOutlinedIcon/>
    },
    {
        page:"Emails", 
        path:"allemails", 
        active:<MarkEmailUnreadIcon/>, 
        inactive:<MarkEmailUnreadOutlinedIcon/>
    },
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