import { Scholarship } from "../../components/SvScholarship";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function SpecificScholarshipTemplate({title, desc, eligibility, reqs, benefits, deadline}:Scholarship){
    return (
        <Card sx={{width:"90%", justifySelf:"center"}}>
            <CardContent>

                <Typography variant="h3" mb={10}>{title}</Typography>
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    <Box  sx={{textAlign:"start"}}>
                        <Typography variant="h4">About {title}</Typography>
                        <Typography variant="body1">{desc}</Typography>
                        <br/><br/>
                        <Typography variant="h4">Eligibility Criteria</Typography>
                        <ol>
                            {eligibility.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                        </ol>
                    </Box>
                    <Box  sx={{textAlign:"start"}}>
                        <Typography variant="h4">Requirements</Typography>
                        <ul>
                            {reqs.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                        </ul>
                        <Typography variant="h4">Benefits</Typography>
                        <ul>
                            {benefits.map((item) => <li><Typography variant="body1">{item}</Typography></li>)}
                        </ul>

                        <Typography variant="h4">Deadline</Typography>
                        <Typography variant="body1">{deadline}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"end"}}>
                <Button variant="contained">Apply Now</Button>
            </CardActions>
        </Card>
    )
}