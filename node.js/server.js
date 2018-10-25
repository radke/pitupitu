
const http = require('http');

// require('ssl-root-cas').inject();

var options = {
    hostname: 'pitupitu.ovh',
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

    socket.on('user.coordinates', function (coordinates) {
        io.emit('user.coordinates', coordinates);
        console.log('user.coordinates', socket.id, coordinates);
    });

    socket.on('disconnect', function () {
        socket.leave('channel');
        console.log('Disconnected from channel.')
    })
});
