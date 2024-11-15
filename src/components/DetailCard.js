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
    {/* Header with light red background */}
    <Box
      sx={{
        backgroundColor: "#ffe6e6",
        padding: "10px",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        textAlign: "left", // Aligning the title to the left
        boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#b71c1c",
          fontWeight: "bold",
          margin: 0,
          textAlign: "left", // Aligning the title to the left
        }}
      >
        {title}
      </Typography>
    </Box>

    {/* Content with reduced spacing and left-aligned */}
    <CardContent>
      <Grid container spacing={1}>
        {Object.entries(data).map(([key, value]) => (
          <Grid item xs={12} sm={6} key={key}>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "4px",
                lineHeight: "1.4",
                textAlign: "left", // Aligning key-value pairs to the left
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
