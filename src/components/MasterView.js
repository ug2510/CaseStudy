import React, { useEffect, useState } from 'react';
import { Typography, Stack, Switch, Box } from '@mui/material';
import Tile from './Tile';
import SecurityTable from './SecurityTable';
import SecurityMasterService from '../services/SecurityMasterService';
import { styled } from '@mui/material/styles';

function MasterView() {
  const [securities, setSecurities] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [selectedType, setSelectedType] = useState("equity");

  const currencies = ['USD', 'EUR', 'JPY'];
  const pfCreditRatings = ['AAA', 'AA', 'A', 'BBB'];

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

  const handleToggle = () => {
    setSelectedType((prevType) => (prevType === "equity" ? "bond" : "equity"));
  };

  // Custom styled switch with white border
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
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={2}>
        <Typography variant="body1">Bond</Typography>
        <WhiteBorderSwitch
          checked={selectedType === "equity"}
          onChange={handleToggle}
        />
        <Typography variant="body1">Equity</Typography>
      </Stack>

      <br />

      <Tile activeCount={activeCount} inactiveCount={inactiveCount} />

      <br />

      <SecurityTable securities={securities} />
    </div>
  );
}

export default MasterView;
