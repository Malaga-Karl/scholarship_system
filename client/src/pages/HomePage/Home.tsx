// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

// Background Image
import plmFascade from '../../assets/plmBackground.png';

// Partner Logos
import logoCfcb from '../../assets/partners/cfbc.png';
import logoCharitiyFirst from '../../assets/partners/charityFirst.png';
import logoCibak from '../../assets/partners/cibak.png';
import logoDost from '../../assets/partners/dost.png';
import logoGreen from '../../assets/partners/green.png';
import logoL from '../../assets/partners/L.png';
import logoLcck from '../../assets/partners/lcck.png';
import logoMegaworld from '../../assets/partners/megaworld.png';
import logoSm from '../../assets/partners/sm.png';


export default function Home(){

    const images = [
        logoCfcb,
        logoCharitiyFirst,
        logoCibak,
        logoDost,
        logoGreen,
        logoL,
        logoLcck,
        logoMegaworld,
        logoSm,
    ]

    const imageStyle = {
        padding:"10px"
    }

    const card = (
        <>
            <CardContent sx={{
                textAlign:"left",
                marginLeft:"100px"
                
            }}>
                <Typography variant='h2' sx={{
                    fontWeight:"bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}>
                    PLM Scholarship System
                </Typography>
                <Typography variant='body1' sx={{
                    width:"50vw",
                    textAlign:"justify",
                }}>
                    Welcome to the PLM Scholarship System, your gateway to educational support and financial aid at Pamantasan ng Lungsod ng Maynila. Easily apply for scholarships, track your application status, and stay updated on important announcements. Empower your academic journey with opportunities that help you achieve your dreams.
                </Typography>
            </CardContent>
            <CardActions sx={{
                justifyContent:"end",
            }}>
                <Button variant='contained' sx={{
                        backgroundColor:"rgb(191, 155, 48)",
                        marginLeft:"100px",
                        padding:"15px"
                    }}
                onClick={() => window.location.href = '/partners'}
                >See Scholarships</Button>
            </CardActions>
        </>
    );

    
    return(
        <>
            <Box sx={{
                backgroundImage:`url(${plmFascade})`,
                width:"100vw",
                height:"90vh",
                overflow:"hidden",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin:"0px",
                padding:"0px",
            }}>
                <Box sx={{
                    width:"100vw",
                    backgroundColor:"rgba(255, 255, 255, 0.533);",
                    display:"flex",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    boxShadow: "0px 4px 4px rgba(100, 96, 96, 0.643)"
                }}> 
                    {images.map((image, index) => <img src={image} key={index} style={imageStyle}/>)}
                </Box>

                <Card sx={{
                        width:"60vw",
                        position:"relative",
                        top:"30vh",
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        backgroundImage: "linear-gradient( to right, rgba(183, 28, 28, 0.776) 25%, rgba(32, 37, 189, 0.729) 75%)",
                        color:"white",
                    }}>
                    {card}
                </Card>
            </Box>
        </>
        
    );
}