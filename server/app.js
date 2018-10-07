const server = require('http').createServer();
const io = require('socket.io')(server);

let users = [];

io.on('connection', (socket) => {
  console.log('[connect]', socket.id);

  const name = String(socket.id).slice(0, 4);

  users.push({
    id: socket.id,
    name,
  });

  socket.emit('profile', {
    id: socket.id,
    name,
  });

  socket.emit('users', { users });

  socket.broadcast.emit('users', { users });

  socket.on('disconnect', function () {
    console.log('[disconnect]');

    const index = users.findIndex(user => user.id === socket.id);
    users.splice(index, 1);

    socket.broadcast.emit('users', { users: users });
  });

  socket.on('say', (data) => {
    console.log('[say]', name, data);

    socket.broadcast.emit('say', {
      name,
      body: data,
    });
  });
});

server.listen(1923);
