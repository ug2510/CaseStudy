import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PieChartIcon from "@mui/icons-material/PieChart";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PieChart from "./PieChart"; 

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPieChartModalOpen, setPieChartModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query:", searchQuery);
      setSearchQuery("");
    }
  };

  const handleOpenPieChartModal = () => {
    setPieChartModalOpen(true);
  };

  const handleClosePieChartModal = () => {
    setPieChartModalOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>

          <Tooltip title="View Active Bonds and Equities" placement="top">
            <IconButton color="inherit" onClick={handleOpenPieChartModal}>
              <PieChartIcon />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Security Master App
          </Typography>

          <Button
            color="inherit"
            onClick={() => navigate("/placeholder")}
            sx={{ marginLeft: "auto" }}
          >
            Price Analysis
          </Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, bgcolor: "white" }}
          />

          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ display: "flex" }}
          >
            {/* <IconButton color="inherit" onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton> */}

            {searchOpen && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  inputProps={{ "aria-label": "search" }}
                  autoFocus
                />
              </Search>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={isPieChartModalOpen}
        onClose={handleClosePieChartModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <PieChart />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePieChartModal}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Navbar;
