import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

function Tile({ isEquityData, inactiveCount }) {
  const [activeCount, setActiveCount] = useState(null);

  useEffect(() => {
    if (isEquityData) {
      const fetchActiveCount = async () => {
        try {
          const response = await fetch('https://localhost:7109/api/EquityCsv/activeEquityCount');
          const data = await response.json();
          setActiveCount(data.activeCount);
        } catch (error) {
          console.error('Error fetching active count:', error);
        }
      };

      fetchActiveCount();
    } else {
      setActiveCount(null);  // Reset active count when showing bonds
    }
  }, [isEquityData]);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {isEquityData && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                <CardContent>
                  <Typography variant="h6">Active Securities</Typography>
                  <Typography variant="h4">{activeCount !== null ? activeCount : 'Loading...'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ textAlign: 'center', backgroundColor: '#ffebee' }}>
                <CardContent>
                  <Typography variant="h6">Inactive Securities</Typography>
                  <Typography variant="h4">{inactiveCount}</Typography>
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
