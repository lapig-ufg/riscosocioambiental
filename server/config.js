var appRoot = require('app-root-path');
var passwords = require(appRoot + '/passwords.json')

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/clientdir_prod/",
		"downloadDir": appRoot + "/downloads/",
		"hostUrl": 'http://localhost:3000',
		"indicadoresDb": "/home/fmalaquias/Documentos/Projeto/Dados_local/Ocultos/indicadores.sqlite",
		"logDir": appRoot + "/log/",
		"tableExample": appRoot + "/tabela de exemplo.csv",
		"langDir": appRoot + "/lang",
		"mongo": {
			"host": "localhost",
			"port": "27017",
			"dbname": "wwf-sicar"
		},
		"jobs": {
			"timezone": 'America/Sao_Paulo',
			"toRun": [
				{
					"name": "verificaDB",
					"cron": '1 * * * * *',
					"runOnAppStart": false,
					"params": {}
				}
			]
		},
		"port": 3000,
		"email": {
			'gmailUser': passwords.gmailUser,
			'gmailPassword': passwords.gmailPassword,
			'replyTo': 'riscosocioambiental.org@gmail.com'
		}
	};

	if(process.env.NODE_ENV == 'prod') {
		config["mongo"] = {
			"host": "172.18.0.6",
			"port": "27017",
			"dbname": "wwf-sicar"
		},
		config["indicadoresDb"] = "/STORAGE/catalog/Ocultos/indicadores.sqlite",
		config["hostUrl"] = 'http://socioambiental.lapig.iesa.ufg.br'

	}

	return config;

}