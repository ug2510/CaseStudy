import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Tile from './Tile';
import SecurityTable from './SecurityTable';
import SecurityMasterService from '../services/SecurityMasterService';
import EquityEdit from './EquityEdit'
import BondEdit from './BondEdit'

function MasterView() {
  const [securities, setSecurities] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const currencies = ['USD', 'EUR', 'JPY']; 
  const pfCreditRatings = ['AAA', 'AA', 'A', 'BBB']; 

  useEffect(() => {
    SecurityMasterService.getSecurities()
      .then((data) => {
        setSecurities(data);
        setActiveCount(data.filter((security) => security.isActive).length);
        setInactiveCount(data.filter((security) => !security.isActive).length);
      })
      .catch((error) => console.error("Failed to fetch securities data:", error));
  }, []);

  return (
    <div style={{ padding: '20px', marginTop: '-200px' }}>
      <Tile activeCount={activeCount} inactiveCount={inactiveCount} />
      <br />
      
      <SecurityTable securities={securities} />

      {/* <BondEdit /> */}
      {/* <EquityEdit pfCreditRatings={pfCreditRatings} currencies={currencies} />; */}
      {/* <EquityEdit /> */}
    </div>
  );
}

export default MasterView;
