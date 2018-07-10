var express = require('express')
, request = require('request')
, fs = require('fs');

//request.debug = true

module.exports = function(app) {

	var Sicar = {};
	var Internal = {};

	Internal.searchId = function(codProp, nomeUser, email, callback) {
		var j = request.jar()
		var urlPortal = "http://www.car.gov.br/publico/imoveis/index";
		var urlPropriedades = "http://www.car.gov.br/publico/imoveis/search?text="+codProp

		request({
			url: urlPortal,
			jar:j 
		}, 
		function () {
			request({
			    url: urlPropriedades,
			    json: true,
			    jar:j
			}, function (error, response, body) {
			    if (!error) {
			    	if(body.features[0] == undefined){
			    		app.controllers.email.sendEmailError(nomeUser, email);
			    	}else{
			    		var id = encodeURIComponent(body.features[0].id)
			    		callback(id, j)
			    	}
			    }else{
			    	console.log(error)
			    	callback(error)
			    }
			});
		});
	}

	Sicar.download = function(codProp, nameFile, nomeUser, email, callback) {

		var callbackSearch = function(id, j) {
			var idImovel = "idImovel="+id
			var urlDownload = "http://www.car.gov.br/publico/imoveis/exportShapeFile?"+idImovel
			var output = "./downloads/"+nameFile+"/"+codProp+".zip";

			request({url: urlDownload, encoding: null, jar:j}, function(err, resp, body) {
				if(err) throw err;
				fs.writeFile(output, body, function(err) {
					console.log("file written!", codProp);
					callback()
				});
			});
		}

		Internal.searchId(codProp, nomeUser, email, callbackSearch)
	}

	return Sicar;
	
};