var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
const { off } = require("process");
server.listen(process.env.PORT || 3000);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});
console.log("RUNNIG");
// var mangUserNoti = [];
var listUserOnline = {};
io.sockets.on('connection', function (socket) {
	socket.on("disconnect",function(){
		delete listUserOnline[socket.id];
	})
	socket.on("noti_client_id",function(cliend_id){
		if(!listUserOnline[socket.id]){
			listUserOnline[socket.id] =cliend_id
		}
		socket.join(cliend_id);
		// io.to(cliend_id).emit("server_send_list_online",listUserOnline);
		io.sockets.emit("server_send_list_online",listUserOnline);
		console.log("id ket noi: "+cliend_id);
	});
	// io.to(cliend_id).emit("test001","Đã kết nối");
  	console.log("Co nguoi connect ne");
  	socket.on("client_send_noti",function(data){
		io.to(data.receiverID).emit("server_send_noti",{notiID: data.notiID });
		console.log("nguoi nhan: "+data.receiverID+" notiID: "+data.notiID);
	});
	socket.on("client_send_message",function(data){
		io.to(data.toID).emit("server_send_message",data);
		console.log("aa"+data);
	});
	socket.on("client_send_typing",function(data){
		io.to(data.toID).emit("server_send_typing",{
			userID : data.fromID
		});
	});
	socket.on("client_send_cancel_typing",function(data){
		io.to(data.toID).emit("server_send_cancel_typing",{
			userID : data.fromID
		});
	});
	

  
  
  
});

