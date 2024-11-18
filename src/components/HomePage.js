import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img1 from "../assets/view.png";
import img2 from "../assets/csv.png";

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCard, setActiveCard] = useState(null); // State to track active card

  const handleCardClick = (route, card) => {
    setActiveCard(card);
    setTimeout(() => {
      navigate(route);
    }, 300); // Delay for transition effect
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: "-45px",
          fontWeight: "light",
          fontFamily: "Roboto, sans-serif",
          background: "linear-gradient(to right, #42a5f5, #478ed1)",
          WebkitBackgroundClip: "text",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
          padding: "10px 0",
        }}
      >
        Welcome to Security Master App
      </Typography>

      {location.state && location.state.successMessage && (
        <Typography variant="h6" color="success.main" gutterBottom>
          {location.state.successMessage}
        </Typography>
      )}
      <hr />
      <Grid
        container
        spacing={6}
        justifyContent="flex-start"
        sx={{ marginTop: 2, marginLeft: -4 }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <CardActionArea
            onClick={() => handleCardClick("/sec-view", "master")}
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: activeCard === "master" ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: 300,
                width: 250,
                padding: 2,
                position: "relative",
                textAlign: "center",
                background: "linear-gradient(to right, #f6f6f6, #e3e3e3)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                border: "1px solid transparent",
                borderRadius: "16px",
                "&:hover": {
                  background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                  borderColor: "#64b5f6",
                },
              }}
            >
              <Box
                component="img"
                src={img1}
                alt="Master View"
                sx={{ width: 80, height: 80, marginBottom: 2, marginTop: 4 }}
              />
              <hr
                style={{
                  width: "80%",
                  borderTop: "1px solid #d3d3d3",
                  marginBottom: "12px",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  Master View
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View detailed information about securities in a structured
                  manner.
                </Typography>
              </CardContent>
              <ArrowForwardIcon
                fontSize="medium"
                color="primary"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
              />
            </Card>
          </CardActionArea>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CardActionArea
            onClick={() => handleCardClick("/sec-upload", "upload")}
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: activeCard === "upload" ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: 300,
                width: 250,
                padding: 2,
                position: "relative",
                textAlign: "center",
                background: "linear-gradient(to right, #f6f6f6, #e3e3e3)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                border: "1px solid transparent",
                borderRadius: "16px",
                "&:hover": {
                  background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                  borderColor: "#64b5f6",
                },
              }}
            >
              <Box
                component="img"
                src={img2}
                alt="Uploader"
                sx={{ width: 80, height: 80, marginBottom: 2, marginTop: 4 }}
              />
              <hr
                style={{
                  width: "80%",
                  borderTop: "1px solid #d3d3d3",
                  marginBottom: "12px",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  Uploader
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload securities data quickly and efficiently.
                </Typography>
              </CardContent>
              <ArrowForwardIcon
                fontSize="medium"
                color="primary"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
              />
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
