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
import {FoundationProps} from '../HomePage/Foundations'
import { useParams } from 'react-router-dom'
import SpecificFoundation from './SpecificPartner'

const foundations: FoundationProps[] = [
    {
        id: 1,
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        id: 2,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        id: 3,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    },
    {
        id: 4,
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        id: 5,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        id: 6,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    },
    {
        id: 7,
        image: logoCharityFirst,
        name: "Charity First Foundation Inc."
    },
    {
        id: 8,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc."
    },
    {
        id: 9,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines"
    }
    
    
]

function FoundationCard({image, name, id}: FoundationProps){
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
                    backgroundColor:"rgb(191, 155, 48)"}} onClick={() => {window.location.href="/partners/" + id}}>Know More</Button>
                        </CardActions>
                    </CardActions>
                </Box>
            </CardActions>
        </Card>
    )
}

export default function MainPartners(){
    const {id} = useParams();

    const specificFoundation = id ? foundations.find((foundation) => foundation.id === parseInt(id)) : null;
    return(
        <>
            {id ?(
                <>
                    {specificFoundation ? (
                        <SpecificFoundation {...specificFoundation}/>
                    ) : (
                        <Typography variant='h3'>There is no foundation like that. u trippin homie</Typography>
                    )}
                </>
            ) : (
                <Box sx={{
                    height:"fit-content",
                    backgroundColor:"rgb(32,84,189)",
                }}>
                    <Typography variant='h3' className='banner banner--lowered' sx={boldStyle}>Partners</Typography>
                    <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", padding:"50px", gap:"24px", justifyItems:"center", width:"60%", marginLeft:"auto", marginRight:"auto"}}>
                        {foundations.map((foundation, index) => <FoundationCard key={index} {...foundation}/>)}
                    </Box>
                </Box>
            )}
        </>
    )
}