module.exports = function (app) {

  var indicadores = app.controllers.indicadores;

  app.get('/service/indicadores/regions', indicadores.regions);
  app.get('/service/indicadores/lista', indicadores.lista, indicadores.translateLista);
  app.get('/service/indicadores/ranking', indicadores.ranking);
  app.get('/service/indicadores/csv', indicadores.csv);

}