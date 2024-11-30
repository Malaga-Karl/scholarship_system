import React, { useState, useEffect } from "react";
import StudentViewTemplate from "../../template/StudentViewTemplate";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Colors from "../../colors";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module-react"; // Import the image resize module
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

ReactQuill.Quill.register("modules/imageResize", ImageResize);
// Quill formats
const quillFormats = [
  "header",
  "font",
  "align",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "size",
];

// Function to calculate minRows using linear interpolation
const calculateMinRows = (height: number) => {
  const y1 = 15,
    x1 = 743;
  const y2 = 23,
    x2 = 959;

  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;

  return Math.round(m * height + b);
};


export default function NewMail() {
    const [subject, setSubject] = useState("");
    const [minRows, setMinRows] = useState(calculateMinRows(window.innerHeight));
    const [editorContent, setEditorContent] = useState("");
    const [to, setTo] = useState("");
    const [cc, setCc] = useState("");
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
        const newMinRows = calculateMinRows(window.innerHeight);
        setMinRows(newMinRows);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    //handling the microsoft API
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { instance } = useMsal(); // Get MSAL instance
    const isAuthenticated = useIsAuthenticated(); // Check if the user is authenticated
    
    //this can be placed in 1 file tho T_T, but I don't want to fuck this shit up
    const fetchAccessToken = async (): Promise<string> => {
        if (accessToken) return accessToken; // Use cached token if available
    
        if (!isAuthenticated) {
        throw new Error("User is not authenticated");
        }
    
        try {
        let activeAccount = instance.getActiveAccount();
        if (!activeAccount) {
            const accounts = instance.getAllAccounts();
            if (accounts.length === 0) {
            throw new Error("No accounts found. Please log in again.");
            }
            activeAccount = accounts[0];
            instance.setActiveAccount(activeAccount);
        }
    
        const tokenResponse = await instance.acquireTokenSilent({
            scopes: ["Mail.Read"],
            account: activeAccount,
        });
    
        const newAccessToken = tokenResponse.accessToken;
        setAccessToken(newAccessToken);
        return newAccessToken;
        } catch (err: any) {
            console.error("Error acquiring access token:", err);
            throw new Error("Error acquiring access token: " + (err.message || "Unknown error"));
        }
    };

    // Handle send (integrate with Graph API)
    const handleSend = async () => {
        const emailData = {
          message: {
            subject,
            body: {
              contentType: "HTML",
              content: editorContent,
            },
            toRecipients: [
              {
                emailAddress: { address: to },
              },
            ],
            ccRecipients: cc
              ? [
                  {
                    emailAddress: { address: cc },
                  },
                ]
              : [],
          },
          saveToSentItems: true, // Ensures the email is saved in the Sent folder
        };
      
        try {
            setLoading(true); // Set loading to true when starting to fetch
            const token = await fetchAccessToken();
            const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`, // Replace with your access token
                "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            });
        
            if (response.ok) {
                console.log("Email sent successfully!");
            } else {
                const errorData = await response.json();
                setErrors('Error in sending Email:' + errorData)
                console.error("Error sending email:", errorData);
            }
            setCc('');
            setTo('');
            setEditorContent('');
            setSubject('');
            alert("Email Set Successfully!");
            setLoading(false);
        } catch (error) {
            setErrors('Error in sending Email:' + error)
            console.error("Error during API call:", error);
        }
      };
    
    const saveDraft = () => {
        const draft = {
            to,
            cc,
            subject,
            editorContent,
        };
        localStorage.setItem("emailDraft", JSON.stringify(draft));
        alert("Draft saved locally!");
        navigate('/studentview/contact');
    };

    useEffect(() => {
        // Load draft from localStorage on component mount
        const savedDraft = localStorage.getItem("emailDraft");
        if (savedDraft) {
          const { to, cc, subject, editorContent } = JSON.parse(savedDraft);
          setTo(to || "");
          setCc(cc || "");
          setSubject(subject || "");
          setEditorContent(editorContent || "");
        }
      }, []);


  return (
    <>
      {loading? (
        <Box
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {!errors?(
                <CircularProgress />
            ):(
                <Typography
                    variant="h4"
                    color="error"
                >
                     {errors}
                </Typography>
            )}
        </Box>
      ):(
        <Paper sx={{ height: "auto", marginTop: "70px" }}>
        <Box padding={5}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ border: "1pt solid black", padding: "5px 30px", borderRadius: "10px" }}>
              <Typography variant="body1">To</Typography>
            </Box>
            <TextField
              variant="standard"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter recipient email"
              sx={{ marginLeft: 5, flexGrow: 1 }}
            />
          </Box>
          <Box mt={2} sx={{ display: "flex" }}>
            <Box sx={{ border: "1pt solid black", padding: "5px 30px", borderRadius: "10px" }}>
              <Typography variant="body1">Cc</Typography>
            </Box>
            <TextField
              variant="standard"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
              placeholder="Enter CC email"
              sx={{ marginLeft: 5, flexGrow: 1 }}
            />
          </Box>
          <TextField
            variant="standard"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            sx={{ marginTop: 2, width: "100%" }}
          />
          <Box sx={{ marginTop: 2 }}>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              formats={quillFormats}
              style={{ height: `${minRows * 1.5}em` , marginBottom:'60px'}}
            />
          </Box>
          <Box mt={1} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={saveDraft}>Save draft</Button>
            <Button variant="contained" sx={{ backgroundColor: Colors.gold }} onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
      )}
    </>
  );
}
