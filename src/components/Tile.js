import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

function Tile({isEquityData}) {
  const [activeEquityCount, setActiveEquityCount] = useState(null);
  const [inactiveEquityCount, setInactiveEquityCount] = useState(null);
  const [activeBondCount, setActiveBondCount] = useState(null);
  const [inactiveBondCount, setInactiveBondCount] = useState(null);


  useEffect(() => {
    if (isEquityData === true || isEquityData === false) {
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
            if (!isEquityData) {
              const activeResponse = await fetch(
                "https://localhost:7109/api/BondCsv/bondStatusCount"
              );
              const activeData1 = await activeResponse.json();
              setActiveBondCount(activeData1.activeCount);

              const inactiveResponse = await fetch(
                "https://localhost:7109/api/BondCsv/bondStatusCount"
              );
              const inactiveData = await inactiveResponse.json();
              setInactiveBondCount(inactiveData.inActiveCount);
            }
          }
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };
      
    fetchCounts();
    }

  }, [isEquityData]); 

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {isEquityData ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#e0f7fa" }}>
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
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#ffebee" }}>
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
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#e0f7fa" }}>
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
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: "center", backgroundColor: "#ffebee" }}>
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
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default Tile;
