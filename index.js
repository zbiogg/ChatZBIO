var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});
console.log("RUNNIG");
var mangUserNoti = [];
io.sockets.on('connection', function (socket) {

  console.log("Co nguoi connect ne");
  socket.on("client_send_roomID",function(data){
	// if(mangUserNoti.indexOf(data)>=0){
	// 	console.log("create id oke:");
	// }else{
	// 	console.log("trung ID");
	// }
	console.log("data: "+data.romID+" m: "+data.message);
  });
  
});