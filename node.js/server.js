
const http = require('http');

// require('ssl-root-cas').inject();

var options = {
    hostname: 'localhost',
    port: 4000,
//    key: fs.readFileSync('ssl/server.key'),
//    cert: fs.readFileSync('ssl/fullchain.crt')
};

var app = http.createServer(options,handler);
var io	= require('socket.io')(app);

app.listen(4000);

function handler (req, res) {
    res.writeHead(200)
}

io.use(function(socket, next) {
    if (socket.request._query.options) {
        var options = JSON.parse(socket.request._query.options);
        socket.dane = options.dane;

        next()
    }
});

io.on('connection', function (socket) {

  console.log('Connected to channel.')

    socket.join('channel');
    io.emit('create.dot', {
        id: socket.id,
        color: '#ff0000',
        x: 100,
        y: 100
    });

    socket.on('user.coordinates', function (coordinates) {
        socket.broadcast.emit('user.coordinates', {id: socket.id, coordinates: coordinates});
        // io.emit('user.coordinates', {id: socket.id, coordinates: coordinates});
        console.log('user.coordinates', socket.id, coordinates);
    });

    socket.on('disconnect', function () {
//        io.emit('delete.dot', socket.id);
        socket.leave('channel');
        console.log('Disconnected from channel.')
    })
});
