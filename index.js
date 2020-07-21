var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "156.67.222.127",
    user: "u296529189_zbiogg",
    password: "ZBIO2610",
    database: "u296529189_zbiogg"
  });
  con.connect(function(err) {
    if (err) throw err;
  var sql = "SELECT * FROM messages";
  con.query(sql, function(err, results) {
    if (err) throw err;
    console.log(results);
  })
  });
  const publicIp = require('public-ip');
 
  (async () => {
      console.log(await publicIp.v4());
      //=> '46.5.21.123'
   
      console.log(await publicIp.v6());
      //=> 'fe80::200:f8ff:fe21:67cf'
  })();

  