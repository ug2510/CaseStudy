// Tile.js
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

function Tile({ activeCount, inactiveCount }) {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
            <CardContent>
              <Typography variant="h6">Active Securities</Typography>
              <Typography variant="h4">{activeCount}</Typography>
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
      </Grid>
    </Box>
  );
}

export default Tile;
