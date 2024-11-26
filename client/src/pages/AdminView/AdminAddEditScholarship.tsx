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
import React from "react";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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
    const [value, setValue] = React.useState<Dayjs | null>(null);  // Default to null
    const [slotsLeft, setSlotsLeft] = useState<number>(0); // Initial value for slotsLeft
    const [isActive, setIsActive] = useState<boolean>(false); // Checkbox state for "Is Active"

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsActive(event.target.checked);
    };

    
  
    //added stuff, fuckign designers, you guys sucks at front-ending niggers
    // State to store the list of input fields
    const [descriptionInputFields, setdescriptionInputFields] = useState([{ id: Date.now()}]);
    const [descriptionInputValues, setdescriptionInputValues] = useState<{ [key: number]: string }>({});

    const handleRemoveField = (id: number) => {
        if(descriptionInputFields.length > 1){
            setdescriptionInputFields(descriptionInputFields.filter((field) => field.id !== id));
            // Optionally remove the value from the inputValues as well
            const updatedValues = { ...descriptionInputValues };
            delete updatedValues[id];
            setdescriptionInputValues(updatedValues);
        }
    };

    // Handle the addition of a new input field
    const handleAddField = (index: number) => {
        const newField = { id: Date.now()}; // New input field with a unique id
        const updatedFields = [...descriptionInputFields];
        let counter = 0;
        for(let i = 0; i < descriptionInputFields.length; i++)
            if(index === descriptionInputFields[i].id)
                counter = i;
        updatedFields.splice(counter + 1, 0, newField); // Insert at the given index + 1 (after the selected index)
        setdescriptionInputFields(updatedFields);
    };

    // Handle the input change
    const handleInputChange = (id: number, value: string) => {
        setdescriptionInputValues((prevValues) => ({ //prev values is a case to case state, i think it will loop through every object inside values idk
        ...prevValues,//copies the current state of prevValues
        [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission (page reload)

        const convertObjectToArray = Object.values(descriptionInputValues);
        console.log('Submitted values:', convertObjectToArray);
    }


    return(
        <Box sx={{display: 'flex', flexDirection: 'column', margin:'80px auto 0 auto', width: '90%', height: '600px', border: 'ridge', borderRadius: '15px', padding: '20px'}}>
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
                            <TextField variant="standard" sx={{flex:1, width: '500px'}} placeholder="Scholarship Offer"/>
                            <Box sx={{ fontSize: '0.800rem', color: 'text.secondary', textAlign: 'left', marginBottom: '20px'}}>Name of Scholarship Offer</Box>
                        </Box>
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold'}}>Description</Typography>
                        {/*Description*/}
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
                            {descriptionInputFields.map((field) => (
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
                                    onClick={() => handleRemoveField(field.id)}
                                >
                                    <RemoveCircleOutlineIcon color="error" />
                                </Button>

                                {/* Input field */}
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={descriptionInputValues[field.id] || ''} // Bind value to the state
                                    onChange={(e) => handleInputChange(field.id, e.target.value)} // Update state on change
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
                                    onClick={() => handleAddField(field.id)}
                                >
                                    <AddCircleOutlineIcon color="success"/>
                                </Button>
                                </Box>
                            ))}
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
                            {descriptionInputFields.map((field) => (
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
                                    onClick={() => handleRemoveField(field.id)}
                                >
                                    <RemoveCircleOutlineIcon color="error" />
                                </Button>

                                {/* Input field */}
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    value={descriptionInputValues[field.id] || ''} // Bind value to the state
                                    onChange={(e) => handleInputChange(field.id, e.target.value)} // Update state on change
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
                                    onClick={() => handleAddField(field.id)}
                                >
                                    <AddCircleOutlineIcon color="success"/>
                                </Button>
                                </Box>
                            ))}
                        </Box>
                        
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '10px'}}>Requirements</Typography>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={5} // Defines the number of visible rows in the TextArea
                            // value={description}
                            // onChange={descriptionHandleChange}
                            fullWidth
                            sx={{
                            '& .MuiInputBase-root': {
                                padding: '10px', // You can adjust the padding as needed
                                borderRadius: '16px',
                                marginBottom: '20px',
                            }
                            }}
                        />
                        <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px'}}>Benefits</Typography>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={5} // Defines the number of visible rows in the TextArea
                            // value={description}
                            // onChange={descriptionHandleChange}
                            fullWidth
                            sx={{
                            '& .MuiInputBase-root': {
                                padding: '10px', // You can adjust the padding as needed
                                borderRadius: '16px',
                                marginBottom: '20px'
                            }
                            }}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px'}}>
                            <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingRight: '18px'}}>Deadline</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DatePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    sx={{width: '200px',
                                        fontSize: '0.8rem', // Adjust the font size inside the input
                                        '.MuiInputBase-input': {
                                            // padding: '4px 8px'
                                            height: '3px',
                                            overflow: 'hidden'
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