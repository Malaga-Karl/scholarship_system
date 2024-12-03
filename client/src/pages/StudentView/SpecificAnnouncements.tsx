import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { axiosBase } from "../../axiosConfig";
import { Announcement } from "@mui/icons-material";

interface AnnouncementBody {
    announcement_id: number;
    title: string;
    description: string;
    cover_path?: string; // Optional if the image is not always present
    status: string;
    createdAt: string
    content?: {
      content: string;
    };
  }

export default function SpecificAnnouncementView(){

    const { announcement_id } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState<AnnouncementBody | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncement = async () => {
        try {
            const response = await axios.get(`/announcements/get/${announcement_id}`);
            setAnnouncement(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching announcement:", error);
            setLoading(false);
        }
        };

        fetchAnnouncement();
    }, [announcement_id]);

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
                    margin:"0 0 10px 0",
                    border:"0px ",
                }}
                modules={{
                    toolbar: false,  // Hide the toolbar in read-only mode
                }}
            />
        );
    };
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '2%'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                // paddingX: '2%',
                marginTop: '5%',
                border: 'ridge',
                borderRadius: '16px',
                width: '93%',
                height: '120%'
            }}>
                <Button startIcon={<ArrowBack/>} sx={{
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'black',
                    textTransform: 'capitalize',
                    fontSize: '20px',
                    paddingY: '1.5%',
                    paddingLeft: '4%'
                }}
                    onClick={() => navigate("/studentview/announcements")}
                >
                    Go Back
                </Button>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    height: '5%'
                }}>
                    <Typography sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#BF9B30',
                        color: 'white',
                        width: '100%',
                        paddingLeft: '4%',
                        textAlign: 'left'
                    }}>
                        
                        {new Date(announcement.createdAt)
                        .toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </Typography>
                </Box>
                <Box> 
                    <br/>
                    <Typography
                        variant="h4"
                    >{announcement.title}</Typography>
                    <br/>
                    <img src={`${axiosBase}/uploads${announcement.cover_path}`} alt="announcement" style={{width: 500}}/>
                    <br/>
                    <Typography>{announcement.description}</Typography>
                    <br/>
                    <QuillOutput
                        content={announcement.content?.content || ""} 
                    />
                </Box>
            </Box>
        </Box>
    );
}
