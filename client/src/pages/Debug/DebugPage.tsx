import { Box, Typography } from "@mui/material";

export default function DebugPage(){
    return (
        <>
            <Box
                boxSizing={"border-box"}
                paddingTop={"1vh"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={"100vw"}
                minHeight={"100vh"}
                overflow={"auto hidden"}
            >
                <Typography 
                    variant="h3"
                    borderBottom={"1px solid black"}
                    width={"90%"}
                    textAlign={"center"}
                >
                    Debug Page
                </Typography>
                {/*Below is the testing section*/}
            </Box>
        </>
    );
}