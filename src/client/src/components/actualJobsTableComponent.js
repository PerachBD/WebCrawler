import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const customColumnStyle = { maxWidth: "150px", maxhight: "3%", size: "3px" };
const customHeaderStyle = { maxWidth: "15%", maxhight: "3%", size: "5px", background: "darkgray " };
const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});


export default function SimpleTable(props) {
  const classes = useStyles();


  const rows = props.rows;
  if (rows.length < 1) {
    return 'NO JOBS YET';
  }
  const proprties = ['startUrl', 'percentagePageCompletion', 'percentageDephCompletion', 'CreationTime', 'WorkStartTime', 'WorkCompletionTime', 'status']
  //Object.keys(rows[0]);



  const headers = [];
  for (let prop of proprties) {
    headers.push(<TableCell style={customHeaderStyle}>{prop}</TableCell>)
  }

  const rowsTable = [];

  for (let row of rows) {
    const columns = []
    for (let prop of proprties) {
      if (prop === 'percentagePageCompletion') {
        columns.push(<TableCell align="left" style={customColumnStyle}><LinearProgress variant="determinate" value={row[prop]} label={`{row[prop]}`} /> <Typography variant="body2" color="textSecondary">{`${row.scanedPagesNumber | 0}/${row.maxTotalPages} pages`}</Typography></TableCell>);
      }
      else if (prop === 'percentageDephCompletion') {
        columns.push(<TableCell align="left" style={customColumnStyle}><LinearProgress variant="determinate" value={row[prop]} label={`{row[prop]}`} /> <Typography variant="body2" color="textSecondary">{`${row.currentDepth | 0}/${row.maxDepth} Depth`}</Typography></TableCell>);
      }
      else {
        const showenurl = row[prop] ? row[prop].slice(0, 28) : ''
        columns.push(<TableCell align="left" style={customColumnStyle}>{showenurl}</TableCell>);
      }

    }
    rowsTable.push(
      <TableRow key={row.id} onClick={() => props.onJobSelect(row.id)} style={{ cursor: 'pointer' }}>
        {columns}
      </TableRow>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsTable}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
