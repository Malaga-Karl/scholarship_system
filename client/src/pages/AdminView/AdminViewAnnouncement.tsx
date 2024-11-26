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



type FoundationListType = {
    title:string,
    content:string,
    date:string;
    

}

const FoundationArray : FoundationListType[] = [
    {
        title:"The PLM Scholars Foundation Inc. is now accepting applications",
        content:"Attention aspiring PLM Students! If you're passionate about your education and eager to make a difference, here’s your chance to unlock endless possibilities.",
        date:"September 23,2024"

    },
    {
        title:"Resource Generation Office Announcement",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date:"September 22,2024",
    },
    {
        title:"DOST S&T Undergraduate Scholarship Program 2024",
        content:"The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and technology.",
        date:"September 21,2024",
    },
    {
      title:"Announcement 1",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date:"September 21,2024",
    },
    {
      title:"Announcement 2",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date:"September 21,2024",
    },
    {
      title:"Announcement 3",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date:"September 21,2024",
    },
    {
      title:"Announcement 4",
      content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date:"September 21,2024",
    },
]

function FoundationList({title, date, content}:FoundationListType){
    return(
        
            <TableRow
              key={title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, height:"10px" }}
            >
              
              <TableCell align="center">{title} </TableCell>
              <TableCell align="center" sx={{textOverflow:"ellipsis", whiteSpace:"nowrap", overflow: "hidden",maxWidth: "415px"}}>{content}</TableCell>
              <TableCell align="center">{date}</TableCell>
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
      "Announcement Title",
      "Content",
      "Published Date",
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



export default function AdminViewApplicant(){
    return(
        <AdminTemplate active="announcements">
            <FoundList/>
        </AdminTemplate>
    )
}