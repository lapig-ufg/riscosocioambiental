var appRoot = require('app-root-path');
var passwords = require(appRoot + '/passwords.json');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
	throw result.error;
}
const { parsed: env } = result;

module.exports = function(app) {

	var appProducao = env.APP_PRODUCAO;
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + env.CLIENT_DIR,
		"downloadDir": appRoot + env.DOWNLOAD_DIR,
		"hostUrl": env.HOST_URL,
		"indicadoresDb": env.INDICADORES_DB,
		"logDir": appRoot + env.LOG_DIR,
		"tableExample": appRoot + env.TABLE_EXAMPLE,
		"langDir": appRoot + env.LANG_DIR,
		"mongo": {
			"host": env.MONGO_HOST,
			"port": env.MONGO_PORT,
			"dbname": env.MONGO_DBNAME
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
		"port": env.SERVER_PORT,
		"email": {
			'gmailUser': passwords.gmailUser,
			'gmailPassword': passwords.gmailPassword,
			'replyTo': 'riscosocioambiental.org@gmail.com'
		}
	};

	

	if(process.env.NODE_ENV == 'prod') {
		config["mongo"] = {
			"host": env.MONGO_HOST_PROD,
			"port": env.MONGO_PORT_PROD,
			"dbname": env.MONGO_DBNAME_PROD
		},
		config["indicadoresDb"] = env.INDICADORES_DB_PROD,
		config["hostUrl"] = env.HOST_URL_PROD

	}

	console.log(env.INDICADORES_DB_PROD)
	

	return config;

}