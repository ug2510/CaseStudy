import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const DetailsCard = ({ title, data }) => (
  <Card
    style={{
      margin: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    }}
  >
    <Box
      sx={{
        backgroundColor: "#e6ffe6",
        padding: "10px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        textAlign: "left", 
        boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#00b300",
          fontWeight: "bold",
          margin: 0,
          textAlign: "left", 
        }}
      >
        {title}
      </Typography>
    </Box>

  
    <CardContent>
      <Grid container spacing={1}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "4px",
                lineHeight: "1.4",
                textAlign: "left", 
              }}
            >
              <strong>{key}:</strong> {value || "N/A"}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Card>
);

export default DetailsCard;
