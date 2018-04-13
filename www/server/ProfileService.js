var exports = 	module.exports = {};
var express = 	require('express');
var app 	= 	express();

exports.getLoginUser = function(req, res) {
	console.info('GET Method for Profile Service');
	con.query('SELECT * FROM users', (err,rows) => {
	  	if(err) throw err;
	  	res.send(rows);
	});
}

exports.postLoginUser = function(req, res) {
	console.info('POST Method for Profile Service');

	// Neat INSERT statement
	// req.body contains the payload for POST.
	con.query('INSERT INTO users SET ?', req.body, (err, results, fields) => {
		if (err) throw err;
		res.send(results);
	});
}

exports.deleteLoginUser = function(req, res) {
	console.info('DELETE Method for Profile Service');

	// req.params.id contains the id parameter that was passed on ajax request.
	con.query('DELETE FROM users where id = ?', [parseInt(req.params.id,10)], (err, results) => {
		if (err) throw err;
		res.send(results);
	});
}

exports.editLoginUser = function(req , res) {
	console.info('EDIT Method for Profile Service');

	// Neat UPDATE statement
	// req.body contains the payload for PUT.
	// req.params.id contains the id parameter that was passed on ajax request.
	con.query('UPDATE users SET ? where id = ? ', [req.body, req.params.id], (err, results) => {
		if (err) throw err;
		res.send(results);
	});
}