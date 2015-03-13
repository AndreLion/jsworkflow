//var express = require('express')
//var app = express()
//
//app.use(express.static('src'))
//
//app.listen(3000)
//

var express = require('express');
var port = 3000;

function createVirtualHost(domainName, dirPath) {
    var vhost = express();
    //parses request body and populates request.body
    vhost.use( express.bodyParser() );
    //checks request.body for HTTP method overrides
    vhost.use( express.methodOverride() );
    //Where to serve static content
    vhost.use( express.static( dirPath ) );
    //Show errors
    vhost.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

    return express.vhost(domainName, vhost)
}

var app = express();

var dev = createVirtualHost('dev.localhost', 'src');
var devCDN = createVirtualHost('dev.localcdn', 'src');

app.use(dev);
app.use(devCDN);

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
