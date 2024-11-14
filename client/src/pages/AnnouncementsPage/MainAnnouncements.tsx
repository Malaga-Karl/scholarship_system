//MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import {BigNews, NewsProps, boldStyle} from "../HomePage/Announcements"

//Image Imports
import newsDostScholar from '../../assets/announcements/DOST(BIG).jpg'
import newsLamudiScholar from '../../assets/announcements/lamudi(big).jpg'
import newsMegaworldScholar from '../../assets/announcements/megaworld.png'
import { useParams } from 'react-router-dom'
import SpecificAnnouncementTemplate from './SpecificAnnouncementTemplate'

const announcements:NewsProps[] = [
    {
        id: 4,
        title: "DOST S&T Undergraduate Scholarship Program 2024",
        date: "September 21, 2024",
        image: newsDostScholar,
        content: "The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and technology. Its main goals are:",
        desc: ["Promoting Excellence: It identifies and supports students with great potential in science and tech. ",
            "Building a Skilled Workforce: By giving financial help, it encourages students to take up STEM (Science, Technology, Engineering, and Mathematics) courses, ensuring a skilled workforce for the country's growth.",
        ],
        content2: "Before you apply for the DOST S&T Undergraduate Scholarship Program, make sure you meet the following requirements:",
    },
    {
        id: 5,
        title: "Lamudi Philippines Undergraduate Scholarship Program",
        date: "August 05, 2024",
        image: newsLamudiScholar,
        content: "Now on its ninth year in the Philippines, global real estate platform Lamudi focuses exclusively on emerging markets. It offers sellers, buyers, landlords, and renters a secure and easy-to-use platform to find or list properties online. It is currently available in Mexico, Indonesia, and the Philippines, and is part of EMPG (Emerging Markets Property Group), a Dubai-based property platform.",
        content2: "Now on its second foray, the Lamudi Philippines Scholarship Program is again ready to award a new set of exemplary students!",
        content3: "Apply and receive a Php20,000 educational grant for one semester each, and a guaranteed paid internship at Lamudi Philippines in your department of choice!",
        content4: "Open to all college undergraduates over 18 years old and currently in their third or fourth year of tertiary degree with a consistent GPA of 2.25 or higher.",
    },
    {
        id: 6,
        title: "Megaworld College Scholarship Program 2024",
        date: "October 1, 2024",
        image: newsMegaworldScholar,
        content: "Megaworld Corporation is now accepting applications for its 2024 College Scholarship Program. The deadline for submission of applications is on October 1, 2024."
    },
    {
        id: 7,
        title: "DOST S&T Undergraduate Scholarship Program 2024",
        date: "September 21, 2024",
        image: newsDostScholar,
        content: "The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and technology. Its main goals are:",
        desc: ["Promoting Excellence: It identifies and supports students with great potential in science and tech. ",
            "Building a Skilled Workforce: By giving financial help, it encourages students to take up STEM (Science, Technology, Engineering, and Mathematics) courses, ensuring a skilled workforce for the country's growth.",
        ],
        content2: "Before you apply for the DOST S&T Undergraduate Scholarship Program, make sure you meet the following requirements:",
    },
    {
        id: 8,
        title: "Lamudi Philippines Undergraduate Scholarship Program",
        date: "August 05, 2024",
        image: newsLamudiScholar,
        content: "Now on its ninth year in the Philippines, global real estate platform Lamudi focuses exclusively on emerging markets. It offers sellers, buyers, landlords, and renters a secure and easy-to-use platform to find or list properties online. It is currently available in Mexico, Indonesia, and the Philippines, and is part of EMPG (Emerging Markets Property Group), a Dubai-based property platform.",
        content2: "Now on its second foray, the Lamudi Philippines Scholarship Program is again ready to award a new set of exemplary students!",
        content3: "Apply and receive a Php20,000 educational grant for one semester each, and a guaranteed paid internship at Lamudi Philippines in your department of choice!",
        content4: "Open to all college undergraduates over 18 years old and currently in their third or fourth year of tertiary degree with a consistent GPA of 2.25 or higher.",
    },
    {
        id: 9,
        title: "Megaworld College Scholarship Program 2024",
        date: "October 1, 2024",
        image: newsMegaworldScholar,
        content: "Megaworld Corporation is now accepting applications for its 2024 College Scholarship Program. The deadline for submission of applications is on October 1, 2024."
    }
]

export default function MainAnnouncements(){
    const { id } = useParams();

    const specificAnnouncement = id
    ? announcements.find((announcement) => announcement.id === parseInt(id))
    : null;

    return(
        <Box sx={{
            height:"fit-content",
            backgroundColor:"rgb(183, 28, 28)",
        }}>
            {id ?(
                <>
                    {specificAnnouncement?(
                        <SpecificAnnouncementTemplate {...specificAnnouncement}/>
                    ) : (
                        <Typography variant='h3'>There is no news like that. u trippin homie</Typography>
                    )}
                </>
            ) : (
                <>
                    <Typography variant='h3' className='banner banner--lowered' sx={boldStyle}>Announcements</Typography>
                    <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",transform:"scale(0.8)", gap:"50px"}}>
                        {announcements.map((announcement, index) => <BigNews key={index} {...announcement}/>)}
                    </Box>
            </>
            )}
            
        </Box>
    )
}