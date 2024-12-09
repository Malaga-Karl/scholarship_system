import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Colors from "../../colors"
import { useState } from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate, useParams } from "react-router-dom"
import axios from "../../axiosConfig"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
// import { useParams } from "react-router-dom"

function FirstForm({ data, handleChange }: { data: any; handleChange: any }) {

    return (
        <>  
            <Typography variant="h4">SCHOLARSHIP APPLICATION FORM</Typography>
            <Typography
                variant="h5"
                sx={{ color: "white", backgroundColor: "black" }}
            >
                Personal Information
            </Typography>
            <Box sx={{ textAlign: "left", padding: 3 }}>
                <Typography variant="h5">Name:</Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Surname"
                        name="surname"
                        value={data.surname || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Given Name"
                        name="givenName"
                        value={data.givenName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Middle Name"
                        name="middleName"
                        value={data.middleName || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Typography variant="h5" mt={5}>
                    Current Home Address:
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="House/ Block/ Lot No."
                        name="houseNo"
                        value={data.houseNo || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Street"
                        name="street"
                        value={data.street || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Subdivision/ Village"
                        name="subdivision"
                        value={data.subdivision || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Barangay"
                        name="barangay"
                        value={data.barangay || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="City"
                        name="city"
                        value={data.city || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Province"
                        name="province"
                        value={data.province || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Typography variant="h5" mt={5}>
                    Other Information:
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        type="number"
                        sx={{ flex: 1 }}
                        label="Age"
                        name="age"
                        value={data.age || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Birthdate"
                        name="birthdate"
                        value={data.birthdate || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Religion"
                        name="religion"
                        value={data.religion || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Mobile Number"
                        name="mobileNumber"
                        value={data.mobileNumber || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Landline"
                        name="landline"
                        value={data.landline || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Email"
                        name="email"
                        value={data.email || ""}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </>
    );
}

function SecondForm({ data, handleChange }: { data: any; handleChange: any }) {
    return (
        <>
            <Typography variant="h5" sx={{ color: "white", backgroundColor: "black" }}>
                Scholastic Information
            </Typography>
            <Box sx={{ textAlign: "left", padding: 3 }}>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Course"
                        name="course"
                        value={data.course || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Major"
                        name="major"
                        value={data.major || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Current GWA"
                        name="gwa"
                        value={data.gwa || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 5 }}>
                        Level:
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            name="level"
                            value={data.level || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="first" control={<Radio />} label="1st" />
                            <FormControlLabel value="second" control={<Radio />} label="2nd" />
                            <FormControlLabel value="third" control={<Radio />} label="3rd" />
                            <FormControlLabel value="fourth" control={<Radio />} label="4th" />
                            <FormControlLabel value="fifth" control={<Radio />} label="5th" />
                        </RadioGroup>
                    </FormControl>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginRight: 5, marginLeft: 5 }}
                    >
                        Status:
                    </Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            name="status"
                            value={data.status || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="non-paying"
                                control={<Radio />}
                                label="Non-Paying"
                            />
                            <FormControlLabel value="paying" control={<Radio />} label="Paying" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Typography
                    variant="h5"
                    sx={{
                        color: "white",
                        backgroundColor: "black",
                        textAlign: "center",
                        marginTop: 5,
                    }}
                >
                    Family Background
                </Typography>
                <Typography variant="h5" mt={3}>
                    Father:
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Surname"
                        name="fatherSurname"
                        value={data.fatherSurname || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Given Name"
                        name="fatherGivenName"
                        value={data.fatherGivenName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Middle Name"
                        name="fatherMiddleName"
                        value={data.fatherMiddleName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Age"
                        name="fatherAge"
                        value={data.fatherAge || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Monthly Income"
                        name="fatherIncome"
                        value={data.fatherIncome || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Occupation"
                        name="fatherOccupation"
                        value={data.fatherOccupation || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Company"
                        name="fatherCompany"
                        value={data.fatherCompany || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Typography variant="h5" mt={5}>
                    Mother:
                </Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Surname"
                        name="motherSurname"
                        value={data.motherSurname || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Given Name"
                        name="motherGivenName"
                        value={data.motherGivenName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Middle Name"
                        name="motherMiddleName"
                        value={data.motherMiddleName || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Age"
                        name="motherAge"
                        value={data.motherAge || ""}
                        onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Monthly Income"
                        name="motherIncome"
                        value={data.motherIncome || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Occupation"
                        name="motherOccupation"
                        value={data.motherOccupation || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Company"
                        name="motherCompany"
                        value={data.motherCompany || ""}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </>
    );
}

function SiblingForm({ id, onRemove, siblingData, handleSiblingChange }: any) {
    return (
        <>
            <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5, marginTop: 5 }}>
                <TextField
                    variant="standard"
                    sx={{ flex: 1 }}
                    label="Name"
                    name="name"
                    value={siblingData.name}
                    onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                />
                <TextField
                    variant="standard"
                    sx={{ flex: 1 }}
                    label="Age"
                    name="age"
                    value={siblingData.age}
                    onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                />
                <FormControl>
                    <FormLabel>Studying</FormLabel>
                    <RadioGroup
                        row
                        name="studying"
                        value={siblingData.studying}
                        onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    variant="standard"
                    sx={{ flex: 1 }}
                    label="Highest Degree/ Year Level"
                    name="highestDegree"
                    value={siblingData.highestDegree}
                    onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                />
            </Box>
            <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                <TextField
                    variant="standard"
                    sx={{ flex: 1 }}
                    label="School Attended"
                    name="school"
                    value={siblingData.school}
                    onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                />
                <TextField
                    variant="standard"
                    sx={{ flex: 1 }}
                    label="Occupation/ Monthly Income"
                    name="occupation"
                    value={siblingData.occupation}
                    onChange={(e) => handleSiblingChange(id, e.target.name, e.target.value)}
                />
            </Box>
            <Box textAlign="right">
                <Button startIcon={<RemoveCircleIcon />} color="error" onClick={() => onRemove(id)}>
                    Remove Sibling
                </Button>
            </Box>
        </>
    );
}


function ThirdForm({ data, handleChange, handleSiblingChange, addSibling, removeSibling }: any) {
    const parentAddress = data.parentAddress;

    return (
        <>
            <Typography variant="h5" sx={{ color: "white", backgroundColor: "black", textAlign: "center", marginTop: 5 }}>
                Family Background
            </Typography>
            <Box sx={{ textAlign: "left", padding: 3 }}>
                <Typography variant="h5">Parent's Address & Contact Number</Typography>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="House/ Block/ Lot No."
                        name="houseNop"
                        value={parentAddress.houseNop}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Street"
                        name="streetp"
                        value={parentAddress.streetp}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Subdivision/ Village"
                        name="subdivisionp"
                        value={parentAddress.subdivisionp}
                        onChange={(e) => handleChange(e)}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Barangay"
                        name="barangayp"
                        value={parentAddress.barangayp}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="City"
                        name="cityp"
                        value={parentAddress.cityp}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Province"
                        name="provincep"
                        value={parentAddress.provincep}
                        onChange={(e) => handleChange(e)}
                    />
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "space-around", gap: 5 }} mt={3}>
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Mobile Number"
                        name="mobilep"
                        value={parentAddress.mobilep}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        variant="standard"
                        sx={{ flex: 1 }}
                        label="Landline"
                        name="landlinep"
                        value={parentAddress.landlinep}
                        onChange={(e) => handleChange(e)}
                    />
                </Box>
                <Typography variant="h5" mt={5}>
                    Siblings:
                </Typography>
                {data.siblings.map((sibling: any) => (
                    <SiblingForm
                        key={sibling.id}
                        id={sibling.id}
                        onRemove={removeSibling}
                        siblingData={sibling}
                        handleSiblingChange={handleSiblingChange}
                    />
                ))}
                <Button startIcon={<AddCircleIcon />} onClick={addSibling}>
                    Add Sibling
                </Button>
            </Box>
        </>
    );
}


export default function Form(){

    const { edit, sid } = useParams();
    const storedData = edit ? JSON.parse(localStorage.getItem("scholarshipFormData") || "{}") : null;
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        // FirstForm Data
        surname: "",
        givenName: "",
        middleName: "",
        houseNo: "",
        street: "",
        subdivision: "",
        barangay: "",
        city: "",
        province: "",
        age: "",
        birthdate: "",
        religion: "",
        mobileNumber: "",
        landline: "",
        email: "",

        // SecondForm Data
        course: "",
        major: "",
        gwa: "",
        level: "",
        status: "",
        fatherSurname: "",
        fatherGivenName: "",
        fatherMiddleName: "",
        fatherAge: "",
        fatherIncome: "",
        fatherOccupation: "",
        fatherCompany: "",
        motherSurname: "",
        motherGivenName: "",
        motherMiddleName: "",
        motherAge: "",
        motherIncome: "",
        motherOccupation: "",
        motherCompany: "",

        // ThirdForm Data
        parentAddress: {
            houseNo: "",
            street: "",
            subdivision: "",
            barangay: "",
            city: "",
            province: "",
            mobile: "",
            landline: "",
        },
        siblings: [
            {
                id: 0,
                name: "",
                age: "",
                studying: "",
                highestDegree: "",
                school: "",
                occupation: "",
            },
        ],
        ...storedData,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        // Check if the field belongs to parentAddress
        if (["houseNop", "streetp", "subdivisionp", "barangayp", "cityp", "provincep", "mobilep", "landlinep"].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                parentAddress: {
                    ...prevData.parentAddress, // Keep other fields intact
                    [name]: value, // Update only the targeted field
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value, // Update other fields normally
            }));
        }
    };

    const handleSiblingChange = (id: number, name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            siblings: prevData.siblings.map((sibling) =>
                sibling.id === id ? { ...sibling, [name]: value } : sibling
            ),
        }));
    };

    const addSibling = () => {
        setFormData((prevData) => ({
            ...prevData,
            siblings: [
                ...prevData.siblings,
                { id: prevData.siblings.length, name: "", age: "", studying: "", highestDegree: "", school: "", occupation: "" },
            ],
        }));
    };

    const removeSibling = (id: number) => {
        setFormData((prevData) => ({
            ...prevData,
            siblings: prevData.siblings.filter((sibling) => sibling.id !== id),
        }));
    };

    const [openPrompt, setOpenPrompt] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState('');
    const [error, setError] = useState('');

    const handleDialogClose = () => {
        setOpenPrompt(false);
        setDialogContent('');
        if(!error){
            navigate('/studentView/dashboard');
        }
        setError('');
    }
    
    const onSend = async (e:any) => {
        // Save formData to localStorage
        localStorage.setItem("scholarshipFormData", JSON.stringify(formData));
        setOpenPrompt(true);

        console.log("Form Data Submitted:", formData);
        if(!edit){
            const formDataSubmit = new FormData();
            const email = localStorage.getItem('localEmailActive') ?? '';
            formDataSubmit.append('student_email', email);
            formDataSubmit.append('scholarship_id', sid ?? '');
            formDataSubmit.append('status_id', '2');
            e.preventDefault();
            try {
                await axios.post('/user/studentScholarship/create', formDataSubmit);
                //console.log(response.data);
                setDialogContent('Record created successfully!');
            } catch (error) {
                console.error('Error creating record:', error);
                setError('Failed to create record. Please try again.');
            }
        }else{
            setDialogContent('Forms Edited Successfully!');
        }
        setOpenPrompt(true);
    };

    const [index, setIndex] = useState(0);
    const formPages = [
        <FirstForm data={formData} handleChange={handleChange}/>,
        <SecondForm data={formData} handleChange={handleChange}/>,
        <ThirdForm 
            data={formData}
            handleChange={handleChange}
            handleSiblingChange={handleSiblingChange}
            addSibling={addSibling}
            removeSibling={removeSibling}

        />
    ];

    return(
        <>
            <Toolbar/>
            <Box sx={{paddingLeft:10, paddingRight:10}}>
                {formPages[index]}
                {/* <SecondForm/> */}
                <Box sx={{display:"flex", justifyContent:"space-between", paddingBottom:3}}>
                    <Button variant="outlined" onClick={() => index > 0 ? setIndex(index-1) : navigate(-1)}>Back</Button>
                    {
                        index == formPages.length-1 ? (
                            <Button variant="contained" sx={{backgroundColor:Colors.gold}} onClick={onSend}>
                                Submit Form
                            </Button>
                        ) : (
                            <Button variant="contained" sx={{backgroundColor:Colors.blue}} onClick={() => index <= formPages.length-1 ? setIndex(index+1) : null}>
                                Next
                            </Button>
                        )
                    }
                </Box>
            </Box>
            {/* Just showing Dialog */}
            <Dialog
                open={openPrompt}
                onClose={() => setOpenPrompt(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Notice!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" color={
                        //just some colors to emphasize errors
                        error ? ("error") : ("success")
                    }>
                        {dialogContent || error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}