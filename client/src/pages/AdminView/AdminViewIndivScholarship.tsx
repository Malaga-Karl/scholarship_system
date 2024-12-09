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
import { useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import axios, { axiosBase } from '../../axiosConfig';
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
  CircularProgress,
} from "@mui/material";

type ScholarshipType = {
    logo_path: string,
    indiv_scholarship_id: number,
    title:string,
    description:string,
}

function FoundationList({logo_path, indiv_scholarship_id, title, description, refreshList}:ScholarshipType & { refreshList: () => void}){
  const navigate = useNavigate();  
  const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/foundations/deleteIndividualScholarship/${indiv_scholarship_id}`);
            setOpenDialog(false);
            refreshList(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting foundation:", error);
            alert("Failed to delete the foundation. Please try again.");
        }
    };

  
  return(
          <>
            <TableRow
              key={indiv_scholarship_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center">
                <img 
                    style={{
                        maxHeight:"100px",
                        minHeight:"100px",
                        maxWidth: "300px",
                    }}
                src={`${axiosBase}/uploads${logo_path}`} alt={`logo: ${logo_path}`} />
              </TableCell>
              <TableCell align="center">{title} </TableCell>
              <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "415px"}}>{description}</TableCell>
              <TableCell align="center">
              <Stack direction="row" spacing={1}>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}
                  onClick={()=>{
                    //update 
                    navigate(`addedit/${indiv_scholarship_id}`);
                  }}
                ><ModeEditOutlineOutlinedIcon/></Button>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#B71C1C",color:"white"}}
                  
                  onClick={() => setOpenDialog(true)}
                ><DeleteOutlineOutlinedIcon/></Button>
                </Stack>
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
    )
}

function FoundList(){
  const [scholarships, setScholarships] = useState<ScholarshipType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input
  const [debouncedSearch, setDebouncedSearch] = useState(''); // For debounce
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Foundations with Pagination and Search
  const fetchIndivScholarships = async (page = 1, search = '') => {
    setLoading(true);
      try {
          const response = await axios.get(`/foundations/getIndividualScholarships`, { //this is also paginated, just not the name T_T
              params: { page, limit: 5, search },
          });
          setScholarships(response.data.indivScholarships);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
      } catch (error) {
          console.error("Error fetching foundations:", error);
      }
      setLoading(false);
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
    fetchIndivScholarships(currentPage, debouncedSearch);
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
                placeholder="Search by scholarship (individual) name..."
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
                    background: "#2054BD",
                    color: "white",
                    borderRadius: "5px",
                }}
                onClick={()=>navigate("addedit")}
                >Add Scholarship (Individual) Offer</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#BF9B30" }}>
                        <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                            Logo
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                            Scholarship (Individual) Name
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
                    {loading ? <CircularProgress sx={{margin:"auto"}} size={24} /> :scholarships.map((scholarship) => (
                        <FoundationList
                            key={scholarship.indiv_scholarship_id}
                            {...scholarship}
                            refreshList={() => fetchIndivScholarships(currentPage, debouncedSearch)}
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
    </>
 )
}



export default function AdminViewIndivApplicant(){
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
            }}>LIST OF SCHOLARSHIP (INDIVIDUAL) OFFERS</Typography>
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