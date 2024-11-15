import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

const PriceChart = () => {
  const [tickerName, setTickerName] = useState(""); // To hold the ticker name from input
  const [chartData, setChartData] = useState({ dates: [], closePrices: [] }); // To hold the chart data
  const [loading, setLoading] = useState(false); // To manage the loading state

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
      } else {
        console.log("No data found for this ticker.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("An error occurred while fetching data.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data whenever the ticker name changes
  useEffect(() => {
    if (tickerName) {
      fetchData(); // Fetch data on ticker name change
    } else {
      setChartData({ dates: [], closePrices: [] }); // Clear data when ticker is empty
    }
  }, [tickerName]); // Dependency array ensures fetchData runs whenever tickerName changes

  console.log(chartData); // Log chart data to verify it is being set correctly

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
    <div className="App-header">
      {/* Input field for ticker name */}
      <div>
        <input
          type="text"
          value={tickerName}
          onChange={handleInputChange}
          placeholder="Enter Ticker Symbol"
        />
        <button onClick={fetchData} disabled={loading || !tickerName}>
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {/* Display the chart if data is available */}
      {chartData.dates.length > 0 ? (
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="350"
        />
      ) : (
        !loading && <p>No data available for this ticker.</p>
      )}
    </div>
  );
};

export default PriceChart;