import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export default function AddEditFoundation(){
    // State to store the uploaded image URL and file name
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    // Handle file input change event
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
        // Create a URL for the image and set it to state
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        // Set the file name (limit it to 20 characters)
        const name = file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
        setFileName(name);
        }
    };

    // Handle removing the uploaded image
    const handleRemoveImage = () => {
        setImage(null); // Clear the image
        setFileName(null); // Clear the file name
    };

    // Separate state for each text field
    const [foundation, setFoundation] = useState<string>(''); // State for foundation
    const [description, setDescription] = useState<string>(''); // State for description

    // Handle change for Foundation TextField
    const foundationHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFoundation(event.target.value); // Update foundation state
    };

    // Handle change for Description TextField
    const descriptionHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value); // Update description state
    };
    
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '55px', marginLeft:'20px', width: '1150px', height: '600px', border: 'ridge', borderRadius: '15px', padding: '20px'}}>
            <Button startIcon={<ArrowBack/>} sx={{alignSelf: 'flex-start', backgroundColor: 'transparent', border: 'none', color: 'black', textTransform: 'capitalize', fontSize: '20px', marginBottom: '5px'}}>Go Back</Button>
            <Box sx={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                <Typography variant="h4" sx={{textAlign: 'center', fontWeight: 'bold'}}>PARTNERED FOUNDATION DETAILS</Typography>
            </Box>
            <Box sx={{display: 'flex', marginLeft: '50px', marginRight: '50px', marginBottom: '1px', marginTop: '5px', justifyContent: 'space-between', height: '400px'}}>
                <Box>
                    <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px'}}>Foundation Logo</Typography>
                    <input
                        type="file"
                        accept="image/*" // Only accept image files
                        onChange={handleImageChange} // Event handler for file change
                        style={{ display: "none" }} // Hide the default input element
                        id="upload-image" // ID for linking to the button
                    />
                    <label htmlFor="upload-image">
                        <Button
                            variant="contained"
                            component="span"
                            sx={{width: '450px', height: '160px', textTransform: 'none', padding: '16px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex', background: '#D9D9D9', border: '2px dashed', fontSize: '20px', borderRadius: '8px'}}
                            startIcon={<InsertPhotoIcon />} // This is how you add the icon inside the button
                        >
                            Attach image here...
                        </Button>
                    </label>
                    {/* Conditionally show the image preview and file details */}
                    {image && (
                    <Box
                        sx={{
                            left: 0,
                            width: "450px",
                            padding: "10px",
                            background: "#F0F0F0",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between", // Space between the photo, file name, and remove button
                        }}
                    >
                        {/* Small photo icon */}
                        <InsertPhotoIcon sx={{ fontSize: "30px", color: "#4CAF50" }} />

                        {/* File name */}
                        <Typography
                            variant="body2"
                            sx={{
                                flexGrow: 1,
                                marginLeft: "10px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {fileName}
                        </Typography>

                        {/* Remove Button */}
                        <Button
                            onClick={handleRemoveImage}
                            sx={{
                                backgroundColor: "#FF4D4F", // Red background for remove button
                                color: "white",
                                textTransform: "none",
                                fontSize: "14px",
                                padding: "4px 10px",
                                borderRadius: "4px",
                            }}
                        >
                        Remove
                        </Button>
                    </Box>
                )}
                </Box>
                <Box>
                    <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px', left: 0}}>Foundation Name</Typography>
                    <TextField
                        label="Name of Partnered Foundation"
                        variant="outlined"
                        value={foundation}
                        onChange={foundationHandleChange}
                        placeholder="Foundation"
                        fullWidth
                        sx={{width: '400px'}}
                    />
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', flexGrow: 1, marginLeft: '50px', marginRight: '50px'}}>
                <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 'bold', paddingBottom: '15px'}}>Description</Typography>
                <TextField
                    variant="outlined"
                    multiline
                    rows={5} // Defines the number of visible rows in the TextArea
                    value={description}
                    onChange={descriptionHandleChange}
                    fullWidth
                    sx={{
                    '& .MuiInputBase-root': {
                        padding: '10px', // You can adjust the padding as needed
                    },
                    }}
                />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '12px', marginRight: '50px'}}>
                <Button variant="contained" sx={{display: 'flex', justifyContent: 'center', backgroundColor: '#BF9B30', height: '50px', width: '100px', borderRadius: '5px', textTransform: 'capitalize', fontSize: '20px'}}>Save</Button>
            </Box>
        </Box>
    )
}