import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function StudentViewContact(){
    return(
        <StudentViewTemplate active="contact">

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />
            <Typography variant='h1'>The fookin contact</Typography>
            </Box>
        </StudentViewTemplate>
    );
}