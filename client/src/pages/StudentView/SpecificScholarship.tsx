import { Scholarship } from "../../components/SvScholarship";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useHref, useNavigate } from "react-router-dom";

export default function SpecificScholarshipTemplate({id, sID, title, desc, eligibility, reqs, benefits, deadline}:Scholarship){
    const navigate = useNavigate();

    // Calculate the difference in days
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const differenceInDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let deadlineBackroundColor = "rgba(0, 0, 0, 1)";
    if (differenceInDays <= 5) 
        deadlineBackroundColor = "rgba(255, 0, 0, 1)"; // Red shadow (5 days or less)
    else if (differenceInDays <= 10) 
        deadlineBackroundColor = "rgba(255, 100, 0, 1)"; // Yellow shadow (6 to 7 days)
    else 
        deadlineBackroundColor = "rgba(0, 0, 255, 1)"; // Blue shadow (more than 7 days)
    

    return (
        <Card sx={{width:"100%"}}>
            <CardContent>
                <Button
                    onClick={()=>{navigate(-1)}} 
                startIcon={<ArrowBack/>} sx={{backgroundColor: 'transparent', border: 'none', color: 'black', display: 'flex', justifyContent: 'space-between', marginLeft: '50px', textTransform: 'capitalize', fontSize: '20px'}}>Go Back</Button>
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
                        <Box sx={{textAlign:"start", backgroundColor: `${deadlineBackroundColor}`, color: 'white', padding: '15px'}}>
                            <Typography variant="h4"><b>Deadline</b></Typography>
                            <Typography variant="body1">The application deadline for the {title} is until <b>{deadline}</b> only.</Typography>
                        </Box>
                    </Box>
                    <CardActions sx={{position: 'absolute', bottom: 0, right: 0}}>
                        <Button variant="contained" endIcon={<ArrowForward/>} sx={{backgroundColor: '#BF9B30', height: '56px', width: '167px', borderRadius: '10px', textTransform: 'capitalize', fontSize: '20px'}} onClick={() => navigate(`forms/${sID}`)}>Apply Now</Button>
                    </CardActions>
                </Box>
            </CardContent>
        </Card>
    );
}