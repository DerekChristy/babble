var socket = io.connect("http://localhost:3000");
var btn = document.getElementById('submit');
var uname = document.getElementById('username');
var upass = document.getElementById('password');

btn.addEventListener('click', function() {
    socket.emit('login', uname.value, upass.value);
});

socket.on('redirect', function(dest) {
    var url = dest + "?user=" + uname.value;
    window.location.href = url;
});