import Box from "@mui/material/Box";
import StudentViewTemplate from "./StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardActionArea from "@mui/material/CardActionArea";
import imgEmptyMail from '../../assets/emptymail.png';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import {useState} from 'react'
import { Outlet } from 'react-router-dom';
import Colors from '../../colors'

type EmailInfo = {
    name: string
    email: string
}

type Mail = {
    id:number
    sender: EmailInfo
    receiver: EmailInfo
    sentTime: string
    subject: string
    cc?: string[]
    body: string
}

const messages:Mail[] = [
    {
        id:1,
        sender:{
            name:"Karl",
            email:"sample@test.com"
        },
        receiver:{
            name:"Benedict",
            email:"emailemail"
        },
        sentTime:"5:55",
        subject:"This is testing",
        body:"Hello Testing!"
    },
    {
        id:2,
        sender:{
            name:"Carl",
            email:"sample@test.com"
        },
        receiver:{
            name:"Venedict",
            email:"emailemail"
        },
        sentTime:"5:55",
        subject:"This is testing",
        body:"testing2!"
    },
    {
        id:3,
        sender:{
            name:"Barl",
            email:"sample@test.com"
        },
        receiver:{
            name:"Negedict",
            email:"emailemail"
        },
        sentTime:"5:55",
        subject:"This is testing",
        body:"testing3!"
    }
]


export default function StudentViewContact(){
    const [mailIndex, setMailIndex] = useState(1)
    const hasMessage:boolean = false;

    return(
        <StudentViewTemplate active="contact">
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3}}
            >
                <Toolbar />
                <Box sx={{display:"flex"}}>
                    <Button variant="contained" sx={{marginBottom:3, justifySelf:"left"}} onClick={() => window.location.href = 'contact/new'}>Create Mail</Button>
                </Box>
                {!hasMessage ? (
                    <EmptyMail/>
                ) : (
                    <HasMail id={mailIndex} setMailIndex={setMailIndex}/>
                )}
            </Box>
            <Outlet/>
        </StudentViewTemplate>
    );
}

function EmptyMail(){
    return(
        <Paper>
            <img src={imgEmptyMail} alt="empty mail" />
            <Typography variant="h3" sx={{fontWeight:"bold"}}>You haven't sent any messages to the Resource Generation Office (RGO) yet.</Typography>
            <Typography variant="h5" mt={4}>Feel free to reach out if you have any questions or need assistance.</Typography>
        </Paper>
    )

}

type HasMailProp = {
    id:number
    setMailIndex: (id:number) => void
}
function HasMail({id, setMailIndex}:HasMailProp){
    return(
        <Box sx={{display:"flex"}}>
            <Box sx={{flex:1, height:"75vh", boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
                <Box sx={{backgroundColor:Colors.gold, display:"flex", justifyContent:"space-between", height:50, color:"white", alignItems:"center"}}>
                    <Typography variant="h6" ml={5} sx={{fontWeight:"bold"}}>Inbox</Typography>
                    <Typography variant="h6" mr={5} sx={{fontWeight:"bold"}}>{messages.length}</Typography>
                </Box>
                <Box>
                    {messages.map((message) => <MailListItem {...message } onClick={()=>setMailIndex(message.id)}/>)}
                </Box>
            </Box>
            <Box sx={{flex:3}}>
                <SpecificMail id={id}/>
            </Box>
        </Box>
    )
}


//need to put setEmailInedx Here
function MailListItem({receiver, subject, sentTime, onClick}:Mail & {onClick: () => void}){
    return(
        <Card sx={{marginBottom:1}}>
            <CardActionArea onClick={onClick}>
                <CardContent sx={{padding:1, display:"flex", flexDirection:"column"}}>
                    <Typography variant="body1" sx={{fontWeight:"bold", alignSelf:"start"}}>{receiver.name}</Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Typography variant="body2">{subject}</Typography>
                        <Typography variant="body2">{sentTime}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

type SpecificMailProp = {
    id: number
}
function SpecificMail({id}:SpecificMailProp){

    const specificMessage = messages.find((message) => message.id === id)
    return(
        specificMessage ? (
            <Paper sx={{height: "75vh", marginLeft:3, textAlign:"left"}}>
                <Typography variant="h6" sx={{backgroundColor:Colors.blue, textAlign:"left", height:50, color:"white", fontSize:30, paddingLeft:5}}>{specificMessage.subject}</Typography>
                <Box display={"flex"} sx={{padding:4, justifyContent:"space-between"}}>
                    <Box display={"flex"}>
                        <Avatar>{specificMessage.sender.name[0]}</Avatar>
                        <Box sx={{textAlign:"left", marginLeft:1}}>
                            <Typography variant="body1">{specificMessage.sender.name}</Typography>
                            <Typography variant="body2">to: {specificMessage.receiver.email}</Typography>
                            {specificMessage.cc ? 
                                (<Typography>cc: {specificMessage.cc.map((i)  => i)}</Typography>) :
                                <></>
                            }
                        </Box>
                    </Box>
                    <IconButton>
                        <Delete/>
                    </IconButton>
                </Box>
                <Typography variant="body1" sx={{paddingLeft:5, paddingRight:5}}>
                    {specificMessage.body}
                </Typography>
            </Paper>
        )
        :
        (
            <h1>No Mail</h1>
        )
    )
}