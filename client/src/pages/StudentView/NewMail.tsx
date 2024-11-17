import StudentViewTemplate from "./StudentViewTemplate";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useState, useEffect} from 'react';
import Colors from '../../colors';

// Function to calculate minRows using linear interpolation
const calculateMinRows = (height:number) => {
    // Known points: (743, 17) and (959, 25)
    const y1 = 15, x1 = 743;
    const y2 = 23, x2 = 959;
  
    // Calculate the slope (m)
    const m = (y2 - y1) / (x2 - x1);
    // Calculate the intercept (b)
    const b = y1 - m * x1;
  
    // Calculate minRows for the current height
    return Math.round(m * height + b);
  };
  
export default function NewMail() {
    const [minRows, setMinRows] = useState(calculateMinRows(window.innerHeight));
  
    useEffect(() => {
      // Function to update minRows on window resize
      const handleResize = () => {
        const newMinRows = calculateMinRows(window.innerHeight);
        setMinRows(newMinRows);
      };
  
      // Initial calculation and event listener setup
      handleResize();
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
        <StudentViewTemplate active="contact">
            <Paper sx={{height:"85vh"}}>
                <Box padding={5}>
                    <Box sx={{display:'flex'}}>
                        <Box sx={{border:"1pt solid black", padding:"5px 30px", borderRadius:"10px"}}>
                            <Typography variant="body1">To</Typography>
                        </Box>
                        <Box ml={5} sx={{padding:"5px 2px", borderBottom:"1pt solid black", flexGrow:"1", textAlign:"left"}}>
                            <Typography variant="body1">rgoadmin1@plm.edu.ph</Typography>
                        </Box>
                    </Box>
                    <Box mt={2} sx={{display:'flex'}}>
                        <Box sx={{border:"1pt solid black", padding:"5px 30px", borderRadius:"10px"}}>
                            <Typography variant="body1">Cc</Typography>
                        </Box>
                        <TextField variant="standard" sx={{marginLeft:5, flexGrow:"1"}}/>
                    </Box>
                    <TextField variant="standard" placeholder="Subject" sx={{marginTop:2, width:"100%"}}/>
                    <TextField variant="outlined" placeholder="Compose Mail" multiline minRows={minRows} sx={{marginTop:2, width:"100%", height:"100%"}}/>
                    <Box mt={1} sx={{display:"flex", justifyContent:"space-between"}}>
                        <Button variant="outlined">Save draft</Button>
                        <Button variant="contained" sx={{backgroundColor:Colors.gold}}>Send</Button>
                    </Box>
                </Box>
            </Paper>
        </StudentViewTemplate>
    )
}