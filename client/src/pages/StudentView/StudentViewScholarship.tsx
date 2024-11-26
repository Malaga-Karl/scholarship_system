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
import { useEffect, useState } from "react";
import SpecificScholarshipTemplate from "./SpecificScholarship";
import Button from "@mui/material/Button";
import axios from "axios";

const scholarships : Scholarship[] = [
    {
        id: 1,
        image: imgCharityFirst,
        title: "Charity First Scholarship",
        slots: 16,
        deadline: "August 9, 2024",
        desc: `
            <p>In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. After organizing various relief missions in remote towns struck by typhoons and flash floods, the group continued its service by reaching out to fire victims in Metro Manila areas.</p>
            <p>Recognizing the overwhelming problems plaguing the country, the group committed to being part of the solution. However, realizing that organizing relief missions and providing relief goods were only temporary and short-term solutions to deeper problems, they sought to find more long-term and far-reaching solutions to the problems caused by poverty. Driven by their common desire, the group formed Charity First Foundation Inc, an organization committed to “helping people help themselves”.</p>
            <p>On July 1, 2001, Charity First Foundation was formally registered by the Securities and Exchange Commission, as a non-profit organization committed to improving the quality of life of the marginalized sectors of the country through its four main programs.</p>
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



type Scholarship = {
    scholarship_id: number;
    image: string;
    title: string;
    slots: number;
    deadline: string;
    scholarship_description: string;
    eligibility: string[];
    reqs: string[];
    benefits: string[];
  };
  
  type Foundation = {
    foundation_id: number;
    name: string;
    description: string;
    logo_path: string;
    status: string;
    scholarships: Scholarship[];
  };

export default function StudentViewScholarship(){
    const [foundations, setFoundations] = useState<Foundation[]>([]); // State to store foundations data
    const [loading, setLoading] = useState<boolean>(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to store errors

    useEffect(() => {
        const fetchFoundationsWithScholarships = async () => {
        try {
            // Fetch data from the API
            const response = await axios.get('http://localhost:3001/foundations/getallFS');
            
            //console.log(response);
            // Map and store the data in state
            const data: Foundation[] = response.data.map((foundation: Foundation) => ({
                foundation_id: foundation.foundation_id,
                name: foundation.name,
                description: foundation.description,
                logo_path: `http://localhost:3001/uploads/${foundation.logo_path}`,
                status: foundation.status,
                scholarships: foundation.scholarships.map((scholarship: Scholarship) => ({
                    id: scholarship.scholarship_id,
                    image: foundation.logo_path, // Assuming logo_path is used as image for scholarship
                    title: scholarship.title,
                    slots: scholarship.slots,
                    deadline: scholarship.deadline,
                    desc: scholarship.scholarship_description,
                    eligibility: scholarship.eligibility, // Safely split string
                    reqs: scholarship.reqs, // Safely split string
                    benefits: scholarship.benefits, // Safely split string
                })),
            }));
            
            // Update state with fetched data
            console.log(data);
            setFoundations(data);
        } catch (err) {
            // Handle errors
            console.error(err);
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
        };

        fetchFoundationsWithScholarships();
    }, []); // Empty dependency array means this runs once when the component mounts

    const [hasApplied, setApplied] = useState(false);
    const handleApplication = () => {
        setApplied(prevState => !prevState);
    }

    const [ScholarSwitch, setScholarSwitch] = useState(true); 
    const handleSwitchChange = () => {
        setScholarSwitch(prevState => !prevState); // Toggle the switch state
    };

    const {id} = useParams();
    const specificScholarship = id ? foundations.find((foundation) => foundation.foundation_id === parseInt(id)) : null
    
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div style={{margin:'100px auto'}}>
            {error}
            </div>;
    }
    
    return(
        <>
            <Toolbar/>
            {!hasApplied ? (
                <>
                    {id ? (
                    <>
                    {specificScholarship ? (
                        <SpecificScholarshipTemplate
                            key={id}
                            image={specificScholarship?.logo_path}
                            title={specificScholarship?.scholarships[0].title}
                            id={specificScholarship?.foundation_id}
                            slots={specificScholarship?.scholarships[0].slots}
                            deadline={
                                new Date(specificScholarship?.scholarships[0].deadline).toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                                })}
                            desc={specificScholarship?.scholarships[0].scholarship_description}
                            reqs={specificScholarship?.scholarships[0].reqs}
                            benefits={specificScholarship?.scholarships[0].benefits}
                            eligibility={specificScholarship?.scholarships[0].eligibility}
                        />
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
                            <Switch defaultChecked
                                checked={hasApplied} // Check if the switch is on
                                onChange={handleApplication}
                                />
                        </Box>
                    
                    </Box>
                    {/*for showing all the of the available scholarships*/}
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center",flexWrap:"wrap", gap:"50px"}}>
                        {foundations.length > 0 ? (
                            foundations.map((scholarship, index) => (
                                <SvScholarship key={index} 
                                    image={scholarship?.logo_path}
                                    title={scholarship?.scholarships[0].title}
                                    id={scholarship?.foundation_id}
                                    slots={scholarship?.scholarships[0].slots}
                                    deadline={
                                        new Date(scholarship?.scholarships[0].deadline).toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                      })}
                                    desc={scholarship?.scholarships[0].scholarship_description}
                                    reqs={scholarship?.scholarships[0].reqs}
                                    benefits={scholarship?.scholarships[0].benefits}
                                    eligibility={scholarship?.scholarships[0].eligibility}
                                />
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
            ) : (
                <>
                    <Switch defaultChecked checked={hasApplied} onChange={handleApplication}/>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: '100vh'
                    }}>
                        <Box sx={{
                            display:"flex",
                            border: 'ridge',
                            borderRadius: '16px',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '1150px',
                            height: '880px'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    marginTop: '10px',
                                    width: '1050px',
                                    justifyContent: 'flex-start'
                                }}>
                                    <img src={imgCharityFirst} alt="charfirst" style={{
                                        width: 'auto',
                                        height: '110px',
                                        marginRight: '60px'
                                    }} />
                                    <Box sx={{
                                        display:'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        maxWidth: '700px',
                                        maxHeight: '110px',
                                        marginLeft: '20px',
                                    }}>
                                        <Typography sx={{
                                            fontSize: '45px',
                                            fontWeight: 'bold'
                                        }}>
                                            Charity First Foundation Scholarship 2024-2025
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginTop: '20px',
                                    height: '620px',
                                    marginBottom: '15px'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Box sx={{
                                            // height: '100px',
                                            width: '515px',
                                            borderRadius: '16px',
                                            backgroundColor: 'rgb(32,84,189)',
                                            marginBottom: '20px'
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                py: '5px', // Padding for top and bottom
                                                px: '15px', // Padding for left and right
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}>
                                                    Requirements:
                                                </Typography>
                                                <ul style={{
                                                    marginTop: '-2px',
                                                    color: 'white',
                                                    textAlign: 'left'
                                                }}>
                                                    <li>Application form</li>
                                                    <li>Complete Grades (SHS or 1st Year College)</li>
                                                    <li>Incoming 1st Year and 2nd Year College Only</li>
                                                    <li>Latest Copy of Utility Bills and Printed House Picture (inside and out)</li>
                                                    <li>Birth Certificate, Valid ID’s, 2×2 ID Picture and Certificate of Indigency</li>
                                                    <li>DSWD Social Case Study Report, DSWD 4p’s ID</li>
                                                    <li>Sketch of Home Address from Major Landmark and Medical and X-Ray Result </li>
                                                </ul>
                                                <Typography sx={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}>
                                                    Benefits
                                                </Typography>
                                                <ul style={{
                                                    marginTop: '-2px',
                                                    color: 'white',
                                                    textAlign: 'left'
                                                }}>
                                                    <li>Transportation and Meal Allowance</li>
                                                    <li>Dormitory Fee and Allowance</li>
                                                    <li>Books and Uniform Allowance</li>
                                                    <li>Desktop and Internet Allowance</li>
                                                    <li>Life Skills and Motivational Seminars</li>
                                                </ul>
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex',
                                            height: '103px',
                                            width: '515px',
                                            borderRadius: '16px',
                                            backgroundColor: 'rgb(183,28,28)'
                                        }}>
                                            <Box sx={{
                                                display: 'flex',
                                                py: '5px', // padding for top and bottom
                                                px: '15px', // padding for left and right
                                                flexDirection: 'column',
                                                alignItems: 'flex-start'
                                            }}>
                                                <Typography sx={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }}>
                                                    Application Deadline:
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '15px',
                                                    // fontWeight: 'bold',
                                                    textAlign: 'left',
                                                    color: 'white'
                                                }}>
                                                    The application deadline for the Charity First Foundation Scholarship is <b>August 9, 2024</b> until only.
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        height: '620px',
                                        width: '515px'
                                    }}>
                                        <iframe 
                                            src=""          // Insert iframe compatible pdf link here
                                            width='515px'
                                            height='618px'
                                        >
                                        </iframe>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    height: '60px',
                                    justifyContent: 'space-between'
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                        }}>
                                            <Typography sx={{
                                                fontSize: '20px',
                                                fontWeight: 'bold'
                                            }}>
                                                Scholarship Application Status
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: '20px'
                                            }}>
                                                Pending
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Button variant="contained" sx={{
                                            backgroundColor: '#BF9B30',
                                            height: '45px',
                                            width: '250px',
                                            borderRadius: '5px',
                                            textTransform: 'capitalize',
                                            fontSize: '18px'
                                        }}>
                                            Update Application Form
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
            
        </>
    );
}
    