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
import Chip from '@material-ui/core/Chip';
import { spacing } from '@material-ui/system';


const theme = {
  spacing: 0,
  padding: 0,
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function cellSet(day, val) {
  var chips = [];

  if(val != null){
    for(var i=0;i<val.length;i++){
      chips.push(<Chip  p={0} color="primary" size="small" label={val[i]}/>)
    }
  }
  return [

    <TableCell style={cellStyle(day)}  p={0} align="left" onClick={(e)=>{alert("hi "+day+" x: "+e.screenX+" y:"+e.screenY)}}>
    {day}
    </TableCell>,
  <TableCell style={cellStyle(day)}  p={0} align="left" onClick={(e)=>{alert("hi "+day+" x: "+e.screenX+" y:"+e.screenY)}}>
    {chips}
    </TableCell>
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
          <TableRow p={0} >
            <TableCell p={0} colSpan={colSpanTop}>Januar</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Februar</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>März</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>April</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Mai</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Juni</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Juli</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>August</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>September</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Oktober</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>November</TableCell>
            <TableCell p={0} colSpan={colSpanTop}>Dezember</TableCell>
          </TableRow>
        </TableHead>
        <TableBody p={0} >
          {rowsy.map((row) => (
            <TableRow p={0} key={row.id}>
             {cellSet(row.Jan,row.Jan_val)}
             {cellSet(row.Feb,row.Feb_val)}
             {cellSet(row.Mar,row.Mar_val)}
             {cellSet(row.Apr, row.Apr_val)}
             {cellSet(row.May,row.May_val)}
             {cellSet(row.Jun,row.Jun_val)}
             {cellSet(row.Jul,row.Jul_val)}
             {cellSet(row.Aug,row.Aug_val)}
             {cellSet(row.Sep,row.Sep_val)}
             {cellSet(row.Oct,row.Oct_val)}
             {cellSet(row.Nov,row.Nov_val)}
             {cellSet(row.Dec,row.Dec_val)}
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


const month_config = [
  "Jan",
  "Feb",
  "Mar",
  "Apr", 
  "May", 
  "Jun", 
  "Jul", 
  "Aug", 
  "Sep", 
  "Oct", 
  "Nov", 
  "Dec"
];

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
      rows.push( { 
        id: cells[0], 
        Jan:cells[1], 
        Feb: cells[2], 
        Mar: cells[3], 
        Apr: cells[4], 
        May: cells[5], 
        Jun: cells[6], 
        Jul: cells[7], 
        Aug: cells[8], 
        Sep: cells[9], 
        Oct: cells[10], 
        Nov: cells[11], 
        Dec: cells[12],
        Jan_val: [], 
        Feb_val: [], 
        Mar_val: [], 
        Apr_val: [], 
        May_val: [], 
        Jun_val: [], 
        Jul_val: [], 
        Aug_val: [], 
        Sep_val: [], 
        Oct_val: [], 
        Nov_val: [], 
        Dec_val: [],
      })
    }

    /*for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));
    }*/

   
    /*for (var r = 0; r < daysOfYear.length;r++) {
      rows.push( { id: r, title: daysOfYear[r].toLocaleDateString() })
      
    }*/
  

    this.state = {
      bestShows: [],
      rows : rows
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
        this.state.bestShows.forEach(
          (value, index)=>{
          var dat = new Date(value["date"])
          this.state.rows[dat.getDate()][month_config[dat.getMonth()]+"_val"].push(value["desc"])
          console.log("gefunden, tag: "+dat.getDate()+" Monat: "+dat.getMonth()+" desc: "+value["desc"])
        })
        console.log("changed after load: "+this.state.rows)
      this.setState({rows:this.state.rows});
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
