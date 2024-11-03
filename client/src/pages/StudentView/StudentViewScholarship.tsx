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
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021",
        desc:"test desc",
        eligibility: ["good looking", "black", "from the hood", "has a glock", "speaks fluent yapanese"],
        reqs:["app form", "complete grades"],
        benefits:["allowance", "dorms"]
    },
    {
        id:2,
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
    const testing = ScholarSwitch ? scholarships : []; 

    const {id} = useParams();
    const specificScholarship = id ? scholarships.find((announcement) => announcement.id === parseInt(id)) : null
    return(
        <StudentViewTemplate active="scholarship">
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
                            {testing.length > 0 ? (
                                testing.map((scholarship, index) => (
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
    