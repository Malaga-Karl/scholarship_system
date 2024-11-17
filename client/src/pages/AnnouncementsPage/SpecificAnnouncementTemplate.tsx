import Box from "@mui/material/Box";
import { NewsProps } from "../HomePage/Announcements";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function AnnouncementTemplate({title, date, image, content, desc, content2, content3, content4, id}:NewsProps){
    return(
    <Box component="section" sx={{backgroundColor:"goldenrod"}}>
        <Typography variant="h5" sx={{color:"white", textAlign:"left", paddingLeft: 18, paddingTop: 2, paddingBottom: 2}}>{date}</Typography>
        <Box sx={{backgroundColor:"white", color:"black", height:"fill-content"}}>
            <Typography variant="h1" sx={{fontWeight: 'medium', textAlign: "left", paddingLeft: 18}}>{title}</Typography>
            <img src={image} alt="announcement" style={{width: 500}}/>
            <Typography variant="h4" sx={{textAlign: "left", paddingLeft: 18, paddingRight: 20}}>{content}</Typography>
            <br></br>
            <ol>
                {desc?.map((item) => <li><Typography variant="h4" sx={{textAlign: "left"}}>{item}</Typography></li>)}
            </ol>
            <br></br>
            <Typography variant="h4" sx={{textAlign: "left", paddingLeft: 18, paddingRight: 20}}>{content2}</Typography>
            <br></br>
            <br></br>
            <Typography variant="h4" sx={{textAlign: "left", paddingLeft: 18, paddingRight: 20}}>{content3}</Typography>
            <br></br>
            <br></br>
            <Typography variant="h4" sx={{textAlign: "left", paddingLeft: 18, paddingRight: 20}}>{content4}</Typography>



            <Box mt={10} pb={5} sx={{display:"flex", justifyContent:"space-around"}}>
                <Button variant="contained" color="error" onClick={() => window.location.href = '/announcements'}>Back to Announcements</Button>
                <Button variant="contained" onClick={() => { window.location.href = '/announcements/' + (Number(id) + 1); }}> Next </Button>
            </Box>
        </Box>
    </Box>
    );
}