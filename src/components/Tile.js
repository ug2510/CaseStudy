import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

function Tile({ isEquityData }) {
  const [activeCount, setActiveCount] = useState(null);
  const [notActiveCount, setInactiveCount] = useState(null);

  useEffect(() => {
    if (isEquityData) {
      const fetchCounts = async () => {
        try {
          // Fetch active count
          const activeResponse = await fetch(
            "https://localhost:7109/api/EquityCsv/activeEquityCount"
          );
          const activeData = await activeResponse.json();
          setActiveCount(activeData.activeCount);

          // Fetch inactive count
          const inactiveResponse = await fetch(
            "https://localhost:7109/api/EquityCsv/NotactiveEquityCount"
          );
          const inactiveData = await inactiveResponse.json();
          setInactiveCount(inactiveData.notActiveCount);
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };

      fetchCounts();
    } else {
      // Reset counts when not showing equity data
      setActiveCount(null);
      setInactiveCount(null);
    }
  }, [isEquityData]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {isEquityData && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#e0f7fa" }}>
                <CardContent>
                  <Typography variant="h6">Active Securities</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {activeCount !== null ? activeCount : "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#ffebee" }}>
                <CardContent>
                  <Typography variant="h6">Inactive Securities</Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {notActiveCount !== null ? notActiveCount : "Loading..."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default Tile;
