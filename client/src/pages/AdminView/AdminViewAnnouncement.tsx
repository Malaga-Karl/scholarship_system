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
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import axios from '../../axiosConfig'
import { useEffect, useState } from 'react';
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

type AnnouncementType = {
  announcement_id:number,
  title:string,
  description:string,
  createdAt:string;
}


function FoundationList({announcement_id, title, createdAt, description, refreshList}:AnnouncementType & { refreshList: () => void }){
  
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const handleDelete = async () => {
    try {
        await axios.delete(`/announcements/delete/${announcement_id}`);
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
          key={announcement_id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
        >
          
          <TableCell align="center">{title} </TableCell>
          <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "315px"}}>{description}</TableCell>
          <TableCell align="center">{
            new Intl.DateTimeFormat("en-US",{
              month: 'long', 
              day: 'numeric', 
              year: 'numeric', 
            }).format(new Date(createdAt))
          }</TableCell>
          <TableCell align="center">
          <Stack direction="row" spacing={1}>
            <Button onClick={()=>navigate(`addedit/${announcement_id}`)} color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}><ModeEditOutlineOutlinedIcon/></Button>
            <Button onClick={() => setOpenDialog(true)} color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#B71C1C",color:"white"}}><DeleteOutlineOutlinedIcon/></Button>
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
    
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search input
  const [debouncedSearch, setDebouncedSearch] = useState(''); // For debounce
  const navigate = useNavigate();  

    // Fetch Foundations with Pagination and Search
    const fetchAnnouncements = async (page = 1, search = '') => {
      try {
          const response = await axios.get(`/announcements/getAllPaginate`, {
              params: { page, limit: 5, search },
          });
          setAnnouncements(response.data.announcements);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
      } catch (error) {
          console.error("Error fetching announcements:", error);
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
      fetchAnnouncements(currentPage, debouncedSearch);
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
                  placeholder="Search by announcement title..."
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
                  Create Announcement
              </Button>
          </Box>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow sx={{ backgroundColor: "#BF9B30" }}>
                          <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                              Announcement Title
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                              Description
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                              Published Date
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: 900, color: "white" }}>
                              Actions
                          </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {announcements.map((annoucement) => (
                          <FoundationList
                              key={annoucement.announcement_id}
                              {...annoucement}
                              refreshList={() => fetchAnnouncements(currentPage, debouncedSearch)}
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
            }}>
              LIST OF ANNOUNCEMENTS
            </Typography>
            <FoundList />
          </Box>
        </>
    )
}