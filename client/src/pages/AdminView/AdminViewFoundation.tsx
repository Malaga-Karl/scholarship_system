import { Outlet } from "react-router-dom";
import AdminTemplate from "./AdminTemplate";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import charity from '../../assets/partners/charityFirst.png';
import lcck from '../../assets/partners/lcck.png';
import green from '../../assets/partners/green.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



type FoundationListType = {
    name:string,
    picture:string,
    desc:string
}

const FoundationArray : FoundationListType[] = [
    {
        name:"Charity First Foundation Inc.",
        picture:charity,
        desc:"In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. "
    },
    {
        name:"Luis Co Chi Kiat Foundation Inc.",
        picture:lcck,
        desc:"Recognizing the overwhelming problems plaguing the country, the group committed to being part of the solution."
    },
    {
        name:"Buddhist Compassion Relief Tzu Chi Foundation, Philippines",
        picture:green,
        desc:"In 2001, a group of Chinese-Filipino businessmen and women decided to pool their resources together to extend help to those affected by natural calamities. "
    },
]

function FoundationList({name, picture, desc}:FoundationListType){
    return(
        
            <TableRow
              key={name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center"><img src={picture} alt="Item"/> </TableCell>
              <TableCell align="center">{name}</TableCell>
              <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "415px"}}>{desc}</TableCell>
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
        "Foundation Logo",
        "Foundation Name",
        "Description",
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
        {FoundationArray.map((dots) => <FoundationList {...dots}/>)}
        </TableBody>
        </Table>
        </TableContainer>
    </>
 )
}


export default function AdminViewAnnouncement(){
    return(
        <AdminTemplate active="foundations">
            {/* <h1>Foundation</h1> */}
            <Outlet />
        </AdminTemplate>
    )
}