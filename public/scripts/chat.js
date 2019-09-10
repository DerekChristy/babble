window.onload = function() {
    var socket = io.connect("http://localhost:3000");
    var user = document.getElementById("user").innerHTML;
    var btn = document.getElementById('send');
    var output = document.getElementById('output');
    var win = document.getElementById('chat-window');
    var message = document.getElementById('message');
    var feedback = document.getElementById('feedback');
    var usersTab = document.getElementById('users-tab');

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var msg = message.value;
        socket.emit('chat', {
            message: msg,
            username: user
        });
        message.value = "";
    });

    message.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          event.preventDefault();
          // Trigger the button element with a click
          btn.click();
          message.value = "";
        }
    });

    message.addEventListener('keydown', function(e){
        socket.emit('typing', user);
    });

    socket.on('chat', function(data) {
        feedback.innerHTML = "";
        output.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
        win.scrollTop = win.scrollHeight;
    });

    socket.on('typing', function(user) {
        if(feedback.innerHTML == "") {
            feedback.innerHTML = "<p><em>" + user + " is typing..</em></p>";
            win.scrollTop = win.scrollHeight;
        }
    });

    socket.on('connect', function(){
        socket.emit('onlineList');
    });

    socket.on('onlineList', function(users) {
        usersTab.innerHTML = "";
        users.forEach(user => {
            usersTab.innerHTML += "<li>" + user +"</li>";
        }); 
    });
};


