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
import { Box, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios, { axiosBase } from "../../axiosConfig";



type FoundationListType = {
    foundation_id:number,
    name:string,
    logo_path:string,
    description:string
}

function FoundationList({foundation_id, name, logo_path, description}:FoundationListType){

    return(
            <TableRow
              key={foundation_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center"><img src={logo_path} alt="Item"/> </TableCell>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "415px"}}>{description}</TableCell>
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

function FoundList (){
    const cells : string[] = [
        "Foundation Logo",
        "Foundation Name",
        "Description",
        "Actions"
    ]

    const [foundations, setFoundations] = useState<FoundationListType[]>([]);

    try{
        useEffect(()=>{
            const fetchFoundations = async () =>{
                const response = await axios.get('/foundations/getall');
                const data = response.data.map((foundation:FoundationListType)=>({
                    foundation_id: foundation.foundation_id,
                    name: foundation.name,
                    logo_path: `${axiosBase}/uploads${foundation.logo_path}`,
                    description: foundation.description,

                }));
                setFoundations(data);
            }
            fetchFoundations();
        }, []);
    }catch(error:any){
        console.log("Error in fetching foundations:> " + error);
    }

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
        {foundations.map((foundation) => <FoundationList {...foundation}/>)}
        </TableBody>
        </Table>
        </TableContainer>
    </>
 )
}


export default function AdminViewAnnouncement(){
    
    const navigate = useNavigate();
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
                    <Button variant='contained' 
                            sx={{
                                height: '100%',
                                width: '256px',
                                background: '#2054BD',
                                color: 'white',
                                borderRadius: '5px',
                            }}
                            onClick={()=>navigate("addedit")}
                    >Add Partnered Foundation</Button>
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