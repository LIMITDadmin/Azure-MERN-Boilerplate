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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const baseAPI = '/api/data';
var openDialog = null;
const year = 2021;
 

var dialogAction = null;

 function FormDialog({obj:addMilestone}) {
  const [open, setOpen] = React.useState(false);
  const desc = React.useRef("");
  const desc_long = React.useRef("");
  const date = React.useRef(new Date());
  var type = "";
  const formattedDate = React.useRef("2022-01-01")
  const addM = addMilestone;

  const setTypeVal = (val)=>{
    type = val
  }
    

  const handleClickOpen = (year, month, day) => {
    day = parseInt(day);
    date.current = new Date(year,month,day);
    var yFixed = ""+year;
    var mFixed = (month < 10 ? "0"+month:""+month); 
    var dFixed = (day < 10? "0"+day:""+day);
   formattedDate.current = yFixed+"-"+mFixed+"-"+dFixed;
   console.log("DAtum geparsed: "+yFixed+"-"+mFixed+"-"+dFixed);
    setOpen(true);
  };

  openDialog = handleClickOpen;
  const handleCancel = () => {setOpen(false);}

  const handleClose = (addMilestone) => {
    setOpen(false);
    console.log("dialog hat jetzt: "+type)
  


      return new Promise((resolve, reject) => {

        var hero= {desc:desc.current.value,desc_long : desc_long.current.value, date :date.current.value, type:type}
        addM(hero);
        
        fetch(`${baseAPI}/hero`, {
          method: 'PUT',
          body: JSON.stringify(hero),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(result => result.json())
          .then(json => resolve(json))
          .catch(err => {
            reject(err);
          });
      });
    
    }

  dialogAction = handleClickOpen;

  return (
    <div>
     
      <Dialog open={open} onClose={(addMilestone)=>{handleClose(addMilestone)}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Eintrag bearbeiten.
          </DialogContentText>
          <TextField
              id="date"
              label="Datum"
              type="date"
              defaultValue={formattedDate.current}
              inputRef={date}
              InputLabelProps={{
                shrink: true,
              }}
           />
          
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Beschreibung"
            inputRef={desc}
            type="text"
            fullWidth
          />

       <SimpleSelect callback={setTypeVal}/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={(addMilestone)=>{handleClose(addMilestone)}} color="primary">
            Eintragen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 

function SimpleSelect({callback:setParentType}) {
  const classes = useStyles();
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    console.log("setze jetzt auf:"+event.target.value)
    setParentType( event.target.value);
  };

return(
  <FormControl variant="filled" className={classes.formControl} inputRef={type}>
  <InputLabel id="demo-simple-select-filled-label">Typ</InputLabel>
  <Select
    labelId="demo-simple-select-filled-label"
    id="demo-simple-select-filled"
    value={type}
    onChange={handleChange}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value="Marketing">Marketing</MenuItem>
    <MenuItem value="SCM">SCM</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </Select>
</FormControl>

)

}

const theme = {
  spacing: 0,
  padding: 0,
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function cellSet(day, month, year, val) {
  var chips = [];

  if(val != null){
    for(var i=0;i<val.length;i++){
      chips.push(<Chip  p={0} color="primary" size="small" label={val[i]}/>)
    }
  }
  return [

    <TableCell style={cellStyle(day)}  p={0} align="left"  onClick={()=>{dialogAction(year,month,day)}}>
    {day}
    </TableCell>,

      <TableCell style={cellStyle(day)}  p={0} align="left" onClick={()=>{dialogAction(year,month,day)}}>
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
             {cellSet(row.Jan,1,year,row.Jan_val)}
             {cellSet(row.Feb,2,year,row.Feb_val)}
             {cellSet(row.Mar,3, year,row.Mar_val)}
             {cellSet(row.Apr,4,year, row.Apr_val)}
             {cellSet(row.May,5,year,row.May_val)}
             {cellSet(row.Jun,6,year,row.Jun_val)}
             {cellSet(row.Jul,7,year,row.Jul_val)}
             {cellSet(row.Aug,8,year,row.Aug_val)}
             {cellSet(row.Sep,9,year,row.Sep_val)}
             {cellSet(row.Oct,10,year,row.Oct_val)}
             {cellSet(row.Nov,11,year,row.Nov_val)}
             {cellSet(row.Dec,12,year,row.Dec_val)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


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
    
    var editedValue = "kein wert";
    
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
      milestones: [],
      rows : rows,
      currentEntry : {
        date: null,
        desc: "test test", //creating a refernce for TextField Component
        desc_long: "long"
      }
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
        this.addMilestones(res.data);
        console.log("changed after load: "+this.state.rows)
      this.setState({rows:this.state.rows});
      })
      .catch(alert);
      
  }

   addMilestones = (milestone) => {
    this.setState({ milestones: milestone });
    this.state.milestones.forEach(
      (value, index)=>{
      var dat = new Date(value["date"])
      this.state.rows[dat.getDate()][month_config[dat.getMonth()]+"_val"].push(value["desc"])
      console.log("gefunden, tag: "+dat.getDate()+" Monat: "+dat.getMonth()+" desc: "+value["desc"])
    })
  }

    addMilestone = (milestone) => {
      this.state.milestones.push(milestone);
      this.setState({ milestones: this.state.milestones });
      var dat = new Date(milestone["date"])
      this.state.rows[dat.getDate()][month_config[dat.getMonth()]+"_val"].push(milestone["desc"])
      console.log("hinzugefügt, tag: "+dat.getDate()+" Monat: "+dat.getMonth()+" desc: "+milestone["desc"])

      //this.addMilestones(this.state.milestones);
  }
  

  render() {
    console.log("render milestones: ", this.state.milestones)
    return (
      <div>
        <Button onClick={()=>{this.btnPush()}}> push me </Button>
    
       <DenseTable value={this.state.rows}/>
      
        <ul>
          {
          

              Object.keys(this.state.milestones).map((key, i) => (
                Object.keys(this.state.milestones[key]).map((cur, idx) => (
                  <li>{cur} - {this.state.milestones[key][cur]} </li>
                ))
              ))

    
                }
        </ul>
        
       <FormDialog obj={(param)=>{this.addMilestone(param)}}/>

      </div> 
    );
  }
}

export default App;
