var client = require('socket.io-client');
var socket = client.connect('http://127.0.0.1:8888/hello.html');
socket.on('connect',function(){
    console.log('yea!!');
    socket.send('how are you?');
    socket.disconnect();
    process.exit(0);
});