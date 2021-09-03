import React from "react";
import axios from 'axios';
import "./index.css";
import DataGrid from 'react-data-grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rowsy = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsy.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right" onClick={()=>alert("huhu")}>{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function componentDidMount() {
  console.log("componentDidMount success")
  axios.get('/api/data')
    .then(res => {
      console.log("data recieved: ", res.data);
      this.setState({ bestShows: res.data });
    })
    .catch(alert);
}


class App extends React.Component {
  constructor(props) {
    super(props);

    var startDate = new Date(2021, 0, 1);
    var endDate = new Date(2021, 11, 31);
    var daysOfYear = [];
    const maxDaysInMonth = 31;
    const year = 2021;

    // cycle months, start new column for each month
   
  
    var rows = [];
    
    //cycle through days, add new row for each day and empty strings until 31
    for(var curDay = 1; curDay <= maxDaysInMonth; curDay ++){
      var cells = [];
      cells.push(curDay);
      for (var curMonth = 0; curMonth < 12; curMonth ++) {
          //get days in the month
          var daysInMonth = new Date(year, curMonth+1, 0).getDate();
          var value = "";
        
    
        if (curDay <= daysInMonth){
          //add date
          var dateEntry = new Date(year,curMonth,curDay);
          const options1 = { weekday: 'short'};
          const options2 = { day: 'numeric' };
          value = ""+dateEntry.toLocaleDateString('de-DE', options2)+" "+dateEntry.toLocaleDateString('de-DE', options1); 
        }else{
          //add empty string  
        }
        
        cells.push(value);
      }
      rows.push( { id: cells[0], Jan: cells[1], Feb: cells[2], Mar: cells[3], Apr: cells[4], May: cells[5], Jun: cells[6], Jul: cells[7], Aug: cells[8], Sep: cells[9], Oct: cells[10], Nov: cells[11], Dec: cells[12]})
    }

    /*for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));
    }*/

   
    /*for (var r = 0; r < daysOfYear.length;r++) {
      rows.push( { id: r, title: daysOfYear[r].toLocaleDateString() })
      
    }*/

   
    
   

  

    this.state = {
      bestShows: [],
      rows : rows,
      columns : [
        { key: 'id', name: 'ID' , width: 10},
        { key: 'Jan', name: 'Januar', colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Jan_val', name: '',  width: 170},
        { key: 'Feb', name: 'Februar',colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Feb_val', name: '', width: 170 },
        { key: 'Mar', name: 'März' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Mar_val', name: '' },
        { key: 'Apr', name: 'April' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Apr_val', name: '' },
        { key: 'May', name: 'Mai' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'May_val', name: '' },
        { key: 'Jun', name: 'Juni' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Jun_val', name: '' },
        { key: 'Jul', name: 'Juli' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Jul_val', name: '' },
        { key: 'Aug', name: 'August',colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Aug_val', name: '' },
        { key: 'Sep', name: 'September' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Sep_val', name: '' },
        { key: 'Oct', name: 'Oktober',colSpan(args) { if (args.type === 'HEADER') {return 2;}} },
        { key: 'Oct_val', name: '' },
        { key: 'Nov', name: 'November' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Nov_val', name: '' },
        { key: 'Dec', name: 'Dezember' ,colSpan(args) { if (args.type === 'HEADER') {return 2;}}},
        { key: 'Dec_val', name: '' },
      ]
    };
  }

  

  render() {
    console.log("render bestShows: ", this.state.bestShows)
    return (
      <div>
        Full Controle MF! HUHU
        <DataGrid columns={this.state.columns} rows={this.state.rows} />
        <ul>
          {
          

              Object.keys(this.state.bestShows).map((key, i) => (
                Object.keys(this.state.bestShows[key]).map((cur, idx) => (
                  <li>{cur} - {this.state.bestShows[key][cur]} </li>
                ))
              ))

    
          }
        </ul>
        <Button variant="contained" color="primary">
      Hello World
    </Button>
    <DenseTable/>
      </div>
    );
  }
}

export default App;
