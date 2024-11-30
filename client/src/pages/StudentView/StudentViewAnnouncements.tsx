import Box from "@mui/material/Box";
import StudentViewTemplate from "../../template/StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function StudentViewAnnouncments(){
    return(
        <>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />
            <Typography variant='h1'>Announcments</Typography>
            </Box>
        </>
    );
}