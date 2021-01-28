module.exports = function (app) {

	var url = app.controllers.url;

	app.get('/service/download', url.download);
	app.get('/service/ows_host', url.ows_host);

}