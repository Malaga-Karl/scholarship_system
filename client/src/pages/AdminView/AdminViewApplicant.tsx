import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputAdornment, Typography, Pagination, Backdrop, FormControl, InputLabel, Select, MenuItem, Fade, Modal, CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { MailOutlineOutlined } from "@mui/icons-material";
import axios from "../../axiosConfig"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import FoundationIcon from '@mui/icons-material/Foundation';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    } from "@mui/material";

    interface UserProfile {
        account_email: string;
        first_name: string;
        last_name: string;
    }
    
    interface ScholarshipStatus {
        status_id: number;
        name: string;
    }
    
    interface Scholarship {
        scholarship_id?: string; // Optional for individual scholarships
        title: string;
    }
    
    interface IndivScholarship {
        indiv_scholarship_id?: string; // Optional for regular scholarships
        title: string;
    }
    
    interface StudentInfo {
        source: 'StudentScholarship' | 'StudentIndivScholarship';
        userProfile: UserProfile;
        status: ScholarshipStatus;
        scholarship?: Scholarship; // Present if source is 'StudentScholarship'
        indivScholarship?: IndivScholarship; // Present if source is 'StudentIndivScholarship'
        [key: string]: any; // Catch-all for other fields
    }
    




    const FoundationList: React.FC<StudentInfo> = ({
        scholarship,
        indivScholarship,
        status,
        userProfile,
        source,
        fetchUsers,
    }) => {
        const [openEdit, setOpenEdit] = useState(false);
        const [openScholarshipEdit, setOpenScholarshipEdit] = useState(false);
        const navigate = useNavigate();
    
        const [selectedStatus, setSelectedStatus] = useState(status.status_id);
        const [selectedScholarship, setSelectedScholarship] = useState(
            source === 'StudentScholarship' ? scholarship?.scholarship_id : ''
        );
        const [selectedIndivScholarship, setSelectedIndivScholarship] = useState(
            source === 'StudentIndivScholarship' ? indivScholarship?.indiv_scholarship_id : ''
        );
    
        const [statusOptions, setStatusOptions] = useState<ScholarshipStatus[]>([]);
        const [allScholarships, setAllScholarships] = useState<Scholarship[]>([]);
        const [allIndivScholarships, setAllIndivScholarships] = useState<IndivScholarship[]>([]);
        const [openDialog, setOpenDialog] = useState(false);
        const [dialogContent, setDialogContent] = useState('');
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const [newScholarshipId, setNewScholarshipId] = useState('');
        const [to, setTo] = useState('');
    
        useEffect(() => {
            const fetchOptions = async () => {
                setLoading(true);
                try {
                    const [statusesResponse, scholarshipsResponse, indivScholarshipsResponse] = await Promise.all([
                        axios.get('/user/getStatus'),
                        axios.get('/foundations/getallFS'),
                        axios.get('/foundations/getAllIndivScholarships'),
                    ]);
                    setStatusOptions(statusesResponse.data);
                    setAllScholarships(scholarshipsResponse.data);
                    setAllIndivScholarships(indivScholarshipsResponse.data.indivScholarships);
                } catch (err) {
                    console.error('Error fetching options:', err);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchOptions();
        }, []);
    
        const handleSave = async () => {
            try {
                await axios.put(`/user/update/${userProfile.account_email}`, { status_id: selectedStatus });
                fetchUsers();
                setDialogContent("Status updated successfully!");
                handleClose();
                setOpenDialog(true);
            } catch (err) {
                console.error('Error updating status:', err);
                setError("Error in updating Status!")
            }
        };
    
        const handleSaveScholarship = async () => {
            if(newScholarshipId == '-1' ){
                setError("Can't put null/no scholarship!");
                setOpenScholarshipEdit(false);
                setOpenDialog(true);
                return;
            }
            try {
                const response = await axios.put(`/user/updateScholarship/${userProfile.account_email}`, {
                    new_scholarship_id: newScholarshipId,
                    source : to,
                });
        
                console.log('Scholarship updated successfully:', response.data);
                setDialogContent('Scholarship Updated Successfully!');
                // Handle success (e.g., show a success message or refresh data)
            } catch (error) {
                console.error('Error updating scholarship:', error.response?.data || error.message);
                setError('Error in updating scholarship!');
                // Handle error (e.g., show an error message)
            }
            fetchUsers();
            setOpenDialog(true);
            setOpenScholarshipEdit(false);
        };
    
        const handleClose = () => {
            setOpenEdit(false);
        };
        const handleCloseScholarship = () => setOpenScholarshipEdit(false);
        const closeDialog = () => {
            setOpenDialog(false);
            setDialogContent('');
            setError('');
        };
        
        const handleOpen = (status_id:number) => {
            //setSelectedStatus(status_id);
            setOpenEdit(true);
        };
    
        if (loading) {
            return (
                <Box
                    position="absolute"
                    left="50%"
                    top="50%"
                    sx={{
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CircularProgress />
                </Box>
            );
        }
    
        return (
            <>
                {/* TableRow code with buttons */}
                <TableRow key={userProfile.account_email}>
                    <TableCell align="center">{userProfile.account_email}</TableCell>
                    <TableCell align="center">
                        {`${userProfile.first_name} ${userProfile.last_name}`}
                    </TableCell>
                    <TableCell align="center">
                        {source === 'StudentScholarship' && scholarship?.title}
                        {source === 'StudentIndivScholarship' && indivScholarship?.title}
                    </TableCell>
                    <TableCell align="center">{status.name}</TableCell>
                    <TableCell align="center">
                        {/* Edit Scholarship */}
                        <Button
                            onClick={() => setOpenScholarshipEdit(true)}
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: '5px',
                                marginRight: '5px',
                                minHeight: '10px',
                                minWidth: '10px',
                                color: 'black',
                            }}
                        >
                            <FoundationIcon />
                        </Button>
                        {/* Edit Status */}
                        <Button
                            onClick={() => handleOpen(status.status_id)}
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: '5px',
                                marginRight: '5px',
                                minHeight: '10px',
                                minWidth: '10px',
                                color: 'black',
                            }}
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </Button>
                        {/* Send Email */}
                        <Button
                            onClick={() => navigate(`newEmail/${userProfile.account_email}`)}
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: '5px',
                                marginLeft: '5px',
                                minHeight: '10px',
                                minWidth: '10px',
                                backgroundColor: '#2054BD',
                                color: 'white',
                            }}
                        >
                            <MailOutlineOutlined />
                        </Button>
                        {/* View Emails */}
                        <Button
                            onClick={() => navigate(`emails/${userProfile.account_email}`)}
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: '5px',
                                marginLeft: '5px',
                                minHeight: '10px',
                                minWidth: '10px',
                                backgroundColor: '#2054BD',
                                color: 'white',
                            }}
                        >
                            <InboxIcon />
                        </Button>
                    </TableCell>
                </TableRow>

                {/* Modals for editing status and scholarships */}
                {/* Modal for editing */}
                <Modal
                    open={openEdit}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openEdit}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6" component="h2">
                                Edit Status
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(Number(e.target.value))}
                                    label="Status"
                                >
                                    {/* Add options for status */}
                                    {
                                        statusOptions.map((status)=>(<MenuItem
                                        value={status.status_id}>
                                            {status.name}
                                        </MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 3,
                                }}
                            >
                                <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    sx={{ backgroundColor: '#2054BD', color: 'white' }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
                {/* Modal for editing */}
                <Modal
                    open={openScholarshipEdit}
                    onClose={handleCloseScholarship}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openScholarshipEdit}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: "50%",
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6" component="h2">
                                Edit Scholarship
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "40px"
                                }}
                            >
                                {/* Foundation Scholarship Select */}
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="foundation-scholarship-label">Foundation Scholarship</InputLabel>
                                    <Select
                                        variant="standard"
                                        labelId="foundation-scholarship-label"
                                        value={selectedScholarship}
                                        onChange={(event) => {
                                            //pickedAScholarship(event); // Handle selection logic
                                            setSelectedScholarship(event.target.value); // Reset the individual scholarship
                                            setNewScholarshipId(event.target.value);
                                            setSelectedIndivScholarship('');
                                            setTo('StudentScholarship')
                                        }}
                                        label="scholarship"
                                    >
                                        {
                                            allScholarships?.map((scholarship) => (
                                                <MenuItem
                                                    key={scholarship.scholarships[0].scholarship_id}
                                                    value={scholarship.scholarships[0].scholarship_id}
                                                >
                                                    {scholarship.scholarships[0].title}
                                                </MenuItem>
                                            ))
                                        }
                                        <MenuItem value={-1}>Nothing Selected</MenuItem>
                                    </Select>
                                </FormControl>

                                {/* Individual Scholarship Select */}
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="indiv-scholarship-label">Individual Scholarship</InputLabel>
                                    <Select
                                        variant="standard"
                                        labelId="indiv-scholarship-label"
                                        value={selectedIndivScholarship}
                                        onChange={(event) => {
                                            //pickedAnIndivScholarship(event); // Handle selection logic
                                            setSelectedIndivScholarship(event.target.value); // Reset the foundation scholarship
                                            setNewScholarshipId(event.target.value);
                                            setSelectedScholarship('');
                                            setTo('StudentIndivScholarship');
                                        }}
                                        label="indiv"
                                    >
                                        {
                                            allIndivScholarships?.map((indivScholarship) => (
                                                <MenuItem
                                                    key={indivScholarship.indiv_scholarship_id}
                                                    value={indivScholarship.indiv_scholarship_id}
                                                >
                                                    {indivScholarship.title}
                                                </MenuItem>
                                            ))
                                        }
                                        <MenuItem value={-1}>Nothing Selected</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 3,
                                }}
                            >
                                <Button variant="outlined" onClick={handleCloseScholarship} sx={{ mr: 2 }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleSaveScholarship}
                                    sx={{ backgroundColor: '#2054BD', color: 'white' }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>


                {/* Dialog for notifications */}
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description"
                            color={error?'error' : 'success'}
                        >
                            {error ? error : dialogContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="success">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    };

function FoundList(){

    const [users, setUsers] = useState<StudentInfo[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search input
    const [debouncedSearch, setDebouncedSearch] = useState(''); // For debounce
    const [selectedStatus, setSelectedStatus] = useState('-1'); // Track the selected status
    const [statusOptions, setStatusOptions] = useState<{status_id:number, name:string}[]>([]);

    // Fetch Foundations with Pagination and Search
    const fetchUsers = async (page = 1, search = '', studentStatus = '') => {
        console.log(studentStatus);
        if(studentStatus === '-1')
            studentStatus = '';
        try {
            const response = await axios.get(`/user/getAllPaginate`, {
                params: { page, limit: 5, search, studentStatus},
            });
            setUsers(response.data.studentInfo);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error("Error fetching foundations:", error);
        }
    };
    const wrapperCall = async () =>{
        fetchUsers(currentPage, debouncedSearch, selectedStatus);
    }

    // Debounce search input to minimize API calls
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchQuery); // Set debounced value after delay
        }, 300);

        return () => clearTimeout(delayDebounce); // Clear timeout on input change
    }, [searchQuery]);

    // Fetch data when debounced search changes or page changes or status is selected
    useEffect(() => {
        fetchUsers(currentPage, debouncedSearch, selectedStatus);
    }, [currentPage, debouncedSearch, selectedStatus]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page); // Update the page number
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search input
        setCurrentPage(1); // Reset to page 1 on new search
    };

    //getting the statuses
    useEffect(()=>{
        const getStatuses = async () =>{
            try{
                const response = await axios.get('/user/getStatus');
                //console.log(response);
                setStatusOptions(response.data);
            }catch(error){
                console.log("error in fetching statuses: " + error);
            }

        }
        getStatuses();
    }, []);
    
 return (
    <>
    <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    height: "4%",
                    marginBottom: "15px",
                    alignItems:"center",
                }}
            >
                <TextField
                    sx={{
                        marginBottom: "15px",
                        maxWidth:'30%',
                        minWidth: '30%',
                    }}
                    placeholder="Search by student email..."
                    value={searchQuery}
                    onChange={handleSearchChange} // Handle input change
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    gap={"30px"}
                    width={"40%"}
                >
                    <InputLabel id="status-select-label">Filter Using Status:</InputLabel>
                    <Select
                        labelId="status-select-label"
                        value={selectedStatus}
                        onChange={(e) => {setSelectedStatus(e.target.value);}}
                        label="Status"
                        sx={{
                            flexGrow:1,
                        }}
                        variant='standard'
                    >
                        {/* Add options for status */}
                        <MenuItem
                            value={'-1'}>
                            No Filter
                        </MenuItem>
                        {
                            statusOptions.map((status)=>(<MenuItem
                            value={status.status_id}>
                                {status.name}
                            </MenuItem>))
                        }
                    </Select>
                </Box>
                
                <Button
                    variant="contained"
                    sx={{
                        height: "100%",
                        width: "256px",
                        background: "#2054BD",
                        color: "white",
                        borderRadius: "5px",
                    }}
                    onClick={() => {
                        //nothing yet
                    }}
                >
                    Generate Report
                </Button>
            </Box>
        <TableContainer component={Paper}>
        <Table sx={{
            minWidth: 650,
            }}
            aria-label="simple table">
        <TableHead>
        <TableRow sx={{ backgroundColor: "#BF9B30" }}>
            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                Applicant Email
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                Applicant Name
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                Scholarship Offer
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                Status
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                Actions
            </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {users.map((user) => <FoundationList {...user} fetchUsers={wrapperCall}/>)}
        </TableBody>
        </Table>
        </TableContainer>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Box>
    </>
 )
}



export default function AdminViewApplicant(){
    return(
        <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '2%',
            paddingX: '3%'
        }}>
            <Typography sx={{
                fontSize: '40px',
                fontWeight: 'bold',
                marginTop: '5%'
            }}>LIST OF APPLICANTS</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                height: '6%',
                marginBottom: '15px',
                // marginX: '3%'
            }}>
            </Box>

            <FoundList/>
        </Box>
        </>
    )
}