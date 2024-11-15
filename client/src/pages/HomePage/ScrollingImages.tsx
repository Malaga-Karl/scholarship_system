import { Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function ScrollingImages({ images, style }: { images: string[]; style: React.CSSProperties }) {
    const [positions, setPositions] = useState<number[]>([]);
    const scrollSpeed = 0.5; // Slow scroll speed for smooth movement
    const intervalTime = 5; // Interval in ms

    // Calculate width for each image to fit the screen
    const imageWidth = 150;

    // Initialize positions on mount based on images array
    useEffect(() => {
        setPositions(images.map((_, index) => index * imageWidth)); // Space each image by imageWidth
    }, [images, imageWidth]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions((prevPositions) =>
                prevPositions.map((pos, index) => {
                    // Move each image leftward by scrollSpeed
                    const newPos = pos - scrollSpeed;

                    // Reset image position to the end if it goes out of view
                    return newPos < -imageWidth ? (images.length - 1) * imageWidth : newPos;
                })
            );
        }, intervalTime);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images, imageWidth]);

    return (
        <Box
            sx={{
                width: "100vw",
                height: `100px`, // Make container height the same as image height
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.533)",
                boxShadow: "0px 4px 4px rgba(100, 96, 96, 0.643)",
                position: "relative",
                display: "flex",
            }}
        >
            {images.map((image, index) => (
                <img
                    src={image}
                    key={index}
                    style={{
                        ...style,
                        maxWidth: `100px`, // Set each image to dynamically calculated width
                        height: `auto`, // Match height to width to keep it square
                        position: "absolute",
                        top: "50%", // Align to the top of the container
                        transform: "translateY(-50%)",
                        left: `${positions[index]}px`, // Apply dynamic position
                    }}
                    alt={`scrolling-image-${index}`}
                />
            ))}
        </Box>
    );
}
