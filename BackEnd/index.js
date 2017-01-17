const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require("lodash");
const mongoose = require('mongoose');

// Set up express
var PORT = 3000;
var app = express();

// Set up mongoose
var uri = 'mongodb://onri:<PeppTaco>@ds149577.mlab.com:49577/sketchdesigner'
mongoDB = mongoose.connect(uri);
Schema = mongoose.Schema;

// Connect middleware:
app.use(cors());

// Only accept json body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = {
	drawings: [],
	templates: []
};

// Set up routes:

function listItems(collection) {
	var result = _.map(collection, (d) => { return _.pick(d, "title", "id")} );
	return result;
}

app.get("/api/drawings", (req, res) => {
	var result = listItems(db.drawings);
	res.json(result).end();
});

app.get("/api/templates", (req, res) => {
	var result = listItems(db.templates);
	res.json(result).end();
});

function getItem(req, res, collection) {
	var item = collection[req.params.id];
	if (!item) {
		res.status(404).end();
	} else {
		res.json(item).end();
	}
}

app.get("/api/drawings/:id", (req, res) => {
	getItem(req, res, db.drawings);
});

app.get("/api/templates/:id", (req, res) => {
	getItem(req, res, db.templates);
});

function saveItems(req, res, collection) {
	// Extract the expected values from the request:
	var title = req.body.title;
	var content = req.body.content;

	// Both properties are required:
	if (!title) {
		res.status(400).json("Title must be included");
	} else if (!content) {
		res.status(400).json("The contents of the drawing must be included");
	} else {
		// We use the 0-based position of the drawing in the array as the ID:
		var id = collection.length;
		var item = {
			title: title,
			content: content,
			created: new Date(),
			id: id
		};
		collection.push(item);
		res.status(201).end();
	}
}

app.post("/api/drawings", (req, res) => {
	saveItems(req, res, db.drawings);
});

app.post("/api/templates", (req, res) => {
	saveItems(req, res, db.templates);
});


// Start the server
app.listen(PORT, function () {
    console.log('Express server listening on localhost:%d', PORT);
});