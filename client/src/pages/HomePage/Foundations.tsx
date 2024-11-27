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

function FoundationCard({ fou1, fou2, fou3, fade }: { fou1: FoundationData; fou2: FoundationData; fou3: FoundationData; fade: boolean }) {
    return (
        <div style={{ display: "flex", gap: "30px", flexDirection: "row", alignItems: "center", width: "500px" }}>
            {/* Left Image */}
            <Box width={150}>
                <img
                    src={fou1.image}
                    alt={fou1.name}
                    style={{
                        ...logotype,
                        opacity: fade ? 0.3 : 0.5, // Reduced opacity for left image
                        transition: "opacity 0.5s ease-in-out",
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        opacity: fade ? 0.3 : 0.5, // Reduced opacity for left image
                        transition: "opacity 0.5s ease-in-out",
                        ...boldStyle,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {fou1.name}
                </Typography>
            </Box>
            {/* Center Image */}
            <Box width={300}>
                <img
                    src={fou2.image}
                    alt={fou2.name}
                    style={{
                        scale: 2,
                        maxWidth: "200px",
                        minWidth: "200px",
                        opacity: fade ? 0 : 1, // Full opacity for center image
                        transition: "opacity 0.5s ease-in-out",
                    }}
                />
                <Typography variant="body1" sx={boldStyle}>
                    {fou2.name}
                </Typography>
            </Box>
            {/* Right Image */}
            <Box width={100}>
                <img
                    src={fou3.image}
                    alt={fou3.name}
                    style={{
                        ...logotype,
                        opacity: fade ? 0.3 : 0.5, // Reduced opacity for right image
                        transition: "opacity 0.5s ease-in-out",
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        opacity: fade ? 0.3 : 0.5, // Reduced opacity for right image
                        transition: "opacity 0.5s ease-in-out",
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundations, setFoundations] = useState<FoundationData[]>([]);
    const [fade, setFade] = useState(false); // State to handle fade effect
    const [isTransitioning, setIsTransitioning] = useState(false); // Disable buttons during transition

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

    const handleNext = () => {
        if (isTransitioning) return; // Prevent if already transitioning
        setIsTransitioning(true); // Set transitioning state
        setFade(true); // Trigger fade effect
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % foundations.length);
            setFade(false); // Reset fade effect
            setIsTransitioning(false); // Reset transition state after timeout
        }, 500); // Delay to match the duration of the opacity transition
    };

    const handlePrevious = () => {
        if (isTransitioning) return; // Prevent if already transitioning
        setIsTransitioning(true); // Set transitioning state
        setFade(true); // Trigger fade effect
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + foundations.length) % foundations.length);
            setFade(false); // Reset fade effect
            setIsTransitioning(false); // Reset transition state after timeout
        }, 500); // Delay to match the duration of the opacity transition
    };

    return (
        <div style={{ backgroundColor: "rgb(32,84,189)", height: "fit-content", color: "white" }}>
            <Typography variant="h3" className="banner" sx={boldStyle}>
                Our Partnered Foundations
            </Typography>
            <Container sx={{ display: "flex", alignItems: "center", maxHeight:"300px", minHeight:"300px", justifyContent: "space-around" }}>
                <ArrowBackIosIcon
                    onClick={handlePrevious}
                    style={{ cursor: isTransitioning ? 'not-allowed' : 'pointer', opacity: isTransitioning ? 0.5 : 1 }}
                />
                {foundations.length > 0 ? (
                    <FoundationCard
                        fade={fade} // Pass the fade state to control image transition
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
                <ArrowForwardIosIcon
                    onClick={handleNext}
                    style={{ cursor: isTransitioning ? 'not-allowed' : 'pointer', opacity: isTransitioning ? 0.5 : 1 }}
                />
            </Container>
        </div>
    );
}
