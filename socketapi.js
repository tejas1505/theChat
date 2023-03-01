const io = require('socket.io')()
// const io = require('socket.io')();
const socketapi = {
    io: io
};
const users = {}

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log("New user", name)
    })
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message:message, name : users[socket.id]})
    })

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})

console.log('connected');
module.exports = socketapi;