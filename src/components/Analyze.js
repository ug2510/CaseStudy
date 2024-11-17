import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
import InsertChartIcon from "@mui/icons-material/InsertChart"; // Graph icon
import PriceChart from "./PriceChart";
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
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [openChartModal, setOpenChartModal] = useState(false);

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

      if (formattedData.length === 0) {
        setFilteredData([]);
      } else {
        setFilteredData(formattedData);
      }

      setData(formattedData);
      setHasMore(formattedData.length > 0);  

    } catch (error) {
      // setError(error.message);
      setFilteredData([]);  
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleScrollEnd = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const handleOpenChartModal = () => {
    setOpenChartModal(true);
  };

  const handleCloseChartModal = () => {
    setOpenChartModal(false);
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  input: { color: "black", backgroundColor: "black" },
                  ".MuiInputLabel-root": { color: "black" },
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "gray" },
                    "&:hover fieldset": { borderColor: "darkgray" },
                    "&.Mui-focused fieldset": { borderColor: "black" },
                  },
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Chart Analysis">
            <IconButton
              onClick={handleOpenChartModal}
              sx={{
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <InsertChartIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset Data">
            <IconButton
              onClick={() => {
                setSelectedDate(null);
                fetchData(null);
              }}
              sx={{
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
              }}
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
        onRowsScrollEnd={handleScrollEnd}
        checkboxSelection
        sx={{
          ".MuiTablePagination-root": { color: "black" },
          ".MuiTablePagination-toolbar": { color: "black" },
          ".MuiTablePagination-selectIcon": { color: "black" },
          "& .MuiDataGrid-cell": { color: "black" },
        }}
      />

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <Dialog open={openChartModal} onClose={handleCloseChartModal}>
        <DialogContent>
          <PriceChart />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseChartModal} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Analyze;
