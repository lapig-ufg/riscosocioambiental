var 	fs = require('fs')
		,	requester = require('request')
		,	StreamConcat = require('stream-concat')
		,	archiver = require('archiver')
		,	nodemailer = require('nodemailer')
		,	ejs = require('ejs');

module.exports = function(app) {

	var config = app.config;
	var email = app.libs.email;
	
	var Email = {};
	var Internal = {};

	Internal.generateEmailMsg = function(nomeUser, nameFile, callback) {

		var url = config.hostUrl+'/service/download?file='+nameFile;

		ejs.renderFile(__dirname + '/../views/download.ejs', { label: nomeUser, url: url}, function(err, html) {
			callback(nomeUser, html)
		});
	}

	Email.sendEmail = function(nomeUser, emailUser, nameFile, request, response) {
		var emailTo = emailUser;
		Internal.generateEmailMsg(nomeUser, nameFile, function(nomeUserCall, html) {
			var title = 'Risco Socioambiental.org - Download Propriedades do Sicar';
			email.send(emailTo, title, html, function(err, info) {
				console.log('send e-mail')
				response.send({ "result": ( err == null ) });
				response.end();
			})
		})
	}
	
	Internal.generateEmailMsgError = function(nomeUser, callback) {

		ejs.renderFile(__dirname + '/../views/downloadError.ejs', { label: nomeUser}, function(err, html) {
			callback(nomeUser, html)
		});
	}


	Email.sendEmailError = function(nomeUser, emailUser, request, response) {
		var emailTo = emailUser;
		Internal.generateEmailMsgError(nomeUser, function(nomeUserCall, html) {
			var title = 'Risco Socioambiental.org - Erro Download Propriedades do Sicar';
			email.send(emailTo, title, html, function(err, info) {
				console.log('send e-mail Erro')
				response.send({ "result": ( err == null ) });
				response.end();
			})
		})
	}

	return Email;

}