import { useEffect, useState } from 'react';
// MUI Imports
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Style Imports
import { boldStyle } from './Announcements';
import { Box } from '@mui/material';
import axios from 'axios';

export type FoundationProps = {
    id: number;
    image: string;
    name: string;
    description?: string;
};

type FoundationData = {
    name: string;
    image: string;
};

const logotype = {
    scale: 1,
    opacity: 0.5,
    maxWidth: "100px",
};

function FoundationCard({ fou1, fou2, fou3 }: { fou1: FoundationData; fou2: FoundationData; fou3: FoundationData }) {
    return (
        <div style={{ display: "flex", gap: "30px", flexDirection: "row", alignItems: "center", width: "500px" }}>
            <Box width={150}>
                <img src={fou1.image} style={logotype} alt={fou1.name} />
                <Typography
                    variant="body1"
                    sx={{
                        ...boldStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {fou1.name}
                </Typography>
            </Box>
            <Box width={300}>
                <img src={fou2.image} style={{ scale: 2, maxWidth:"200px"}} alt={fou2.name} />
                <Typography variant="body1" sx={boldStyle}>
                    {fou2.name}
                </Typography>
            </Box>
            <Box width={100}>
                <img src={fou3.image} style={logotype} alt={fou3.name} />
                <Typography
                    variant="body1"
                    sx={{
                        ...boldStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {fou3.name}
                </Typography>
            </Box>
        </div>
    );
}

export default function Foundations() {
    // State to track the currently displayed foundation index
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundations, setFoundations] = useState<FoundationData[]>([]);

    useEffect(() => {
        async function fetchAllFoundations() {
            try {
                const response = await axios.get('http://localhost:3001/foundations/getall');
                const getFoundations = response.data.map((foundation: { name: string; logo_path: string }) => ({
                    name: foundation.name,
                    image: `http://localhost:3001/uploads${foundation.logo_path}`,
                }));
                setFoundations(getFoundations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchAllFoundations();
    }, []);

    // Helper functions to navigate through foundations
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foundations.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + foundations.length) % foundations.length);
    };

    return (
        <div style={{ backgroundColor: "rgb(32,84,189)", height: "fit-content", color: "white" }}>
            <Typography variant="h3" className="banner" sx={boldStyle}>
                Our Partnered Foundations
            </Typography>
            <Container sx={{ display: "flex", alignItems: "center", padding: "50px", justifyContent: "space-around" }}>
                <ArrowBackIosIcon onClick={handlePrevious} style={{ cursor: 'pointer' }} />
                {foundations.length > 0 ? (
                    <FoundationCard
                        fou1={{
                            name: foundations[(currentIndex + 1) % foundations.length].name,
                            image: foundations[(currentIndex + 1) % foundations.length].image,
                        }}
                        fou2={{
                            name: foundations[currentIndex].name,
                            image: foundations[currentIndex].image,
                        }}
                        fou3={{
                            name: foundations[(currentIndex - 1 + foundations.length) % foundations.length].name,
                            image: foundations[(currentIndex - 1 + foundations.length) % foundations.length].image,
                        }}
                    />
                ) : (
                    <Typography variant="body1" sx={{ color: 'white' }}>
                        No foundations available.
                    </Typography>
                )}
                <ArrowForwardIosIcon onClick={handleNext} style={{ cursor: 'pointer' }} />
            </Container>
        </div>
    );
}
