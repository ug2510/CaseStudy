import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";
import axios from "axios";
import EquityEdit from "./EquityEdit";
import BondEdit from "./BondEdit";
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
   const [inactiveCount, setInactiveCount] = useState(0);

  const fetchData = (isEquity) => {
    setIsLoading(true);
    const url = isEquity
      ? "https://localhost:7109/api/EquityCsv/getEquityData"
      : "https://localhost:7109/api/BondCsv/getBondsData";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setSecurities(data);
        const count = data.filter(
          (security) => security.status === "inactive"
        ).length;
        setInactiveCount(count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
      console.log(isEquityData, securities);
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
    setSelectedSecurity(security); 
    setIsEditModalOpen(true); 
  };
  const handleDeleteClick = async (security) => {
    const sid = security.sid;
    console.log(sid)
    if (!sid) {
      alert("Security ID is missing!");
      return;
    }

    const apiUrl = `https://localhost:7109/api/EquityCsv/SoftDeleteEquity${sid}`;

    try {
      const response = await axios.delete(apiUrl,{
        headers: { "Content-Type": "application/json" }
      }); 
      if (response.status === 200 || response.status === 204) {
        alert("Equity disabled successfully!");

        setSecurities((prev) => prev.filter((item) => item.SID !== sid));
      }
    } catch (error) {
      console.error("Error disabling equity:", error);
      alert("Failed to disable equity. Please try again.");
    }
  };
const handleDeleteClickBonds = async (security) => {
  const sid = security.sid;
  console.log(sid);
  if (!sid) {
    alert("Security ID is missing!");
    return;
  }

  const apiUrl = `https://localhost:7109/api/BondCsv/SoftDeleteBond${sid}`;

  try {
    const response = await axios.delete(apiUrl, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200 || response.status === 204) {
      alert("Bond disabled successfully!");
      fetchData(isEquityData);
      setSecurities((prev) => prev.filter((item) => item.SID !== sid));
      
    }
  } catch (error) {
    console.error("Error disabling equity:", error);
    alert("Failed to disable equity. Please try again.");
  }
};

  return (
    <>
      <Tile isEquityData={isEquityData} inactiveCount={inactiveCount} />
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
                      onClick={() => handleDeleteClick(security)}
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
                  <TableCell>{security["security Name"] || "N/A"}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: security["couponRate"] < 0 ? "red" : "green",
                    }}
                  >
                    {security["couponRate"]?.toLocaleString() || "N/A"}%
                  </TableCell>
                  <TableCell align="right">
                    {security["maturityDate"]
                      ? new Date(security["maturityDate"]).toLocaleDateString(
                          "en-US"
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    ${security["lastPrice"]?.toLocaleString() || "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleEditClick(security)}
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
                      onClick={() => handleDeleteClickBonds(security)}
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
      {/* <Dialog
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
      </Dialog> */}
      <Dialog
        open={isEditModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <br />
        <br />
        {isEquityData ? (
          <EquityEdit
            initialData={selectedSecurity}
            onClose={handleCloseModal}
          />
        ) : (
          <BondEdit initialData={selectedSecurity} onClose={handleCloseModal} />
        )}
        <br />
        <br />
      </Dialog>
    </>
  );
}

export default SecurityTable;
