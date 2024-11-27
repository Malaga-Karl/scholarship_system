import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme styles
import ImageResize from 'quill-image-resize-module-react'; // Import the image resize module

// Register the image resize module
ReactQuill.Quill.register('modules/imageResize', ImageResize);

export default function QuillTest() {
  const [editorHtml, setEditorHtml] = useState(''); // State to hold the editor's content

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '84px auto 0',
        width: '90%',
        flexGrow: 1,
        border: '4px solid grey',
        borderRadius: '15px',
        padding: '20px 20px 60px 20px',
      }}
    >
      <Typography variant="h4" borderBottom="1px solid grey">
        Quill Testing
      </Typography>
      
      {/* ReactQuill Editor */}
      <ReactQuill
        value={editorHtml}
        onChange={setEditorHtml} // Update the editor content in state
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'], // Include image button
            [{ align: [] }],
            [{ 'size': ['small', 'medium', 'large', 'huge'] }],
            ['clean'], // Clear content
          ],
          imageResize: {
            // Optionally, set maxWidth or minWidth for resizing images
            modules: ['Resize', 'DisplaySize']
          }
        }}
        formats={[
          'header', 'font', 'align', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'image', 'size',
        ]}
        style={{ height: '600px' }} // Set the editor's height
      />
    </Box>
  );
}
