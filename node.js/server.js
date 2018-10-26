
const http = require('http');

// require('ssl-root-cas').inject();

var options = {
    hostname: 'pitupitu.ovh',
    port: 4000,
//    key: fs.readFileSync('ssl/server.key'),
//    cert: fs.readFileSync('ssl/fullchain.crt')
};

var app = http.createServer(options, handler);
var io	= require('socket.io')(app);

app.listen(4000);

function handler (req, res) {
    res.writeHead(200)
}

var dots = {};

io.use(function(socket, next) {
    if (socket.request._query.options) {
        var options = JSON.parse(socket.request._query.options);
        socket.dane = options.dane;

      if ( !(socket.id in dots) ) {
        dots[socket.id] = {
          id: socket.id,
          color: '#dd0000',
          x: 100,
          y: 100
        }
      }

      next();
    }
});

io.on('connection', function (socket) {

    socket.join('channel');
    console.log('Socket', socket.id, 'connected to channel');

    socket.emit('dot.create', dots[socket.id]);
    io.emit('dots.update', dots);

    socket.on('dot.moves', function (coordinates) {
      dots[socket.id].x = coordinates.x;
      dots[socket.id].y = coordinates.y;
      socket.broadcast.emit('dot.moves', dots[socket.id]);
//      console.log('dot.moves', dots[socket.id]);
    });

    socket.on('disconnect', function () {
      socket.leave('channel');
      delete(dots[socket.id]);
      io.emit('dots.update', dots);
      console.log('Socket', socket.id, 'disconnected from channel.');
    });
});
