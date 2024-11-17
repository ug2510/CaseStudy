import React from 'react';
import { Card, CardContent, Typography, Grid, CardActionArea, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UploadIcon from '@mui/icons-material/Upload';
import img1 from '../assets/view.png';
import img2 from '../assets/csv.png';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 10 }}>
        Welcome to Security Master App
      </Typography>
      {location.state && location.state.successMessage && (
        <Typography variant="h6" color="success.main" gutterBottom>
          {location.state.successMessage}
        </Typography>
      )}

      <Grid container spacing={12} justifyContent="center" sx={{ marginTop: 0 }}>
        <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 60 }}>
          <CardActionArea
            onClick={() => navigate('/sec-view')}
            sx={{
              '&:hover .MuiCard-root': {
                animation: 'bounce 0.3s forwards',
              },
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-8px)' },
              },
            }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 300, padding: 2 }}>
              <Box
                component="img"
                src={img1}
                alt="Master View"
                sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '8px' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <ArrowForwardIcon fontSize="large" sx={{ marginBottom: 1 }} />
                <Typography variant="h6">Master View</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea
            onClick={() => navigate('/sec-upload')}
            sx={{
              '&:hover .MuiCard-root': {
                animation: 'bounce 0.3s forwards',
              },
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-8px)' },
              },
            }}
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: 300,
                padding: 2,
                marginRight: 50,
              }}
            >
              <Box
                component="img"
                src={img2}
                alt="Uploader"
                sx={{ width: 80, height: 80, marginRight: 2, borderRadius: '8px' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <UploadIcon fontSize="large" sx={{ marginBottom: 1 }} />
                <Typography variant="h6">Uploader</Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
