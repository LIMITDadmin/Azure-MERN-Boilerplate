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
import Badge from '@mui/material/Badge';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Calendar = require('calendar-base').Calendar;
const cal = new Calendar();



const theme = createTheme({
  spacing: 0,
  padding: 0,
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#dcf5fd',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
  TableCellSizeSmall: {
    padding:"3px 1px 3px 1px",
    fontsize: "0.875rem",
    textalign: "left",
     fontweight: 400,
    lineheight: 1.43,
    borderbottom: "1px solid rgba(224, 224, 224, 1)",
    letterspacing: "0.01071em",
    verticalalign: "inherit",
  },
}));

const chipColors = {"SCM":"#C2F3E4","":"#eddbf9", "Marketing":"#FF9F66","other":"#DCF5FD"}

const baseAPI = '/api/data';
var openDialog = null;
const year = 2021;
 

var dialogAction = null;

 function FormDialog({obj:addMilestone, change:changeMilestone}) {
  const [open, setOpen] = React.useState(false);
  const [isModify, setModify] = React.useState(false);
  const desc = React.useRef("");
  const id = React.useRef(0);
  const desc_long = React.useRef("");
  const date = React.useRef(new Date());
  var type = React.useRef("-");
  const formattedDate = React.useRef("2022-01-01")
  const formDesc = React.useRef("-")
  const formType = React.useRef("-")
  const addM = addMilestone;
  const chM = changeMilestone;
  const callBack = isModify ? changeMilestone : addMilestone;

  const setTypeVal = (val)=>{
    console.log("bekomme in setTypeVal: "+val)
    type.current = val

  }

  const handleClickOpen = (year, month, day,value=null) => {
    console.log("------------- Soll geändert werden? "+(value!=null?"Ja":"Nein"))
    day = parseInt(day);
    date.current = new Date(year,month,day);
    var yFixed = ""+year;
    var mFixed = (month < 10 ? "0"+month:""+month); 
    var dFixed = (day < 10? "0"+day:""+day);
   formattedDate.current = yFixed+"-"+mFixed+"-"+dFixed;
   id.current = value !== null ? value["_id"]: 0;
   formDesc.current = value !== null ? value["desc"]: "";
   formType.current = value !== null ? value["type"]: "";
   type.current = (value !== null ? value["type"]: "");
   console.log("DAtum geparsed: "+yFixed+"-"+mFixed+"-"+dFixed+" type: "+type.current);
   setModify(value!==null) //if value is not null, we are modifying existing milestone
   setOpen(true);
  };

  openDialog = handleClickOpen;
  const handleCancel = () => {setOpen(false);}

  const handleClose = (isUpdate) => {
    setOpen(false);
    console.log("dialog hat jetzt: "+type.current)
    return addMilestoneToDB(desc, desc_long, date, type.current, addM,id.current,isUpdate);
    
  }

  dialogAction = handleClickOpen;

  return (
    <div>
     
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Termin {isModify?"Ändern":"Eintragen"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Termin bearbeiten.
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
            defaultValue={formDesc.current}
            id="desc"
            label="Beschreibung"
            inputRef={desc}
            type="text"
            fullWidth
          />

       <SimpleSelect callback={setTypeVal} defaultType={formType.current}/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleClose(isModify)}} color="primary">
            {isModify?"Ändern":"Eintragen"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 

function addMilestoneToDB(desc, desc_long, date, type, addM,id=0,isUpdate=false) {

  console.log("Jetzt ist isUpdate noch: "+isUpdate);
  return new Promise((resolve, reject) => {
    var hero = { desc: desc.current.value, desc_long: desc_long.current.value, date: date.current.value, type: type };
    if(isUpdate){
      console.log("--- hier hab ich noch die ID: "+id);
      hero = {_id:id, desc: desc.current.value, desc_long: desc_long.current.value, date: date.current.value, type: type };
    }
    var method = isUpdate ? 'POST' : 'PUT'
    fetch(`${baseAPI}/hero`, {
      method: method,
      body: JSON.stringify(hero),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data) => {
        let cb = addM;
        let doChange = isUpdate?true:false;
        console.log("an checkpoint 2 ist es nun: "+doChange);
        let obj = { ...hero };
        console.log("DB Eintrag erfolgt, ID: " + data["ops"]);
        cb(data["ops"][0],doChange); // first element of entered Values (we only enter one)
      })
      .catch(err => {
        reject(err);
      });

  });
}

function SimpleSelect({callback:setParentType,defaultType:typePreset}) {
  const classes = useStyles();
  const [type, setType] = React.useState(typePreset!== null?typePreset:'');
  console.log("Simple Select aufgerufen: "+typePreset)

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

function handleDelete(id){
  console.log("wrong: "+id);

}

function WeekBadge(num, text, isBadge){
  const result = isBadge? (
  
    <div style={
      { 
       display:"inline-block",
        height:"100%", 
        fontSize:"90%", 
        color:"black", 
        fontStyle:"bold", 
        borderRadius:"0px",  
        borderRight:"1px solid lightgrey"
        }}>
          <div style={{alignContent:"center", fontSize:"50%"}}>KW</div>{
          text+""+num}
          
          </div>
      
  
  ):text;
  return result;
}

function addBadge (inner,daysBetween, doWrap){
  return (!doWrap ? inner :  <Badge badgeContent={daysBetween} color="secondary"  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}> {inner} </Badge>)
}

function CellSet(day, month, year, val, deleteMilestone, modifyMilestone) {
  var chips = [];
  const classes = useStyles();
  const today = new Date();
  const adjustedMonthToday = today.getMonth()
  const adjustedMonthReference = month-1; //zero based month
  const refToday = {year: today.getFullYear(), month: adjustedMonthToday, day: today.getDate()}
  const refDate = {year: year, month: adjustedMonthReference, day: parseInt(day)}
  const daysBetween = Calendar.diff(refDate, refToday);
  const isToday = daysBetween == 0

  if(val != null){
    
    for(var i=0;i<val.length;i++){
      var id = val[i]["_id"]; 
      let set = val[i];
      let color = chipColors[val[i]["type"]];
      chips.push(
        addBadge(  
        <Chip  p={0} style={{backgroundColor: color}} size="small" label={val[i]["desc"]} onClick={(e)=>{let value = set; dialogAction(year,month,day, value); console.log("richtig mit: "+value._id); e.stopPropagation()}}  onDelete={()=>deleteMilestone(id)}/>
        ,daysBetween , i == 0)
      )
    }
  }

  
  return [

    <TableCell className={ classes.TableCellSizeSmall} style={cellStyle(day,false,isToday)}  p={0} align="left"  onClick={()=>{dialogAction(year,month,day)}}>
      {day}
    </TableCell>,

      <TableCell className={classes.TableCellSizeSmall} style={cellStyle(day,true,isToday)}  p={0} align="right" onClick={()=>{console.log("Hääääähhhh");dialogAction(year,month,day)}}>
    <div style = {
      {whiteSpace:"nowrap", align:"right"}
    }>  {chips}    { WeekBadge(Calendar.calculateWeekNumber({year: year, month: adjustedMonthReference, day: parseInt(day)}),"",day.includes("Mo"))} 
   </div> </TableCell>
  ]
}


function cellStyle(weekday, isContentCol,isToday){
  let todayColor = "#bfdbf2"
  
  return (weekday.includes("Sa") || weekday.includes("So")) ? {backgroundColor: (isToday ? todayColor : 'lightgrey'), whiteSpace: (isContentCol ? "normal": "nowrap")}:{whiteSpace: (isContentCol ? "normal": "nowrap"),  backgroundColor: isToday ? todayColor : ""}
}

function DenseTable({value:rowsy, delete:deleteMilestone, modify:modifyMilestone}) {
  const classes = useStyles();
  const colSpanTop = 2;

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Milestone table">
        <TableHead>
          <TableRow p={0} >
            <TableCell p={0}  style={{width: "8%"}}  colSpan={colSpanTop}>Januar</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Februar</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>März</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>April</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Mai</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Juni</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Juli</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>August</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>September</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Oktober</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>November</TableCell>
            <TableCell p={0}  style={{width: "8%"}} colSpan={colSpanTop}>Dezember</TableCell>
          </TableRow>
        </TableHead>
        <TableBody p={0} >
          {rowsy.map((row) => (
            <TableRow p={0} key={row.id}>
             {CellSet(row.Jan,1,year,row.Jan_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Feb,2,year,row.Feb_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Mar,3, year,row.Mar_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Apr,4,year, row.Apr_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.May,5,year,row.May_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Jun,6,year,row.Jun_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Jul,7,year,row.Jul_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Aug,8,year,row.Aug_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Sep,9,year,row.Sep_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Oct,10,year,row.Oct_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Nov,11,year,row.Nov_val,deleteMilestone,modifyMilestone)}
             {CellSet(row.Dec,12,year,row.Dec_val,deleteMilestone,modifyMilestone)}
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
   

    // cycle months, start new column for each month
   
  
    var rows = this.createRows();
  

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


  createRows() {
    const maxDaysInMonth = 31;
    const year = 2021;
    var rows = [];

    var editedValue = "kein wert";

    //cycle through days, add new row for each day and empty strings until 31
    for (var curDay = 1; curDay <= maxDaysInMonth; curDay++) {
      var cells = [];
      cells.push(curDay);
      for (var curMonth = 0; curMonth < 12; curMonth++) {
        //get days in the month
        var daysInMonth = new Date(year, curMonth + 1, 0).getDate();
        var value = "";


        if (curDay <= daysInMonth) {
          //add date
          var dateEntry = new Date(year, curMonth, curDay);
          const options1 = { weekday: 'short' };
          const options2 = { day: 'numeric' };
          value = "" + dateEntry.toLocaleDateString('de-DE', options2) + " " + dateEntry.toLocaleDateString('de-DE', options1);
        } else {
          //add empty string  
        }

        cells.push(value);
      }
      rows.push({
        id: cells[0],
        Jan: cells[1],
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
      });
    }
    return rows;
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


  addRow = (value, rowSet) => {
    var dat = new Date(value["date"])
    rowSet[dat.getDate()-1][month_config[dat.getMonth()]+"_val"].push(value)
    return rowSet;
  }


   addMilestones = (milestone, isClearContent = false) => {
    
    var rowSet = []
    if (isClearContent){
      rowSet = this.createRows()
    }else{
      rowSet = this.state.rows
    }
    
    milestone.forEach(
      (value, index)=>{
        rowSet = this.addRow(value, rowSet);
    })
    this.setState({ milestones: milestone, rows:rowSet });
  }

    addMilestone = (milestone,isUpdate) => {
      console.log("called ........................ und an checkpoint 3: "+isUpdate)
      console.log(milestone);
      if(isUpdate){
        this.state.milestones = this.state.milestones.filter((obj)=>{return obj["_id"] !== milestone["_id"]});
        console.log ("trying to remove "+milestone["_id"])
      }
      this.state.milestones.push(milestone);
      this.addMilestones(this.state.milestones,true);
  }
 
  deleteMilestone = (id) => {

    console.log("now deleting: "+id+" with pointer: "+this.state.milestones.length)
    var filteredMilestones =  this.state.milestones.filter(element => element._id != id)
    this.addMilestones(filteredMilestones,true);
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/hero/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });

 }

  

  render() {
    console.log("render milestones: ", this.state.milestones)
    return (
      <ThemeProvider theme={theme}>
      <div>
       <DenseTable value={this.state.rows} delete={(param)=>{this.deleteMilestone(param)}}/>
       <FormDialog obj={(obj,isUpdate)=>{this.addMilestone(obj,isUpdate)}} change={(param)=>{this.changeMilestone(param)}} />

      {/*
        <ul>
          {
          

              Object.keys(this.state.milestones).map((key, i) => (
                Object.keys(this.state.milestones[key]).map((cur, idx) => (
                  <li>{cur} - {this.state.milestones[key][cur]} </li>
                ))
              ))

    
                }
        </ul>
         */}
  

      </div> 
      </ThemeProvider>
    );
  }
}

export default App;
