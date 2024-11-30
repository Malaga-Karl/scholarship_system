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
import { Outlet } from "react-router-dom";
import { Box, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";



type FoundationListType = {
    name:string,
    desc:string,
    deadline:string,
    slots:string;

}

const FoundationArray : FoundationListType[] = [
    {
        name:"Charity First Foundation Inc.",
        desc:"In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. ",
        deadline:"August 09,2024",
        slots:"20/20 Slots"
    },
    {
        name:"DOST Scholarship 2024-2025",
        desc:"Recognizing the overwhelming problems plaguing the country, the group committed to being part of the solution.",
        deadline:"May 31,2024",
        slots:"16/20 Slots"
    },
    {
        name:"SM Foundation College Scholarship 2024-2025",
        desc:"In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. ",
        deadline:"March 31,2024",
        slots:"3/20 Slots"
    },
    {
      name:"Foundation 1 Scholarship Offer",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      deadline:"September 11, 2001",
      slots:"20/20 Slots"
  },
  {
    name:"Foundation 2 Scholarship Offer",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    deadline:"September 11, 2001",
    slots:"20/20 Slots"
  },
  {
    name:"Foundation 3 Scholarship Offer",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    deadline:"September 11, 2001",
    slots:"20/20 Slots"
  },
  {
    name:"Foundation 4 Scholarship Offer",
    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    deadline:"September 11, 2001",
    slots:"20/20 Slots"
  },
]

function FoundationList({name, deadline, desc, slots}:FoundationListType){
    return(
        
            <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center">{name} </TableCell>
              <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "415px"}}>{desc}</TableCell>
              <TableCell align="center">{deadline}</TableCell>
              <TableCell align="center">{slots}</TableCell>
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
      "Scholarship Name",
      "Description",
      "Deadline",
      "Slots",
      "Actions"
    ]
 return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#BF9B30" }}>
            {cells.map((cell) => <TableCell align='center' sx={{ fontWeight:900,color:"white" }}>{cell}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
        {FoundationArray.map((dots) => <FoundationList {...dots}/>)}        </TableBody>
        </Table>
        </TableContainer>
    </>
 )
}



export default function AdminViewApplicant(){
    return(
        <AdminTemplate active="scholarships">
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
            }}>LIST OF SCHOLARSHIP OFFERS</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
                height: '6%',
                marginBottom: '15px',
                // marginX: '3%'
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
                    width: '226px',
                    background: '#2054BD',
                    color: 'white',
                    borderRadius: '5px'
                }}>Add Scholarship Offer</Button>
            </Box>
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
            {/* <Outlet /> */}
        </AdminTemplate>
    )
}