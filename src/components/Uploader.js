import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button, Stack, Paper, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Add axios for making HTTP requests

function Uploader() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);  // Store the actual file
  const [uploadedFileName, setUploadedFileName] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileUploaded(file);  // Store the file object
      setUploadedFileName(file.name); 
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const bondTemplateUrl = `https://docs.google.com/spreadsheets/d/1uMJKA785PMS9xxweRCcIeT0JGyKX5vRSjuYAeNWj8mM/edit?usp=sharing`;
  const equityTemplateUrl = `https://docs.google.com/spreadsheets/d/1oW33tb2GK1G9tZgmNNsb_skNp93ZCe9DAyw2Wc4MLQQ/edit?usp=sharing`;

  const handleCancelUpload = () => {
    setFileUploaded(null);
    setUploadedFileName("");
  };

  const handleSubmit = async () => {
    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", fileUploaded);

      try {
        const response = await axios.post("https://192.168.112.150:7109/api/EquityCsv/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          navigate("/", {
            state: { successMessage: "CSV uploaded successfully! Check details by hitting on Master View." },
          });
        }
      } catch (error) {
        console.error("File upload error:", error);
        alert("Failed to upload file.");
      }
    }
  };

  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: -12 }}>
        Select Template Type
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2, marginTop: 5 }}>
        <Button
          variant={selectedTemplate === "equity" ? "contained" : "outlined"}
          onClick={() => setSelectedTemplate("equity")}
        >
          Equity
        </Button>
        <Button
          variant={selectedTemplate === "bond" ? "contained" : "outlined"}
          onClick={() => setSelectedTemplate("bond")}
        >
          Bond
        </Button>
      </Stack>

      {selectedTemplate === "equity" && (
        <Button
          variant="contained"
          color="primary"
          href={equityTemplateUrl}
          download="equity-template.csv"
          startIcon={<DownloadIcon />}
          sx={{ mb: 2 }}
        >
          Download Equity Template
        </Button>
      )}

      {selectedTemplate === "bond" && (
        <Button
          variant="contained"
          color="primary"
          href={bondTemplateUrl}
          download="bond-template.csv"
          startIcon={<DownloadIcon />}
          sx={{ mb: 2 }}
        >
          Download Bond Template
        </Button>
      )}

      <Box {...getRootProps()} p={4} border="1px dashed grey" mt={2} mb={2}>
        <input {...getInputProps()} />
        {uploadedFileName ? (
          <Paper elevation={1} sx={{ display: "flex", alignItems: "center", padding: 2, backgroundColor: '#f1f1f1' }}>
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {uploadedFileName}
            </Typography>
            <IconButton onClick={handleCancelUpload} size="small" color="error">
              <CloseIcon />
            </IconButton>
          </Paper>
        ) : (
          <Typography variant="h6">
            Drag and drop files here, or click to select files
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={!fileUploaded}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Uploader;
