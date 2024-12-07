import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import axios from '../../axiosConfig';
import ImageResize from "quill-image-resize-module-react";
import SendIcon from "@mui/icons-material/Send";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    } from "@mui/material";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

export default function AddEditAnnouncement() {
  const [fileName, setFileName] = useState(""); // To store file name
  const [annImageFile, setAnnImageFile] = useState<File | null>(null); // To store the file itself
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // To store preview URL for images
  const [annTitle, setAnnTitle] = useState(""); // To store the title
  const [annDescription, setAnnDescription] = useState(""); // To store the description
  const [editorHtml, setEditorHtml] = useState(""); // State to hold the editor's content
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState('');

  const { announcement_id } = useParams();
  const navigate = useNavigate();

  // Fetch existing announcement details if `announcement_id` is present
  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!announcement_id) return; // Skip fetching if no announcement_id

      setLoading(true); // Set loading state
      try {
        const response = await axios.get(`/announcements/get/${announcement_id}`);
        const { title, description, content, cover_path } = response.data;

        setAnnTitle(title);
        setAnnDescription(description);
        if(content)
          setEditorHtml(content.content);
        setFileName(cover_path ? cover_path.split('/').pop() : "");
      } catch (err) {
        console.error("Error fetching announcement:", err);
        setError("Failed to load announcement data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAnnouncement();
  }, [announcement_id]);

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
    const file = event.target.files?.[0];
    if (file) {
      const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validFileTypes.includes(file.type)) {
        setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }
      setAnnImageFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editorHtml.trim()) {
      setError("Please enter content in the announcement editor.");
      setOpenDialog(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", annTitle);
    formData.append("description", annDescription);
    if (annImageFile) {
      formData.append("file", annImageFile);
    }else{
      setError("Please add a cover image.");
      setOpenDialog(true);
      return;
    }
    formData.append("content", editorHtml);

    try {
      if (announcement_id) {
        // Update existing announcement
        await axios.put(`/announcements/update/${announcement_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setDialogContent("Announcement updated successfully!");
      } else {
        // Create new announcement
        await axios.post("/announcements/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setDialogContent("Announcement created successfully!");
      }

      // Redirect to announcements list
    } catch (err) {
      console.error("Error saving announcement:", err);
      setError("Failed to save the announcement. Please try again.");
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setDialogContent('');
    setOpenDialog(false);
    if(!error){
      navigate("/adminView/announcements");
    }
    setError('');

  }

  if (loading) return <p>Loading announcement...</p>;

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
        {announcement_id ? "Edit Announcement" : "Create Announcement"}
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
          value={annTitle}
          onChange={handleTitleChange}
        />

        {/* Description Input */}
        <TextField
          label="Announcement Description"
          variant="outlined"
          sx={{
            width: "50%",
            margin: "0 auto",
          }}
          required
          value={annDescription}
          onChange={handleDescriptionChange}
        />

        {/* Image Upload */}
        <Box>
          <Typography variant="subtitle1" fontWeight={500} mb={1}>
            Cover Image {fileName ? `: ${fileName}` : ""}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            maxWidth={"400px"}
            margin={"0 auto"}
          >
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: "none" }}
            >
              Attach image (JPEG/PNG/GIF) here
              <input
                type="file"
                hidden
                accept="image/*,image/gif"
                onChange={handleFileChange}
              />
            </Button>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "auto", maxHeight: "200px", marginTop: "10px" }}
              />
            )}
          </Box>          
        </Box>

        {/* ReactQuill Editor */}
        <ReactQuill
          value={editorHtml}
          onChange={setEditorHtml}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link", "image"],
              [{ align: [] }],
              [{ size: ["small", "medium", "large", "huge"] }],
              ["clean"],
            ],
            imageResize: {
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
          style={{ height: "600px", marginBottom: "40px" }}
        />
        <Box
          display={"flex"}
          flexDirection={"row"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          {/* Back Button */}
          <Button
            variant="contained"
            color="error"
            sx={{ alignSelf: "flex-start", textTransform: "none" }}
            onClick={()=>{navigate("/adminView/announcements")}}
          >
            Back
            <ArrowBackIcon sx={{ marginLeft: "10px" }} />
          </Button>
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
        </Box>
      </form>
    </Box>
    {/* Notice Dialog */}
    <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Notice"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description"
                color={error?'error' : 'success'}
            >
                {error ? error : dialogContent}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog} color="success">
                OK
            </Button>
        </DialogActions>
    </Dialog>
  </>
  );
}
