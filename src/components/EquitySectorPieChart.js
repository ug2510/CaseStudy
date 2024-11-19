import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const EquitySectorPieChart = () => {
  const [sectorData, setSectorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSectorData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://localhost:7109/api/equity/EquitySector"
      );
      const data = await response.json();

      if (data && Array.isArray(data)) {
        setSectorData(data);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching sector data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectorData();
  }, []);

  const series = sectorData.map((sector) => sector.count);
  const labels = sectorData.map(
    (sector) => sector["bloomberg Industry Sector"]
  );

  const options = {
    chart: {
      type: "pie",
      animations: {
        enabled: true,
        easing: "easeinout", 
        speed: 800, 
        animateGradually: {
          enabled: true,
          delay: 150, 
        },
      },
    },
    labels: labels,
    colors: [
      "#28a745",
      "#007bff",
      "#f39c12",
      "#e74c3c",
      "#8e44ad",
      "#2c3e50", 
    ],
    title: {
      text: "Equity Sector Technology Distribution",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} items`, 
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: "100%", // Make chart responsive
          },
          legend: {
            position: "bottom",
            offsetY: 0,
            fontSize: "12px",
          },
        },
      },
    ],
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {loading ? (
        <div>Loading...</div> // Display loading message
      ) : (
        <ApexCharts options={options} series={series} type="pie" width="90%" /> // Render the pie chart
      )}
    </div>
  );
};

export default EquitySectorPieChart;