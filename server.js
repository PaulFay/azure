var express = require('express');
var app = express();
var port = 3000;
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('HelloExpress.db');

app.get('/' function(request, response){
    response.send("Hello, World");
});

app.get('/quotes', function(request, response) {
	db.all("Select * FROM Quotes", function(err, rows) {
		console.log("Get Quotes: The Database curretnyl contains the following: ", rows);
		response.send(rows);
	})
});

app.get('/quotes/:author', function(request, response) {
	db.all("Select * FROM Quotes WHERE Author = ?", [request.params.author], function(err, rows) {
		console.log("Get Request for author: ", request.params.author);

		response.send(rows);
	})
});

app.post('/quotes', function(request, response) {
	db.run("INSERT INTO Quotes VALUES ?", req.body)
});

app.listen(port, function() {
	console.log("Express app listening on port " + port);
});