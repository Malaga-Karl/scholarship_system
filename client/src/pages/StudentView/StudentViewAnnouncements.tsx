import Box from "@mui/material/Box";
import StudentViewTemplate from "../../template/StudentViewTemplate";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import plmScholar from "../../assets/announcements/plmscholar.png"
import dostImage from "../../assets/announcements/DOST(BIG).jpg"
import faceIcon from "../../assets/icon.png"

<<<<<<< HEAD

export default function StudentViewAnnouncements() {
    // Styled component to make pagination buttons square
  const SquarePagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
      borderRadius: "0", // Makes the buttons square
      width: "40px", // Fixed width for square shape
      height: "40px", // Fixed height for square shape
    },
  }));
  return (
    <StudentViewTemplate active="announcements">
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 1, gap: 1, }}
      >
        <Toolbar />
        {/* Announcement Card */}
        <Card
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            mb: 1,
          }}
        >
          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{
              width: 200,
              height: "auto",
              borderRadius: 1,
            }}
            image= {plmScholar} // Replace with actual image URL
            alt="PLM"
          />
          {/* Content Section */}
          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{mb: 2, textAlign: "left"}}>
              The PLM Scholars Foundation Inc. is now accepting applications
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
              Attention aspiring PLM Students! If you're passionate about your
              education and eager to make a difference, here's your chance to
              unlock endless possibilities.
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
              The PLM Scholars Foundation Inc. (PLMSFI) is now accepting
              scholarship applications for the Academic Year 2024-2025 for all
              PLM students.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{textAlign: "left"}}>
              September 23, 2024
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
              >
                Read More
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 1 }}
      >
        <Toolbar />
        {/* Announcement Card */}
        <Card
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            mb: 1,
          }}
        >
          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            image= {faceIcon} // Replace with actual image URL
            alt="Icon"
          />
          {/* Content Section */}
          <CardContent sx={{ flex: 1, ml: 2}}>
            <Typography variant="h5" sx={{mb:1, textAlign: "left"}}>
              Resource Generation Office
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{mb: 2, textAlign: "left"}}>
              September 23, 2024
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla phariatur. 
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
              >
                Read More
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 1 }}
      >
        <Toolbar />
        {/* Announcement Card */}
        <Card
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderRadius: 2,
            boxShadow: 2,
            p: 2,
            mb: 1,
          }}
        >
          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{
              width: 200,
              height: "auto",
              borderRadius: 1,
            }}
            image= {dostImage} // Replace with actual image URL
            alt="DOST"
          />
          {/* Content Section */}
          <CardContent sx={{ flex: 1, ml: 2 }}>
          <Typography variant="h4" fontWeight="bold" sx={{mb: 2, textAlign: "left"}}>
              DOST S&T Undergraduate Scholarship Program 2024
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
            The DOST-SEI Undergraduate Scholarship is a prestigious program supporting Filipino students aiming for higher education in science and technology. Its main goals are:
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, textAlign: "left" }}>
            Promoting Excellence: It identifies and supports students with great potential in science and tech.
            Building a Skilled Workforce: By giving financial help, it encourages students to ...
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{textAlign: "left"}}>
              September 23, 2024
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
              >
                Read More
              </Button>
            </Box>
          </CardContent>
        </Card>
        {/* Pagination Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <SquarePagination
            count={3} // Total number of pages
            page={1} // Current page
            onChange={(event, value) => {
              console.log("Page changed to:", value);
            }}
            color="primary"
            size="large"
          />
        </Box>        
      </Box>
    </StudentViewTemplate>
  );
=======
export default function StudentViewAnnouncments(){
    return(
        <>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
            <Toolbar />
            <Typography variant='h1'>Announcments</Typography>
            </Box>
        </>
    );
>>>>>>> 731936d22396f0cb26d1bb8c70652cfbae5d54cd
}