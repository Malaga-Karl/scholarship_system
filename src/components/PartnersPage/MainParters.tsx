//MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

//Component Imports
import { boldStyle } from '../HomePage/Announcements'

//Image Imports
import logoCharityFirst from '../../assets/partners/charityFirst.png';
import logoLcck from '../../assets/partners/lcck.png';
import logoGreen from '../../assets/partners/green.png';

type Foundation = {
    image: string,
    name: string,
}

const foundations: Foundation[] = [
    {
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    },
    {
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    },
    {
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    }
    
    
]

function FoundationCard({image, name}: Foundation){
    return(
        <Card sx={{maxWidth:300, display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Box>
                <CardMedia sx={{paddingTop:"20px"}}>
                    <img src={image} alt={name + 'logo'} />
                </CardMedia>
                <CardContent>
                    <Typography variant='h5' sx={boldStyle}>{name}</Typography>
                </CardContent>
            </Box>
            <CardActions>
                <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%"}}>
                    <CardActions>
                        <CardActions>
                            <Button variant="contained" endIcon={<ArrowForwardIcon/>} size='small' sx={{
                    backgroundColor:"rgb(191, 155, 48)"}}>Know More</Button>
                        </CardActions>
                    </CardActions>
                </Box>
            </CardActions>
        </Card>
    )
}

export default function MainPartners(){
    return(
        <Box sx={{
            height:"fit-content",
            backgroundColor:"rgb(32,84,189)",
        }}>
            <Typography variant='h3' className='banner banner--lowered' sx={boldStyle}>Partners</Typography>
            <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"50px", gap:"24px", justifyItems:"center", width:"60%", marginLeft:"auto", marginRight:"auto"}}>
                {foundations.map((foundation, index) => <FoundationCard key={index} {...foundation}/>)}
            </Box>
        </Box>
    )
}