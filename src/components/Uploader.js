import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import axios from "axios"; // Add axios for making HTTP requests

function Uploader() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null); // Store the actual file
=======
import axios from "axios";
import bondTemplateUrl from '../assets/Data_Security_for_Bonds.csv'
import equityTemplateUrl from '../assets/Data_Security_for_Equity.csv'

function Uploader() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);  // Store the actual file
>>>>>>> 27b2357cd6f365150c08df2cac8dfcf5781c948d
  const [uploadedFileName, setUploadedFileName] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
<<<<<<< HEAD
      setFileUploaded(file); // Store the file object
      setUploadedFileName(file.name);
=======
      setFileUploaded(file);  // Store the file object
      setUploadedFileName(file.name); 
>>>>>>> 27b2357cd6f365150c08df2cac8dfcf5781c948d
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

<<<<<<< HEAD
  const bondTemplateUrl = `https://docs.google.com/spreadsheets/d/1uMJKA785PMS9xxweRCcIeT0JGyKX5vRSjuYAeNWj8mM/edit?usp=sharing`;
  const equityTemplateUrl = `https://docs.google.com/spreadsheets/d/1oW33tb2GK1G9tZgmNNsb_skNp93ZCe9DAyw2Wc4MLQQ/edit?usp=sharing`;
=======
>>>>>>> 27b2357cd6f365150c08df2cac8dfcf5781c948d

  const handleCancelUpload = () => {
    setFileUploaded(null);
    setUploadedFileName("");
  };

  const handleSubmit = async () => {
    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", fileUploaded);
      const apiEndpoint =
        selectedTemplate === "equity"
<<<<<<< HEAD
          ? "https://localhost:7109/api/EquityCsv/uploadEquity"
          : "https://localhost:7109/api/BondCsv/uploadBonds";
=======
          ? "https://192.168.112.150:7109/api/EquityCsv/upload"
          : "https://192.168.112.150:7109/api/BondCsv/upload"; 

>>>>>>> 27b2357cd6f365150c08df2cac8dfcf5781c948d
      try {
        const response = await axios.post(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          navigate("/", {
<<<<<<< HEAD
            state: {
              successMessage:
                "CSV uploaded successfully! Check details by hitting on Master View.",
            },
=======
            state: { successMessage: "CSV uploaded successfully! Check details by hitting on Master View." },
>>>>>>> 27b2357cd6f365150c08df2cac8dfcf5781c948d
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

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mb: 2, marginTop: 5 }}
      >
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
          <Paper
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#f1f1f1",
            }}
          >
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
