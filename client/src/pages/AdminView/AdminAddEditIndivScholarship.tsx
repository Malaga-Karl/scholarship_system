import ArrowBack from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    } from "@mui/material";

//icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { axiosBase } from "../../axiosConfig";

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

export default function AddEditIndivScholarship(){
    const [title, setTitle] = useState('');
    
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState('');
    const [errors, setErrors] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const { indiv_scholarship_id } = useParams();
    const navigate = useNavigate();

    //image handling
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validFileTypes.includes(file.type)) {
                setErrors("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
                setOpenDialog(true);
                return;
            }
            setImage(file);
            //const name = file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
            setImagePreview(URL.createObjectURL(file));
        }
    };


    //added stuff, fuckign designers, you guys sucks at front-ending niggers
    //Description///////////////////////////////////////////////////////////////////////////////////////
    // State to store the list of input fields
    const [description, setDescription] = useState('');

    const handleDescriptionChange = (event:any) =>{
        setDescription(event.target.value)
    }

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
        const convertObjectToArrayB = Object.values(benefitsInputValues);
    
        // Create FormData object
        const formData = new FormData();
        if (image) 
            formData.append("logo", image);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('benefits', convertObjectToArrayB.join(','));  // Join array to string
        
        try {
            if (indiv_scholarship_id) {
                // Update existing scholarship
                await axios.put(`/foundations/updateIndividualScholarship/${indiv_scholarship_id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setDialogContent("Scholarship updated successfully!");
            } else {
                // Create new indiv scholarship
                await axios.post("/foundations/addIndivScholarship", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setDialogContent("Scholarship created successfully!");
            }
        } catch (error) {
            console.error("Error saving scholarship:", error);
            setErrors("Failed to save the scholarship. Please try again. : [" + error + "]");
        }
        setOpenDialog(true);
    };
    

    
    const handleCloseDialog = () =>{
        
        
        setDialogContent('');
        setOpenDialog(false);

        if(!errors){
            navigate("/adminView/indivscholarships"); // Redirect after save
            
        }
        setErrors('');
            
        
    }


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Function to fetch scholarship details if scholarship_id exists
    useEffect(() => {
        if (indiv_scholarship_id) {
            
            setLoading(true);
            axios.get(`/foundations/getIndividualScholarship/${indiv_scholarship_id}`)
                .then(response => {
                    const data = response.data.indivScholarship;
    
                    // Ensure each state is updated correctly and in sequence
                    console.log(data);
                    setTitle(data.title);
                    setDescription(data.description);
    
                    // Handling benefits safely
                    const benefits = data.benefits ?? '';
    
                    // Splitting benefits and setting input fields and values
                    const benefitsArray = benefits.split(',').reduce((acc: any, item: string, index: number) => {
                        acc.push({ id: index, value: item.trim() });
                        return acc;
                    }, []);
                    
                    // Ensure benefits input fields are set first
                    setbenefitsInputFields(benefitsArray);
                    
                    // Set the benefits input values after fields have been updated
                    setbenefitsInputValues(benefitsArray.reduce((acc: any, item: any, index: number) => {
                        acc[index] = item.value; // Assign the value to the corresponding index
                        return acc;
                    }, {}));

                    if(data.logo_path)
                        setImagePreview(`${axiosBase}/uploads${data.logo_path}`);

                })
                .catch(error => {
                    setErrors("Failed to load scholarship details: " + error);
                    console.log("Error In Fetching Scholarship Info: " + error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [indiv_scholarship_id]);

    //getting all the foundations that does not have scholarships yet
    const [loading, setLoading] = useState<boolean>(false);

    if (loading) {
        return <p style={{margin:"300px auto"}}>Loading...</p>;
    }

    if(errors){
        if(!openDialog)
            setOpenDialog(true);
    }

    return(
        
        <>
        <Box sx={{display: 'flex', flexDirection: 'column', margin:'80px auto 0 auto', width: '90%', height: 'auto', border: 'ridge', borderRadius: '15px', padding: '20px'}}>
            <Button startIcon={<ArrowBack/>} sx={{alignSelf: 'flex-start', backgroundColor: 'transparent', border: 'none', color: 'black', textTransform: 'capitalize', fontSize: '20px', marginBottom: '5px'}} onClick={()=>{navigate("/adminView/indivscholarships")}}>Go Back</Button>
            
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                    <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold'}}>SCHOLARSHIP (INDIVIDUAL) OFFER DETAILS</Typography>
                </Box>
                <Box sx={{display: 'flex', marginLeft: '50px', marginRight: '50px', marginBottom: '1px', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                        {/* Image Upload */}
                        <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px' }}>
                            Scholarship (Individual) logo
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            id="upload-image"
                        />
                        <label htmlFor="upload-image">
                            <Button
                                variant="contained"
                                component="span"
                                sx={{
                                    width: '450px',
                                    height: '160px',
                                    textTransform: 'none',
                                    padding: '16px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    display: 'flex',
                                    background: '#D9D9D9',
                                    border: '2px dashed',
                                    fontSize: '20px',
                                    borderRadius: '8px',
                                }}
                                startIcon={(image || indiv_scholarship_id) ? '' : <InsertPhotoIcon /> }
                            >
                                {(image || indiv_scholarship_id) ? 
                                    <img 
                                        id="image_preview_tag"
                                        src={imagePreview} 
                                        alt="Uploaded Image Preview" 
                                        style={{
                                            maxHeight:"100%",
                                        }}
                                    />
                                : 'Attach Image here'}
                            </Button>
                        </label>
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
                        
                        
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '500px'}}>
                        
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
                        <Box sx={{display: 'flex', flexDirection: 'column', position: 'relative', width: '550px'}}>
                            <Button type="submit" variant="contained" sx={{alignSelf:"flex-end", marginRight:"50px",backgroundColor: '#BF9B30', height: '40px', width: '100px', borderRadius: '5px', textTransform: 'capitalize', fontSize: '15px'}}>Save</Button>
                        </Box>
                    </Box>
                </Box>
            </form>
        </Box>
        {/* Notice Dialog */}
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"
                    color={errors?'error' : 'success'}
                >
                    {errors ? errors : dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="success">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}