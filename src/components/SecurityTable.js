import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";
import axios from "axios";
import EquityEdit from "./EquityEdit";
import BondEdit from "./BondEdit";
import PieChartIcon from "@mui/icons-material/PieChart";
import BondSectorPieChart from "./BondSectorPieChart";
import EquitySectorPieChart from "./EquitySectorPieChart";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Button,
  Dialog,
  IconButton,
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
  const [updateCounts, setUpdateCounts] = useState(() => () => {});
  const [selectedBond, setSelectedBond] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartType, setChartType] = useState(""); 

  const currencyMap = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    KRW: "₩",
    RUB: "₽",
    BRL: "R$",
    ZAR: "R",
    MXN: "$",
    NZD: "NZ$",
  };

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
  const handleChartDialogOpen = () => {
    setChartType("bond");
    setChartDialogOpen(true);
  };
  
  const handleChartDialogOpenEquity = () => {
    setChartType("equity");
    setChartDialogOpen(true);
  };

  const handleChartDialogClose = () => {
    setChartDialogOpen(false);
  };
  const handleDetailsClick2 = (security) => {
    console.log(security);
    navigate(`/detailsbond/${security.sid}`);
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
    console.log(sid);
    if (!sid) {
      alert("Security ID is missing!");
      return;
    }

    const apiUrl = `https://localhost:7109/api/EquityCsv/SoftDeleteEquity${sid}`;

    try {
      const response = await axios.delete(apiUrl, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200 || response.status === 204) {
        alert("Equity disabled successfully!");

        fetchData(true);
      }
    } catch (error) {
      console.error("Error disabling equity:", error);
      alert("Failed to disable equity. Please try again.");
    }
  };
  const handleDialogOpen = (security) => {
    setSelectedBond(security);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
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
        fetchData(false);
      }
    } catch (error) {
      console.error("Error disabling bond:", error);
      alert("Failed to disable bond. Please try again.");
    }
  };

  return (
    <>
      <Tile
        isEquityData={isEquityData}
        inactiveCount={inactiveCount}
        onUpdateCounts={setUpdateCounts}
      />
      <Button
        variant="contained"
        color={isEquityData ? "primary" : "secondary"}
        onClick={toggleTable}
        style={{ marginBottom: "20px" }}
      >
        {isEquityData ? "Switch to Bond Table" : "Switch to Equity Table"}
      </Button>

      {isLoading && <div>Loading...</div>}
      {!isEquityData && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Tooltip title="Bond Sector Technology Distribution" placement="top">
            <IconButton
              onClick={handleChartDialogOpen}
              style={{ color: "black" }}
              aria-label="open bond sector chart"
            >
              <PieChartIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}

{isEquityData && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Tooltip title="Equity Sector Technology Distribution" placement="top">
            <IconButton
              onClick={handleChartDialogOpenEquity}
              style={{ color: "black" }}
              aria-label="open bond sector chart"
            >
              <PieChartIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}

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
              {securities.map((security) => {
                // Determine the currency symbol based on "price Currency"
                const currencySymbol =
                  currencyMap[security["price Currency"]] || "";

                return (
                  <TableRow key={security.SID}>
                    <TableCell>{security["security Name"] || "N/A"}</TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: security["open Price"] < 0 ? "red" : "green",
                      }}
                    >
                      {currencySymbol}
                      {security["open Price"]?.toLocaleString() || "N/A"}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: security["close Price"] < 0 ? "red" : "green",
                      }}
                    >
                      {currencySymbol}
                      {security["close Price"]?.toLocaleString() || "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {security["shares Outstanding"]?.toLocaleString() ||
                        "N/A"}
                    </TableCell>
                    <TableCell align="right">
                      {security["declared Date"]
                        ? new Date(
                            security["declared Date"]
                          ).toLocaleDateString("en-US")
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
                );
              })}
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
                <TableCell align="right">Current Price</TableCell>
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
                      onClick={() => handleDetailsClick2(security)}
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
      <Dialog
  open={chartDialogOpen}
  onClose={handleChartDialogClose}
  maxWidth="md"
  fullWidth
>
  <DialogContent>
    {chartType === "equity" && <EquitySectorPieChart />}
    {chartType === "bond" && <BondSectorPieChart />}
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleChartDialogClose}
      color="primary"
      variant="contained"
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
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
            onUpdate={() => fetchData(isEquityData)}
          />
        ) : (
          <BondEdit
            initialData={selectedSecurity}
            onClose={handleCloseModal}
            onUpdate={() => fetchData(isEquityData)}
          />
        )}
        <br />
        <br />
      </Dialog>
    </>
  );
}

export default SecurityTable;
