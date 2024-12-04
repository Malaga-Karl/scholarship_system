import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box,
    InputAdornment,
    Pagination,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios, { axiosBase } from "../../axiosConfig";

type FoundationListType = {
    foundation_id: number;
    name: string;
    logo_path: string;
    description: string;
};

function FoundationList({
    foundation_id,
    name,
    logo_path,
    description,
    refreshList,
}: FoundationListType & { refreshList: () => void }) {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/foundations/deleteF/${foundation_id}`);
            setOpenDialog(false);
            refreshList(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting foundation:", error);
            alert("Failed to delete the foundation. Please try again.");
        }
    };

    return (
        <>
            <TableRow key={foundation_id}>
                <TableCell align="center">
                    <img src={`${axiosBase}/uploads${logo_path}`} 
                        style={{
                            maxHeight:"100px",
                            minHeight:"100px",
                            maxWidth: "300px",
                        }}
                        alt="Item" />
                </TableCell>
                <TableCell align="center">{name}</TableCell>
                <TableCell
                    align="center"
                    sx={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "415px",
                    }}
                >
                    {description}
                </TableCell>
                <TableCell align="center">
                        <Button
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: "5px",
                                minHeight: "10px",
                                minWidth: "10px",
                                backgroundColor: "#2054BD",
                                color: "white",
                                marginRight:"20px"
                            }}
                            onClick={() => {
                                navigate(`/adminView/foundations/addedit/${foundation_id}`);
                            }}
                        >
                            <ModeEditOutlineOutlinedIcon />
                        </Button>
                        <Button
                            color="secondary"
                            sx={{
                                boxShadow: 2,
                                padding: "5px",
                                minHeight: "10px",
                                minWidth: "10px",
                                backgroundColor: "#B71C1C",
                                color: "white",
                            }}
                            onClick={() => setOpenDialog(true)}
                        >
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                </TableCell>
            </TableRow>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this foundation? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

function FoundList() {
    const [foundations, setFoundations] = useState<{
        foundation_id:number,
        name:string,
        description:string,
        logo_path:string,
    }[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search input
    const [debouncedSearch, setDebouncedSearch] = useState(''); // For debounce
    const navigate = useNavigate();

    // Fetch Foundations with Pagination and Search
    const fetchFoundations = async (page = 1, search = '') => {
        try {
            const response = await axios.get(`/foundations/getAllPaginate`, {
                params: { page, limit: 5, search },
            });
            setFoundations(response.data.foundations);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error("Error fetching foundations:", error);
        }
    };

    // Debounce search input to minimize API calls
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchQuery); // Set debounced value after delay
        }, 300);

        return () => clearTimeout(delayDebounce); // Clear timeout on input change
    }, [searchQuery]);

    // Fetch data when debounced search changes or page changes
    useEffect(() => {
        fetchFoundations(currentPage, debouncedSearch);
    }, [currentPage, debouncedSearch]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page); // Update the page number
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search input
        setCurrentPage(1); // Reset to page 1 on new search
    };


    return (
        <Box>
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
                    onClick={() => navigate("addedit")}
                >
                    Add Partnered Foundation
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#BF9B30" }}>
                            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                                Foundation Logo
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                                Foundation Name
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                                Description
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foundations.map((foundation) => (
                            <FoundationList
                                key={foundation.foundation_id}
                                {...foundation}
                                refreshList={() => fetchFoundations(currentPage, debouncedSearch)}
                            />
                        ))}
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
        </Box>
    );
}

export default function AdminViewAnnouncement() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "2%",
                paddingX: "3%",
            }}
        >
            <Typography
                sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    marginTop: "5%",
                }}
            >
                LIST OF APPLICANTS
            </Typography>

            <FoundList />
        </Box>
    );
}
