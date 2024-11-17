import { Scholarship } from "../../components/SvScholarship";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function SpecificScholarshipTemplate({title, desc, eligibility, reqs, benefits, deadline}:Scholarship){
    return (
        <Card sx={{width:"100%"}}>
            <CardContent>
                <Button startIcon={<ArrowBack/>} sx={{backgroundColor: 'transparent', border: 'none', color: 'black', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', textTransform: 'capitalize', fontSize: '20px'}}>Go Back</Button>
                <Typography variant="h3" mt={5} mb={5}>{title}</Typography>
                <Box sx={{display:"flex", justifyContent:"start", marginLeft: '50px', marginRight: '50px', position: 'relative'}}>
                    <Box sx={{ textAlign: 'left', maxWidth: '620px', marginRight: '50px'}}>
                        <Typography variant="h4" >About {title}</Typography>
                        <Typography 
                            variant="body1" 
                            color="black" 
                            component="div" // Use "div" as the component to allow HTML rendering
                            sx={{textAlign: 'justify', textIndent: '30px'}}
                            dangerouslySetInnerHTML={{ __html: desc || '' }} 
                        />
                        <br/><br/>
                        <Typography variant="h4">Eligibility Criteria</Typography>
                        <ol>
                            {eligibility.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                        </ol>
                    </Box>
                    <Box sx={{flexDirection: 'column', width: '450px', justifyContent: 'center'}}>
                        <Box sx={{textAlign:"start", backgroundColor: '#2054BD', color: 'white', padding: '15px'}}>
                            <Typography variant="h4" sx={{marginLeft: '10px'}}><b>Requirements</b></Typography>
                            <ul>
                                {reqs.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                            </ul>
                            <Typography variant="h4" sx={{marginLeft: '10px'}}><b>Benefits</b></Typography>
                            <ul>
                                {benefits.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                            </ul>
                        </Box><br></br><br></br>
                        <Box sx={{textAlign:"start", backgroundColor: '#B71C1C', color: 'white', padding: '15px'}}>
                            <Typography variant="h4"><b>Deadline</b></Typography>
                            <Typography variant="body1">The application deadline for the {title} is until <b>{deadline}</b> only.</Typography>
                        </Box>
                    </Box>
                    <CardActions sx={{position: 'absolute', bottom: 0, right: 0}}>
                        <Button variant="contained" endIcon={<ArrowForward/>} sx={{backgroundColor: '#BF9B30', height: '56px', width: '167px', borderRadius: '10px', textTransform: 'capitalize', fontSize: '20px'}}>Apply Now</Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
}