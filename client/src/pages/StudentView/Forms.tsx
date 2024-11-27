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
// import { useParams } from "react-router-dom"

function FirstForm(){
    return(
        <>
            <Typography variant="h4">SCHOLARSHIP APPLICATION FORM</Typography>
            <Typography variant="h5" sx={{color:"white", backgroundColor:"black"}}>Personal Information</Typography>
            <Box sx={{textAlign:"left", padding:3}}>
                <Typography variant="h5">Name:</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="Surname"/>
                    <TextField variant="standard" sx={{flex:1}} label="Given Name"/>
                    <TextField variant="standard" sx={{flex:1}} label="Middle Name"/>
                </Box> 
                <Typography variant="h5" mt={5}>Current Home Address:</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="House/ Block/ Lot No."/>
                    <TextField variant="standard" sx={{flex:1}} label="Street"/>
                    <TextField variant="standard" sx={{flex:1}} label="Subdivision/ Village"/>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Barangay"/>
                    <TextField variant="standard" sx={{flex:1}} label="City"/>
                    <TextField variant="standard" sx={{flex:1}} label="Province"/>
                </Box>
                <Typography variant="h5" mt={5}>Other Information:</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" type="number" sx={{flex:1}} label="Age"/>
                    <TextField variant="standard" sx={{flex:1}} label="Birthdate"/>
                    <TextField variant="standard" sx={{flex:1}} label="Religion"/>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Mobile Number"/>
                    <TextField variant="standard" sx={{flex:1}} label="Landline"/>
                    <TextField variant="standard" sx={{flex:1}} label="Email"/>
                </Box>
            </Box>
        </>
    )
}

function SecondForm(){
    return(
        <>
            <Typography variant="h5" sx={{color:"white", backgroundColor:"black"}}>Scholastic Information</Typography>
            <Box sx={{textAlign:"left", padding:3}}>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="Course"/>
                    <TextField variant="standard" sx={{flex:1}} label="Major"/>
                    <TextField variant="standard" sx={{flex:1}} label="Current GWA"/>
                </Box> 
                <Box sx={{display:"flex", alignItems:"center", marginTop:1}}>
                    <Typography variant="h5" sx={{fontWeight:"bold", marginRight:5}}>Level:</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="first" control={<Radio />} label="1st" />
                            <FormControlLabel value="second" control={<Radio />} label="2nd" />
                            <FormControlLabel value="third" control={<Radio />} label="3rd" />
                            <FormControlLabel value="fourth" control={<Radio />} label="4th" />
                            <FormControlLabel value="fifth" control={<Radio />} label="5th" />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="h5" sx={{fontWeight:"bold", marginRight:5, marginLeft:5}}>Status:</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="non-paying" control={<Radio />} label="Non-Paying" />
                            <FormControlLabel value="paying" control={<Radio />} label="Paying" />
                            
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Typography variant="h5" sx={{color:"white", backgroundColor:"black", textAlign:"center", marginTop:5}}>Family Background</Typography>
                <Typography variant="h5" mt={3}>Father:</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="Surname"/>
                    <TextField variant="standard" sx={{flex:1}} label="Given Name"/>
                    <TextField variant="standard" sx={{flex:1}} label="Middle Name"/>
                    <TextField variant="standard" sx={{flex:1}} label="Age"/>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Monthly Income"/>
                    <TextField variant="standard" sx={{flex:1}} label="Occupation"/>
                    <TextField variant="standard" sx={{flex:1}} label="Company"/>
                </Box>
                <Typography variant="h5" mt={5}>Mother:</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="Surname"/>
                    <TextField variant="standard" sx={{flex:1}} label="Given Name"/>
                    <TextField variant="standard" sx={{flex:1}} label="Middle Name"/>
                    <TextField variant="standard" sx={{flex:1}} label="Age"/>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Monthly Income"/>
                    <TextField variant="standard" sx={{flex:1}} label="Occupation"/>
                    <TextField variant="standard" sx={{flex:1}} label="Company"/>
                </Box>
            </Box>
        </>
    )
}

type SiblingProps = {
    id: number,
    onRemove: (id:number) => void
}

function SiblingForm({id, onRemove}: SiblingProps){
    return(
        <>
            <Box display={"flex"} sx={{justifyContent:"space-around", gap:5, marginTop:5}}>
                <TextField variant="standard" type="number" sx={{flex:1}} label="Name"/>
                <TextField variant="standard" sx={{flex:1}} label="Age"/>
                <FormControl>
                    <FormLabel>Studying</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        
                    </RadioGroup>
                </FormControl>
                <TextField variant="standard" sx={{flex:1}} label="Highest Degree/ Year Level"/>
            </Box>
            <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                <TextField variant="standard" sx={{flex:1}} label="School Attended"/>
                <TextField variant="standard" sx={{flex:1}} label="Occupation/ Monthly Income"/>
            </Box>
            <Box textAlign="right">
                <Button startIcon={<RemoveCircleIcon />} color="error" onClick={() => onRemove(id)}>
                    Remove Sibling
                </Button>
            </Box>
        </>
    )
}

function ThirdForm(){

    const [siblings, setSiblings] = useState([{ id: 0 }]);

    const addSiblingForm = () => {
        setSiblings([...siblings, { id: siblings.length }]);
    };

    const removeSiblingForm = (id:number) => {
        setSiblings(siblings.filter((sibling) => sibling.id !== id));
    };

    return(
        <>
            <Typography variant="h5" sx={{color:"white", backgroundColor:"black", textAlign:"center", marginTop:5}}>Family Background</Typography>
            <Box sx={{textAlign:"left", padding:3}}>
                <Typography variant="h5">Parent's Address & Contact Number</Typography>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}}>
                    <TextField variant="standard" sx={{flex:1}} label="House/ Block/ Lot No."/>
                    <TextField variant="standard" sx={{flex:1}} label="Street"/>
                    <TextField variant="standard" sx={{flex:1}} label="Subdivision/ Village"/>
                </Box> 
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Barangay"/>
                    <TextField variant="standard" sx={{flex:1}} label="City"/>
                    <TextField variant="standard" sx={{flex:1}} label="Province"/>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-around", gap:5}} mt={3}>
                    <TextField variant="standard" sx={{flex:1}} label="Mobile Number"/>
                    <TextField variant="standard" sx={{flex:1}} label="Landline"/>
                </Box>
                <Typography variant="h5" mt={5}>Siblings:</Typography>
                {siblings.map((sibling) => (
                    <SiblingForm key={sibling.id} id={sibling.id} onRemove={removeSiblingForm} />
                ))}
               <Button startIcon={<AddCircleIcon />}  onClick={addSiblingForm}>
                    Add Sibling
                </Button>
            </Box>
        </>
    )
}

export default function Form(){

    const [index, setIndex] = useState(0)
    const formPages = [
        <FirstForm/>,
        <SecondForm/>,
        <ThirdForm/>
    ];

    return(
        <>
            <Toolbar/>
            <Box sx={{paddingLeft:10, paddingRight:10}}>
                {formPages[index]}
                {/* <SecondForm/> */}
                <Box sx={{display:"flex", justifyContent:"space-between", paddingBottom:3}}>
                    <Button variant="outlined" onClick={() => index > 0 ? setIndex(index-1) : null}>Back</Button>
                    {
                        index == formPages.length-1 ? (
                            <Button variant="contained" sx={{backgroundColor:Colors.gold}} onClick={() => window.location.href = "/studentview/"}>
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
        </>
    )
}