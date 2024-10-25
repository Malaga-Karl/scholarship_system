import Box from "@mui/material/Box";
import { NewsProps } from "../HomePage/Announcements";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AnnouncementTemplate({title, date, image, content, id}:NewsProps){
    return(
        <Box sx={{color:"white", height:"fill-content"}}>
            <img src={image} alt="announcement"/>
            <Typography variant="h3">{title}</Typography>
            <Typography variant="h5">{date}</Typography>
            <Typography variant="body1">{content}</Typography>
            
            <Box mt={10} pb={5} sx={{display:"flex", justifyContent:"space-around"}}>
                <Button variant="contained" color="error">Back to Announcements</Button>
                <Button variant="contained" onClick={() => { window.location.href = '/announcements/' + (Number(id) + 1); }}> Next </Button>
            </Box>
        </Box>
    );
}