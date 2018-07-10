module.exports = function (app) {

	var url = app.controllers.url;

	app.get('/service/download', url.download);

}