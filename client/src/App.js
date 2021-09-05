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

function cellSet(day) {
  return [
  <TableCell style={cellStyle(day)} align="left">{day}</TableCell>,
  <TableCell style={cellStyle(day)} align="left" onClick={(e)=>{alert("hi "+day+" x: "+e.screenX+" y:"+e.screenY)}}>...</TableCell>
  ]
}


function cellStyle(weekday){
  return (weekday.includes("Sa") || weekday.includes("So")) ? {backgroundColor: 'lightgrey'}:{}
}

function DenseTable({value:rowsy}) {
  const classes = useStyles();
  const colSpanTop = 2;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={colSpanTop}>Januar</TableCell>
            <TableCell colSpan={colSpanTop}>Februar</TableCell>
            <TableCell colSpan={colSpanTop}>März</TableCell>
            <TableCell colSpan={colSpanTop}>April</TableCell>
            <TableCell colSpan={colSpanTop}>Mai</TableCell>
            <TableCell colSpan={colSpanTop}>Juni</TableCell>
            <TableCell colSpan={colSpanTop}>Juli</TableCell>
            <TableCell colSpan={colSpanTop}>August</TableCell>
            <TableCell colSpan={colSpanTop}>September</TableCell>
            <TableCell colSpan={colSpanTop}>Oktober</TableCell>
            <TableCell colSpan={colSpanTop}>November</TableCell>
            <TableCell colSpan={colSpanTop}>Dezember</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsy.map((row) => (
            <TableRow key={row.id}>
             {cellSet(row.Jan)}
             {cellSet(row.Feb)}
             {cellSet(row.Mar)}
             {cellSet(row.Apr)}
             {cellSet(row.May)}
             {cellSet(row.Jun)}
             {cellSet(row.Jul)}
             {cellSet(row.Aug)}
             {cellSet(row.Sep)}
             {cellSet(row.Oct)}
             {cellSet(row.Nov)}
             {cellSet(row.Dec)}
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
      rows.push( { id: cells[0], Jan:cells[1], Feb: cells[2], Mar: cells[3], Apr: cells[4], May: cells[5], Jun: cells[6], Jul: cells[7], Aug: cells[8], Sep: cells[9], Oct: cells[10], Nov: cells[11], Dec: cells[12]})
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


  btnPush (){
    var rowCpy =  JSON.parse(JSON.stringify(this.state.rows));
    //rowCpy[1]["Jan"] = "Got ya"; no copy needed
    this.state.rows[1]["Jan"] = "Got ya";
    this.setState({rows:this.state.rows});
  }
  
   componentDidMount() {
    console.log("componentDidMount success")
    axios.get('/api/data')
      .then(res => {
        console.log("data recieved: ", res.data);
        this.setState({ bestShows: res.data });
      })
      .catch(alert);
  }

  render() {
    console.log("render bestShows: ", this.state.bestShows)
    return (
      <div>
        <Button onClick={()=>{this.btnPush()}}> push me </Button>
       <DenseTable value={this.state.rows}/>
        <ul>
          {
          

              Object.keys(this.state.bestShows).map((key, i) => (
                Object.keys(this.state.bestShows[key]).map((cur, idx) => (
                  <li>{cur} - {this.state.bestShows[key][cur]} </li>
                ))
              ))

    
                }
        </ul>
        
       

      </div>
    );
  }
}

export default App;
