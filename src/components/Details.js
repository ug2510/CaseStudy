import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailsCard from "./DetailCard";
import { Grid, Box, Button } from "@mui/material";
import "./Details.css"; 

function Details() {
  const { id } = useParams();
  const [security, setSecurity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSecurityDetails = async () => {
      try {
        console.log(`Fetching details for SID: ${id}`);
        const response = await fetch(
          `https://localhost:7109/api/EquityCsv/getEquityDetailsBySID/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch security details");
        }
        const data = await response.json();
        console.log(data);
        setSecurity(data[0]);
      } catch (error) {
        console.error("Error fetching security details:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSecurityDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!security) return <div>No data found for this security.</div>;

  // Currency symbol mapping
  const currencySymbols = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    KRW: "₩",
    // Add more currencies as needed
  };

  const currencySymbol = currencySymbols[security["trading Currency"]] || ""; // Default to empty string if currency not mapped

  const basicInfo = {
    "Security Name": security["security Name"],
    "Description": security["security Description"],
    "Type": security["security Type"],
    "Active Status": security["is Active"] ? "Active" : "Inactive",
    CUSIP: security.cusip,
    ISIN: security.isin,
    SEDOL: security.sedol,
    Issuer: security.issuer,
  };

  const financialInfo = {
    "Open Price": `${currencySymbol}${security["open Price"]?.toLocaleString()}`,
    "Close Price": `${currencySymbol}${security["close Price"]?.toLocaleString()}`,
    "Last Price": `${currencySymbol}${security["last Price"]?.toLocaleString()}`,
    "PE Ratio": security["pe Ratio"],
    "Volume": security.volume?.toLocaleString(),
    "Dividend Declared Date": new Date(
      security["declared Date"]
    ).toLocaleDateString(),
    "Dividend Amount": `${currencySymbol}${security.amount}`,
    "Dividend Type": security["dividend Type"],
  };

  const industryInfo = {
    Sector: security["bloomberg Industry Sector"],
    "Industry Group": security["bloomberg Industry Group"],
    "Sub Group": security["bloomberg Industry Sub Group"],
    "Country of Incorporation": security["country of Incorporation"],
    "Issue Country": security["issue Country"],
    "Trading Currency": security["trading Currency"],
    "PF Asset Class": security["pf Asset Class"],
    "PF Region": security["pf Region"],
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Security Details</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DetailsCard title="Basic Information" data={basicInfo} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsCard title="Financial & Trading Information" data={financialInfo} />
        </Grid>

        <Grid item xs={12}>
          <DetailsCard title="Industry & Geographic Details" data={industryInfo} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;

