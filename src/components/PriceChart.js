import React, { useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const PriceChart = () => {
  const [tickerName, setTickerName] = useState(""); // To hold the ticker name from input
  const [chartData, setChartData] = useState({ dates: [], closePrices: [] }); // To hold the chart data
  const [loading, setLoading] = useState(false); // To manage the loading state
  const [showChart, setShowChart] = useState(false); // To manage chart visibility

  // Function to handle ticker name input change
  const handleInputChange = (e) => {
    setTickerName(e.target.value);
  };

  const fetchData = async () => {
    if (!tickerName) {
      console.log("Please enter a ticker name.");
      return;
    }

    setLoading(true); // Start loading
    setShowChart(false); // Hide the chart while loading

    try {
      const response = await axios.get(
        `https://localhost:7134/api/Security/getSecuritiesbyName/${tickerName}`
      );
      const data = response.data; // Assuming the response data is in the expected format
      if (data && data.length > 0) {
        // Process the data for the chart
        const dates = data.map((item) => item.asOfDate.substring(0, 10));
        const closePrices = data.map((item) => item.closePrice);

        setChartData({
          dates,
          closePrices,
        });
        setShowChart(true); // Show the chart after loading
      } else {
        console.log("No data found for this ticker.");
        setChartData({ dates: [], closePrices: [] });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const chartOptions = {
    chart: {
      type: "line",
      height: "auto",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true,
        },
      },
    },
    title: {
      text: "Stock Price",
      align: "center",
      style: {
        fontSize: "24px",
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: chartData.dates,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Closing Price",
      },
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd",
      },
      theme: "dark", // Tooltip theme to match dark theme of the app
      style: {
        fontSize: "14px", // Tooltip font size
      },
    },
    grid: {
      borderColor: "#444",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: 0.3,
    },
  };

  const chartSeries = [
    {
      name: "Close Price",
      data: chartData.closePrices || [], // Ensure we have data for the chart
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 900,
        margin: "auto",
        backgroundColor: "#f4f6f9",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Input field and button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <TextField
          label="Enter Ticker Symbol"
          value={tickerName}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          sx={{
            marginRight: 2,
            backgroundColor: "white",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchData}
          disabled={loading || !tickerName}
          sx={{
            paddingX: 2,
            paddingY: 0.5, // Reduce vertical padding for a thinner button
            fontSize: "14px",
            minWidth: "110px", // Slightly narrower button
            height: "36px", // Reduce overall height
            textTransform: "none",
            backgroundColor: loading ? "gray" : "primary.main",
            "&:hover": {
              backgroundColor: loading ? "gray" : "primary.dark",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            "Fetch Data"
          )}
        </Button>
      </Box>

      {showChart && chartData.dates.length > 0 ? (
        <Box sx={{ paddingTop: 3 }}>
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="line"
            height="350"
          />
        </Box>
      ) : (
        !loading &&
        showChart && (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ paddingTop: 3 }}
          >
            No data available for this ticker.
          </Typography>
        )
      )}
    </Box>
  );
};

export default PriceChart;
