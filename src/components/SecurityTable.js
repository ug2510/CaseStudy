import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";
import EquityEdit from "./EquityEdit";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

function SecurityTable() {
  const [securities, setSecurities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState(null);
  const [isEquityData, setIsEquityData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = (isEquity) => {
    setIsLoading(true);
    const url = isEquity
      ? "https://localhost:7109/api/EquityCsv/getEquityData"
      : "https://localhost:7109/api/BondCsv/getBondData";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setSecurities(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(isEquityData);
  }, [isEquityData]);

  

  const handleDetailsClick = (security) => {
    console.log(security);
    navigate(`/details/${security.sid}`);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedSecurity(null);
  };

  const toggleTable = () => {
    setIsEquityData(!isEquityData);
  };

  const handleEditClick = (security) => {
    setSelectedSecurity(security); // Store the selected row data
    setIsEditModalOpen(true); // Open the modal
  };


  return (
    <>
      <Tile isEquityData={isEquityData} inactiveCount={0} />
      <Button
        variant="contained"
        color={isEquityData ? "primary" : "secondary"}
        onClick={toggleTable}
        style={{ marginBottom: "20px" }}
      >
        {isEquityData ? "Switch to Bond Table" : "Switch to Equity Table"}
      </Button>

      {/* Loading Spinner */}
      {isLoading && <div>Loading...</div>}

      {/* Conditional Rendering for Equity or Bond Table */}
      {isEquityData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Security Name</TableCell>
                <TableCell align="right">Open Price</TableCell>
                <TableCell align="right">Close Price</TableCell>
                <TableCell align="right">Total Shares Outstanding</TableCell>
                <TableCell align="right">Dividend Declared Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {securities.map((security) => (
                <TableRow key={security.SID}>
                  <TableCell>{security["security Name"] || "N/A"}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: security["open Price"] < 0 ? "red" : "green",
                    }}
                  >
                    ${security["open Price"]?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: security["close Price"] > 0 ? "red" : "green",
                    }}
                  >
                    ${security["close Price"]?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {security["shares Outstanding"]?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {security["declared Date"]
                      ? new Date(security["declared Date"]).toLocaleDateString(
                          "en-US"
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleEditClick(security)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleDetailsClick(security)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bond Name</TableCell>
                <TableCell align="right">Coupon Rate</TableCell>
                <TableCell align="right">Maturity Date</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {securities.map((security) => (
                <TableRow key={security.SID}>
                  <TableCell>{security["bond Name"] || "N/A"}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: security["coupon Rate"] < 0 ? "red" : "green",
                    }}
                  >
                    {security["coupon Rate"]?.toLocaleString() || "N/A"}%
                  </TableCell>
                  <TableCell align="right">
                    {security["maturity Date"]
                      ? new Date(security["maturity Date"]).toLocaleDateString(
                          "en-US"
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    ${security["price"]?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleDetailsClick(security)} // Navigate to details
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )} 
       <Dialog
        open={isEditModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        
      <br />
      <br />
        <EquityEdit
          initialData={selectedSecurity} 
          onClose={handleCloseModal} 
        />
        
      <br />
      <br />
      </Dialog>

    </>
  );
}

export default SecurityTable;
