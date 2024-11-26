import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Candles from "./Candles";
import PriceChart from "./PriceChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
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
  const [rowCount, setRowCount] = useState(0);
  const [tickerFilter, setTickerFilter] = useState("");
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 100,
  });

  const fetchDataByTicker = async (ticker) => {
    setLoading(true);
    setError(null);
    console.log("Ticker:", ticker);
    try {
      const response = await fetch(
        `https://localhost:7134/api/Security/getSecurities`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data for the given ticker");
      }

      const result = await response.json();

      // Filter data based on the ticker value
      const filteredResult = result.filter(
        (item) =>
          item.ticker && item.ticker.toLowerCase() === ticker.toLowerCase()
      );

      const formattedData = filteredResult.map((item, index) => ({
        id: index + 1,
        asOfDate: item.asOfDate.substring(0,10),
        ticker: item.ticker,
        security: item.securityName,
        gicsSector: item.gicsSector,
        gicsSubIndustry: item.gicsSubIndustry,
        headquarterLocation: item.headquartersLocation,
        founded: item.founded,
        open: item.openPrice ? `$${item.openPrice.toFixed(2)}` : "$0.00",
        close: item.closePrice ? `$${item.closePrice.toFixed(2)}` : "$0.00",
        dtdChange: item.dtdChangePercentage
          ? `${item.dtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        mtdChange: item.mtdChangePercentage
          ? `${item.mtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        qtdChange: item.qtdChangePercentage
          ? `${item.qtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        ytdChange: item.ytdChangePercentage
          ? `${item.ytdChangePercentage.toFixed(2)}%`
          : "0.00%",
      }));

      setData(formattedData); // Update the main data state
      setFilteredData(formattedData); // Update the filteredData state for the table
      console.log("Filtered Data:", formattedData); // Debugging: logs the filtered and formatted data
    } catch (err) {
      setError(err.message);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (tickerFilter.trim() !== "") {
      fetchDataByTicker(tickerFilter.trim());
    }
  };

  const fetchData = async (date) => {
    try {
      const url = date
        ? `https://localhost:7134/api/Security/getOverviewByDate?date=${dayjs(
            date
          ).format("YYYY-MM-DD")}`
        : `https://localhost:7134/api/Security/getSecuritiesByPage?pageNum=${
            paginationModel.page + 1
          }&PageSize=${paginationModel.pageSize}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      const formattedData = result.map((item, index) => ({
        id: index + 1,
        asOfDate: item.asOfDate.substring(0,10),
        ticker: item.ticker,
        security: item.securityName,
        gicsSector: item.gicsSector,
        gicsSubIndustry: item.gicsSubIndustry,
        headquarterLocation: item.headquartersLocation,
        founded: item.founded,
        open: item.openPrice ? `$${item.openPrice.toFixed(2)}` : "$0.00",
        close: item.closePrice ? `$${item.closePrice.toFixed(2)}` : "$0.00",
        dtdChange: item.dtdChangePercentage
          ? `${item.dtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        mtdChange: item.mtdChangePercentage
          ? `${item.mtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        qtdChange: item.qtdChangePercentage
          ? `${item.qtdChangePercentage.toFixed(2)}%`
          : "0.00%",
        ytdChange: item.ytdChangePercentage
          ? `${item.ytdChangePercentage.toFixed(2)}%`
          : "0.00%",
      }));

      setFilteredData(formattedData);
      setData(formattedData);
    } catch (error) {
      setFilteredData([]);
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const exportToCSV = () => {
    // Create CSV rows
    const csvRows = [
      columns.map((col) => col.headerName).join(","), // Header row
      ...filteredData.map(
        (row) => columns.map((col) => row[col.field] || "").join(",") // Data rows
      ),
    ];
    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join("\n")}`;
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "security_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchRowCount = async () => {
    try {
      const response = await fetch(
        `https://localhost:7134/api/Security/CountRecords`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setRowCount(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRowCount();
    fetchData(selectedDate);
  }, [selectedDate, paginationModel]);

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
        {/* <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <TextField {...params} />}
        /> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <DatePicker
      label="Select Date"
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      renderInput={(params) => <TextField {...params} />}
    />
    <TextField
  label="Search by Ticker"
  value={tickerFilter}
  onChange={(e) => setTickerFilter(e.target.value)}
  variant="outlined"
  size="medium"
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSearch}
          disabled={!tickerFilter.trim()}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
            boxShadow: "none", // Removes any uplift effect
          }}
        >
          Search
        </Button>
      </InputAdornment>
    ),
  }}
  sx={{
    width: 250, 
    "& .MuiOutlinedInput-root": {
      height: "56px", 
    },
    "& .MuiInputAdornment-root": {
      marginRight: "-8px", // Adjust for alignment
    },
  }}
/>
  </Box>

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
          <Tooltip title="Export as CSV">
            <IconButton onClick={exportToCSV} sx={{ color: "black" }}>
              <FileDownloadIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Data">
            <IconButton
              onClick={() => {
                setTickerFilter("");
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
      <Box>
        <DataGrid
          rows={filteredData}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          rowCount={rowCount}
          columns={columns}
          // pageSize={10}
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
        
        
      </Box>

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
