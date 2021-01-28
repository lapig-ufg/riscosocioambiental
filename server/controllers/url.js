var path = require('path')
, fs = require('fs')
, archiver = require('archiver');

module.exports = function(app) {

	var Url = {};
	var Internal = {};

	Url.download = function(req, res) {
		var config = app.config;
		var diretorio = config.downloadDir;
		var fileParam = req.param('file', '');
		var pathFile = diretorio+fileParam;

		if(fileParam.indexOf("../") == 0){
			res.send('Arquivo inválido!')
			res.end();
		}else{
			
			res.setHeader('Content-disposition', 'attachment; filename=' + fileParam+'.zip');
			res.setHeader('Content-type', 'application/zip')

			var zipFile = archiver('zip');
			zipFile.pipe(res);

			if(fs.existsSync(pathFile)) {
				zipFile.directory(pathFile, fileParam);
			}

			zipFile.finalize();
		}

	};

	Url.ows_host = function(req, res) {
		var config = app.config;

		res.send(config.ows_host);
		res.end();
	}

	return Url;

}
