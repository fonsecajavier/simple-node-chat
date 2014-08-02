var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var store = redis.createClient();
var pub = redis.createClient();
var sub = redis.createClient();

sub.subscribe("chatting");

io.sockets.on("connection", function(client){
  sub.on("message", function(channel, message){
    console.log("message received on server from publish");
    client.send(message);
  });
  client.on("message", function(msg) {
    console.log(msg);
    if(msg.type == "chat"){
      pub.publish("chatting", msg.message);
    }
    else if(msg.type == "setUsername"){
      pub.publish("chatting", "A new user is connected " + msg.user);
      store.sadd("onlineUsers", msg.user);
    }
  });
  client.on("disconnect", function(){
    pub.publish("chatting", "User is disconnected " + client.id);
  });
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});