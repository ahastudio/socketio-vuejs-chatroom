const server = require('http').createServer()
const io = require('socket.io')(server)

let users = []

io.on('connection', (socket) => {
  console.log('connect')

  const name = String(socket.id).slice(0, 4)

  users.push(name)

  socket.emit('profile', { name: name })
  socket.emit('users', { users: users })

  socket.broadcast.emit('users', { users: users })

  socket.on('disconnect', function() {
    console.log('disconnect')

    const index = users.indexOf(name)
    users.splice(index, 1)

    socket.broadcast.emit('users', { users: users })
  })

  socket.on('say', (data) => {
    console.log('say', name, data)

    socket.broadcast.emit('say', {
      name: name,
      body: data
    })
  })
})

server.listen(1923)
