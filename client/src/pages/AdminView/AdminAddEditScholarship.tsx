import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect } from "react";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";

// Custom Number Input Component with Increment/Decrement
const CustomNumberInput: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  sx?: object;  // Adding sx prop to allow custom styling
}> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {

  const handleIncrement = () => {
    if (value + step <= max) onChange(value + step);
  };

  const handleDecrement = () => {
    if (value - step >= min) onChange(value - step);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        InputProps={{
          inputProps: {
            min,  // minimum value
            max,  // maximum value
            step, // step value for increment/decrement
          }
        }}
        sx={{
          width: "200px",
          textAlign: "center",
        //   marginLeft: "8px",
        //   marginRight: "8px",
          fontSize: '0.8rem',
        }}
        size='small'
      />
    </Box>
  );
};

const scrollbarDesign = {
    // Scrollbar styling
    '&::-webkit-scrollbar': {
    width: '8px', // Default width for vertical scrollbar
    height: '6px', // Default height for horizontal scrollbar
    },
    '&::-webkit-scrollbar-track': {
    background: 'transparent', // Make the track transparent
    borderRadius: '10px', // Apply border radius to the track
    margin: '2px', // Optional: adds space between scrollbar and container edges
    },
    '&::-webkit-scrollbar-thumb': {
    background: '#888', // Color of the scrollbar thumb
    borderRadius: '10px', // Apply border radius to the thumb
    },
    '&::-webkit-scrollbar-thumb:hover': {
    background: '#555', // Hover color for the scrollbar thumb
    },
    // Optional: To ensure vertical and horizontal scrollbars have different width/height
    '&::-webkit-scrollbar:horizontal': {
    height: '10px', // Set horizontal scrollbar height
    },
    '&::-webkit-scrollbar:vertical': {
    width: '12px', // Set vertical scrollbar width
    },
};

