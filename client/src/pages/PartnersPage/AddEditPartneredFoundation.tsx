import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    } from "@mui/material";
import { axiosBase } from "../../axiosConfig";

export default function AddEditFoundation() {
    const [image, setImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [foundation, setFoundation] = useState<string>(''); 
    const [description, setDescription] = useState<string>(''); 
    const { foundation_id } = useParams();
    const [imagePreview, setImagePreview] = useState('');
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [dialogContent, setDialogContent] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch foundation details if it's an update
        const fetchFoundation = async () => {
            if (foundation_id) {
                try {
                    const response = await axios.get(`/foundations/getF/${foundation_id}`);
                    const { name, description, logo_path } = response.data;
                    setFoundation(name);
                    setDescription(description);
                    if (logo_path) {
                        setFileName(logo_path.split('/').pop());
                    }
                    setImagePreview(`${axiosBase}/uploads${logo_path}`);
                } catch (error) {
                    console.error("Error fetching foundation data:", error);
                }
            }
        };
        fetchFoundation();
    }, [foundation_id]);

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
            const name = file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
            setFileName(name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        if (image) formData.append("logo", image);
        formData.append("name", foundation);
        formData.append("description", description);

        try {
            if (foundation_id) {
                // Update logic
                await axios.put(`/foundations/update/${foundation_id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setDialogContent("Foundation updated successfully!");
            } else {
                // Create logic
                await axios.post("/foundations/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setDialogContent("Foundation created successfully!");
            }
        } catch (error) {
            console.error("Error saving foundation:", error);
            setErrors("Failed to save the foundation. Please try again.: [" + error + "] ");
        }
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDialogContent('');
        if(!errors){
            navigate("/adminView/foundations");
        }
        setErrors(''); // this is so stupid
    }

    return (
        <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '55px',
                margin: '80px auto',
                width: '90%',
                border: 'ridge',
                borderRadius: '15px',
                padding: '20px',
            }}
        >
            <Button
                startIcon={<ArrowBack />}
                sx={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'black',
                    textTransform: 'capitalize',
                    fontSize: '20px',
                    marginBottom: '5px',
                }}
                onClick={() => navigate(-1)}
            >
                Go Back
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {foundation_id ? "Edit Partnered Foundation" : "Add Partnered Foundation"}
                </Typography>
            </Box>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onSubmit={handleSave}
            >
                <Box
                    sx={{
                        display: 'flex',
                        marginLeft: '50px',
                        marginRight: '50px',
                        marginTop: '5px',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                    }}
                >
                    <Box>
                        <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px' }}>
                            Foundation Logo
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
                                startIcon={image || foundation_id ? '' : <InsertPhotoIcon /> }
                            >
                                {image || foundation_id ? 
                                    <img 
                                        src={imagePreview} 
                                        alt="Uploaded Image Preview" 
                                        style={{
                                            maxHeight:"100%",
                                        }}
                                    />
                                : 'Attach Image here'}
                            </Button>
                        </label>
                    </Box>
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{ textAlign: 'left', fontWeight: 'bold', paddingBottom: '5px', left: 0 }}
                        >
                            Foundation Name
                        </Typography>
                        <TextField
                            label="Name of Partnered Foundation"
                            variant="outlined"
                            value={foundation}
                            onChange={(e) => setFoundation(e.target.value)}
                            placeholder="Foundation"
                            fullWidth
                            sx={{ width: '400px' }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flexGrow: 1,
                        marginLeft: '50px',
                        marginRight: '50px',
                    }}
                >
                    <Typography variant="h5" sx={{ textAlign: 'left', fontWeight: 'bold', paddingBottom: '15px' }}>
                        Description
                    </Typography>
                    <TextField
                        variant="outlined"
                        multiline
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': {
                                padding: '10px',
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', marginRight: '50px' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#BF9B30',
                            height: '50px',
                            width: '100px',
                            borderRadius: '5px',
                            textTransform: 'capitalize',
                            fontSize: '20px',
                        }}
                    >
                        Save
                    </Button>
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
                <Button onClick={handleDialogClose} color="success">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
