import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import {Scholarship} from "../../components/SvScholarship";
import SvScholarship from "../../components/SvScholarship";

//Image imports
import imgDost from '../../assets/partners/dost.png';
import imgCharityFirst from '../../assets/partners/charityfirst.png';
import imgCibak from '../../assets/partners/cibak.png';
import { useState } from "react";

const scholarships : Scholarship[] = [
    {
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021"
    },
    {
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "Oct 15, 2021"
    },
    {
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021"
    },
    {
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021"
    },
    {
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "Oct 15, 2021"
    },
    {
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021"
    },
    {
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "Sept 30, 2021"
    },
    {
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "Oct 15, 2021"
    },
    {
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "Nov 30, 2021"
    }
]

export default function StudentViewScholarship(){
    const [ScholarSwitch, setScholarSwitch] = useState(true); 

    const handleSwitchChange = () => {
        setScholarSwitch(prevState => !prevState); // Toggle the switch state
    };

    const testing = ScholarSwitch ? scholarships : []; 

    return(
        <StudentViewTemplate active="scholarship">
            <>
                <Toolbar/>
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
        </StudentViewTemplate>
    );
}
    