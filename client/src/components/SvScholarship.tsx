import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export type Scholarship ={
    id: number,
    sID:number,
    image: string,
    title: string,
    slots: number,
    deadline: string,
    desc :string
    eligibility :string[],
    accepted_count:number,
    reqs : string[],
    benefits: string[],
}

export default function SvScholarship({id, accepted_count, sID, image, title, slots, deadline}:Scholarship) {
    const navigate = useNavigate();


    // Calculate the difference in days
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const differenceInDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Determine the box shadow color based on the deadline
    let boxShadowColor = "rgba(0, 0, 0, 1)"; // Default color (black)
    let textColor = "success"; // Default color (black)

    if (differenceInDays <= 5) {
        boxShadowColor = "rgba(255, 0, 0, 1)"; // Red shadow (5 days or less)
        textColor = "error"; // Default color (black)
    } else if (differenceInDays <= 10) {
        boxShadowColor = "rgba(255, 100, 0, 1)"; // Yellow shadow (6 to 7 days)
        textColor = "warning"; // Default color (black)
    } else {
        boxShadowColor = "rgba(0, 0, 255, 1)"; // Blue shadow (more than 7 days)
        textColor = "success"; // Default color (black)
    }
    console.log(accepted_count);
    return (
        <Card variant='outlined' sx={{width:"20vw", boxShadow: `0px 0px 20px ${boxShadowColor}`}}>
            <CardMedia sx={{height:"100px", width:"100%"}} image={image} />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                <Box sx={{textAlign:"start"}}>
                    <Typography variant="body1">Available Slots: {Number(slots) - accepted_count}</Typography>
                    <Typography variant="body1"
                        color={textColor}
                    >Deadline: {deadline}</Typography>
                </Box>
                <Button variant="contained" onClick={()=>{navigate(`apply/${id}`)}}>Apply</Button>
            </CardActions>
        </Card>
    );

}