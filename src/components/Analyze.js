import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Candles from "./Candles";
import PriceChart from "./PriceChart";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import RefreshIcon from "@mui/icons-material/Refresh";

const columns = [
  { field: "asOfDate", headerName: "As Of Date", width: 120 },
  { field: "ticker", headerName: "Ticker", width: 100 },
  { field: "security", headerName: "Security", width: 200 },
  { field: "gicsSector", headerName: "GICS Sector", width: 150 },
  { field: "gicsSubIndustry", headerName: "GICS Sub-Industry", width: 180 },
  {
    field: "headquarterLocation",
    headerName: "Headquarter Location",
    width: 180,
  },
  { field: "founded", headerName: "Founded", width: 100 },
  {
    field: "open",
    headerName: "Open",
    width: 100,
    renderCell: (params) => (
      <Typography
        color={
          parseFloat(params.value.replace("$", "")) < 0
            ? "error"
            : "success.main"
        }
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "close",
    headerName: "Close",
    width: 100,
    renderCell: (params) => (
      <Typography
        color={
          parseFloat(params.value.replace("$", "")) < 0
            ? "error"
            : "success.main"
        }
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "dtdChange",
    headerName: "DTD Change",
    width: 120,
    renderCell: (params) => (
      <Typography
        color={params.value.startsWith("-") ? "error" : "success.main"}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "mtdChange",
    headerName: "MTD Change",
    width: 120,
    renderCell: (params) => (
      <Typography
        color={params.value.startsWith("-") ? "error" : "success.main"}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "qtdChange",
    headerName: "QTD Change",
    width: 120,
    renderCell: (params) => (
      <Typography
        color={params.value.startsWith("-") ? "error" : "success.main"}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "ytdChange",
    headerName: "YTD Change",
    width: 120,
    renderCell: (params) => (
      <Typography
        color={params.value.startsWith("-") ? "error" : "success.main"}
      >
        {params.value}
      </Typography>
    ),
  },
];

const Analyze = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [openChartModal, setOpenChartModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [rowCount,setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 100,
  });
  const fetchData = async (date) => {
  };

  const fetchRowCount=async ()=>{
    try{
      const response = await fetch(`https://localhost:7134/api/Security/CountRecords`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setRowCount(result)
    }
    catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRowCount();
    fetchData(selectedDate);
  }, [selectedDate,paginationModel]);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenChartModal(true);
  };

  const handleCloseChartModal = () => {
    setOpenChartModal(false);
    setModalContent(null);
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500, width: "95%", padding: 2, marginTop: "-50px" }}>
      <Typography variant="h6" gutterBottom>
        Security Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <TextField {...params} />}
        />

        <Box sx={{ display: "flex", alignItems: "left", gap: 2 }}>
          <Tooltip title="Chart Analysis">
            <IconButton
              onClick={() => handleOpenModal(<PriceChart />)}
              sx={{ color: "black" }}
            >
              <InsertChartIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Candlestick Analysis">
            <IconButton
              onClick={() => handleOpenModal(<Candles />)}
              sx={{ color: "black" }}
            >
              <CandlestickChartIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Data">
            <IconButton
              onClick={() => {
                setSelectedDate(null);
                fetchData(null);
              }}
              sx={{ color: "black" }}
            >
              <RefreshIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <DataGrid
   rows={filteredData}
   paginationModel={paginationModel}
   paginationMode="server"
   onPaginationModelChange={setPaginationModel}
   rowCount={rowCount}
   columns={columns}


  rowsPerPageOptions={[10, 25, 50]}
  sx={{
    "& .MuiDataGrid-cell": { color: "black" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#ecffff",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#000",
      borderBottom: "1px solid black",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      textOverflow: "clip",
      whiteSpace: "break-spaces",
      lineHeight: 1.5,
    },
    "& .MuiDataGrid-columnSeparator": {
      visibility: "visible",
      cursor: "col-resize",
      color: "#000",
    },
    "& .MuiDataGrid-row": {
      backgroundColor: "#f0f8ff", 
    },
    "& .MuiDataGrid-row:nth-of-type(odd)": {
      backgroundColor: "#ecffff", 
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#f7f8f9",
    },
    border: "1px solid black",
    borderRadius: "8px",
  }}
/>


      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <Dialog open={openChartModal} onClose={handleCloseChartModal}>
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseChartModal}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Analyze;
