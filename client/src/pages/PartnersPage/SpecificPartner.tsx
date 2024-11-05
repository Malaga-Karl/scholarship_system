import Box from "@mui/material/Box";
import { FoundationProps } from "../HomePage/Foundations";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ArrowBack, ArrowForward} from "@mui/icons-material";

export default function SpecificFoundation({name, image, id, description}:FoundationProps){
    return(
        <Box sx={{color:"white", height:"fill-content"}}>
            <Box sx={{height: '60px', backgroundColor: '#bf9b30'}}/>
            <Typography variant="h3" color="black" style={{marginTop: '30px', marginBottom: '50px'}}>{name}</Typography>
            <img src={image} style={{width: '35%', height: 'auto'}} alt="announcement"/>
            {/* <Typography variant="body1" color="black" style={{textAlign: 'justify', marginLeft: '200px', marginRight: '200px', marginTop: '50px'}}>{description}</Typography> */}
            <Box sx={{ textAlign: 'justify', margin: '20px auto', maxWidth: '800px' }}>
                <Typography 
                    variant="body1" 
                    color="black" 
                    component="div" // Use "div" as the component to allow HTML rendering
                    dangerouslySetInnerHTML={{ __html: description || '' }} 
                />
            </Box>
            <Box mt={10} pb={5} sx={{display:"flex", justifyContent:"space-around"}}>
                <Button variant="contained" color="error" onClick={() => { window.location.href = '/partners'}} startIcon={<ArrowBack/>}>Back to Foundations</Button>
                <Button variant="contained" onClick={() => { window.location.href = '/partners/' + (Number(id) + 1); }} endIcon={<ArrowForward/>}> Next </Button>
            </Box>
            {/* <Divider sx={{marginTop: 1, BorderColor: 'gray', BorderWidth: 1}}/> */}
            <hr/>
        </Box>
    );
}