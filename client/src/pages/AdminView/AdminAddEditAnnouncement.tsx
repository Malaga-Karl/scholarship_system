import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ReactQuill from "react-quill";
import axios from '../../axiosConfig';
import ImageResize from "quill-image-resize-module-react"; // Import the image resize module
import SendIcon from "@mui/icons-material/Send";

// Register the image resize module
ReactQuill.Quill.register("modules/imageResize", ImageResize);

export default function AddEditAnnouncement() {
  const [fileName, setFileName] = useState(""); // To store file name
  const [annImageFile, setAnnImageFile] = useState<File | null>(null); // To store the file itself
  const [annTitle, setAnnTitle] = useState(""); // To store the title
  const [annDescription, setAnnDescription] = useState(""); // To store the title
  const [editorHtml, setEditorHtml] = useState(""); // State to hold the editor's content

  // Handle input change for title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnTitle(event.target.value);
  };

  // Handle input change for description
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnDescription(event.target.value);
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to safely access the first file
    if (file) {
      setAnnImageFile(file); // Save the file object
      setFileName(file.name); // Save the file name for display
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Check if the Quill editor has content
    if (!editorHtml.trim()) {
      alert("Please enter content in the announcement editor.");
      return;
    }
  
    // Prepare the payload for submission
    const formData = new FormData();
    formData.append("title", annTitle); // Add title
    formData.append("description", annDescription || ""); // Add description (or empty string if undefined)
    if (annImageFile) {
      formData.append("file", annImageFile); // Add the selected image file
    }
    formData.append("content", editorHtml); // Add Quill editor content
  
    try {
      // Send the data to the backend
      const response = await axios.post("/announcements/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper encoding for form data
        },
      });
  
      // Handle success response
      console.log("Form submitted successfully:", response.data);
      alert("Announcement created successfully!");
  
      // Optionally, reset the form
      setAnnTitle("");
      setAnnDescription("");
      setAnnImageFile(null);
      setFileName("");
      setEditorHtml("");
  
    } catch (error: any) {
      // Handle error response
      console.error("Error submitting form:", error);
      alert("Failed to create the announcement. Please try again.");
    }
  };
  


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "84px auto 0",
          width: "90%",
          flexGrow: 1,
          border: "4px solid grey",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          ANNOUNCEMENT DETAILS
        </Typography>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
          }}
          onSubmit={handleSubmit}
        >
          {/* Title Input */}
          <TextField
            label="Announcement Title"
            variant="outlined"
            sx={{
              width: "50%",
              margin: "0 auto",
            }}
            required
            value={annTitle} // Bind state to the value of the input
            onChange={handleTitleChange} // Update the state on input change
          />
          
          {/* Title Input */}
          <TextField
            label="Announcement Description"
            variant="outlined"
            sx={{
              width: "50%",
              margin: "0 auto",
            }}
            required
            value={annDescription} // Bind state to the value of the input
            onChange={handleDescriptionChange} // Update the state on input change
          />

          {/* Image Upload */}
          <Box>
            <Typography variant="subtitle1" fontWeight={500} mb={1}>
              Cover Image {fileName ? `: ${fileName}` : ""}
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Attach image here
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange} // Update file state on file selection
                required
              />
            </Button>
          </Box>
          <Box>
            {/* ReactQuill Editor */}
            <ReactQuill
              value={editorHtml}
              onChange={setEditorHtml} // Update the editor content in state
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link", "image"], // Include image button
                  [{ align: [] }],
                  [{ size: ["small", "medium", "large", "huge"] }],
                  ["clean"], // Clear content
                ],
                imageResize: {
                  // Optionally, set maxWidth or minWidth for resizing images
                  modules: ["Resize", "DisplaySize"],
                },
              }}
              formats={[
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
              ]}
              style={{ height: "600px", marginBottom: "40px" }} // Set the editor's height
            />
          </Box>
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end", textTransform: "none" }}
          >
            Submit
            <SendIcon sx={{ marginLeft: "10px" }} />
          </Button>
        </form>
      </Box>
    </>
  );
}
