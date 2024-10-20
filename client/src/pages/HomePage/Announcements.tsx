// MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

//Image Imports
import newsPlmScholar from '../../assets/announcements/plmscholar.png'
import newsDostScholar from '../../assets/announcements/dost.png'
import newsLamudiScholar from '../../assets/announcements/lamudi.png'
import newsMegaworldScholar from '../../assets/announcements/megaworld.png'

export type NewsProps = {
    date: string,
    image: string,
    title: string,
    content?: string
}

const announcements: NewsProps[] = [
    {
        title: "DOST S&T Undergraduate Scholarship Program 2024",
        date: "September 21, 2024",
        image: newsDostScholar,
    },
    {
        title: "Lamudi Philippines Undergraduate Scholarship Program",
        date: "August 05, 2024",
        image: newsLamudiScholar,
    },
    {
        title: "Megaworld College Scholarship Program 2024",
        date: "October 1, 2024",
        image: newsMegaworldScholar,
    }
]

export const boldStyle = {
    fontWeight:"bold",
    lineHeight:"normal",
}

export function BigNews({date, image, title, content}: NewsProps){
    return(
        <Card sx={{
            maxWidth:450,
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
        }}>
            <CardMedia 
                sx={{height:250, scale:0.9}}
                image={image}
            />
            <CardContent>
                <Typography variant='h4' mb="15px">{title}</Typography>
                <Typography variant='body1'>{content}</Typography>
            </CardContent>
            <CardActions sx={{
                display:"flex",
                justifyContent:"space-between",
            }}>
                <Typography variant='body2'>{date}</Typography>
                <Button variant='contained'  sx={{backgroundColor:"rgb(191, 155, 48)"}} onClick={()=>window.location.href = '/announcements'}>Read More</Button>
            </CardActions>
        </Card>
    )
}

function SmallNews({date, image, title}: NewsProps){
    return(
        <Card sx={{
            maxWidth:500,
            display:"flex"

        }}>
            <CardMedia 
                sx={{width:300, height:"auto", scale:0.9}}
                image={image}
            />
            <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                width:"100%",
            }}>
                <CardContent sx={{
                    padding:"5px",
                }}>
                    <Typography variant='h6' textAlign="left" sx={{fontWeight:"700", lineHeight:"normal"}}>{title}</Typography>
                    {/* <Typography variant='body2'>{content}</Typography> */}
                </CardContent>
                <CardActions sx={{
                    display:"flex",
                    justifyContent:"space-between",
                }}>
                    <Typography variant='body2'>{date}</Typography>
                    <Button variant='contained' sx={{backgroundColor:"rgb(191, 155, 48)"}}>Read More</Button>
                </CardActions>
            </div>
        </Card>
    )
}

export default function Announcements(){

    const annStyle = {
        backgroundColor:"rgb(183, 28, 28)",
        height:"fit-content",
    }

    return(
        <div style={annStyle}>
            <Typography variant='h3' className='banner' sx={boldStyle}>Announcements</Typography>
            <Box sx={{
                padding:"20px",
                display:"flex",
                justifyContent:"center",
            }}>
                <BigNews
                    date='September 30, 2021' 
                    image={newsPlmScholar} 
                    title='PLM Scholar Application Now Open' 
                    content='The PLM Scholarship System is now open for applications for the 2022-2023 academic year. Apply now and get the chance to receive financial aid and educational support.'
                />
                <Divider orientation="vertical" variant="middle" flexItem sx={{
                    backgroundColor:"rgb(191, 155, 48)",
                    width:"1px",
                    margin:"0px 48px",
                }}/>
                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-around",
                }}>
                    {announcements.map((news, index) => <SmallNews key={index} {...news}/>)}
                    <Button variant='text' sx={{color:"rgb(255, 255, 255)"}}>See more<ArrowForwardIcon></ArrowForwardIcon></Button>
                </Box>
            </Box>
        </div>
    )
}