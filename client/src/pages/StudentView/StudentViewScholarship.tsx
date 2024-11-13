import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import {Scholarship} from "../../components/SvScholarship";
import {useParams} from 'react-router-dom';
import SvScholarship from "../../components/SvScholarship";

//Image imports
import imgDost from '../../assets/partners/dost.png';
import imgCharityFirst from '../../assets/partners/charityfirst.png';
import imgCibak from '../../assets/partners/cibak.png';
import { useState } from "react";
import SpecificScholarshipTemplate from "./SpecificScholarship";

const scholarships : Scholarship[] = [
    {
        id: 1,
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "August 9, 2024",
        desc: `
            In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. 
            After organizing various relief missions in remote towns struck by typhoons and flash floods, the group continued its service by reaching out to fire victims in Metro Manila areas.
            <br><br>
            Recognizing the overwhelming problems plaguing the country, the group committed to being part of the solution. However, realizing that organizing relief missions and providing relief goods were only temporary and short-term solutions to deeper problems, they sought to find more long-term and far-reaching solutions to the problems caused by poverty. 
            Driven by their common desire, the group formed Charity First Foundation Inc, an organization committed to “helping people help themselves”.
            <br><br>
            On July 1, 2001, Charity First Foundation was formally registered by the Securities and Exchange Commission, as a non-profit organization committed to improving the quality of life of the marginalized sectors of the country through its four main programs.
        `,
        eligibility: ["Must be economically in need.",
            "Must be 21 years old and below.",
            "Must not be a recipient of other scholarships or educational assistance.",
            "Must live in Metro Manila.",
            "NOT living in a dormitory.",
            "Must be an Incoming 1st and 2nd year College Student.",
            "Must have passed the entrance exam for a four-year or five-year course (except for certain courses like(EXCEPT FOR MEDICINE, DENTISTRY, PHYSICAL THERAPY, TOURISM, BS. INTERIOR DESIGN, HOTEL AND RESTAURANT MANAGEMENT)",
            "Must have a general weighted average of 2.25 (85%) or better with no grades below 75% or failing grades."
        ],
        reqs:["Application form",
            "Complete Grades (SHS or 1st Year College)",
            "Incoming 1st Year and 2nd Year College Only",
            "Latest Copy of Utility Bills and Printed House Picture (inside and out)",
            "Birth Certificate, Valid ID's, 2x2 ID Picture and Certificate of Indigency",
            "DSWD Social Case Study Report, DSWD 4P's ID",
            "Sketch of Home Address from Major Landmark and Medical and X-Ray Result"
        ],
        benefits:["Transportation and Meal Allowance",
            "Dormitory Fee and Allowance",
            "Books and Uniform Allowance",
            "Desktop and Internet Allowance",
            "Life Skills and Motivational Seminars"
        ]
    },
    {
        id:2,
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021",
        desc:"test desc",
        eligibility: ["2nd Year in Tech Courses", "No Failing Grades"],
        reqs:["Application Form", "Complete Grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:3,
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:4,
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:5,
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "Oct 15, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {

        id:6,
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:7,
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:8,
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "Oct 15, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:9,
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021",
        desc:"test desc",
        eligibility: ["good looking"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    }
]

export default function StudentViewScholarship(){
    const [ScholarSwitch, setScholarSwitch] = useState(true); 
    const handleSwitchChange = () => {
        setScholarSwitch(prevState => !prevState); // Toggle the switch state
    };
    const switcher = ScholarSwitch ? scholarships : []; 

    const {id} = useParams();
    const specificScholarship = id ? scholarships.find((announcement) => announcement.id === parseInt(id)) : null
    return(
        <StudentViewTemplate active="dashboard">
            <>
                <Toolbar/>
                {id ? (
                    <>
                        {specificScholarship ? (
                            SpecificScholarshipTemplate({...specificScholarship})
                        ) : (
                            <Typography variant="h3">Id Not Found</Typography> 
                        )}
                    </>
                ) : (
                    <>
                        <Box>
                            <Box>
                                <p>scholarships available</p>
                                <Switch defaultChecked
                                    checked={ScholarSwitch} // Check if the switch is on
                                    onChange={handleSwitchChange}
                                    />
                            </Box>
                        
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center",flexWrap:"wrap", gap:"50px"}}>
                            {switcher.length > 0 ? (
                                switcher.map((scholarship, index) => (
                                    <SvScholarship key={index} {...scholarship}/>
                                ))
                            ) : (
                                <>
                                    <Typography variant='h1'>There are currently no available scholarship offers 😞</Typography>
                                    <Typography variant='body1' mt={5}>Please come back later or contact the RGO Admin for more information</Typography>
                                </>
                            )}
                            
                        </Box>
                    </>
                )}
            </>
        </StudentViewTemplate>
    );
}
    