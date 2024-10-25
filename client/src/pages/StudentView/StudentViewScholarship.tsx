import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Scholarship} from "../../components/SvScholarship";
import SvScholarship from "../../components/SvScholarship";

//Image imports
import imgDost from '../../assets/partners/dost.png';
import imgCharityFirst from '../../assets/partners/charityfirst.png';
import imgCibak from '../../assets/partners/cibak.png';

const scholarships : Scholarship[] = [
    {
        image: imgDost,
        title: "DOST Scholarship",
        slots: 20,
        deadline: "September 30, 2021"
    },
    {
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "October 15, 2021"
    },
    {
        image: imgCibak,
        title: "CIBAK Scholarship",
        slots: 3,
        deadline: "November 30, 2021"
    }
]

export default function StudentViewScholarship(){
    return(
        <StudentViewTemplate active="scholarship">
            <>
                <Toolbar/>
                <Typography variant='h1'>Scholarship Offers</Typography>
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {scholarships.map((scholarship, index) => (
                        <SvScholarship key={index} {...scholarship}/>
                    ))}
                </Box>
            </>
        </StudentViewTemplate>
    );
}
    // <Typography variant='body1' mt={5}>Please come back later or contact the RGO Admin for more information</Typography>
    // <Typography variant='h1'>There are currently no available scholarship offers 😞</Typography>