// SecurityDetailsDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  TextField,
} from "@mui/material";

function SecurityDetailsDialog({ open, onClose, selectedSecurity }) {
  const handleClose = () => {
    if (onClose) onClose(); // Call the parent's onClose function
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Security Details</DialogTitle>
      <DialogContent>
        {selectedSecurity && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Security Name"
                value={selectedSecurity["security Name"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Security Description"
                value={selectedSecurity["security Description"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CUSIP"
                value={selectedSecurity["cusip"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ISIN"
                value={selectedSecurity["isin"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SEDOL"
                value={selectedSecurity["sedol"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bloomberg Ticker"
                value={selectedSecurity["bloomberg Ticker"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bloomberg Unique ID"
                value={selectedSecurity["bloomberg Unique ID"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="PE Ratio"
                value={selectedSecurity["pe Ratio"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bid Price"
                value={selectedSecurity["bid Price"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ask Price"
                value={selectedSecurity["ask Price"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Price"
                value={selectedSecurity["last Price"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Volume"
                value={selectedSecurity["volume"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>

            {/* Form Fields Section */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Form PF Asset Class"
                value={selectedSecurity["form PF Asset Class"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Form PF Country"
                value={selectedSecurity["form PF Country"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Form PF Credit Rating"
                value={selectedSecurity["form PF Credit Rating"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Form PF Region"
                value={selectedSecurity["form PF Region"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Form PF Liquidity Profile"
                value={selectedSecurity["form PF Liquidity Profile"] || "N/A"}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SecurityDetailsDialog;
