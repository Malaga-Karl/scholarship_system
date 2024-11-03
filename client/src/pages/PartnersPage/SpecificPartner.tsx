import Box from "@mui/material/Box";
import { FoundationProps } from "../HomePage/Foundations";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SpecificFoundation({name, image, id, description}:FoundationProps){
    return(
        <Box sx={{color:"white", height:"fill-content"}}>
            <img src={image} alt="announcement"/>
            <Typography variant="h3" color="black">{name}</Typography>
            <Typography variant="body1" color="black">{description}</Typography>
            
            <Box mt={10} pb={5} sx={{display:"flex", justifyContent:"space-around"}}>
                <Button variant="contained" color="error" onClick={() => { window.location.href = '/partners'}}>Back to Foundations</Button>
                <Button variant="contained" onClick={() => { window.location.href = '/partners/' + (Number(id) + 1); }}> Next </Button>
            </Box>
        </Box>
    );
}