var CronJob = require('cron').CronJob
, mongodb = require('mongodb')
, dateFormat = require('dateformat')
, async = require('async')
, fs = require('fs');

module.exports = function(app) {

	var config = app.config;
	
	var Jobs = {};

	var strDate = function() {
		return dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss ");
	}

	Jobs.verificaDB = function(moment, dbWWF) {

		dbWWF.collection('uploads').find({'processed': false}).toArray(function(err, result) {
			if (err) throw err;

			if(result.length > 0){
				result.forEach( function(obj){

					var nameFile = obj['nameFile'];
					var pathFile = './uploads/'+nameFile;
					var nomeUser = obj['nome']
					var email = obj['email']
					var nameFile = obj['nameFile']

					//cria a pasta
					fs.mkdir('./downloads/'+nameFile, function(e, err){
						if (err) throw err;
					});


					Jobs['readTable'](pathFile, function(arrayPropriedades, err){
						
						dbWWF.collection('uploads').updateOne({_id: obj['_id']},{ $set:{'processed': 'incomplet'}}, function(err, res) {
							console.log('In Processed')
						});

						var forEach = function(codProp, next) {
							app.controllers.sicar.download(codProp, nameFile, nomeUser, email, next);
							console.log('Jobs download', codProp)
						}

						var done = function() {

						    app.controllers.email.sendEmail(nomeUser, email, nameFile);

						    dbWWF.collection('uploads').updateOne({_id: obj['_id']},{ $set:{'processed': true}}, function(err, res) {
								console.log('Processed atualizado para true')
							});

						    console.log('email')
						}

						async.forEachSeries(arrayPropriedades, forEach, done);
					});
				});
			}
		});
	}

	Jobs.readTable = function (table, callback) {

		//Lê a tabela e pega a coluna com os códigos das propriedades e os coloca em um array
		fs.readFile(table, 'utf8', function(err, data){
			var rows = data.split(/\n/);
			var codProp = [];

			for(var i=1; i < rows.length - 1 ; i++) {
			  var row = rows[i];
			  var col = row.split(/\,/)

			  codProp.push(col[0]);

			}
			callback(codProp);
		});
	}

	Jobs.start = function() {
		if(process.env.PRIMARY_WORKER) {
			var MongoClient = mongodb.MongoClient;
			var dbUrl = 'mongodb://localhost:27017/wwf-sicar';

			MongoClient.connect(dbUrl, function(err, db) {
				if (err) throw err;

	  			var dbWWF = db.db('wwf-sicar');

				config.jobs.toRun.forEach(function(job) {
					var logFile = config.logDir + "/" + job.name + ".log";

					new CronJob(job.cron, function() {
						var startLogMsg = "Job " + job.name + " start.";

						Jobs['verificaDB'](strDate(), dbWWF, function() {
							console.log('Fernanda', strDate() + " " + startLogMsg);
						});

					}, null, true, config.jobs.timezone, null, job.runOnAppStart);

				});
			});
		}
	}

	return Jobs;
	
};