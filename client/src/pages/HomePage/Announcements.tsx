// MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useEffect, useState } from 'react';
import axios, { axiosBase } from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

export type NewsProps = {
    id: number,
    date: string,
    image: string,
    title: string,
    content?: string
    desc?: string[]
    content2?: string
    content3?: string
    content4?: string
}

export const boldStyle = {
    fontWeight:"bold",
    lineHeight:"normal",
}


export function BigNews({id, date, image, title, content}: NewsProps){
    const navigate = useNavigate();
    return(
        <Card sx={{
            maxWidth:450,
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
        }}>
            <CardMedia 
                sx={{height:250, scale:0.9}}
                image={image}
            />
            <CardContent>
                <Typography variant='h4' mb="15px">{title}</Typography>
                <Typography variant='body1'>{content}</Typography>
            </CardContent>
            <CardActions sx={{
                display:"flex",
                justifyContent:"space-between",
            }}>
                <Typography variant='body2'>{date}</Typography>
                <Button variant='contained'  sx={{backgroundColor:"rgb(191, 155, 48)"}} onClick={() => navigate(`/announcements/${id}`)}>Read More</Button>
            </CardActions>
        </Card>
    )
}

function SmallNews({id, date, image, title}: NewsProps){
    const navigate = useNavigate();
    return(
        <Card sx={{
            maxWidth:500,
            display:"flex"

        }}>
            <CardMedia 
                sx={{width:300, height:"auto", scale:0.9}}
                image={image}
            />
            <div style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between",
                width:"100%",
            }}>
                <CardContent sx={{
                    padding:"5px",
                }}>
                    <Typography variant='h6' textAlign="left" 
                        sx={{
                            fontWeight: "700",
                            lineHeight: "1em",   // Adjust to ensure 1 line height = 1em
                            minHeight: "2em",
                            maxHeight: "2em",    // Limits the height to 2 lines
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,  // Ensures text wraps to only 2 lines

                        }}
                    >{title}</Typography>
                    {/* <Typography variant='body2'>{content}</Typography> */}
                </CardContent>
                <CardActions sx={{
                    display:"flex",
                    justifyContent:"space-between",
                }}>
                    <Typography variant='body2'>{date}</Typography>
                    <Button variant='contained' sx={{backgroundColor:"rgb(191, 155, 48)"}} onClick={() => navigate(`/announcements/${id}`)}>Read More</Button>
                </CardActions>
            </div>
        </Card>
    )
}

type announcement = {
    announcement_id:number,
    title:string,
    description:string,
    cover_path:string,
    status:string,
    createdAt:Date
}

export default function Announcements(){

    const navigate = useNavigate();
    const [firstAnnouncement, setFirstAnnouncement] = useState<announcement | null>(null);
    const [announcements, setOtherAnnouncements] = useState<announcement[]>([]);

    useEffect(() => {
        async function fetchLatestAnnouncements() {
            try {
                const response = await axios.get('/announcements/latest4');
                const getAnnouncements = response.data.map((announcement:announcement) => ({
                    announcement_id: announcement.announcement_id,
                    title: announcement.title,
                    cover_path: `${axiosBase}/uploads${announcement.cover_path}`,
                    description: announcement.description,
                    status: announcement.status,
                    createdAt: announcement.createdAt,
                }));
                // Separate the first and the rest
                setFirstAnnouncement(getAnnouncements[0] || null);
                setOtherAnnouncements(getAnnouncements.slice(1));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchLatestAnnouncements();
    }, []);

    const annStyle = {
        backgroundColor:"rgb(183, 28, 28)",
        height:"fit-content",
    }

    return(
        <div style={annStyle}>
            <Typography variant='h3' className='banner' sx={boldStyle}>Announcements</Typography>
            <Box sx={{
                padding:"20px",
                display:"flex",
                justifyContent:"center",
            }}>
                <BigNews
                    id={firstAnnouncement?.announcement_id ?? 0}
                    date={
                        firstAnnouncement?.createdAt ? new Date(firstAnnouncement.createdAt)
                        .toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) : ''
                    }

                    image={firstAnnouncement?.cover_path ?? ''}
                    title={firstAnnouncement?.title ?? ''}
                    content={firstAnnouncement?.description}
                />
                <Divider orientation="vertical" variant="middle" flexItem sx={{
                    backgroundColor:"rgb(191, 155, 48)",
                    width:"1px",
                    margin:"0px 48px",
                }}/>
                <Box sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"space-around",
                }}>
                    {announcements.map((news, index) => <SmallNews 
                        id={news.announcement_id ?? 0} 
                        date={
                            news?.createdAt ? new Date(news.createdAt)
                            .toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            }) : ''
                        }
    
                        image={news?.cover_path ?? ''}
                        title={news?.title ?? ''}
                        content={news?.description}
                    />)}
                    <Button variant='text' sx={{color:"rgb(255, 255, 255)"}} onClick={()=>navigate(`/announcements`)}>See more<ArrowForwardIcon></ArrowForwardIcon></Button>
                </Box>
            </Box>
        </div>
    )
}