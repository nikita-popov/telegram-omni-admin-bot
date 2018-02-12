'use strict';
const moment = require('moment');
// Loging request and response/////////////////////////////////////////////////////////////////////
let log = (req, res, next) => {
	console.log( moment().format('YYYY-MM-DD ZZ HH:mm:ss'), ' Request: ', req.method, req.path );
	console.log( moment().format('YYYY-MM-DD ZZ HH:mm:ss'), ' Response: ', req.path );
	next();
}

module.exports = { log };