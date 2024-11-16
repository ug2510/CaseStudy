import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const columns = [
  { field: 'asOfDate', headerName: 'As Of Date', width: 120 },
  { field: 'ticker', headerName: 'Ticker', width: 100 },
  { field: 'security', headerName: 'Security', width: 200 },
  { field: 'gicsSector', headerName: 'GICS Sector', width: 150 },
  { field: 'gicsSubIndustry', headerName: 'GICS Sub-Industry', width: 180 },
  { field: 'headquarterLocation', headerName: 'Headquarter Location', width: 180 },
  { field: 'founded', headerName: 'Founded', width: 100 },
  { field: 'open', headerName: 'Open', width: 100 },
  { field: 'close', headerName: 'Close', width: 100 },
  { field: 'dtdChange', headerName: 'DTD Change', width: 120 },
  { field: 'mtdChange', headerName: 'MTD Change', width: 120 },
  { field: 'qtdChange', headerName: 'QTD Change', width: 120 },
  { field: 'ytdChange', headerName: 'YTD Change', width: 120 },
];

const Analyze = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7134/api/Security/getSecurities`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();

      const formattedData = result.map((item, index) => ({
        id: page * 10 + index + 1,
        asOfDate: item.asOfDate,
        ticker: item.ticker,
        security: item.securityName,
        gicsSector: item.gicsSector,
        gicsSubIndustry: item.gicsSubIndustry,
        headquarterLocation: item.headquartersLocation,
        founded: item.founded,
        open: item.openPrice,
        close: item.closePrice,
        dtdChange: item.dtdChangePercentage,
        mtdChange: item.mtdChangePercentage,
        qtdChange: item.qtdChangePercentage,
        ytdChange: item.ytdChangePercentage,
      }));

      setData((prevData) => [...prevData, ...formattedData]);

      if (formattedData.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchData(page);
    }
  }, [page, hasMore]);

  const handleScrollEnd = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const filtered = data.filter((row) => dayjs(row.asOfDate).isSameOrAfter(dayjs(selectedDate), 'day'));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedDate, data]);

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500, width: '95%', padding: 2, marginTop: '-50px' }}>
      <Typography variant="h6" gutterBottom>
        Security Details
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        renderInput={(params) => (
            <TextField
            {...params}
            sx={{
                input: { color: 'black', backgroundColor: 'black' }, // Set input text to black
                '.MuiInputLabel-root': { color: 'black' }, // Set label color to black
                '.MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' }, // Set border color to gray
                '&:hover fieldset': { borderColor: 'darkgray' }, // Darker border on hover
                '&.Mui-focused fieldset': { borderColor: 'black' }, // Black border on focus
                },
            }}
            />
        )}
        />
      </Box>
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsScrollEnd={handleScrollEnd}
        checkboxSelection
        sx={{
          '.MuiTablePagination-root': { color: 'black' },
          '.MuiTablePagination-toolbar': { color: 'black' },
          '.MuiTablePagination-selectIcon': { color: 'black' },
          '& .MuiDataGrid-cell': { color: 'black' },
        }}
      />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Analyze;
