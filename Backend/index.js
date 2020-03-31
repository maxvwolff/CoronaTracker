var express=require('express');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();

// PARAMS
const MONGODB_URL = 'mongodb://localhost:27017/coronatracker';
const AUTHCODE = 'ABCDEF9876543210';
const ID_CHARS = 'ABCDEF0123456789'; // Possbile chars to be used in ID generation

// METHODS
// DATABASE
var addDevice = function(db, callback) {
	// Generate new ID
	var new_device_id = genAlphanumericID(16);
	var currentDate = new Date();

	var collection = db.collection('devices');
	// Insert document
	collection.insertOne(

		{device_id: new_device_id, created_date: currentDate, contactedIDs: [], isInfected: false}

	, function(err, result) {
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		callback(new_device_id);
	});
}

var addDevice = function(db, callback) {
	// Generate new ID
	var new_device_id = genAlphanumericID(16);
	var currentDate = new Date();

	var collection = db.collection('devices');
	// Insert document
	collection.insertOne(

		{device_id: new_device_id, created_date: currentDate, contactedIDs: [], isInfected: false}

	, function(err, result) {
		if (err) throw err;
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		callback(new_device_id);
	});
}

var addContact = function(db, self_id, other_id, callback) {
	var currentDate = new Date();

	var collection = db.collection('devices');
	// Update document
	collection.updateOne(

		{device_id: self_id},
		{$push: { contactedIDs: { device_id: other_id, contact_date: currentDate } }}

	, function(err, result) {
		if (err) throw err;
		assert.equal(err, null);
	});
}

var getAllContacts = function(db, device_id, callback) {
	var collection = db.collection('devices');
	// Find document
	collection.findOne(

		{device_id: device_id}

	, function(err, result) {
		if (err) throw err;
		console.log("..");
		assert.equal(err, null);
		console.log("Result: " + result.contactedIDs);
		callback(result.contactedIDs);
	});
}


// GENERAL
function genAlphanumericID(len) {
	var res = "";
	for (var i = 0; i < len; i++) {
		res += ID_CHARS[Math.floor(Math.random() * len)]; // [..] = random num between 0 and 15
	}
	return res;
}

function register(authcode) {
	// Authcode is incorrect
	if (authcode !== AUTHCODE) {
		return -1;
	}

	// Authcode is correct
	MongoClient.connect(MONGODB_URL, function(err, db) {
		assert.equal(null, err);

		addDevice(db, function(new_device_id) {
			console.log("Added new device with ID: " + new_device_id);
			db.close();
			return new_device_id;
		});
	});
}

function contact(self_id, other_id) {
	MongoClient.connect(MONGODB_URL, function(err, db) {
		assert.equal(null, err);

		addContact(db, self_id, other_id, function() {
			console.log("Saved contact to database.");
			db.close();
		});
	});
}

function allContacts(device_id) {
	var contacts = [];
	var retrieved = false;

	MongoClient.connect(MONGODB_URL, function(err, db) {
		assert.equal(null, err);
		getAllContacts(db, device_id, function(allcontacts) {
			db.close();
			contacts = allcontacts;
			console.log(allcontacts);
			retrieved = true;
		});
	});

	while (!retrieved);
	console.log(contacts);

	return contacts;
}

// REQUESTS
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/templates/index.html'));
});

app.get('/register', function(req, res) {
	var authcode = req.query.authcode;
	console.log("New device wants to register. Authcode: " + authcode);
	var device_id = register(authcode);

	if (device_id === -1){
		console.log("Wrong authcode.");
		res.send("WRONG_AUTHCODE");
	} else {
		console.log("Auth correct. Registered deivce #" + device_id);
	}

	// Go back
	res.send(device_id);
});

app.get('/contact', function(req, res) {
	var self_id = req.query.self_id;
	var other_id = req.query.other_id;

	console.log("Device #" + self_id + " contacted #" + other_id);

	contact(self_id, other_id);

	res.send("Added contact");
});

app.get('/getAllContacts', function(req, res) {
	var device_id = req.query.device_id;

	console.log("Device #" + device_id + " retrieves all contacts.");

	contacts = allContacts(device_id);

	res.send(contacts);
});

// RUN
// Create a new MongoClient
const client = new MongoClient(MONGODB_URL);

var server=app.listen(3000,function() {});