var request = require('request');

module.exports = function(app) {

	var Car = {};
	var Internal = {};

	Car.limite = function(req, res) {
		var j = request.jar()
		var urlPortal = "http://www.car.gov.br/publico/imoveis/index";
		var codProp = req.param('cod', '');
		var urlPropriedade = "http://www.car.gov.br/publico/imoveis/search?text="+codProp;

		request({
			url: urlPortal,
			jar:j 
		}, 
		function () {
			request({
			    url: urlPropriedade,
			    json: true,
			    jar:j
			}, function (error, response, body) {
			    if (!error) {
			    	/*var bodyString = JSON.stringify(body)
			    	res.send("L.Control.Search.callJsonp(["+ bodyString+"])")*/
			    	res.setHeader('Access-Control-Allow-Origin','*');
					res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
					res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			    	res.send(body)
			    }else{
			    	res.send('Código de propriedade inválido');
			    	console.log(error)
			    }
			});
		});
	};

	return Car;

}
