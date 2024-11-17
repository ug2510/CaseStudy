import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Candles from "./Candles"; // Import the Candles component
import PriceChart from "./PriceChart"; // Import the PriceChart component
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
  { field: "open", headerName: "Open", width: 100 },
  { field: "close", headerName: "Close", width: 100 },
  { field: "dtdChange", headerName: "DTD Change", width: 120 },
  { field: "mtdChange", headerName: "MTD Change", width: 120 },
  { field: "qtdChange", headerName: "QTD Change", width: 120 },
  { field: "ytdChange", headerName: "YTD Change", width: 120 },
];

const Analyze = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [openChartModal, setOpenChartModal] = useState(false);
  const [modalContent, setModalContent] = useState(null); // Track modal content

  const fetchData = async (date) => {
    try {
      const url = date
        ? `https://localhost:7134/api/Security/getOverviewByDate?date=${dayjs(date).format("YYYY-MM-DD")}`
        : "https://localhost:7134/api/Security/getSecurities";

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      const formattedData = result.map((item, index) => ({
        id: index + 1,
        asOfDate: item.asOfDate,
        ticker: item.ticker,
        security: item.securityName,
        gicsSector: item.gicsSector,
        gicsSubIndustry: item.gicsSubIndustry,
        headquarterLocation: item.headquartersLocation,
        founded: item.founded,
        open: `$${item.openPrice}`,
        close: `$${item.closePrice}`,
        dtdChange: `${item.dtdChangePercentage}%`,
        mtdChange: `${item.mtdChangePercentage}%`,
        qtdChange: `${item.qtdChangePercentage}%`,
        ytdChange: `${item.ytdChangePercentage}%`,
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

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

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
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-cell": { color: "black" },
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
