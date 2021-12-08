import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { theme } from '../../assets/theme'
import { ThemeProvider } from '@material-ui/core/styles';

export class AveragePrices extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>

                <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quartier</TableCell>
            <TableCell align="right">Prix-moyen appartement</TableCell>
            <TableCell align="right">Prix moyen villa</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
              <TableCell component="th" scope="row">
Test              </TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Test</TableCell>
              <TableCell align="right">Test </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </ThemeProvider>
                
            </div>
        )
    }
}

export default AveragePrices
