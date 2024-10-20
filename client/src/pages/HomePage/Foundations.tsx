// MUI Imports
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//Image Imports
import logoCharityFirst from '../../assets/partners/charityFirst.png';
import logoLcck from '../../assets/partners/lcck.png';
import logoGreen from '../../assets/partners/green.png';

//Style Imports
import { boldStyle } from './Announcements';

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
    }
]

function FoundationCard({image, name}: Foundation){
    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"300px"}}>
            <img src={image} style={{scale:1.5}}/>
            <Typography variant='body1' sx={boldStyle}>{name}</Typography>
        </div>
    )
}

export default function Foundations(){
    return(
        <div style={{backgroundColor:"rgb(32,84,189)", height:"fit-content", color:"white"}}>
            <Typography variant='h3' className='banner' sx={boldStyle}>Our Partnered Foundations</Typography>
            <Container sx={{display:"flex", alignItems:"center", padding:"50px", justifyContent:"space-around"}}>
                <ArrowBackIosIcon/>
                {foundations.map((foundation, index) => <FoundationCard key={index} {...foundation}/>)}
                <ArrowForwardIosIcon/>
            </Container>
        </div>
    )
}