export default function AddEditScholarship(){
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState<Dayjs | null>(null);  // Default to null
    const [slotsLeft, setSlotsLeft] = useState(0); // Initial value for slotsLeft
    const [isActive, setIsActive] = useState<boolean>(false); // Checkbox state for "Is Active"
    const [foundation, setFoundation] = useState<number | string>('');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsActive(event.target.checked);
    };
    
    const handleFoundationChange = (event: SelectChangeEvent<number | string>) => {
        setFoundation(event.target.value);
    };
    
  
    //added stuff, fuckign designers, you guys sucks at front-ending niggers
    //Description///////////////////////////////////////////////////////////////////////////////////////
    // State to store the list of input fields
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event:any) =>{
        setDescription(event.target.value)
    }

    //Eligibility///////////////////////////////////////////////////////////////////////////////////////
    // State to store the list of input fields
    const [eligibilityInputFields, seteligibilityInputFields] = useState([{ id: Date.now()}]);
    const [eligibilityInputValues, seteligibilityInputValues] = useState<{ [key: number]: string }>({});

    const handleEligibilityRemoveField = (id: number) => {
        if(eligibilityInputFields.length > 1){
            seteligibilityInputFields(eligibilityInputFields.filter((field) => field.id !== id));
            // Optionally remove the value from the inputValues as well
            const updatedValues = { ...eligibilityInputValues };
            delete updatedValues[id];
            seteligibilityInputValues(updatedValues);
        }
    };

    // Handle the addition of a new input field
    const handleEligibilityAddField = (index: number) => {
        const newField = { id: Date.now()}; // New input field with a unique id
        const updatedFields = [...eligibilityInputFields];
        let counter = 0;
        for(let i = 0; i < eligibilityInputFields.length; i++)
            if(index === eligibilityInputFields[i].id)
                counter = i;
        updatedFields.splice(counter + 1, 0, newField); // Insert at the given index + 1 (after the selected index)
        seteligibilityInputFields(updatedFields);
    };

    // Handle the input change
    const handleEligibilityInputChange = (id: number, value: string) => {
        seteligibilityInputValues((prevValues) => ({ //prev values is a case to case state, i think it will loop through every object inside values idk
        ...prevValues,//copies the current state of prevValues
        [id]: value,
        }));
    };

    //Requirements///////////////////////////////////////////////////////////////////////////////////////
    // State to store the list of input fields
    const [requirementInputFields, setrequirementInputFields] = useState([{ id: Date.now()}]);
    const [requirementInputValues, setrequirementInputValues] = useState<{ [key: number]: string }>({});

    const handleRequirementRemoveField = (id: number) => {
        if(requirementInputFields.length > 1){
            setrequirementInputFields(requirementInputFields.filter((field) => field.id !== id));
            // Optionally remove the value from the inputValues as well
            const updatedValues = { ...requirementInputValues };
            delete updatedValues[id];
            setrequirementInputValues(updatedValues);
        }
    };

    // Handle the addition of a new input field
    const handleRequirementAddField = (index: number) => {
        const newField = { id: Date.now()}; // New input field with a unique id
        const updatedFields = [...requirementInputFields];
        let counter = 0;
        for(let i = 0; i < requirementInputFields.length; i++)
            if(index === requirementInputFields[i].id)
                counter = i;
        updatedFields.splice(counter + 1, 0, newField); // Insert at the given index + 1 (after the selected index)
        setrequirementInputFields(updatedFields);
    };

    // Handle the input change
    const handleRequirementInputChange = (id: number, value: string) => {
        setrequirementInputValues((prevValues) => ({ //prev values is a case to case state, i think it will loop through every object inside values idk
        ...prevValues,//copies the current state of prevValues
        [id]: value,
        }));
    };

    //Benefits///////////////////////////////////////////////////////////////////////////////////////
    // State to store the list of input fields
    const [benefitsInputFields, setbenefitsInputFields] = useState([{ id: Date.now()}]);
    const [benefitsInputValues, setbenefitsInputValues] = useState<{ [key: number]: string }>({});

    const handleBenefitRemoveField = (id: number) => {
        if(benefitsInputFields.length > 1){
            setbenefitsInputFields(benefitsInputFields.filter((field) => field.id !== id));
            // Optionally remove the value from the inputValues as well
            const updatedValues = { ...benefitsInputValues };
            delete updatedValues[id];
            setbenefitsInputValues(updatedValues);
        }
    };

    // Handle the addition of a new input field
    const handleBenefitAddField = (index: number) => {
        const newField = { id: Date.now()}; // New input field with a unique id
        const updatedFields = [...benefitsInputFields];
        let counter = 0;
        for(let i = 0; i < benefitsInputFields.length; i++)
            if(index === benefitsInputFields[i].id)
                counter = i;
        updatedFields.splice(counter + 1, 0, newField); // Insert at the given index + 1 (after the selected index)
        setbenefitsInputFields(updatedFields);
    };

    // Handle the input change
    const handleBenefitInputChange = (id: number, value: string) => {
        setbenefitsInputValues((prevValues) => ({ //prev values is a case to case state, i think it will loop through every object inside values idk
        ...prevValues,//copies the current state of prevValues
        [id]: value,
        }));
    };

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission (page reload)
    
        // Convert the objects to arrays
        const convertObjectToArrayE = Object.values(eligibilityInputValues);
        const convertObjectToArrayR = Object.values(requirementInputValues);
        const convertObjectToArrayB = Object.values(benefitsInputValues);
    
        // Create FormData object
        const formData = new FormData();
        formData.append('foundation_id', foundation.toString());
        formData.append('title', title);
        formData.append('slots', slotsLeft.toString());
        formData.append('deadline', deadline ? deadline.toISOString() : '');  // Ensure proper date format
        formData.append('scholarship_description', description);
        formData.append('eligibility', convertObjectToArrayE.join(','));  // Join array to string
        formData.append('reqs', convertObjectToArrayR.join(','));  // Join array to string
        formData.append('benefits', convertObjectToArrayB.join(','));  // Join array to string
    
        try {
            // Send the data to the backend using Axios
            const response = await axios.post("http://localhost:3001/foundations/add_scholarship", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure proper encoding for form data
                },
            });
    
            // Handle success response
            console.log("Form submitted successfully:", response.data);
            alert("Scholarship created successfully!");
    
            // Reset form values after successful submission
            setDeadline(null);
            setDescription('');
            setTitle('');
            setSlotsLeft(0);
            setFoundation('');
            setbenefitsInputValues([]);
            setbenefitsInputFields([]);
            seteligibilityInputValues([]);
            seteligibilityInputFields([]);
            setrequirementInputValues([]);
            setrequirementInputFields([]);
        } catch (error: any) {
            console.error("Error submitting form:", error);
            alert("Failed to create the Scholarship. Please try again.");
        }
    };
    

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Foundation type
    interface Foundation {
        foundation_id: number;
        name: string;
    }


    //getting all the foundations that does not have scholarships yet
    const [noFScholarship,setNoFScholarship] = useState<Foundation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFoundationsWithoutScholarships = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Foundation[]>(
                    'http://localhost:3001/foundations/no_scholarship'
                );
                setNoFScholarship(response.data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch foundations T_T aggggggghhhhhhhhhhhhh my head hurts');
            } finally {
                setLoading(false);
            }
        };

        fetchFoundationsWithoutScholarships();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', margin:'80px auto 0 auto', width: '90%', height: 'auto', border: 'ridge', borderRadius: '15px', padding: '20px'}}>
            <Button startIcon={<ArrowBack/>} sx={{alignSelf: 'flex-start', backgroundColor: 'transparent', border: 'none', color: 'black', textTransform: 'capitalize', fontSize: '20px', marginBottom: '5px'}}>Go Back</Button>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                    <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold'}}>SCHOLARSHIP OFFER DETAILS</Typography>
                </Box>
                <Box sx={{display: 'flex', marginLeft: '50px', marginRight: '50px', marginBottom: '1px', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                        <Typography variant='h5' sx={{fontWeight: 'bold', marginBottom: '10px'}}>Scholarship Name</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <TextField 
                                value={title}
                                onChange={handleTitleChange}
                                variant="standard" 
                                sx={{flex:1, width: '500px'}} 
                                placeholder="Scholarship Offer"
                                required
                            />
                            <Box sx={{ fontSize: '0.800rem', color: 'text.secondary', textAlign: 'left', marginBottom: '20px'}}>Name of Scholarship Offer</Box>
                        </Box>
                        {/* Foundation Selector */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                            <InputLabel id="foundation_selector" >Foundation</InputLabel>
                            <Select
                                labelId="foundation_selector"
                                id="foundation_selector_select"
                                label="Foundation"
                                value={foundation}
                                onChange={handleFoundationChange}
                            >
                                {noFScholarship.map((foundation)=>{
                                    return (
                                        <MenuItem value={foundation.foundation_id}>{foundation.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        {/*Description*/}
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold'}}>Description</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width:'100%',
                        }}>
                            <TextField
                                value={description}
                                onChange={handleDescriptionChange}
                                variant="outlined"
                                minRows={4}
                                maxRows={4} // Restricts to a maximum of 4 rows
                                multiline
                                fullWidth
                                placeholder="Scholarship Description"
                                required
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px", // Set border radius for the input field
                                    },
                                    marginBottom: "10px",
                                    "& .MuiOutlinedInput-input": {
                                        overflowY: "auto", // Enables vertical scrolling
                                        ...scrollbarDesign, // Apply the scrollbar design here
                                    },
                                }}
                            />


                        </Box>
                        {/*Eligibility Criteria*/}
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '10px'}}>Eligibility Criteria</Typography>
                        <Box
                            boxSizing="border-box"
                            width="100%"
                            border="1px solid black"
                            height="130px"
                            margin="0 0 20px 0"
                            borderRadius="10px"
                            overflow="auto"
                            padding="20px"
                            sx={{
                                ...scrollbarDesign,
                            }}
                            >
                            {eligibilityInputFields.map((field) => (
                                <Box
                                key={field.id}
                                display="flex"
                                alignItems="center"
                                marginBottom="10px"
                                >
                                {/* Button to remove the input field */}
                                <Button
                                    variant="text"
                                    color="secondary"
                                    sx={{ marginRight: '10px' }}
                                    onClick={() => handleEligibilityRemoveField(field.id)}
                                >
                                    <RemoveCircleOutlineIcon color="error" />
                                </Button>

                                {/* Input field */}
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={eligibilityInputValues[field.id] || ''} // Bind value to the state
                                    onChange={(e) => handleEligibilityInputChange(field.id, e.target.value)} // Update state on change
                                    sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '14px',
                                        padding: '2px 10px', // Adjust the padding
                                        borderRadius: '16px',
                                    },
                                    }}
                                />

                                {/* Button to add a new input field below */}
                                <Button
                                    variant="text"
                                    color="primary"
                                    sx={{ marginLeft: '10px' }}
                                    onClick={() => handleEligibilityAddField(field.id)}
                                >
                                    <AddCircleOutlineIcon color="success"/>
                                </Button>
                                </Box>
                            ))}
                        </Box>
                        
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                        {/*Requirements*/}
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '10px'}}>Requirements</Typography>
                        <Box
                            boxSizing="border-box"
                            width="100%"
                            border="1px solid black"
                            height="130px"
                            margin="0 0 20px 0"
                            borderRadius="10px"
                            overflow="auto"
                            padding="20px"
                            sx={{
                                ...scrollbarDesign,}}
                        >
                            {requirementInputFields.map((field) => (    
                                <Box
                                key={field.id}
                                display="flex"
                                alignItems="center"
                                marginBottom="10px"
                                >
                                {/* Button to remove the input field */}
                                <Button
                                    variant="text"
                                    color="secondary"
                                    sx={{ marginRight: '10px' }}
                                    onClick={() => handleRequirementRemoveField(field.id)}
                                >
                                    <RemoveCircleOutlineIcon color="error" />
                                </Button>

                                {/* Input field */}
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={requirementInputValues[field.id] || ''} // Bind value to the state
                                    onChange={(e) => handleRequirementInputChange(field.id, e.target.value)} // Update state on change
                                    sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '14px',
                                        padding: '2px 10px', // Adjust the padding
                                        borderRadius: '16px',
                                    },
                                    }}
                                />

                                {/* Button to add a new input field below */}
                                <Button
                                    variant="text"
                                    color="primary"
                                    sx={{ marginLeft: '10px' }}
                                    onClick={() => handleRequirementAddField(field.id)}
                                >
                                    <AddCircleOutlineIcon color="success"/>
                                </Button>
                                </Box>
                            ))}
                        </Box>
                        {/*Benefits*/}
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px'}}>Benefits</Typography>
                        <Box
                            boxSizing="border-box"
                            width="100%"
                            border="1px solid black"
                            height="130px"
                            margin="0 0 20px 0"
                            borderRadius="10px"
                            overflow="auto"
                            padding="20px"
                            sx={{
                                ...scrollbarDesign,}}
                        >
                            {benefitsInputFields.map((field) => (    
                                <Box
                                key={field.id}
                                display="flex"
                                alignItems="center"
                                marginBottom="10px"
                                >
                                {/* Button to remove the input field */}
                                <Button
                                    variant="text"
                                    color="secondary"
                                    sx={{ marginRight: '10px' }}
                                    onClick={() => handleBenefitRemoveField(field.id)}
                                >
                                    <RemoveCircleOutlineIcon color="error" />
                                </Button>

                                {/* Input field */}
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={benefitsInputValues[field.id] || ''} // Bind value to the state
                                    onChange={(e) => handleBenefitInputChange(field.id, e.target.value)} // Update state on change
                                    sx={{
                                    '& .MuiInputBase-root': {
                                        fontSize: '14px',
                                        padding: '2px 10px', // Adjust the padding
                                        borderRadius: '16px',
                                    },
                                    }}
                                />

                                {/* Button to add a new input field below */}
                                <Button
                                    variant="text"
                                    color="primary"
                                    sx={{ marginLeft: '10px' }}
                                    onClick={() => handleBenefitAddField(field.id)}
                                >
                                    <AddCircleOutlineIcon color="success"/>
                                </Button>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                marginBottom: '7px'
                            }}>
                            <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingRight: '18px'}}>Deadline</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer  components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                    
                                    value={deadline}
                                    onChange={(newValue) => setDeadline(newValue)}
                                    sx={{width: '200px',
                                        fontSize: '0.8rem', // Adjust the font size inside the input
                                        '.MuiInputBase-input': {
                                            height: '10px'
                                        }
                                    }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingRight: '9px'}}>Slots Left</Typography>
                            <CustomNumberInput
                                value={slotsLeft}
                                onChange={setSlotsLeft}
                                min={0}
                                max={+Infinity} // Set a maximum value for slots
                                step={1}  // Adjust step value as needed
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', width: '550px'}}>
                            {/* Checkbox for "Is Active" */}
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={isActive}
                                    onChange={handleCheckboxChange}
                                    sx={{
                                    color: "black",  // Blue color for checkbox
                                    '&.Mui-checked': {
                                        color: "#1976d2",  // Blue color when checked
                                    },
                                    }}
                                />
                                }
                                label="Notify all recipients through email."
                            />
                            <Button type="submit" variant="contained" sx={{position: 'absolute', bottom: '16', right: '0', backgroundColor: '#BF9B30', height: '40px', width: '100px', borderRadius: '5px', textTransform: 'capitalize', fontSize: '15px'}}>Save</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}