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

export default function AddEditScholarship(){
    const [value, setValue] = React.useState<Dayjs | null>(null);  // Default to null
    const [slotsLeft, setSlotsLeft] = useState<number>(0); // Initial value for slotsLeft
    const [isActive, setIsActive] = useState<boolean>(false); // Checkbox state for "Is Active"

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsActive(event.target.checked);
    };

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '60px', marginLeft:'20px', width: '1150px', height: '600px', border: 'ridge', borderRadius: '15px', padding: '20px'}}>
            <Button startIcon={<ArrowBack/>} sx={{alignSelf: 'flex-start', backgroundColor: 'transparent', border: 'none', color: 'black', textTransform: 'capitalize', fontSize: '20px', marginBottom: '5px'}}>Go Back</Button>
            <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold'}}>SCHOLARSHIP OFFER DETAILS</Typography>
            </Box>
            <Box sx={{display: 'flex', marginLeft: '50px', marginRight: '50px', marginBottom: '1px', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                    <Typography variant='h5' sx={{fontWeight: 'bold', marginBottom: '10px'}}>Scholarship Name</Typography>
                    <TextField variant="standard" sx={{flex:1, width: '500px'}} placeholder="Scholarship Offer"/>
                    <Box sx={{ fontSize: '0.800rem', color: 'text.secondary', textAlign: 'left', marginBottom: '20px'}}>Name of Scholarship Offer</Box>
                    <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '10px'}}>Description</Typography>
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
                    <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '10px'}}>Eligibility Criteria</Typography>
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
                            borderRadius: '16px'
                        }
                        }}
                    />
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
                        <Button variant="contained" sx={{position: 'absolute', bottom: '16', right: '0', backgroundColor: '#BF9B30', height: '40px', width: '100px', borderRadius: '5px', textTransform: 'capitalize', fontSize: '15px'}}>Save</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}