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

const Candles = () => {
  const [tickerName, setTickerName] = useState("");
  const [chartData, setChartData] = useState({
    dates: [],
    openPrices: [],
    highPrices: [],
    lowPrices: [],
    closePrices: [],
    volume: [],
  });
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const handleInputChange = (e) => {
    setTickerName(e.target.value);
  };

  const fetchData = async () => {
    if (!tickerName) return;

    setLoading(true);
    setShowChart(false);

    try {
      const response = await axios.get(
        `https://localhost:7134/api/Security/getAllDetailsByTicker/${tickerName}`
      );
      const data = response.data;
      if (data && data.length > 0) {
        const dates = data.map((item) => item.date.substring(0, 10));
        const openPrices = data.map((item) => item.open);
        const highPrices = data.map((item) => item.high);
        const lowPrices = data.map((item) => item.low);
        const closePrices = data.map((item) => item.close);
        const volume = data.map((item) => item.volume);

        setChartData({
          dates,
          openPrices,
          highPrices,
          lowPrices,
          closePrices,
          volume,
        });
        setShowChart(true);
      } else {
        setChartData({
          dates: [],
          openPrices: [],
          highPrices: [],
          lowPrices: [],
          closePrices: [],
          volume: [],
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: "400",
      toolbar: {
        show: true,
        tools: {
          download: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
      style: {
        fontSize: "20px",
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
        text: "Price",
      },
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd",
      },
    },
    grid: {
      borderColor: "#ccc",
    },
  };

  const chartSeries = [
    {
      name: "Price",
      data: chartData.openPrices.map((open, index) => ({
        x: chartData.dates[index],
        y: [
          open,
          chartData.highPrices[index],
          chartData.lowPrices[index],
          chartData.closePrices[index],
        ],
      })),
    },
  ];

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "100%",
        margin: "auto",
        backgroundColor: "#f4f6f9",
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
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
            paddingY: 0.5,
            fontSize: "14px",
            minWidth: "110px",
            height: "36px",
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

      <hr />
      {showChart && chartData.dates.length > 0 ? (
        <Box sx={{ paddingTop: 3, height: "400px" }}>
          <ApexCharts
            options={chartOptions}
            series={chartSeries}
            type="candlestick"
            height="400"
            width="100%"
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

export default Candles;