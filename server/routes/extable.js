module.exports = function (app) {

	var table = app.controllers.extable;

	app.get('/service/extable', table.download);
	app.post('/service/extable', table.download);

}