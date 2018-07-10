var express = require('express')
, multer = require('multer')
, mongodb = require('mongodb')
, requester = require('request');

module.exports = function(app) {

	var Upload = {};
	var Internal = {};
	var app = express();

	Upload.file = function(req, res) {

		var dadosUser = req.body
			dadosUser['originalNameFile'] = req.file.originalname
			dadosUser['nameFile'] = req.file.filename
			dadosUser['pathFile'] = req.file.destination
			dadosUser['processed'] = false
	
		var MongoClient = mongodb.MongoClient;
		var dbUrl = 'mongodb://localhost:27017/wwf-sicar';

		MongoClient.connect(dbUrl, function(err, db) {
			if(err) throw err;

  			var dbWWF = db.db('wwf-sicar');
			var collection = dbWWF.collection ('uploads');

  			collection.insert (dadosUser);
  			db.close();
		});

		res.setHeader('Access-Control-Allow-Origin','*');
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	};

	return Upload;

}
