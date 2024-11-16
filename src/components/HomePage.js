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
    <Box
      sx={{
        padding: 4,
        textAlign: 'center',
        minHeight: '100vh', // Ensures full height of the viewport
        width: '100%', // Ensures full width of the viewport
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: 6,
          fontWeight: 600,
          color: '#333',
        }}
      >
        Welcome to Security Master App
      </Typography>
      {location.state && location.state.successMessage && (
        <Typography variant="h6" color="success.main" sx={{ marginTop: 2 }}>
          {location.state.successMessage}
        </Typography>
      )}

      <Grid container spacing={6} justifyContent="center" sx={{ marginTop: 4 }}>
        {/* Master View Card */}
        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea
            onClick={() => navigate('/sec-view')}
            sx={{
              '&:hover .MuiCard-root': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Card
              className="MuiCard-root"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 340,
                padding: 2,
                borderRadius: 3,
                border: '1px solid #ddd', // Subtle border
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <Box
                component="img"
                src={img1}
                alt="Master View"
                sx={{
                  width: 90,
                  height: 90,
                  marginRight: 2,
                  borderRadius: '12px',
                }}
              />
              <CardContent>
                <ArrowForwardIcon
                  fontSize="large"
                  sx={{ color: 'primary.main', marginBottom: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Master View
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>

        {/* Uploader Card */}
        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea
            onClick={() => navigate('/sec-upload')}
            sx={{
              '&:hover .MuiCard-root': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Card
              className="MuiCard-root"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: 340,
                padding: 2,
                borderRadius: 3,
                border: '1px solid #ddd', // Subtle border
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
            >
              <Box
                component="img"
                src={img2}
                alt="Uploader"
                sx={{
                  width: 90,
                  height: 90,
                  marginRight: 2,
                  borderRadius: '12px',
                }}
              />
              <CardContent>
                <UploadIcon
                  fontSize="large"
                  sx={{ color: 'primary.main', marginBottom: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Uploader
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
