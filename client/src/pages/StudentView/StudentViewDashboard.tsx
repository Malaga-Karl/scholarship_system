import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import imgCharityFirst from "../../assets/partners/charityFirst.png"

export default function StudentViewDashboard(){
    type DashboardReturn = {
        image:String,
        foundationName: String,
        requirements: String,
        benefits: String,
        deadline: String,
    }
    const dashboardReturn: DashboardReturn = {
        image:imgCharityFirst,
        foundationName:"Charity First Foundation",
        requirements:"just do it",
        benefits:"u study with money",
        deadline:"tomorrow, dumbass"
    }

    return(
        <StudentViewTemplate active="dashboard">
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />
            <Typography variant='h1'>Dashboard</Typography>
            </Box>
        </StudentViewTemplate>
    );
}