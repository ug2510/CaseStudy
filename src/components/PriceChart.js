import React from "react";
import ApexCharts from "react-apexcharts";

const PriceChart = () => {
  // const [chartData, setChartData] = useState([]);
  // const [loadi/ng, setLoading] = useState(true);
  // const chartRef = useRef(null);

  // Fetch data from an API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace with your API URL
  //       const response = await axios.get(
  //         "https://api.example.com/stock-prices"
  //       );
  //       const data = response.data;

  //       // Example of transforming your data into a format suitable for the chart
  //       const dates = data.map((item) => item.Date);
  //       const closePrices = data.map((item) => item.Close);

  //       setChartData({
  //         dates,
  //         closePrices,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const data = [
    {
      Date: "2020-12-31",
      Close: 92.84999847,
    },
    {
      Date: "2021-01-04",
      Close: 89.90000153,
    },
    {
      Date: "2021-01-05",
      Close: 92.84999847,
    },
    {
      Date: "2021-01-06",
      Close: 89.90000153,
    },
    {
      Date: "2021-01-07",
      Close: 92.84999847,
    },
    {
      Date: "2021-01-08",
      Close: 92.84999847,
    },
    // Add more data points here if needed
  ];

  // Prepare data for ApexCharts
  const dates = data.map((item) => item.Date);
  const closePrices = data.map((item) => item.Close);

  const chartOptions = {
    chart: {
      type: "line",
      height: "auto",
      toolbar: {
        show: true, // Set this to `false` to hide the toolbar
        tools: {
          download: true, // Set to `true` to enable download button
          selection: false, // Set to `false` to hide the selection tool (zooming)
          zoom: true, // Set to `true` to enable zoom functionality
          zoomin: false, // Set to `false` to disable zoom-in button
          zoomout: false, // Set to `false` to disable zoom-out button
          pan: false, // Set to `false` to disable pan functionality
          reset: true, // Set to `true` to enable reset button
        },
      },
      // Dynamic height, can adjust based on the container size
    },
    title: {
      text: "Stock Price",
      align: "center",
      style: {
        fontSize: "24px", // Adjust font size as per your preference
        color: "#ffffff", // White title color to match your dark theme
      },
    },
    xaxis: {
      categories: dates,
      title: {
        text: "Date",
        style: {
          color: "#ffffff", // White text for the X-axis label
        },
      },
      labels: {
        style: {
          colors: "#ffffff", // White text for the X-axis labels
        },
      },
    },
    yaxis: {
      title: {
        text: "Closing Price",
        style: {
          color: "#ffffff", // White text for the Y-axis label
        },
      },
      labels: {
        style: {
          colors: "#ffffff", // White text for the Y-axis labels
        },
      },
    },
    tooltip: {
      x: {
        format: "yyyy-MM-dd",
      },
      theme: "dark", // Tooltip theme to match dark theme of the app
      style: {
        fontSize: "14px", // Tooltip font size
        color: "#ffffff", // White text for tooltips
      },
    },
    grid: {
      borderColor: "#444", // Dark grid border to fit the theme
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
      data: closePrices,
    },
  ];

  return (
    <div className="App-header">
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="line"
        height="350"
      />
    </div>
  );
};

export default PriceChart;
