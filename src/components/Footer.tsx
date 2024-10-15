// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Image Imports
import plmLogo from '../assets/footerLogos/plm_iconlogo.png'
import haribonLogo from '../assets/footerLogos/haribon_logo.png'
import bagongPilipinasLogo from '../assets/footerLogos/bagongpilipinas_logo.png'

export default function Footer(){

    const logoList:string[]=[
        plmLogo,
        haribonLogo,
        bagongPilipinasLogo
    ]

    return(
        <>
            <Box sx={{
                display:"flex",
                padding:"42px",
                justifyContent:"space-around"
            }}>
                <Box sx={{
                    height:"fit",
                    width:"50vw",
                    textAlign:"justify"
                }}>
                    <Typography variant='h5' pb={2} sx={{fontWeight:"bold"}}>PLM Scholarship System</Typography>
                    <Typography>The PLM Scholarship System is a web-based platform of the Resource Generation Office for Pamantasan ng Lungsod ng Maynila that streamlines scholarship applications. Students can apply online, track their status, and stay updated on opportunities, promoting efficiency and supporting academic growth through accessible technology.</Typography>
                </Box>
                <Box sx={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center",
                    gap:"100px"
                }}>
                    {logoList.map((image, index) => <img src={image} key={index} style={{width:110, height:110}}/>)}
                </Box>
            </Box>
            <hr />
            <Typography variant='body1' sx={{
                padding:"30px 0",
                color:"gray"    
            }}>
                Copyright © 2024 Pamantasan ng Lungsod ng Maynila. All Rights Reserved.</Typography>
        </>
    )
}