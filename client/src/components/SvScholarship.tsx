import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export type Scholarship ={
    image: string,
    title: string,
    slots: number,
    deadline: string,
}

export default function SvScholarship({image, title, slots, deadline}:Scholarship) {
    return (
        <Card variant='outlined' sx={{width:"20vw"}}>
            <CardMedia sx={{height:"100px", width:"100%"}} image={image} />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                <Box>
                    <Typography variant="body1">Slots: {slots}</Typography>
                    <Typography variant="body1">Deadline: {deadline}</Typography>
                </Box>
                <Button variant="contained">Apply</Button>
            </CardActions>
        </Card>
    );

}