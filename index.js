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
	socket.on("noti_client_id",function(cliend_id){
		if(mangUserNoti.indexOf(cliend_id)==0){
			mangUserNoti.push(cliend_id);
		}
		socket.join(cliend_id);
		console.log("id ket noi: "+cliend_id);
	});
	// io.to(cliend_id).emit("test001","Đã kết nối");
  	console.log("Co nguoi connect ne");
  	socket.on("client_send_noti",function(data){
	io.to(data.receiverID).emit("server_send_noti",{notiID: data.notiID });
	console.log("nguoi nhan: "+data.receiverID+" notiID: "+data.notiID);
  });
  
  
});