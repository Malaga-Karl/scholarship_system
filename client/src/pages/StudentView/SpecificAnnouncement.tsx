import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import SpecificAnnouncementOne from "../../assets/announcements/specific_announcement_1.png"
import SpecificAnnouncementTwo from "../../assets/announcements/specific_announcement_2.png"
import SpecificAnnouncementThree from "../../assets/announcements/specific_announcement_3.png"


export default function SpecificAnnouncementView(){
    const announcementText = `
        <p>Attention aspiring PLM Students! If you're passionate about your education and eager to make a difference, here’s your chance to unlock endless possibilities.</p>
    
        <p>The PLM Scholars Foundation Inc. (PLMSFI) is now accepting scholarship applications for the Academic Year 2024-2025 for all PLM students.</p>

        <p>Eligibility:</p>
        <ol>
            <li>PLM students currently on their sophomore year or higher</li>
            <li>Minimum GWA of 2.5 in the last academic year</li>
        </ol>

        <p>We're here to support deserving students from economically disadvantaged backgrounds. The deadline to apply is JULY 20, 2024.</p>

        <p>Don’t miss out on this chance to elevate your college journey with the PLMSFI Family.</p>

        <p>Make sure to complete the requirements before filling out the Scholarship Application Form.</p>
    `;
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '2%'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                // paddingX: '2%',
                marginTop: '5%',
                border: 'ridge',
                borderRadius: '16px',
                width: '93%',
                height: '120%'
            }}>
                <Button startIcon={<ArrowBack/>} sx={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'black',
                    textTransform: 'capitalize',
                    fontSize: '20px',
                    paddingY: '1.5%',
                    paddingLeft: '4%'
                }}>
                    Go Back
                </Button>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    height: '5%'
                }}>
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#BF9B30',
                        color: 'white',
                        width: '100%',
                        paddingLeft: '4%',
                        textAlign: 'left'
                    }}>
                        September 23, 2024
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        paddingX: '6%',
                        paddingY: '1.5%'
                    }}>
                        The PLM Scholars Foundation Inc. is now accepting applications
                    </Typography>
                    <Box gap={2} sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <img
                            src={SpecificAnnouncementOne}
                            alt="Sample Announcement Image 1"
                        />
                        <img
                            src={SpecificAnnouncementTwo}
                            alt="Sample Announcement Image 2"
                        />
                        <img
                            src={SpecificAnnouncementThree}
                            alt="Sample Announcement Image 3"
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        textAlign: 'justify',
                        marginX: '2%'
                    }}>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: announcementText}} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}