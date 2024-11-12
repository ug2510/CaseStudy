import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

function SecurityTable({ securities }) {
  return (
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
            <TableRow key={security.id}>
              <TableCell>{security.name}</TableCell>
              <TableCell align="right" style={{ color: security.openPrice < 0 ? 'red' : 'green' }}>
                ${security.openPrice.toLocaleString()}
              </TableCell>
              <TableCell align="right" style={{ color: security.closePrice < 0 ? 'red' : 'green' }}>
                ${security.closePrice.toLocaleString()}
              </TableCell>
              <TableCell align="right">{security.totalShares.toLocaleString()}</TableCell>
              <TableCell align="right">
                {new Date(security.dividendDeclaredDate).toLocaleDateString('en-US')}
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" size="small" style={{ marginRight: '5px' }}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SecurityTable;
