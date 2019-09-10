var express = require('express');
var app = express();
var path = require('path');
var socket = require('socket.io');
var PORT = 3000;
var server = app.listen(PORT, function() {
    console.log("Listening at http://localhost:" + PORT);
});
var io = socket(server);
var users = [];


app.use(express.static(path.join( __dirname + '/public')));

app.set("view engine", "ejs");

app.get('/', function(req, res) {
   
    res.render("pages/login");
});

app.get('/app', function(req, res) {
    var uname = req.query.user;
    res.render('pages/babble', { user : uname });
});

io.on('connection', function(socket) {
    
    console.log("user " + socket.id + " connected");
    

    socket.on('login', function(uname) {
        socket.emit('redirect', "http://localhost:3000/app");
        users.push(uname);
    });

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(user) {
        socket.broadcast.emit('typing', user);
    });

    socket.on('onlineList', function(){
        io.emit('onlineList', users);
    });

    socket.on('disconnect', function() {
        console.log("disconnect");
    });
});


