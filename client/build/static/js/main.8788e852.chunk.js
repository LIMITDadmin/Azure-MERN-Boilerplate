(this["webpackJsonpazure-mern-client"]=this["webpackJsonpazure-mern-client"]||[]).push([[0],{3:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n.n(o),s=n(12),r=n.n(s),c=(n(3),n(13)),i=n(14),l=n(17),u=n(16),h=n(15),d=n.n(h),m=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).state={bestShows:[]},o}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this;console.log("componentDidMount success"),d.a.get("/api/data").then((function(t){console.log("data recieved: ",t.data),e.setState({bestShows:t.data})})).catch(alert)}},{key:"render",value:function(){var e=this;return console.log("render bestShows: ",this.state.bestShows),a.a.createElement("div",null,"Full Controle MF!",a.a.createElement("ul",null,Object.keys(this.state.bestShows).map((function(t,n){return Object.keys(e.state.bestShows[t]).map((function(n,o){return a.a.createElement("li",null,n," - ",e.state.bestShows[t][n]," ")}))}))))}}]),n}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[39,1,2]]]);
//# sourceMappingURL=main.8788e852.chunk.js.map