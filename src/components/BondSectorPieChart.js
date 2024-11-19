import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const BondSectorPieChart = () => {
  const [sectorData, setSectorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchSectorData = async () => {
    setLoading(true);
    try {
        
      const response = await fetch(
        "https://localhost:7109/api/BondCsv/BondSector"
      );
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const validData = data.filter(
          (sector) =>
            sector.count !== null &&
            sector.count !== undefined &&
            sector.referenceData_BloombergIndustrySector
        );


        setSectorData(validData);
      } else {
        console.error("Invalid data structure received from API:", data);
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
    (sector) => sector["referenceData_BloombergIndustrySector"]
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
    colors: ["#28a745", "#007bff", "#f39c12", "#e74c3c", "#8e44ad", "#2c3e50"],
    title: {
      text: "Bond Sector Technology Distribution",
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
            width: "100%",
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
        <div>Loading...</div>
      ) : (
        <ApexCharts options={options} series={series} type="pie" width="90%" />
      )}
    </div>
  );
};

export default BondSectorPieChart;
