module.exports = function (app) {

	var car = app.controllers.car;

	app.get('/service/car', car.limite);
	app.post('/service/car', car.limite);

}