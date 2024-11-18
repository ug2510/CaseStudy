import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

function Tile({ isEquityData, onUpdateCounts }) {
  const [activeEquityCount, setActiveEquityCount] = useState(null);
  const [inactiveEquityCount, setInactiveEquityCount] = useState(null);
  const [activeBondCount, setActiveBondCount] = useState(null);
  const [inactiveBondCount, setInactiveBondCount] = useState(null);

  const fetchCounts = async () => {
    try {
      if (isEquityData) {
        const activeResponse = await fetch(
          "https://localhost:7109/api/EquityCsv/equityStatusCount"
        );
        const activeData = await activeResponse.json();
        setActiveEquityCount(activeData.activeCount);

        const inactiveResponse = await fetch(
          "https://localhost:7109/api/EquityCsv/equityStatusCount"
        );
        const inactiveData = await inactiveResponse.json();
        setInactiveEquityCount(inactiveData.inActiveCount);
      } else {
        const activeResponse = await fetch(
          "https://localhost:7109/api/BondCsv/bondStatusCount"
        );
        const activeData = await activeResponse.json();
        setActiveBondCount(activeData.activeCount);

        const inactiveResponse = await fetch(
          "https://localhost:7109/api/BondCsv/bondStatusCount"
        );
        const inactiveData = await inactiveResponse.json();
        setInactiveBondCount(inactiveData.inActiveCount);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [isEquityData]);

  useEffect(() => {
    if (onUpdateCounts) {
      onUpdateCounts(() => fetchCounts());
    }
  }, [onUpdateCounts]);

  // Handle refresh button click to fetch the latest counts
  const handleRefreshClick = () => {
    fetchCounts(); // Trigger fetch again on click
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {isEquityData ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", textAlign: "center", backgroundColor: "#e0f7fa" }}>
                <CardContent>
                  <Typography variant="h6">Active Equities</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {activeEquityCount !== null
                      ? activeEquityCount
                      : "Loading..."}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRefreshClick}
                    color="black"
                    size="medium"
                    aria-label="refresh counts"
                  >
                    <RefreshIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", textAlign: "center", backgroundColor: "#ffebee" }}>
                <CardContent>
                  <Typography variant="h6">Inactive Equities</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {inactiveEquityCount !== null
                      ? inactiveEquityCount
                      : "Loading..."}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRefreshClick}
                    color="black"
                    size="medium"
                    aria-label="refresh counts"
                  >
                    <RefreshIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", textAlign: "center", backgroundColor: "#e0f7fa" }}>
                <CardContent>
                  <Typography variant="h6">Active Bonds</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {activeBondCount !== null ? activeBondCount : "Loading..."}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRefreshClick}
                    color="black"
                    size="medium"
                    aria-label="refresh counts"
                  >
                    <RefreshIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ position: "relative", textAlign: "center", backgroundColor: "#ffebee" }}>
                <CardContent>
                  <Typography variant="h6">Inactive Bonds</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {inactiveBondCount !== null
                      ? inactiveBondCount
                      : "Loading..."}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={handleRefreshClick}
                    color="black"
                    size="medium"
                    aria-label="refresh counts"
                  >
                    <RefreshIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default Tile;
