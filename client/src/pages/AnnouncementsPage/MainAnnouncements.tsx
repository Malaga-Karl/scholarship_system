//MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import {BigNews, NewsProps, boldStyle} from "../HomePage/Announcements"

//Image Imports
import { useParams } from 'react-router-dom'
import SpecificAnnouncementTemplate from './SpecificAnnouncementTemplate'
import { useEffect, useState } from 'react'
import axios, { axiosBase } from '../../axiosConfig';
import { Button } from '@mui/material'

type announcement ={
    announcement_id:number,
    title:string,
    description:string,
    cover_path:string,
    status:string,
    createdAt:Date
}

export default function MainAnnouncements(){
    const { id } = useParams();
    const [announcements, getAllAnnouncements] = useState<announcement[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setErrors] = useState("");
    useEffect(() => {
        setLoading(true);
        async function fetchLatestAnnouncements() {
            try {
                const response = await axios.get('/announcements/all');
                const getAnnouncements = response.data.map((announcement:announcement) => ({
                    announcement_id: announcement.announcement_id,
                    title: announcement.title,
                    cover_path: `${axiosBase}/uploads${announcement.cover_path}`,
                    description: announcement.description,
                    status: announcement.status,
                    createdAt: announcement.createdAt,
                }));
                getAllAnnouncements(getAnnouncements);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrors("Error in fetching announcements");
            }
        }

        fetchLatestAnnouncements();
        setLoading(false);
        
    }, []);

    const specificAnnouncement = id
    ? announcements.find((announcement) => announcement.announcement_id === parseInt(id))
    : null;


    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error {error}</p>;
    }


    return(
        <Box sx={{
            height:"fit-content",
            backgroundColor:"rgb(183, 28, 28)",
        }}>
            {id ?(
                <>
                    {specificAnnouncement?(
                        <SpecificAnnouncementTemplate 
                            id={specificAnnouncement.announcement_id}
                            title={specificAnnouncement.title}
                            content=''
                            date={
                                specificAnnouncement.createdAt ? new Date(specificAnnouncement.createdAt)
                                .toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }) : ''
                            }
                            image={specificAnnouncement.cover_path}
                        />
                    ) : (
                        <Box display={"flex"} flexDirection={"column"} gap={10} justifyContent={"center"}>
                            <Typography variant='h3'>There is no news like that. u trippin homie</Typography> 
                            <Button variant="contained" sx={{margin:"10px auto", maxWidth:"250px"}
                        } color="error" onClick={() => window.location.href = '/announcements'}>Back to Announcements</Button>
                        </Box>
                    )}
                </>
            ) : (
                <>
                    <Typography variant='h3' className='banner banner--lowered' sx={boldStyle}>Announcements</Typography>
                    <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",transform:"scale(0.8)", gap:"50px"}}>
                        {announcements.map((announcement, index) => <BigNews 
                            id={announcement?.announcement_id ?? 0}
                            date={
                                announcement?.createdAt ? new Date(announcement.createdAt)
                                .toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }) : ''
                            }
        
                            image={announcement?.cover_path ?? ''}
                            title={announcement?.title ?? ''}
                            content={announcement?.description}
                        />)}
                    </Box>
            </>
            )}
            
        </Box>
    )
}