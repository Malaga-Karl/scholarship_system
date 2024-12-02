import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputAdornment, Typography, Pagination, Backdrop, FormControl, InputLabel, Select, MenuItem, Fade, Modal } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { MailOutlineOutlined } from "@mui/icons-material";
import axios from "../../axiosConfig"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/Inbox';
import AdminNewMail from './AdminNewEmail';


type UserType = {
    account_email:string,
    first_name:string,
    last_name:string,
    status:{status_id:number, name:string},
    fetchUsers: () => void,
}

function FoundationList({account_email, first_name, last_name, status, fetchUsers}:UserType){
    
    const [openEdit, setOpenEdit] = useState(false);
    const navigate = useNavigate();

    const [openNewEmail, setOpenNewEmail] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status.status_id); // Track the selected status
    const [statusOptions, setStatusOptions] = useState<{status_id:number, name:string}[]>([]);
    const handleOpen = (status_id:number) => {
        setSelectedStatus(status_id);
        setOpenEdit(true);
    };
    const handleClose = () => {
        setSelectedStatus(0);
        setOpenEdit(false);
    };

    useEffect(()=>{
        const getStatuses = async () =>{
            try{
                const response = await axios.get('/user/getStatus');
                console.log(response);
                setStatusOptions(response.data);
            }catch(error){
                console.log("error in fetching statuses: " + error);
            }

        }
        getStatuses();
    }, []);

    const handleSave = async () => {
        try {
            // Make an API call to update the status
            await axios.put(`/user/update/${account_email}`, {
                status_id: selectedStatus,
            });
            fetchUsers();

            // Handle successful update, e.g., refresh the list or show a success message
            console.log('Status updated successfully');
            
            handleClose(); // Close the modal after saving
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    return (
        <>
            <TableRow key={account_email}>
                <TableCell align="center">
                    {account_email}
                </TableCell>
                <TableCell align='center'>
                    {first_name + " " + last_name} 
                </TableCell>
                <TableCell align="center">
                    {status.name}
                </TableCell>
                <TableCell align="center">
                    {/*Edit status */}
                    <Button 
                        onClick={() => handleOpen(status.status_id)}
                        color= "secondary"sx={{boxShadow:2,padding: "5px", marginRight:"5px",minHeight:"10px",minWidth:"10px",color:"black"}}><ModeEditOutlineOutlinedIcon/></Button>
                    {/*send email */}
                    <Button
                        onClick={() => {navigate(`newEmail/${account_email}`)}} 
                        color= "secondary"sx={{boxShadow:2,padding: "5px", marginLeft:"5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}><MailOutlineOutlined/></Button>
                    {/*view emails */}
                    <Button
                        onClick={() => {navigate(`emails/${account_email}`)}}  
                        color= "secondary"sx={{boxShadow:2,padding: "5px", marginLeft:"5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}><InboxIcon/></Button>
                </TableCell>
            </TableRow>

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
        </>
    );
}

function FoundList(){

    const [users, setUsers] = useState<UserType[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search input
    const [debouncedSearch, setDebouncedSearch] = useState(''); // For debounce
    const navigate = useNavigate();

    // Fetch Foundations with Pagination and Search
    const fetchUsers = async (page = 1, search = '') => {
        try {
            const response = await axios.get(`/user/getAllPaginate`, {
                params: { page, limit: 5, search },
            });
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error("Error fetching foundations:", error);
        }
    };
    const wrapperCall = async () =>{
        fetchUsers(currentPage, debouncedSearch);
    }

    // Debounce search input to minimize API calls
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchQuery); // Set debounced value after delay
        }, 300);

        return () => clearTimeout(delayDebounce); // Clear timeout on input change
    }, [searchQuery]);

    // Fetch data when debounced search changes or page changes
    useEffect(() => {
        fetchUsers(currentPage, debouncedSearch);
    }, [currentPage, debouncedSearch]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page); // Update the page number
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search input
        setCurrentPage(1); // Reset to page 1 on new search
    };
    
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
                        maxWidth:'50%',
                        minWidth: '50%',
                    }}
                    placeholder="Search by foundation name..."
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