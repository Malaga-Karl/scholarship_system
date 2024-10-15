//MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import {BigNews, NewsProps, boldStyle} from "../HomePage/Announcements"

//Image Imports
import newsDostScholar from '../../assets/announcements/dost.png'
import newsLamudiScholar from '../../assets/announcements/lamudi.png'
import newsMegaworldScholar from '../../assets/announcements/megaworld.png'

const announcements:NewsProps[] = [
    {
        title: "DOST S&T Undergraduate Scholarship Program 2024",
        date: "September 21, 2024",
        image: newsDostScholar,
        content: "The Department of Science and Technology-Science Education Institute (DOST-SEI) is now accepting applications for the 2024 Undergraduate Scholarships Program. The deadline for submission of applications is on September 21, 2024."
    },
    {
        title: "Lamudi Philippines Undergraduate Scholarship Program",
        date: "August 05, 2024",
        image: newsLamudiScholar,
        content: "Lamudi Philippines is now accepting applications for its 2024 Undergraduate Scholarship Program. The deadline for submission of applications is on August 5, 2024."
    },
    {
        title: "Megaworld College Scholarship Program 2024",
        date: "October 1, 2024",
        image: newsMegaworldScholar,
        content: "Megaworld Corporation is now accepting applications for its 2024 College Scholarship Program. The deadline for submission of applications is on October 1, 2024."
    },
    {
        title: "DOST S&T Undergraduate Scholarship Program 2024",
        date: "September 21, 2024",
        image: newsDostScholar,
        content: "The Department of Science and Technology-Science Education Institute (DOST-SEI) is now accepting applications for the 2024 Undergraduate Scholarships Program. The deadline for submission of applications is on September 21, 2024."
    },
    {
        title: "Lamudi Philippines Undergraduate Scholarship Program",
        date: "August 05, 2024",
        image: newsLamudiScholar,
        content: "Lamudi Philippines is now accepting applications for its 2024 Undergraduate Scholarship Program. The deadline for submission of applications is on August 5, 2024."
    },
    {
        title: "Megaworld College Scholarship Program 2024",
        date: "October 1, 2024",
        image: newsMegaworldScholar,
        content: "Megaworld Corporation is now accepting applications for its 2024 College Scholarship Program. The deadline for submission of applications is on October 1, 2024."
    }
]

export default function MainAnnouncements(){
    return(
        <Box sx={{
            height:"fit-content",
            backgroundColor:"rgb(183, 28, 28)",
        }}>
            <Typography variant='h3' className='banner banner--lowered' sx={boldStyle}>Announcements</Typography>
            <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",transform:"scale(0.8)", gap:"50px"}}>
                {announcements.map((announcement, index) => <BigNews key={index} {...announcement}/>)}
            </Box>
        </Box>
    )
}