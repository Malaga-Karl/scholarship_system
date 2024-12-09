import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosBase } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import newIcon from "../../assets/announcements/new_icon.png";

interface aCard {
  announcement_id:number,
  title:string,
  cover_path:string,
  description:string,
  createdAt: string,
}

function AnnouncementCard({announcement_id, title, cover_path, description, createdAt }:aCard){
  const navigate = useNavigate();

  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);
  const dateDifference = Math.ceil((currentDate.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60 * 24));

  let boxShadowColor = "rgba(0, 0, 0, 1)";

  if(dateDifference <= 1){
    // the announcement is new
    boxShadowColor = "rgba(0, 0, 255, 1)";
  }

  return(
    <>
    <Card
      key={announcement_id}
        
          sx={{
            display: "flex",
            position:"relative",
            alignItems: "flex-start",
            
            borderRadius: 2,
            boxShadow: `0px 0px 10px ${boxShadowColor}`,
            p: 2,
            mb: 1,
          }}
        >
          {
            dateDifference <= 1 ? (
          <Box
            position={"absolute"}
            top={"20px"}
            right={"20px"}
          >
            <img 
              src={newIcon} 
              alt="New Icon"
              style={{
                maxHeight:"50px",
                maxWidth:"50px",
              }}
            />
          </Box>
            ) : ( '' )
          }
          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{
              width: 200,
              maxHeight:250,
              minHeight:250,
              height: "auto",
              borderRadius: 1,
            }}
            image= {cover_path} // Replace with actual image URL
            alt="DOST"
          />
          {/* Content Section */}
          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{mb: 2, textAlign: "left"}}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
              {description}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{textAlign: "left"}}>
              {
                new Date(createdAt)
                .toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' ,
                    hour: '2-digit',
                    minute: '2-digit'
                })
              }
            </Typography>
            {/* Read More Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#d4a017", // Match the button color from the image
                  color: "white",
                  ":hover": { bgcolor: "#b48f12" },
                }}
                onClick={()=>navigate(`${announcement_id}`)}
              >
                Read More
              </Button>
            </Box>
          </CardContent>
        </Card>
    </>
  )
}


export default function StudentViewAnnouncements() {

  const [announcements, setOtherAnnouncements] = useState<aCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3; // Number of announcements per page

  
  useEffect(() => {
    async function fetchLatestAnnouncements() {
        try {
            const response = await axios.get(`/announcements/allPaginate?page=${currentPage}&pageSize=${pageSize}`);
            const { announcements, total } = response.data;

            const getAnnouncements = announcements.map((aCard: aCard) => ({
                announcement_id: aCard.announcement_id,
                title: aCard.title,
                cover_path: `${axiosBase}/uploads${aCard.cover_path}`,
                description: aCard.description,
                createdAt: aCard.createdAt,
            }));

            setOtherAnnouncements(getAnnouncements);
            setTotalPages(Math.ceil(total / pageSize)); // Calculate total pages
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchLatestAnnouncements();
}, [currentPage]); // Re-fetch data when currentPage changes
  
  return (
    // <StudentViewTemplate active="announcements">
    <Box
      maxWidth={"80%"}
      margin={"80px auto 0 auto"}
    >
      {announcements.map((announcement) => (
        <AnnouncementCard {...announcement} key={announcement.announcement_id} />
      ))}

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
    //</StudentViewTemplate>
  );
}