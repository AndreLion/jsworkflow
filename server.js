var express = require('express');
var vhost = require('vhost');

var app = express();

app.all('/lib/fonts/*.*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(vhost('src.localdev', express().use(express.static('src'))));

app.use(vhost('head.localdev', express().use(express.static('head/release'))));
app.use(vhost('head.localcdn', express().use(express.static('head/release'))));

app.use(vhost('debug.head.localdev', express().use(express.static('head/debug'))));
app.use(vhost('debug.head.localcdn', express().use(express.static('head/debug'))));

app.use(vhost('localdev', express().use(express.static('release'))));
app.use(vhost('localcdn', express().use(express.static('release'))));

app.listen(3000);
