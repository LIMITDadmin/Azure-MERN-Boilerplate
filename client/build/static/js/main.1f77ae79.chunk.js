(this["webpackJsonpazure-mern-client"]=this["webpackJsonpazure-mern-client"]||[]).push([[0],{119:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),o=n(11),c=n.n(o),i=(n(57),n(66)),r=n(67),s=n(40),d=n(75),u=n(74),h=n(76),j=n(50),p=n(71),b=n.n(p),f=n(176),v=n(164),g=n(179),m=n(182),O=n(177),w=n(178),x=n(180),y=n(181),S=n(167),M=n(189),_=n(186),D=n(185),k=n(175),J=n(170),C=n(171),R=n(169),A=(n(118),n(187)),z=n(188),E=n(174),N=n(183),T=n(6),F=Object(v.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},table:{minWidth:650},TableCellSizeSmall:{padding:"3px 1px 3px 1px",fontsize:"0.875rem",textalign:"left",fontweight:400,lineheight:1.43,borderbottom:"1px solid rgba(224, 224, 224, 1)",letterspacing:"0.01071em",verticalalign:"inherit"}}})),P="/api/data",I=2021,W=null;function B(e){var t=e.obj,n=(e.change,e.mode,l.a.useState(!1)),a=Object(j.a)(n,2),o=a[0],c=a[1],i=l.a.useRef(""),r=l.a.useRef(""),s=l.a.useRef(new Date),d="",u=l.a.useRef("2022-01-01"),p=l.a.useRef("-"),b=(l.a.useRef("-"),t),v=function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;console.log("------------- Soll ge\xe4ndert werden? "+(null!=a?"Ja":"Nein")),n=parseInt(n),s.current=new Date(e,t,n);var l=""+e,o=t<10?"0"+t:""+t,i=n<10?"0"+n:""+n;u.current=l+"-"+o+"-"+i,p.current=null!==a?a.desc:"",console.log("DAtum geparsed: "+l+"-"+o+"-"+i),c(!0)};v;var g=function(){c(!1)},m=function(e){return c(!1),console.log("dialog hat jetzt: "+d),function(e,t,n,a,l){var o=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return new Promise((function(c,i){var r={desc:e.current.value,desc_long:t.current.value,date:n.current.value,type:a},s=o?"POST":"PUT";fetch("".concat(P,"/hero"),{method:s,body:JSON.stringify(r),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){var t=l;Object(h.a)({},r);console.log("DB Eintrag erfolgt, ID: "+e.ops),t(e.ops[0])})).catch((function(e){i(e)}))}))}(i,r,s,d,b)};return W=v,Object(T.jsx)("div",{children:Object(T.jsxs)(D.a,{open:o,onClose:g,"aria-labelledby":"form-dialog-title",children:[Object(T.jsx)(R.a,{id:"form-dialog-title",children:"Termin Eintragen"}),Object(T.jsxs)(J.a,{children:[Object(T.jsx)(C.a,{children:"Termin bearbeiten."}),Object(T.jsx)(_.a,{id:"date",label:"Datum",type:"date",defaultValue:u.current,inputRef:s,InputLabelProps:{shrink:!0}}),Object(T.jsx)(_.a,{autoFocus:!0,margin:"dense",defaultValue:p.current,id:"desc",label:"Beschreibung",inputRef:i,type:"text",fullWidth:!0}),Object(T.jsx)(L,{callback:function(e){d=e}})]}),Object(T.jsxs)(k.a,{children:[Object(T.jsx)(f.a,{onClick:g,color:"primary",children:"Cancel"}),Object(T.jsx)(f.a,{onClick:function(e){m()},color:"primary",children:"Eintragen"})]})]})})}function L(e){var t=e.callback,n=F(),a=l.a.useState(""),o=Object(j.a)(a,2),c=o[0],i=o[1];return Object(T.jsxs)(E.a,{variant:"filled",className:n.formControl,inputRef:c,children:[Object(T.jsx)(A.a,{id:"demo-simple-select-filled-label",children:"Typ"}),Object(T.jsxs)(N.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:c,onChange:function(e){i(e.target.value),console.log("setze jetzt auf:"+e.target.value),t(e.target.value)},children:[Object(T.jsx)(z.a,{value:"",children:Object(T.jsx)("em",{children:"None"})}),Object(T.jsx)(z.a,{value:"Marketing",children:"Marketing"}),Object(T.jsx)(z.a,{value:"SCM",children:"SCM"}),Object(T.jsx)(z.a,{value:"Other",children:"Other"})]})]})}function V(e,t,n,a,l,o){var c=[],i=F();if(null!=a)for(var r=function(){d=a[s]._id;var o=a[s];c.push(Object(T.jsx)(M.a,{p:0,color:"primary",size:"small",label:a[s].desc,onClick:function(a){var l=o;W(n,t,e,l),console.log("richtig mit: "+l.desc),a.stopPropagation()},onDelete:function(){return l(d)}}))},s=0;s<a.length;s++){var d;r()}return[Object(T.jsx)(O.a,{className:i.TableCellSizeSmall,style:H(e,!1),p:0,align:"left",onClick:function(){W(n,t,e)},children:e}),Object(T.jsx)(O.a,{className:i.TableCellSizeSmall,style:H(e,!0),p:0,align:"left",onClick:function(){console.log("H\xe4\xe4\xe4\xe4\xe4hhhh"),W(n,t,e)},children:c})]}function H(e,t){return e.includes("Sa")||e.includes("So")?{backgroundColor:"lightgrey",whiteSpace:t?"normal":"nowrap"}:{whiteSpace:t?"normal":"nowrap"}}function U(e){var t=e.value,n=e.delete;e.modify,F();return Object(T.jsx)(w.a,{component:S.a,children:Object(T.jsxs)(g.a,{size:"small","aria-label":"Milestone table",children:[Object(T.jsx)(x.a,{children:Object(T.jsxs)(y.a,{p:0,children:[Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Januar"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Februar"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"M\xe4rz"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"April"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Mai"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Juni"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Juli"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"August"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"September"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Oktober"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"November"}),Object(T.jsx)(O.a,{p:0,style:{width:"8%"},colSpan:2,children:"Dezember"})]})}),Object(T.jsx)(m.a,{p:0,children:t.map((function(e){return Object(T.jsxs)(y.a,{p:0,children:[V(e.Jan,1,I,e.Jan_val,n),V(e.Feb,2,I,e.Feb_val,n),V(e.Mar,3,I,e.Mar_val,n),V(e.Apr,4,I,e.Apr_val,n),V(e.May,5,I,e.May_val,n),V(e.Jun,6,I,e.Jun_val,n),V(e.Jul,7,I,e.Jul_val,n),V(e.Aug,8,I,e.Aug_val,n),V(e.Sep,9,I,e.Sep_val,n),V(e.Oct,10,I,e.Oct_val,n),V(e.Nov,11,I,e.Nov_val,n),V(e.Dec,12,I,e.Dec_val,n)]},e.id)}))})]})})}var $=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],q=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;Object(i.a)(this,n),(a=t.call(this,e)).addRow=function(e,t){var n=new Date(e.date);return t[n.getDate()-1][$[n.getMonth()]+"_val"].push(e),console.log("hinzugef\xfcgt, tag: "+n.getDate()+" Monat: "+n.getMonth()+" desc: "+e.desc+"id: "+e._id),t},a.addMilestones=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=[];n=t?a.createRows():a.state.rows,e.forEach((function(e,t){n=a.addRow(e,n)})),a.setState({milestones:e,rows:n})},a.addMilestone=function(e){console.log("called ........................"+Object(s.a)(a)+" MS:"+e),a.state.milestones.push(e),a.state.rows=a.addRow({_id:e._id,desc:e.desc,date:e.date},a.state.rows),a.setState({milestones:a.state.milestones,rows:a.state.rows})},a.deleteMilestone=function(e){console.log("now deleting: "+e+" with pointer: "+a.state.milestones.length);var t=a.state.milestones.filter((function(t){return t._id!=e}));return a.addMilestones(t,!0),new Promise((function(t,n){fetch("".concat(P,"/hero/").concat(e),{method:"DELETE"}).then((function(e){return e.json()})).then((function(e){return t(e)})).catch((function(e){n(e)}))}))},a.modifyMilestone=function(e,t,n,a,l){console.log("called update in REACT -------------------")},a.changeMilestone=function(e){};new Date(2021,0,1),new Date(2021,11,31);var l=a.createRows();return a.state={milestones:[],rows:l,currentEntry:{date:null,desc:"test test",desc_long:"long"}},a}return Object(r.a)(n,[{key:"createRows",value:function(){for(var e=[],t=1;t<=31;t++){var n=[];n.push(t);for(var a=0;a<12;a++){var l="";if(t<=new Date(2021,a+1,0).getDate()){var o=new Date(2021,a,t);l=o.toLocaleDateString("de-DE",{day:"numeric"})+" "+o.toLocaleDateString("de-DE",{weekday:"short"})}n.push(l)}e.push({id:n[0],Jan:n[1],Feb:n[2],Mar:n[3],Apr:n[4],May:n[5],Jun:n[6],Jul:n[7],Aug:n[8],Sep:n[9],Oct:n[10],Nov:n[11],Dec:n[12],Jan_val:[],Feb_val:[],Mar_val:[],Apr_val:[],May_val:[],Jun_val:[],Jul_val:[],Aug_val:[],Sep_val:[],Oct_val:[],Nov_val:[],Dec_val:[]})}return e}},{key:"componentDidMount",value:function(){var e=this;console.log("componentDidMount success"),b.a.get("/api/data").then((function(t){console.log("data recieved: ",t.data),e.addMilestones(t.data),console.log("changed after load: "+e.state.rows),e.setState({rows:e.state.rows})})).catch(alert)}},{key:"render",value:function(){var e=this;return console.log("render milestones: ",this.state.milestones),Object(T.jsxs)("div",{children:[Object(T.jsx)(f.a,{onClick:function(){e.btnPush()},children:" push me "}),Object(T.jsx)(U,{value:this.state.rows,delete:function(t){e.deleteMilestone(t)},modify:function(t){e.modifyMilestone(t)}}),Object(T.jsx)("ul",{children:Object.keys(this.state.milestones).map((function(t,n){return Object.keys(e.state.milestones[t]).map((function(n,a){return Object(T.jsxs)("li",{children:[n," - ",e.state.milestones[t][n]," "]})}))}))}),Object(T.jsx)(B,{obj:function(t){e.addMilestone(t)},change:function(t){e.changeMilestone(t)}})]})}}]),n}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(T.jsx)(q,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},57:function(e,t,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.1f77ae79.chunk.js.map