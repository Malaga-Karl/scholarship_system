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
        name: "Charity First Foundation Inc.",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 2,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc.",
        description: "Luis Co Chi Kiat Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 3,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines",
        description: "Buddhist Compassion Relief Tzu Chi Foundation Philippines is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 4,
        image: logoCharityFirst,
        name: "Charity First Foundation Inc.",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 5,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc.",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 6,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 7,
        image: logoCharityFirst,
        name: "Charity First Foundation Inc.",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 8,
        image: logoLcck,
        name: "Luis Co Chi Kiat Foundation Inc.",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
    },
    {
        id: 9,
        image: logoGreen,
        name: "Buddhist Compassion Relief Tzu Chi Foundation Philippines",
        description: "Charity First Foundation Inc. is a non-profit organization that aims to provide assistance to the less fortunate members of the society. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life. The foundation is committed to making a positive impact on the lives of the less fortunate members of the society by providing them with the necessary resources to improve their quality of life. The foundation is dedicated to helping the poor and the needy by providing them with the necessary resources to improve their quality of life."
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