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
  socket.on("client_send_noti",function(data){
	if(mangUserNoti.indexOf(data.receiverID)==0){
		console.log("rom da ton tai:");
	}else{
		console.log("create id oke:");
		mangUserNoti.push(data.receiverID);
	}
	console.log("nguoi nhan: "+data.receiverID+" notiID: "+data.notiID);
  });
  
});