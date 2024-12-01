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
import { InputAdornment, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { MailOutlineOutlined } from "@mui/icons-material";
import axios from "../../axiosConfig"
import { useEffect, useState } from 'react';


type UserType = {
    account_email:string,
    first_name:string,
    last_name:string,
    scholarship_status:string,
}

function FoundationList({account_email, first_name, last_name, scholarship_status}:UserType){
    return(
        
            <TableRow
              key={account_email}
            >
              
              <TableCell align="center">{account_email}</TableCell>
              <TableCell align="center">{first_name + ' ' + last_name} </TableCell>
              <TableCell align="center">{scholarship_status}</TableCell>
              <TableCell align="center">
                {/* <Button color= "secondary"sx={{boxShadow:2,padding: "5px",minHeight:"10px",minWidth:"10px",color:"black"}}><VisibilityOutlinedIcon/></Button> */}
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px", marginRight:"5px",minHeight:"10px",minWidth:"10px",color:"black"}}><ModeEditOutlineOutlinedIcon/></Button>
                <Button color= "secondary"sx={{boxShadow:2,padding: "5px", marginLeft:"5px",minHeight:"10px",minWidth:"10px", backgroundColor: "#2054BD",color:"white"}}><MailOutlineOutlined/></Button>
              </TableCell>
            </TableRow>
    )
}

function FoundList(){
    const cells : string[] = [
      "Email",
      "Name",
      "Status",
      "Actions"
    ]

    const [users, setUsers] = useState<UserType[]>([])
    try{
      useEffect(()=>{
        const fetchUsers = async () =>{
          const response = await axios.get('/user/getUsers');
          const data = response.data.map(({account_email, first_name, last_name, status}:{account_email:string, first_name:string, last_name:string, status:{name:string}})=>({
                account_email: account_email,
                first_name: first_name,
                last_name: last_name,
                scholarship_status: status.name,
          }));
          console.log(data);
          setUsers(data);
        }
        fetchUsers();
      }, []);
    }catch(error:any){
      console.log("Error in fetching Announcements:> " + error);
    }

 return (
    <>
        <TableContainer component={Paper}>
        <Table sx={{
            minWidth: 650,
            }}
            aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#BF9B30"}}>
            {cells.map((cell) => <TableCell align='center' sx={{ fontWeight:900,color:"white" }}>{cell}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map((user) => <FoundationList {...user}/>)}
        </TableBody>
        </Table>
        </TableContainer>
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
                    background: '#2054BD',
                    color: 'white',
                    borderRadius: '5px'
                }}>Generate Report</Button>
            </Box>

            <FoundList/>

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
        </Box>
        </>
    )
}