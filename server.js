var express = require('express');
var vhost = require('vhost');

var app = express();

app.use(vhost('src.localdev', express().use(express.static('src'))));

app.use(vhost('head.localdev', express().use(express.static('head/release'))));
app.use(vhost('head.localcdn', express().use(express.static('head/release'))));

app.use(vhost('debug.head.localdev', express().use(express.static('head/debug'))));
app.use(vhost('debug.head.localcdn', express().use(express.static('head/debug'))));

app.listen(3000);
