import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const PieChart = () => {
  const [activeEquityCount, setActiveEquityCount] = useState(0);
  const [activeBondCount, setActiveBondCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEquityData = async () => {
    setLoading(true);
    try {
      const activeEquityResponse = await fetch(
        "https://localhost:7109/api/EquityCsv/equityStatusCount"
      );
      const activeEquityData = await activeEquityResponse.json();
      if (activeEquityData && activeEquityData.activeCount !== undefined) {
        setActiveEquityCount(activeEquityData.activeCount);
      }
    } catch (error) {
      console.error("Error fetching equity counts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBondData = async () => {
    setLoading(true);
    try {
      const activeBondResponse = await fetch(
        "https://localhost:7109/api/BondCsv/bondStatusCount"
      );
      const activeBondData = await activeBondResponse.json();
      if (activeBondData && activeBondData.activeCount !== undefined) {
        setActiveBondCount(activeBondData.activeCount);
      }
    } catch (error) {
      console.error("Error fetching bond counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquityData();
    fetchBondData();
  }, []);

  const series = [activeEquityCount, activeBondCount];
  const options = {
    chart: {
      type: "pie",
    },
    labels: ["Active Equities", "Active Bonds"],
    colors: ["#28a745", "#007bff"],
    title: {
      text: "Active Equities vs Active Bonds",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} items`,
      },
    },
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ApexCharts options={options} series={series} type="pie" width="100%" />
      )}
    </div>
  );
};

export default PieChart;