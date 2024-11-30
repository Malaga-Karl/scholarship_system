import AdminTemplate from "./AdminTemplate";
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
import { InputAdornment, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";



type FoundationListType = {
    name:string,
    program:string,
    year:string,
    scholarship:string,
    status:string;
    

}

const FoundationArray : FoundationListType[] = [
    {
        name:"Juan C. Dela Cruz",
        program:"Bachelor of Science in Computer Science",
        year:"4th Year",
        scholarship:"Charity First Doundation",
        status:"Approved"

    },
    {
        name:"Maria A. Mendoza",
        program:"Bachelor of Science in Nursing",
        year:"3rd Year",
        scholarship:"Luis Co Chi Kiat Foundation",
        status:"Pending"
    },
    {
        name:"Miguel B. Cruz",
        program:"Bachelor of Science in Information Technology",
        year:"2nd Year",
        scholarship:"Charity First Doundation",
        status:"Pending"
    },
    {
        name:"Carla R. Reyes",
        program:"Bachelor of Arts in Psychology",
        year:"1st Year",
        scholarship:"Luis Co Chi Kiat Foundation",
        status:"Approved"
    },
    {
        name:"Daniel C. Santos",
        program:"Bachelor of Science in Biology",
        year:"4th Year",
        scholarship:"Charity First Doundation",
        status:"Approved"
    },
    {
        name:"Erica D. Lim",
        program:"Bachelor of Science in Business",
        year:"3rd Year",
        scholarship:"Charity First Doundation",
        status:"Approved"
    },
    {
        name:"Francis E. Tan",
        program:"Bachelor of Arts in Education",
        year:"2nd Year",
        scholarship:"Charity First Doundation",
        status:"Pending"
    },
]

function FoundationList({name, year, program, scholarship, status}:FoundationListType){
    return(
        
            <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center">{name} </TableCell>
              <TableCell align="center">{program}</TableCell>
              <TableCell align="center">{year}</TableCell>
              <TableCell align="center">{scholarship}</TableCell>
              <TableCell align="center">{status}</TableCell>
              <TableCell align="center">
              <Stack direction="row" spacing={1}>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px",color:"black"}}><VisibilityOutlinedIcon/></Button>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}><ModeEditOutlineOutlinedIcon/></Button>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#B71C1C",color:"white"}}><DeleteOutlineOutlinedIcon/></Button>
                </Stack>
              </TableCell>
            </TableRow>
    )
}

function FoundList(){
    const cells : string[] = [
      "Applicants Name",
      "Program",
      "Year Level",
      "Scholarship",
      "Status",
      "Actions"
    ]
 return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{
            minWidth: 650,
            }}
            aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#BF9B30", marginX: '3%'}}>
            {cells.map((cell) => <TableCell align='center' sx={{ fontWeight:900,color:"white" }}>{cell}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
        {FoundationArray.map((dots) => <FoundationList {...dots}/>)}
        </TableBody>
        </Table>
        </TableContainer>
    </>
 )
}



export default function AdminViewApplicant(){
    return(
        <AdminTemplate active="applicants">
            <Typography sx={{
                fontSize: '40px',
                fontWeight: 'bold',
                marginTop: '4%'
            }}>LIST OF APPLICANTS</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                height: '6%',
                marginBottom: '15px',
                marginX: '3%'
            }}>
                <TextField sx={{
                    height: '100%', // Make TextField fill the height of the Box
                    width: '35%',
                    '& .MuiOutlinedInput-root': {
                        height: '100%', // Ensure input area fills the height
                        padding: '0', // Remove default padding if needed
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px', // Adjust padding for input text
                        height: 'auto', // Allow height to adjust based on content
                    }
                }}
                placeholder="Search"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    )
                }}>

                </TextField>
                <Button variant='contained' sx={{
                    height: '100%',
                    width: '176px',
                    background: 'blue',
                    color: 'white',
                    borderRadius: '5px'
                }}>Generate Report</Button>
            </Box>
            <Box sx={{
                display: 'flex',
                marginX: '3%'
            }}>
                <FoundList/>
            </Box>

            <Pagination
                count={3} // Hardcoded for now, please change upon making it dynamic
                page={1} // Hardcoded for now, please change upon making it dynamic
                // onChange={handleChange}
                variant="outlined" // Optional: change style
                shape="rounded" // Optional: change shape
                sx={{
                    // mt: 2,
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: '0.5%'
                }}
            />
        </AdminTemplate>
    )
}