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
import SpecificFoundation from './SpecificPartner'

//Image Imports
import {FoundationProps} from '../HomePage/Foundations'
import { useParams } from 'react-router-dom'

import SpecificFoundation from './SpecificPartner'
import { useEffect, useState } from 'react'
import axios from 'axios'

function FoundationCard({image, name, id}: FoundationProps){
    return(
        <Card sx={{maxWidth:300, minWidth:300 , display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Box>
                <CardMedia sx={{paddingTop:"20px"}}>
                    <img src={image} style={{maxWidth:"250px", padding:"10px"}} alt={name + 'logo'} />
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


type FoundationData = {
    id: number;
    name: string;
    image: string;
    description: string;
};

export default function MainPartners(){
    const {id} = useParams();

    const [foundations, setFoundations] = useState<FoundationData[]>([]);

    useEffect(() => {
        async function fetchAllFoundations() {
            try {
                const response = await axios.get('http://localhost:3001/foundations/getall');
                const getFoundations = response.data.map((foundation: { foundation_id: number; name: string; logo_path: string; description:string }) => ({
                    id: foundation.foundation_id,
                    name: foundation.name,
                    image: `http://localhost:3001/uploads${foundation.logo_path}`,
                    description: foundation.description,
                }));
                setFoundations(getFoundations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAllFoundations();
    }, []);

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