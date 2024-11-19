import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from "papaparse";
import bondTemplateUrl from "../assets/Data_Security_for_Bonds.csv";
import equityTemplateUrl from "../assets/Data_Security_for_Equity.csv";

function Uploader() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!selectedTemplate) {
        alert(
          "Please select a template type (Equity or Bond) before uploading a file."
        );
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // File type validation
        if (file.type !== "text/csv") {
          alert("Please upload a valid CSV file.");
          return;
        }

        setFileUploaded(file);
        setUploadedFileName(file.name);

        // Parse CSV for preview
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            setPreviewData(result.data.slice(0, 5)); // Show the first 5 rows as a preview
            setOpenPreview(true);
          },
          error: (error) => console.error("CSV Parsing Error:", error),
        });
      }
    },
    [selectedTemplate]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !selectedTemplate, // Disable dropzone if no template is selected
  });

  const handleCancelUpload = () => {
    setFileUploaded(null);
    setUploadedFileName("");
    setPreviewData([]);
    setProgress(0);
  };

  const handleSubmit = async () => {
    if (!selectedTemplate) {
      alert("Please select a template type before submitting.");
      return;
    }

    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", fileUploaded);
      const apiEndpoint =
        selectedTemplate === "equity"
          ? "https://localhost:7109/api/EquityCsv/uploadEquity"
          : "https://localhost:7109/api/BondCsv/uploadBonds";

      try {
        const response = await axios.post(apiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        });

        if (response.status === 200) {
          setMessage(
            "CSV uploaded successfully! Check details by hitting on Master View."
          );
          navigate("/", { state: { successMessage: message } });
        }
      } catch (error) {
        console.error("File upload error:", error);
        setMessage("Failed to upload file.");
      } finally {
        setProgress(0);
        handleCancelUpload();
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

      {/* {selectedTemplate === "equity" && (
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
      )} */}

      {selectedTemplate === "equity" && (
        <>
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
          <Typography variant="body2" sx={{ mt: 1 }}>
            You can either download the template or directly upload from your
            local device storage.
          </Typography>
        </>
      )}

      {selectedTemplate === "bond" && (
        <>
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
          <Typography variant="body2" sx={{ mt: 1 }}>
            You can either download the template or directly upload from your
            local device storage.
          </Typography>
        </>
      )}

      <Box
        {...getRootProps()}
        p={4}
        border="1px dashed grey"
        mt={2}
        mb={2}
        sx={{
          opacity: selectedTemplate ? 1 : 0.5,
          cursor: selectedTemplate ? "pointer" : "not-allowed",
        }}
      >
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

      {progress > 0 && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption">{`Uploading: ${progress}%`}</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={!fileUploaded || !selectedTemplate}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Uploader;
