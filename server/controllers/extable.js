var path = require('path')
, fs = require('fs')
, archiver = require('archiver');

module.exports = function(app) {

	var Table = {};

	Table.download = function(req, res) {
		var config = app.config;
		var file = config.tableExample;

		var filename = path.basename(file);

		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
		res.setHeader('Content-type', 'application/csv');

		var filestream = fs.createReadStream(file);
		filestream.pipe(res);

	};

	return Table;

}
