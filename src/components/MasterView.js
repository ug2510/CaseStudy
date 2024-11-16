import React, { useEffect, useState } from 'react';
import { Typography, Stack, Switch, Box, Modal, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import Tile from './Tile';
import SecurityTable from './SecurityTable';
import SecurityMasterService from '../services/SecurityMasterService';
import { styled } from '@mui/material/styles';
import PriceChart from './PriceChart';

function MasterView() {
  const [securities, setSecurities] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [selectedType, setSelectedType] = useState("equity"); // Initial type set to "equity"
  const [selectedSecurity, setSelectedSecurity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch data based on selectedType (either "equity" or "bond")
  useEffect(() => {
    fetchData(selectedType);
  }, [selectedType]);

  const fetchData = (type) => {
    SecurityMasterService.getSecurities(type)
      .then((data) => {
        setSecurities(data);
        setActiveCount(data.filter((security) => security.isActive).length);
        setInactiveCount(data.filter((security) => !security.isActive).length);
      })
      .catch((error) => console.error("Failed to fetch securities data:", error));
  };

  // Handle switch toggle between equity and bond
  const handleToggle = () => {
    setSelectedType((prevType) => (prevType === "equity" ? "bond" : "equity"));
  };

  // Handle security click for modal view
  const handleSecurityClick = (security) => {
    setSelectedSecurity(security);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSecurity(null);
  };

  // Styled switch with white border
  const WhiteBorderSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      color: theme.palette.common.white,
    },
    '& .MuiSwitch-track': {
      border: '2px solid white',
      backgroundColor: theme.palette.grey[600],
      opacity: 1,
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
  }));

  return (
    <div style={{ padding: '20px', marginTop: '-200px' }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      
      <Tile activeCount={activeCount} inactiveCount={inactiveCount} />
      <br />
     
      <SecurityTable securities={securities} onSecurityClick={handleSecurityClick} />      
    </div>
  );
}

export default MasterView;
