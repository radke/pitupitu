
const https = require('https');

// require('ssl-root-cas').inject();

var options = {
    hostname: 'ws.pitupitu.ovh',
    port: 4000,
//    key: fs.readFileSync('ssl/server.key'),
//    cert: fs.readFileSync('ssl/fullchain.crt')
};

var app = https.createServer(options,handler);
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

    socket.join('channel');

    socket.on('event.savePushNotificationsSubscription', function (subscription) {
        debug(subscription);
    });

    socket.on('disconnect', function () {
        socket.leave('channel');
    })
});
