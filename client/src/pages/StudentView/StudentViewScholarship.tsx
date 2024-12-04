import Box from "@mui/material/Box";
import StudentViewTemplate from "../../template/StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import {useNavigate, useParams} from 'react-router-dom';
import SvScholarship from "../../components/SvScholarship";

//Image imports
import imgCharityFirst from '../../assets/partners/charityfirst.png';
import { useEffect, useRef, useState } from "react";
import SpecificScholarshipTemplate from "./SpecificScholarship";
import Button from "@mui/material/Button";
import axios from "axios";
import { axiosBase } from "../../axiosConfig";


type Scholarship = {
    scholarship_id: number;
    image: string;
    title: string;
    slots: number;
    accepted_count:number;
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
  type Scholarshipdb = {
    scholarship_id: number;
    image: string;
    title: string;
    slots: number;
    deadline: string;
    scholarship_description: string;
    eligibility: string;
    reqs: string;
    accepted_count:number;
    benefits: string;
  };
  
  type Foundationdb = {
    foundation_id: number;
    name: string;
    description: string;
    logo_path: string;
    status: string;
    scholarships: Scholarshipdb[];
  };

export default function StudentViewScholarship(){
    const [foundations, setFoundations] = useState<Foundation[]>([]); // State to store foundations data
    const [loading, setLoading] = useState<boolean>(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to store errors

    //iFrame shits anyways
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Function to send a message to the iframe to trigger the PDF download
    const handleDownloadPDF = () => {
        if (iframeRef.current) {
            // Send message to iframe
            iframeRef.current.contentWindow?.postMessage({ action: "downloadPDF" }, "*");
        }
    };

    useEffect(() => {
        const fetchFoundationsWithScholarships = async () => {
        try {
            // Fetch data from the API
            const response = await axios.get('/foundations/getallFS');
            
            //console.log(response);
            // Map and store the data in state
            const data = response.data.map((foundation: Foundationdb) => ({
                foundation_id: foundation.foundation_id,
                name: foundation.name,
                description: foundation.description,
                logo_path: `${axiosBase}/uploads/${foundation.logo_path}`,
                status: foundation.status,
                scholarships: foundation.scholarships.map((scholarship: Scholarshipdb) => ({
                    scholarship_id: scholarship.scholarship_id,
                    image: foundation.logo_path, // Assuming logo_path is used as image for scholarship
                    title: scholarship.title,
                    slots: scholarship.slots,
                    accepted_count: scholarship.accepted_count,
                    deadline: scholarship.deadline,
                    desc: scholarship.scholarship_description,
                    eligibility: scholarship.eligibility.split(','), // Safely split string
                    reqs: scholarship.reqs.split(','), // Safely split string
                    benefits: scholarship.benefits.split(','), // Safely split string
                })),
            }));
            
            // Update state with fetched data
            //console.log(data);
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
    const [studentInfo, setStudentInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkApplied = async () => {
            try {
                const activeEmail = localStorage.getItem('localEmailActive');
                const response = await axios.get(`/user/exists/${activeEmail}`);
                setApplied(response.data.exists);
                
                if (response.data.exists) {
                    const data = await axios.get(`/user/getInfo/${activeEmail}`);
                    setStudentInfo(data.data);
                    console.log(data.data); // Log fetched data directly
                }
            } catch (error) {
                console.error("Error checking application:", error);
            }
        };
    
        checkApplied();
    }, []);
    

    // const [ScholarSwitch, setScholarSwitch] = useState(true); 
    // const handleSwitchChange = () => {
    //     setScholarSwitch(prevState => !prevState); // Toggle the switch state
    // };

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
                            accepted_count={specificScholarship?.scholarships[0].accepted_count}
                            image={specificScholarship?.logo_path}
                            title={specificScholarship?.scholarships[0].title}
                            id={specificScholarship?.foundation_id}
                            sID={specificScholarship?.scholarships[0].scholarship_id}
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
                            <Typography
                                marginTop={"20px"}
                                marginBottom={"20px"}
                                variant="h4"
                            >
                                Scholarships Available
                            </Typography>
                        </Box>
                    
                    </Box>
                    {/*for showing all the of the available scholarships*/}
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center",flexWrap:"wrap", gap:"50px"}}>
                        {foundations.length > 0 ? (
                            foundations.map((scholarship, index) => (
                                scholarship.scholarships.length > 0 ? (
                                    new Date(scholarship.scholarships[0].deadline) >= new Date()?(
                                        <SvScholarship key={index} 
                                        accepted_count={scholarship?.scholarships[0].accepted_count}
                                        image={scholarship?.logo_path}
                                        title={scholarship?.scholarships[0].title}
                                        id={scholarship?.foundation_id}
                                        sID={scholarship?.scholarships[0].scholarship_id}
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
                                    ):( '' )
                                ):('')
                                
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
                                    <img src={
                                        `${axiosBase}/uploads${studentInfo?.scholarship.foundation.logo_path}`
                                    } alt="charfirst" style={{
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
                                            {studentInfo?.scholarship.title}
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
                                                    {
                                                        studentInfo?.scholarship.reqs.split(',').map((item:string)=>{
                                                            return (<li>{item}</li>)
                                                        })
                                                    }
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
                                                    {
                                                        studentInfo?.scholarship.benefits.split(',').map((item:string)=>{
                                                            return (<li>{item}</li>)
                                                        })
                                                    }
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
                                                    The application deadline for the <b>{studentInfo?.scholarship.title}</b> is <b>{
                                                        new Date(studentInfo?.scholarship.deadline)
                                                        .toLocaleDateString('en-US', { 
                                                            year: 'numeric', 
                                                            month: 'long', 
                                                            day: 'numeric' 
                                                        })
                                                    }</b> until only.
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
                                            src={`/print`}      // Insert iframe compatible pdf link here
                                            ref={iframeRef}
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
                                                {studentInfo?.status.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap:"40px"
                                    }}>
                                        {/* removed, 'cause it's not needed to have the download when there is one inside
                                        <Button variant="contained" 
                                            color="primary" 
                                            onClick={handleDownloadPDF}
                                            sx={{
                                                backgroundColor: '#00ddc0',
                                                height: '45px',
                                                padding:"0 20px",
                                                borderRadius: '5px',
                                                textTransform: 'capitalize',
                                                fontSize: '18px'
                                            }}
                                        >
                                            Download PDF
                                        </Button>
                                         */}
                                        <Button variant="contained" sx={{
                                            backgroundColor: '#BF9B30',
                                            height: '45px',
                                            padding:"0 20px",
                                            borderRadius: '5px',
                                            textTransform: 'capitalize',
                                            fontSize: '18px'
                                        }}
                                            onClick={()=>{navigate('editForms/1')}}
                                        >
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
    