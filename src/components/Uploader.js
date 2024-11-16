import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Button, Stack, Paper, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Papa from 'papaparse'; 
import bondTemplateUrl from '../assets/Data_Security_for_Bonds.csv';
import equityTemplateUrl from '../assets/Data_Security_for_Equity.csv';

function Uploader() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop }); // Remove noClick to allow prompt on first click

  const handleCancelUpload = () => {
    setFileUploaded(null);
    setUploadedFileName("");
    setPreviewData([]);
    setProgress(0);
  };

  const handleSubmit = async () => {
    if (fileUploaded) {
      const formData = new FormData();
      formData.append("file", fileUploaded);
      const apiEndpoint =
        selectedTemplate === "equity"
          ? "https://192.168.112.150:7109/api/EquityCsv/upload"
          : "https://192.168.112.150:7109/api/BondCsv/upload"; 

      try {
        const response = await axios.post(apiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });

        if (response.status === 200) {
          setMessage("CSV uploaded successfully! Check details by hitting on Master View.");
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
          <Typography variant="h6">Drag and drop files here, or click to select files</Typography>
        )}
      </Box>

      {progress > 0 && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption">{`Uploading: ${progress}%`}</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        disabled={!fileUploaded}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      <Modal open={openPreview} onClose={() => setOpenPreview(false)}>
        <Box sx={{ width: 500, margin: 'auto', mt: 5, padding: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            File Preview
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table size="small" stickyHeader aria-label="file preview">
              <TableHead>
                <TableRow>
                  {Object.keys(previewData[0] || {}).map((key) => (
                    <TableCell key={key} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                    {Object.values(row).map((value, idx) => (
                      <TableCell key={idx}>{value || '-'}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={() => setOpenPreview(false)} sx={{ mt: 2 }}>
            Close Preview
          </Button>
        </Box>
      </Modal>

      <Modal open={!!message} onClose={() => setMessage('')}>
        <Box sx={{ width: 300, height: 200, margin: 'auto', mt: 5, padding: 2, bgcolor: 'background.paper', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body1">{message}</Typography>
          <Button onClick={() => setMessage('')} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Uploader;
