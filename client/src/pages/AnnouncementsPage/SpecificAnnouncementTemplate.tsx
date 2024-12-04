import Box from "@mui/material/Box";
import { NewsProps } from "../HomePage/Announcements";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

interface AnnouncementBody {
    announcement_id: number;
    title: string;
    description: string;
    cover_path?: string; // Optional if the image is not always present
    status: string;
    content?: {
      content: string;
    };
  }


export default function AnnouncementTemplate({title, date, image, content, description, content2, content3, content4, id}:NewsProps & {description:string}){
    const [announcement, setAnnouncement] = useState<AnnouncementBody | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`/announcements/get/${id}`);
            setAnnouncement(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching announcement:", error);
            setLoading(false);
        }
        };

        fetchAnnouncement();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!announcement) {
        return <p>Announcement not found.</p>;
    }

    const QuillOutput = ({ content }:{content:string}) => {
        const [editorContent, setEditorContent] = useState('');

        useEffect(() => {
            if (content) {
                setEditorContent(content);  // Set the content to the editor
            }
        }, [content]);
    
        return (
            <ReactQuill
                value={editorContent}
                readOnly={true}  // Set read-only mode
                theme="snow"  // Use the 'snow' theme or 'bubble' theme
                style={{
                    width:"80%",
                    margin:"0 auto"
                }}
                modules={{
                    toolbar: false,  // Hide the toolbar in read-only mode
                }}
            />
        );
    };
    
    return(
    <Box component="section" sx={{backgroundColor:"goldenrod"}}>
        <Typography variant="h5" sx={{color:"white", textAlign:"left", paddingLeft: 18, paddingTop: 2, paddingBottom: 2}}>{date}</Typography>
        <Box sx={{backgroundColor:"white", color:"black", height:"fill-content"}}>
            <Typography variant="h1" sx={{fontWeight: 'medium', textAlign: "left", paddingLeft: 18}}>{title}</Typography>
            <img src={image} alt="announcement" style={{width: 500}}/>
            <br></br>
           
            <Typography>{description}</Typography>
            <br></br>
            {/*<Box dangerouslySetInnerHTML={{ __html: announcement.content?.content || ""}}></Box>*/}
            <QuillOutput content={announcement.content?.content || ""} />
            
            <Box mt={10} pb={5} sx={{display:"flex", justifyContent:"space-around"}}>
                <Button variant="contained" color="error" onClick={() => navigate('/announcements')}>Back to Announcements</Button>
                <Button variant="contained" onClick={() => { navigate( '/announcements/' + (Number(id) + 1)) }}> Next </Button>
            </Box>
        </Box>
    </Box>
    );
}